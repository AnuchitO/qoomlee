
// Function to get full airport name by IATA code
export const getAirportName = (iataCode: string): string => {
  const airportNames: Record<string, string> = {
    // Thailand
    'BKK': 'Suvarnabhumi Airport, Bangkok',
    'DMK': 'Don Mueang International Airport, Bangkok',
    'CNX': 'Chiang Mai International Airport',
    'HKT': 'Phuket International Airport',
    'HDY': 'Hat Yai International Airport',
    'KBV': 'Krabi International Airport',
    'USM': 'Koh Samui Airport',
    'URT': 'Surat Thani International Airport',
    'CEI': 'Chiang Rai International Airport',

    // Singapore
    'SIN': 'Changi International Airport, Singapore',

    // Malaysia
    'KUL': 'Kuala Lumpur International Airport',
    'PEN': 'Penang International Airport',
    'LGK': 'Langkawi International Airport',
    'BKI': 'Kota Kinabalu International Airport',

    // Vietnam
    'SGN': 'Tan Son Nhat International Airport, Ho Chi Minh City',
    'HAN': 'Noi Bai International Airport, Hanoi',
    'DAD': 'Da Nang International Airport',

    // Japan
    'NRT': 'Narita International Airport, Tokyo',
    'HND': 'Haneda Airport, Tokyo',
    'KIX': 'Kansai International Airport, Osaka',
    'FUK': 'Fukuoka Airport',
    'CTS': 'New Chitose Airport, Sapporo',

    // South Korea
    'ICN': 'Incheon International Airport, Seoul',
    'GMP': 'Gimpo International Airport, Seoul',
    'PUS': 'Gimhae International Airport, Busan',

    // China
    'PEK': 'Beijing Capital International Airport',
    'PVG': 'Shanghai Pudong International Airport',
    'CAN': 'Guangzhou Baiyun International Airport',
    'HKG': 'Hong Kong International Airport',
    'TPE': 'Taiwan Taoyuan International Airport',
    'MFM': 'Macau International Airport',

    // Middle East
    'DXB': 'Dubai International Airport',
    'AUH': 'Abu Dhabi International Airport',
    'DOH': 'Hamad International Airport, Doha',
    'BAH': 'Bahrain International Airport',

    // Europe
    'LHR': 'Heathrow Airport, London',
    'CDG': 'Charles de Gaulle Airport, Paris',
    'FRA': 'Frankfurt Airport',
    'AMS': 'Amsterdam Airport Schiphol',
    'FCO': 'Leonardo da Vinci–Fiumicino Airport, Rome',
    'MAD': 'Adolfo Suárez Madrid–Barajas Airport',
    'IST': 'Istanbul Airport',

    // North America
    'JFK': 'John F. Kennedy International Airport, New York',
    'LAX': 'Los Angeles International Airport',
    'SFO': 'San Francisco International Airport',
    'YVR': 'Vancouver International Airport',
    'YYZ': 'Toronto Pearson International Airport',

    // Oceania
    'SYD': 'Sydney Airport',
    'MEL': 'Melbourne Airport',
    'BNE': 'Brisbane Airport',
    'AKL': 'Auckland Airport',

    // Other Major Asian
    'DEL': 'Indira Gandhi International Airport, Delhi',
    'BOM': 'Chhatrapati Shivaji Maharaj International Airport, Mumbai',
    'MNL': 'Ninoy Aquino International Airport, Manila',
    'CGK': 'Soekarno–Hatta International Airport, Jakarta',
    'BWN': 'Brunei International Airport',
    'RGN': 'Yangon International Airport',
    'REP': 'Siem Reap International Airport',
    'PNH': 'Phnom Penh International Airport',
    'VTE': 'Wattay International Airport, Vientiane',
    'DPS': 'Ngurah Rai International Airport, Bali',

    // Additional Thai airports
    'ROI': 'Roi Et International Airport',
    'KKC': 'Khon Kaen International Airport',
    'LPT': 'Lampang Airport',
    'NST': 'Nakhon Si Thammarat Airport',
    'NAW': 'Narathiwat Airport',
    'PHS': 'Phitsanulok Airport',
    'HGN': 'Mae Hong Son Airport',
    'THS': 'Sukhothai Airport',
    'TST': 'Trang Airport',
    'TDX': 'Trat Airport',
    'UTP': 'U-Tapao International Airport, Rayong',
    'UBP': 'Ubon Ratchathani Airport',
    'UTH': 'Udon Thani International Airport'
  };

  return airportNames[iataCode] || iataCode;
};

export const getCountryByIata = (iataCode: string): string => {
  // This is a simplified mapping - in a real app, you'd want a more comprehensive database
  const countries: Record<string, string> = {
    'BKK': 'Thailand',
    'DMK': 'Thailand',
    'CNX': 'Thailand',
    'HKT': 'Thailand',
    'HDY': 'Thailand',
    'KBV': 'Thailand',
    'USM': 'Thailand',
    'URT': 'Thailand',
    'CEI': 'Thailand',
    'LPT': 'Thailand',
    'NST': 'Thailand',
    'NAW': 'Thailand',
    'PHS': 'Thailand',
    'HGN': 'Thailand',
    'THS': 'Thailand',
    'TST': 'Thailand',
    'TDX': 'Thailand',
    'UTP': 'Thailand',
    'UBP': 'Thailand',
    'UTH': 'Thailand',
    'SIN': 'Singapore',
    'KUL': 'Malaysia',
    'PEN': 'Malaysia',
    'LGK': 'Malaysia',
    'BKI': 'Malaysia'
  };

  return countries[iataCode] || '';
};
