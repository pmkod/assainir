import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { screenNames } from "../constants/screen-names";
import { MyText } from "../components/core/my-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View>
      <MyText>HomeScreen</MyText>
    </View>
  );
};

export const homeScreen = {
  name: screenNames.home,
  component: HomeScreen,
  options: {
    tabBarIcon: ({ color, size, focused }) => (
      <MaterialCommunityIcons
        name="home-minus-outline"
        color={color}
        size={27}
      />
    ),
    headerShown: false,
  } as BottomTabNavigationOptions,
};
