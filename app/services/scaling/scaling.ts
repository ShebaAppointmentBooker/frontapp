import { Dimensions } from "react-native";

// Base dimensions from the design mockup
const baseWidth = 393; // Example width the designer used
const baseHeight = 852; // Example height the designer used

// Device dimensions
const { width, height } = Dimensions.get("window");
export const baseToScreenWidthRatio = () => width / baseWidth;

// Horizontal scaling
export const horizontalScale = (size:number) => (width / baseWidth) * size;

// Vertical scaling
export const verticalScale = (size:number) => (height / baseHeight) * size;

// Moderate scaling
export const moderateScale = (size:number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
