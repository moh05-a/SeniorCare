/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#16333B',
    tint: '#0E7C7B',

    // Core surfaces
    background: '#F7FBF9',
    foreground: '#16333B',

    // Cards / elevated surfaces
    card: '#FFFFFF',
    cardForeground: '#16333B',

    // Primary action color (buttons, links, active states)
    primary: '#0E7C7B',
    primaryForeground: '#ffffff',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#E7F3EF',
    secondaryForeground: '#24555A',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#EAF2EF',
    mutedForeground: '#6B8581',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#F5E4CF',
    accentForeground: '#8A562E',

    // Destructive actions (delete, error states)
    destructive: '#D85D59',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#D7E6E0',
    input: '#C7DBD4',

    // SeniorCare brand tokens
    navy: '#16333B',
    teal: '#0E7C7B',
    tealSoft: '#DFF2EC',
    seafoam: '#BFE4D7',
    coral: '#E88767',
    coralSoft: '#FBE8DF',
    amber: '#E8B75D',
    inkSoft: '#55736F',
    success: '#3D936D',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 18,
};

export default colors;
