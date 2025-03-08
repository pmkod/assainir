import { type ReactElement, type ReactNode, cloneElement } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useTheme } from "../../style/hooks/use-theme";
import { MyText } from "./my-text";
import { font } from "../../style/font";
import { Theme } from "../../style/types/theme";

interface AlertProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  status?: "destructive" | "success";
  variant?: "outline" | "fill";
  style?: StyleProp<ViewStyle>;
}

export const Alert = ({
  icon,
  title,
  description,
  status,
  variant,
  style,
}: AlertProps) => {
  const { theme } = useTheme();
  const alertTxtColor = alertTextColor({
    status,
    variant,
    theme,
  });
  return (
    <View
      style={[
        {
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 14,
          paddingTop: 7,
          paddingBottom: 10,
          borderRadius: 4,
          backgroundColor: alertBackgroundColor({
            status,
            variant,
            theme,
          }),
          borderWidth: 1,
          borderColor: alertBorderColor({
            status,
            variant,
            theme,
          }),
        },
        style,
      ]}
    >
      {icon && (
        <View>
          {cloneElement(icon as ReactElement, { color: alertTxtColor })}
        </View>
      )}

      <View style={{ flex: 1 }}>
        {title && (
          <MyText
            style={{
              color: alertTxtColor,
              fontFamily: font.semiBold,
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            {title}
          </MyText>
        )}
        {description && (
          <MyText
            style={{
              color: alertTxtColor,
              paddingRight: 18,
            }}
            textBreakStrategy="highQuality"
          >
            {description}
          </MyText>
        )}
      </View>
    </View>
  );
};

//
//
//
//
//

const alertBackgroundColor = ({
  variant,
  status,
  theme,
}: {
  variant: AlertProps["variant"];
  status: AlertProps["status"];
  theme: any;
}) => {
  let backgroundColor = "green";

  if (variant === "outline") {
    backgroundColor = "transparent";
  } else if (variant === "fill" && status === "destructive") {
    backgroundColor = theme.destructive;
  }

  return backgroundColor;
};

//
//
//
//
//

const alertTextColor = ({
  variant,
  status,
  theme,
}: {
  variant: AlertProps["variant"];
  status: AlertProps["status"];
  theme: Theme;
}) => {
  let color = theme.white;
  if (variant === "outline" && status === "destructive") {
    color = theme.destructive;
  } else if (variant === "outline" && status === "success") {
    color = "green";
  } else if (variant === "outline") {
    color = theme["gray800"];
  }
  return color;
};

//
//
//
//
//

const alertBorderColor = ({
  variant,
  status,
  theme,
}: {
  variant: AlertProps["variant"];
  status: AlertProps["status"];
  theme: any;
}) => {
  let borderColor = "transparent";
  if (variant === "fill") {
    borderColor = alertBackgroundColor({
      variant,
      status,
      theme,
    });
  } else if (variant === "outline") {
    borderColor = alertTextColor({
      variant,
      status,
      theme,
    });
  }
  return borderColor;
};
