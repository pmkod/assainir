import "@expo/metro-runtime";
import { useFonts } from "expo-font";
import {
  NunitoSans_200ExtraLight,
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StackNavigator } from "./navigators/stack-navigator";
import { RootStackParamList } from "./style/types/screens";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "./style/hooks/use-theme";
import { View } from "react-native";
import { MyText } from "./components/core/my-text";
import { themes } from "./style/themes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    NunitoSans_200ExtraLight,
    NunitoSans_300Light,
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  // const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: themes.light.white },
        }}
      >
        <StackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
