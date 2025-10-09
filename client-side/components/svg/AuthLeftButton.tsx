import * as React from "react";
import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { AuthLeftButtonProps as AuthLeftButtonPropsType } from "@/types/types";

const AuthLeftButton: React.FC<AuthLeftButtonPropsType> = ({
  onPress,
  size = 30,
  color = "#545EE1",
  ...props
}) => {
  return (
    <Pressable
      onPress={onPress}
      {...props}
      style={{ backgroundColor: "#FFFFF" }}
    >
      <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
        <Path
          d="M15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.5 21.25L11.25 15L17.5 8.75"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
};

export default AuthLeftButton;
