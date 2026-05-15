import { test, expect, Page } from '@playwright/test';

test.describe('Environment and Service Availability Tests', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('verify all service endpoints are accessible', async () => {
    const services = [
      {
        name: 'Flight Search Service',
        baseUrl: process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085',
        endpoints: [
          { path: '/health', method: 'GET' },
          { path: '/api/v1/flights/search', method: 'POST' },
          { path: '/api/v1/flights/airports/search', method: 'GET' }
        ]
      },
      {
        name: 'Check-in Service',
        baseUrl: process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082',
        endpoints: [
          { path: '/health', method: 'GET' },
          { path: '/api/v1/checkin/booking', method: 'GET' },
          { path: '/api/v1/checkin/passenger', method: 'POST' }
        ]
      },
      {
        name: 'Payment Service',
        baseUrl: process.env.PAYMENT_SERVICE_URL || 'http://localhost:8083',
        endpoints: [
          { path: '/health', method: 'GET' },
          { path: '/api/v1/payments/process', method: 'POST' },
          { path: '/api/v1/payments/:id', method: 'GET' }
        ]
      },
      {
        name: 'Web UI',
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
        endpoints: [
          { path: '/', method: 'GET' },
          { path: '/flights', method: 'GET' },
          { path: '/checkin', method: 'GET' }
        ]
      }
    ];

    const results = [];

    for (const service of services) {
      console.log(`\nTesting ${service.name} at ${service.baseUrl}:`);

      for (const endpoint of service.endpoints) {
        try {
          let response;

          if (endpoint.method === 'GET') {
            response = await page.request.get(`${service.baseUrl}${endpoint.path}`);
          } else if (endpoint.method === 'POST') {
            response = await page.request.post(`${service.baseUrl}${endpoint.path}`, {
              headers: { 'Content-Type': 'application/json' },
              data: {} // Empty data for testing availability
            });
          }

          const status = response.status();
          const accessible = status < 500;

          results.push({
            service: service.name,
            endpoint: endpoint.path,
            method: endpoint.method,
            status,
            accessible
          });

          console.log(`  ${endpoint.method} ${endpoint.path}: ${accessible ? '✅' : '❌'} (${status})`);
        } catch (error) {
          results.push({
            service: service.name,
            endpoint: endpoint.path,
            method: endpoint.method,
            status: 'ERROR',
            accessible: false,
            error: error.message
          });

          console.log(`  ${endpoint.method} ${endpoint.path}: ❌ (Error: ${error.message})`);
        }
      }
    }

    // Count accessible endpoints
    const accessibleEndpoints = results.filter(r => r.accessible).length;
    const totalEndpoints = results.length;

    console.log(`\nOverall: ${accessibleEndpoints}/${totalEndpoints} endpoints accessible`);

    if (accessibleEndpoints === 0) {
      console.log('❌ CRITICAL: No services are accessible!');
    } else if (accessibleEndpoints < totalEndpoints * 0.5) {
      console.log('❌ MAJOR: Most services are not accessible!');
    } else if (accessibleEndpoints < totalEndpoints) {
      console.log('⚠️  PARTIAL: Some services are not accessible');
    } else {
      console.log('✅ All services are accessible');
    }
  });

  test('verify API response formats consistency', async () => {
    const services = [
      { name: 'Flight Search', baseUrl: process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085' },
      { name: 'Check-in', baseUrl: process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082' },
      { name: 'Payment', baseUrl: process.env.PAYMENT_SERVICE_URL || 'http://localhost:8083' }
    ];

    const responseFormats = {};

    for (const service of services) {
      try {
        const response = await page.request.get(`${service.baseUrl}/health`);

        if (response.status() === 200) {
          const data = await response.json();
          const keys = Object.keys(data).sort();
          responseFormats[service.name] = keys;

          console.log(`${service.name} health response format: [${keys.join(', ')}]`);
        }
      } catch (error) {
        console.log(`${service.name} health check failed: ${error.message}`);
        responseFormats[service.name] = null;
      }
    }

    // Check if response formats are consistent
    const formats = Object.values(responseFormats).filter(format => format !== null);
    const uniqueFormats = new Set(formats.map(format => JSON.stringify(format)));

    if (uniqueFormats.size > 1) {
      console.log('❌ Response formats are inconsistent between services');
    } else if (formats.length > 0) {
      console.log('✅ Response formats are consistent');
    }
  });

  test('verify CORS configuration across services', async () => {
    const services = [
      { name: 'Flight Search', baseUrl: process.env.FLIGHT_SERVICE_URL || 'http://localhost:8085' },
      { name: 'Check-in', baseUrl: process.env.CHECKIN_SERVICE_URL || 'http://localhost:8082' },
      { name: 'Payment', baseUrl: process.env.PAYMENT_SERVICE_URL || 'http://localhost:8083' }
    ];

    for (const service of services) {
      try {
        const response = await page.request.fetch(`${service.baseUrl}/health`, {
          method: 'OPTIONS',
          headers: {
            'Origin': process.env.BASE_URL || 'http://localhost:3000',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type',
          }
        });

        const corsHeaders = response.headers();
        const hasCors = corsHeaders['access-control-allow-origin'];

        console.log(`${service.name} CORS configured: ${hasCors ? '✅' : '❌'}`);
      } catch (error) {
        console.log(`${service.name} CORS check failed: ${error.message}`);
      }
    }
  });

  test('verify environment variables and configuration', async () => {
    // Check if required environment variables are set
    const requiredEnvVars = [
      'BASE_URL',
      'FLIGHT_SERVICE_URL',
      'CHECKIN_SERVICE_URL',
      'PAYMENT_SERVICE_URL'
    ];

    const missingEnvVars = [];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        missingEnvVars.push(envVar);
      }
    }

    if (missingEnvVars.length > 0) {
      console.log(`❌ Missing environment variables: ${missingEnvVars.join(', ')}`);
    } else {
      console.log('✅ All required environment variables are set');
    }

    // Test if the default configuration works
    const defaultConfigs = [
      { service: 'Flight Search', url: 'http://localhost:8085' },
      { service: 'Check-in', url: 'http://localhost:8082' },
      { service: 'Payment', url: 'http://localhost:8083' },
      { service: 'Web UI', url: 'http://localhost:3000' }
    ];

    let allDefaultsAccessible = true;
    for (const config of defaultConfigs) {
      try {
        const response = await page.request.get(config.url + '/health');
        const accessible = response.status() < 500;
        console.log(`${config.service} (default ${config.url}): ${accessible ? '✅' : '❌'}`);

        if (!accessible) {
          allDefaultsAccessible = false;
        }
      } catch (error) {
        console.log(`${config.service} (default ${config.url}): ❌ (${error.message})`);
        allDefaultsAccessible = false;
      }
    }

    if (!allDefaultsAccessible) {
      console.log('\n❌ DEFAULT CONFIGURATION HAS ISSUES - SERVICES NOT ACCESSIBLE');
      console.log('This confirms the system is not properly integrated!');
    }
  });
});