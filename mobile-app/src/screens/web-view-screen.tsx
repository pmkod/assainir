import React, { useState } from "react";
import { screenNames } from "../constants/screen-names";
import { NativeStackScreen } from "../style/types/screens";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../style/hooks/use-theme";
import { initalPageFieldName } from "../constants/web-view-constants";

const WebViewScreen = () => {
  const route = useRoute();

  const { initalPage } = route.params as {
    [initalPageFieldName]: string;
  };

  const [loaded, setLoaded] = useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <WebView
        style={{
          flex: 1,
        }}
        source={{ uri: initalPage }}
        onLoad={handleLoad}
      />

      {!loaded && (
        <View style={[StyleSheet.absoluteFillObject]}>
          <PageLoader />
        </View>
      )}
    </>
  );
};

export const PageLoader = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.white,
      }}
    >
      <ActivityIndicator size={40} color={theme.gray900} />
    </View>
  );
};

export const webViewScreen: NativeStackScreen = {
  name: screenNames.webView,
  component: WebViewScreen,
  options: {
    animation: "fade",
    headerShown: false,
  },
};
