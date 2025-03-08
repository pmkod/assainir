import { type LegacyRef, forwardRef } from "react";
import { Text, type TextProps, type TextStyle } from "react-native";
import { Theme } from "../../style/types/theme";
import { useTheme } from "../../style/hooks/use-theme";
import { font } from "../../style/font";

interface MyTextProps extends TextProps {
  fontSize?: number;
  fontWeight?: "extraLight" | "light" | "regular" | "semiBold" | "bold";
  color?: keyof Theme;
  textAlign?: TextStyle["textAlign"];
}

const MyText = forwardRef(
  (
    {
      children,
      style,
      fontSize,
      fontWeight = "regular",
      color = "gray700",
      onPress,
      textAlign,
      ...rest
    }: MyTextProps,
    ref: LegacyRef<Text>
  ) => {
    const { theme } = useTheme();

    return (
      <Text
        ref={ref}
        onPress={onPress}
        // textBreakStrategy=""
        style={[
          {
            color: theme[color],
            fontSize,
            fontFamily: font[fontWeight],
            textAlign,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Text>
    );
  }
);

export { MyText };
