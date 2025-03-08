import { bottomTabNavigator } from "./bottom-tab-navigator";
import { firstScreen } from "../screens/first-screen";
import { loginScreen } from "../screens/auth/login-screen";
import { signupScreen } from "../screens/auth/signup-screen";
import { passwordResetScreen } from "../screens/auth/password-reset-screen";
import { useTheme } from "../style/hooks/use-theme";
import { screenNames } from "../constants/screen-names";
import { font } from "../style/font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,

        headerTitleStyle: {
          fontFamily: font.bold,
        },
        headerStyle: {
          backgroundColor: theme.white,
        },

        headerTintColor: theme.gray900,
      }}
      initialRouteName={screenNames.first}
    >
      <Stack.Screen {...firstScreen} />

      <Stack.Screen {...loginScreen} />
      <Stack.Screen {...signupScreen} />
      {/* <Stack.Screen {...userVerificationScreen} /> */}
      <Stack.Screen {...passwordResetScreen} />

      <Stack.Screen {...bottomTabNavigator} />
    </Stack.Navigator>
  );
};

export { StackNavigator };
