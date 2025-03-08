import { type ReactNode, cloneElement } from "react";
import {
  ActivityIndicator,
  type GestureResponderEvent,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
} from "react-native";
import { useTheme } from "../../style/hooks/use-theme";
import { font } from "../../style/font";

interface ButtonProps {
  variant?: "fill" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  colorScheme?: "primary" | "destructive";
  text: string;
  rounded?: "md" | "full";
  onPress?: (event: GestureResponderEvent) => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isLoading?: boolean;
  leftDecorator?: ReactNode;
  rightDecorator?: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "fill",
  size = "md",
  colorScheme = "primary",
  text,
  rounded = "md",
  textStyle,
  onPress,
  leftDecorator,
  rightDecorator,
  disabled = false,
  isLoading = false,
  fullWidth = false,
}: ButtonProps) => {
  type VariantAndColorScheme =
    `${ButtonProps["variant"]}-${ButtonProps["colorScheme"]}`;
  const variantAndColorScheme = (variant +
    "-" +
    colorScheme) as VariantAndColorScheme;

  const { theme } = useTheme();

  leftDecorator = leftDecorator
    ? cloneElement(leftDecorator as any, {
        color: buttonTextColor(variantAndColorScheme, theme),
      })
    : undefined;
  rightDecorator = rightDecorator
    ? cloneElement(rightDecorator as any, {
        color: buttonTextColor(variantAndColorScheme, theme),
      })
    : null;

  return (
    <Pressable onPress={onPress} style={[]} disabled={isLoading || disabled}>
      {({ pressed }) => (
        <View
          style={[
            buttonStyles.base,
            buttonSizeStyle[size],
            buttonBorderRadiusStyle[rounded],
            buttonStyles.base,
            buttonColors(variantAndColorScheme, theme),
            {
              opacity: disabled ? 0.7 : pressed || isLoading ? 0.7 : 1,
            },

            isLoading && variant === "fill"
              ? {
                  borderWidth: 0,
                  // padding: 1,
                }
              : {},
            {
              width: fullWidth ? "100%" : "auto",
            },
          ]}
        >
          {leftDecorator && (
            <View style={{ marginRight: 4 }}>{leftDecorator}</View>
          )}
          <Text
            style={[
              {
                color: buttonTextColor(variantAndColorScheme, theme),
              },
              buttonTextSizeAndWeight[size],
              {
                paddingBottom: 2,
              },
              textStyle,
              {
                opacity: isLoading ? 0 : 1,
              },
            ]}
          >
            {text}
          </Text>
          {rightDecorator && (
            <View style={{ marginLeft: 4 }}>{rightDecorator}</View>
          )}
          {isLoading && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
              }}
            >
              <ActivityIndicator
                size={activityIndicatorSize(size)}
                color={buttonTextColor(variantAndColorScheme, theme)}
              />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};

export const buttonColors = (
  variantAndColorScheme: string,
  theme: any
  // isLoading: boolean
) => {
  // const borderColorLastPart = isLoading ? "8C" : "";
  const colors = {
    backgroundColor: theme["gray950"],
    borderColor: theme["gray950"],
  };

  if (variantAndColorScheme === "fill-destructive") {
    colors.backgroundColor = theme["destructive"];
    colors.borderColor = theme["destructive"];
  } else if (variantAndColorScheme === "outline-primary") {
    colors.backgroundColor = "transparent";
    colors.borderColor = theme["gray400"];
  } else if (variantAndColorScheme === "outline-destructive") {
    colors.backgroundColor = "transparent";
    colors.borderColor = theme["gray400"];
  } else if (variantAndColorScheme === "ghost-primary") {
    colors.backgroundColor = "transparent";
    colors.borderColor = "transparent";
  } else if (variantAndColorScheme === "ghost-destructive") {
    colors.backgroundColor = "transparent";
    colors.borderColor = "transparent";
  }
  return colors;
};

//
//
//
//
//

const buttonStyles = StyleSheet.create({
  base: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    position: "relative",
    overflow: "hidden",
  },
});

//
//
//
//
//

const buttonSizeStyle = StyleSheet.create({
  xs: {
    height: 36,
    paddingHorizontal: 8,
  },
  sm: {
    height: 42,
    paddingHorizontal: 12,
  },

  md: {
    height: 48,
    paddingHorizontal: 16,
  },
  lg: {
    height: 54,
    paddingHorizontal: 20,
  },
  xl: {
    height: 60,
    paddingHorizontal: 24,
  },
});

//
//
//
//
//

const buttonBorderRadiusStyle = StyleSheet.create({
  md: {
    borderRadius: 2,
  },
  full: {
    borderRadius: 140,
  },
});

//
//
//
//
//

export const buttonTextColor = (variantAndColorScheme: string, theme: any) => {
  let color = theme["gray900"];
  if (variantAndColorScheme === "outline-primary") {
    color = theme["gray900"];
  } else if (variantAndColorScheme === "outline-destructive") {
    color = theme["destructive"];
  } else if (variantAndColorScheme === "ghost-destructive") {
    color = theme["destructive"];
  } else if (variantAndColorScheme === "fill-primary") {
    color = theme["white"];
  } else if (variantAndColorScheme === "fill-destructive") {
    color = theme["white"];
  }
  return color;
};

//

const buttonTextSizeAndWeight = StyleSheet.create({
  xs: {
    fontSize: 12,
    fontFamily: font.regular,
  },
  sm: {
    fontSize: 14,
    fontFamily: font.regular,
  },

  md: {
    fontSize: 16,
    fontFamily: font.semiBold,
  },
  lg: {
    fontSize: 18,
    fontFamily: font.semiBold,
  },
  xl: {
    fontSize: 20,
    fontFamily: font.semiBold,
  },
});

const activityIndicatorSize = (
  buttonSize: ButtonProps["size"]
): "small" | "large" => {
  let size: "small" | "large" = "small";
  if (buttonSize === "xl") {
    size = "large";
  }
  return size;
};
