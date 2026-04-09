/**
 * Converts a hex color to an RGBA value with specified opacity.
 * @param {string} hex - The hex color code (e.g., "#RRGGBB").
 * @param {number} opacity - The opacity value from 0 to 1.
 * @returns {string} The RGBA color string (e.g., "rgba(R, G, B, A)").
 */
export const hexToRgba = (hex, opacity) => {
  // Return early if no hex is provided
  if (!hex) return 'transparent';

  // Remove the hash if present
  hex = hex.replace('#', '');

  // Parse R, G, B values from hex
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};