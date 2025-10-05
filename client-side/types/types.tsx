import { DimensionValue } from "react-native";

export type ButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: FontWeight;
  padding?: number;
  margin?: number;
  width?: DimensionValue; // FIXED
  height?: DimensionValue; // FIXED
  marginTop?: number;
};

export type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type AuthLeftButtonProps = {
  onPress: () => void;
  size?: number;
  color?: string;
};
