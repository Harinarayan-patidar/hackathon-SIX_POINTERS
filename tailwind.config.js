/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      // Basic colors
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",

      // Default Tailwind colors (basic and shades)
      gray: {
        50: "#F9FAFB", 100: "#F3F4F6", 200: "#E5E7EB", 300: "#D1D5DB", 400: "#9CA3AF", 500: "#6B7280", 600: "#4B5563", 700: "#374151", 800: "#1F2937", 900: "#111827"
      },
      red: {
        50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA", 300: "#FCA5A5", 400: "#F87171", 500: "#EF4444", 600: "#DC2626", 700: "#B91C1C", 800: "#991B1B", 900: "#7F1D1D"
      },
      yellow: {
        50: "#FFFBEB", 100: "#FEF3C7", 200: "#FDE68A", 300: "#FCD34D", 400: "#FBBF24", 500: "#F59E0B", 600: "#D97706", 700: "#B45309", 800: "#92400E", 900: "#78350F"
      },
      green: {
        50: "#ECFDF5", 100: "#D1FAE5", 200: "#A7F3D0", 300: "#6EE7B7", 400: "#34D399", 500: "#10B981", 600: "#059669", 700: "#047857", 800: "#065F46", 900: "#064E3B"
      },
      blue: {
        50: "#EFF6FF", 100: "#DBEAFE", 200: "#BFDBFE", 300: "#93C5FD", 400: "#60A5FA", 500: "#3B82F6", 600: "#2563EB", 700: "#1D4ED8", 800: "#1E40AF", 900: "#1E3A8A"
      },
      indigo: {
        50: "#EEF2FF", 100: "#E0E7FF", 200: "#C7D2FE", 300: "#A5B4FC", 400: "#818CF8", 500: "#6366F1", 600: "#4F46E5", 700: "#4338CA", 800: "#3730A3", 900: "#312E81"
      },
      purple: {
        50: "#F5F3FF", 100: "#EDE9FE", 200: "#D8B4FE", 300: "#C084FC", 400: "#A855F7", 500: "#9333EA", 600: "#7E22CE", 700: "#6B21A8", 800: "#581C87", 900: "#4C1D6E"
      },
      pink: {
        50: "#FDF2F8", 100: "#FCE7F3", 200: "#FBCFE8", 300: "#F9A8D4", 400: "#F472B6", 500: "#EC4899", 600: "#DB2777", 700: "#BE185D", 800: "#9D174D", 900: "#831843"
      },

      // Rich Black (with different shades)
      richblack: {
        5: "#F5F5F5",
        25: "#D9D9D9",
        50: "#B3B3B3",
        100: "#808080",
        200: "#4D4D4D",
        300: "#262626",
        400: "#1A1A1A",
        500: "#0A0A0A", // Rich Black color
        600: "#080808",
        700: "#060606",
        800: "#030303",
        900: "#000000", // darkest possible black
      },

      blue: {
        5: "#EBF8FF",   // Lightest blue
        25: "#BEE3F8",  // Very light blue
        50: "#7ED2F6",  // Lighter blue
        100: "#4F9AE3", // Light blue
        200: "#2C80D3", // Medium light blue
        300: "#0064B1", // Medium blue
        400: "#00559A", // Darker blue
        500: "#004082", // Rich blue
        600: "#00316B", // Dark blue
        700: "#002256", // Darker blue
        800: "#001144", // Very dark blue
        900: "#000A29", // Darkest possible blue
      },

      richblue: {
        5: "#E1F1FF",   // Very light rich blue
        25: "#B3D1FF",  // Light rich blue
        50: "#80B2FF",  // Lighter rich blue
        100: "#4D93FF", // Soft rich blue
        200: "#1A74FF", // Medium rich blue
        300: "#0061E0", // Standard rich blue
        400: "#0049B3", // Darker rich blue
        500: "#003366", // Rich Blue (main shade)
        600: "#00274D", // Dark rich blue
        700: "#001A40", // Very dark rich blue
        800: "#000F33", // Deep rich blue
        900: "#000726", // Almost black rich blue
      },

      // Custom Colors
      richblue: "#003366", // Dark blue
      caribbeangreen: "#00B5B8", // Caribbean Green
      brown: "#A52A2A", // Brown

      // Additional custom colors
      deepblue: "#003366", // Deep blue color
      sunsetorange: "#FF4500", // Sunset Orange
      lightcyan: "#E0FFFF", // Light Cyan
      warmyellow: "#FFD700", // Warm Yellow
      pastelpurple: "#C9A0DC", // Pastel Purple
      mintgreen: "#98FF98", // Mint Green

      // You can add more colors here as needed
      
    },
  },
  plugins: [],
};
