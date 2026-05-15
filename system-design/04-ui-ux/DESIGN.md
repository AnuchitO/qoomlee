---
name: Qoomlee Airline Design System
version: "alpha"
description: Modern airline booking and check-in system with a clean, professional aesthetic
colors:
  primary: "#0E70CA" # Sky blue primary
  secondary: "#1A3557" # Dark blue for headers and important elements
  tertiary: "#E8A020" # Accent gold for highlights
  success: "#10B981" # Green for success states
  warning: "#F59E0B" # Amber for warnings
  error: "#EF4444" # Red for errors
  neutral-dark: "#1F2937" # Dark gray for primary text
  neutral: "#6B7280" # Medium gray for secondary text
  neutral-light: "#D1D5DB" # Light gray for borders
  neutral-bg: "#F9FAFB" # Very light gray for backgrounds
  white: "#FFFFFF" # White
  black: "#000000" # Black
typography:
  h1:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 1.5rem # 24px
    fontWeight: 700
    lineHeight: 1.25
  h2:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 1.25rem # 20px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 1rem # 16px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 0.875rem # 14px
    fontWeight: 400
    lineHeight: 1.4
  body-sm:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 0.75rem # 12px
    fontWeight: 400
    lineHeight: 1.33
  label:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 0.875rem # 14px
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
    fontSize: 0.75rem # 12px
    fontWeight: 400
    lineHeight: 1.33
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  "2xl": 24px
  "3xl": 32px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
components:
  header:
    backgroundColor: "{colors.white}"
    height: 64px
    padding: "{spacing.md} {spacing.md}"
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  hero-banner:
    backgroundColor: "linear-gradient(to bottom, {colors.primary}, #1D4ED8)"
    color: "{colors.white}"
    padding: "{spacing.xl} {spacing.lg}"
    borderRadius: "{rounded.3xl} {rounded.3xl} 0 0"
  form-card:
    backgroundColor: "{colors.white}"
    padding: "{spacing.lg}"
    margin: "calc(-{spacing.md}) {spacing.md} {spacing.md} {spacing.md}"
    borderRadius: "{rounded.xl}"
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    zIndex: 10
  input-field:
    borderColor: "{colors.neutral-light}"
    borderWidth: 1px
    borderRadius: "{rounded.lg}"
    padding: "10px 16px"
    fontSize: "{typography.body-md.fontSize}"
    placeholderColor: "{colors.neutral}"
    focusRingColor: "{colors.primary}"
    focusRingWidth: 2px
    focusBorder: "transparent"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    fontSize: "{typography.body-lg.fontSize}"
    fontWeight: 600
    padding: "12px 0"
    borderRadius: "{rounded.xl}"
    height: 48px
    hoverBackgroundColor: "#1D4ED8"
  button-secondary:
    backgroundColor: "{colors.neutral-light}"
    textColor: "{colors.neutral-dark}"
    fontSize: "{typography.body-md.fontSize}"
    fontWeight: 500
    padding: "10px 16px"
    borderRadius: "{rounded.lg}"
    hoverBackgroundColor: "#E5E7EB"
  section-card:
    backgroundColor: "{colors.white}"
    padding: "{spacing.lg}"
    margin: "{spacing.md} {spacing.md}"
    borderRadius: "{rounded.xl}"
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  bottom-nav:
    backgroundColor: "{colors.white}"
    borderTop: "1px solid {colors.neutral-light}"
    padding: "{spacing.sm} {spacing.xs}"
---

## Overview

Qoomlee Airline System features a modern, clean, and professional design language focused on usability and accessibility. The interface combines a sky-blue primary color with clean typography and intuitive navigation to create a trustworthy travel experience.

The design system emphasizes clarity and ease of use, especially important for airline systems where users may be stressed or in a hurry. The visual language balances professionalism with approachability, using soft rounded corners and ample spacing to create a calming effect.

## Colors

The color palette is centered around a distinctive sky-blue primary color that represents the sky and aviation industry, paired with complementary colors that ensure accessibility and visual hierarchy.

- **Primary (#0E70CA)**: Used for primary actions, links, and key interactive elements
- **Secondary (#1A3557)**: Used for headers, important text, and prominent elements
- **Tertiary (#E8A020)**: Accent color for highlights, special offers, and warnings
- **Success (#10B981)**: Positive states like confirmed bookings
- **Warning (#F59E0B)**: Informational messages and time-sensitive notices
- **Error (#EF4444)**: Errors and critical information
- **Neutrals**: Various shades of gray for backgrounds, text hierarchy, and borders

## Typography

The typography system uses system fonts for optimal performance and native feel across platforms. Font weights and sizes are carefully chosen to create clear visual hierarchy while maintaining readability.

- **Headings (H1/H2)**: Bold weights for clear section identification
- **Body text**: Comfortable reading size with appropriate line heights
- **Labels**: Slightly bolder than body text to distinguish form elements
- **Captions**: Smaller text for supplementary information

## Layout

The layout system uses a consistent spacing scale based on 4px increments, ensuring visual harmony across components. The mobile-first approach prioritizes touch targets and readability on smaller screens.

- **Spacing Scale**: xs(4px), sm(8px), md(16px), lg(24px), xl(32px), 2xl(48px)
- **Touch Targets**: Minimum 44px for interactive elements
- **Maximum Width**: 480px for mobile experiences, with appropriate scaling for desktop

## Elevation & Depth

Subtle shadows and layering create depth without overwhelming the content. Cards and form elements use soft shadows to separate content areas while maintaining visual connection to the background.

- **Form Card**: Elevated with stronger shadow to emphasize importance
- **Section Cards**: Gentle shadow for content organization
- **Headers**: Subtle shadow for separation from content below

## Shapes

The design system uses soft rounded corners throughout to create a friendly, approachable feel while maintaining a professional appearance. The rounded scale provides flexibility for different component types.

- **Small elements**: 4px for subtle rounding
- **Medium elements**: 8px for cards and containers
- **Large elements**: 12px+ for prominent components like form cards

## Components

### Header
The header contains the brand identity and user information. It remains fixed at the top for easy access and maintains consistent branding throughout the application.

### Hero Banner
Featured prominently at the top of key screens, the hero banner establishes the current context with gradient background and clear messaging. The curved bottom creates visual interest while maintaining the airline theme.

### Form Card
Elevated form elements with strong visual presence and clear affordances. Positioned to stand out from the background while maintaining connection to the overall page.

### Input Fields
Consistent styling for all form inputs with clear focus states and adequate spacing. Placeholder text provides guidance without overwhelming the user.

### Buttons
Primary buttons use the brand color for clear call-to-action emphasis. Secondary buttons provide alternative actions with appropriate visual hierarchy.

### Section Cards
Used for grouping related content and information. Maintains visual consistency while organizing information in digestible chunks.

### Bottom Navigation
Fixed navigation at the bottom of mobile screens for easy thumb access. Icons with labels provide clear navigation options for core app functions.

## Do's and Don'ts

### Do
- Use the spacing scale consistently to maintain visual rhythm
- Maintain proper color contrast ratios for accessibility
- Use rounded corners consistently according to the scale
- Keep interactive elements at least 44px for touch accessibility
- Use the primary color for main actions and important links

### Don't
- Mix different corner radii outside the defined scale
- Use colors not defined in the palette without proper contrast checking
- Reduce touch target sizes below 44px
- Apply multiple visual treatments to similar elements
- Overload screens with too many visual elements at once