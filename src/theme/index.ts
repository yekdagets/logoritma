export const colors = {
  background: "#09090B",
  cardBackground: "#27272A",
  text: "#FAFAFA",
  border: "#FAFAFA",

  primaryGradientStart: "#943DFF",
  primaryGradientEnd: "#2938DC",

  error: "#EF4444",
  errorLight: "#EF4444B2",
  success: "#943DFF",
  processing: "#27272A",
};

export const typography = {
  fontFamily: "Manrope",
  fontWeightRegular: "400",
  fontSize: 16,
  lineHeight: 21,
  letterSpacing: 0,
};

export const gradients = {
  primary: {
    colors: [colors.primaryGradientStart, colors.primaryGradientEnd],
    start: { x: 1, y: 0 },
    end: { x: 0, y: 0 },
  },
};
