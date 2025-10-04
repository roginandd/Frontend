import { Pressable, Text } from "react-native";
import { ButtonProps } from "../types/ButtonTypes";

export const Button = ({ title, onPress, ...props }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      {...props}
      style={{
        backgroundColor: props.backgroundColor,
        padding: props.padding,
        margin: props.margin,
        width: props.width,
        height: props.height,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        borderRadius: props.borderRadius,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text style={{ color: props.textColor, fontWeight: props.fontWeight }}>
        {title}
      </Text>
    </Pressable>
  );
};
