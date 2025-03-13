import { useEffect } from "react";
import { ActivityIndicator, Dimensions, Image, View } from "react-native";
import { useTheme } from "../style/hooks/use-theme";
import { screenNames } from "../constants/screen-names";
import { MyText } from "../components/core/my-text";
import { Space } from "../components/core/space";
import { Button } from "../components/core/button";
import { NativeStackScreen } from "../style/types/screens";
import { useNavigation } from "@react-navigation/native";
import { initalPageFieldName } from "../constants/web-view-constants";

const FirstScreen = () => {
  const { theme } = useTheme();

  const navigation = useNavigation();

  const screenHeight = Dimensions.get("screen").height;

  const websiteBaseUrl = "https://assainirplus.appli.edu.ci";

  const goToLoginScreen = () => {
    navigation.reset({
      index: 0, // L'index de la nouvelle route dans la pile
      routes: [
        {
          name: screenNames.webView,
          params: {
            [initalPageFieldName]: websiteBaseUrl + "/login.php",
          },
        },
      ], // La nouvelle route
    });
  };

  const goToSignupScreen = () => {
    navigation.reset({
      index: 0, // L'index de la nouvelle route dans la pile
      routes: [
        {
          name: screenNames.webView,
          params: {
            [initalPageFieldName]: websiteBaseUrl + "/web_register.php",
          },
        },
      ], // La nouvelle route
    });
  };

  // useEffect(() => {
  // 	if (isSuccess) {
  // 		navigateAndCleanHistory(bottomTabNavigatorName);
  // 	}
  // }, [isSuccess, navigateAndCleanHistory]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.white,
        paddingTop: screenHeight * 0.15,
      }}
    >
      <View
        style={{
          flex: 1,
          width: 300,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/assainir-logo.png")}
          style={{
            width: 150,
            height: 100,
            marginBottom: 20,
          }}
        />

        <Space height={40} />

        <View style={{ width: "100%" }}>
          {/* {isLoading ? (
						<ActivityIndicator size="large" color={theme.gray900} />
					) : isError || isPending ? (
						<>
							<Button
								variant="outline"
								text={t("login")}
								size="xl"
								onPress={goToLoginScreen}
							/>

							<Space height={12} />
							<Button text={t("signup")} size="xl" onPress={goToSignupScreen} />
						</>
					) : null} */}

          <Button
            variant="outline"
            text="Se connecter"
            size="xl"
            onPress={goToLoginScreen}
          />

          <Space height={12} />
          <Button text="S'inscrire" size="xl" onPress={goToSignupScreen} />
        </View>
      </View>
    </View>
  );
};

export const firstScreen: NativeStackScreen = {
  name: screenNames.first,
  component: FirstScreen,
  options: {
    animation: "fade",
    headerShown: false,
  },
};
