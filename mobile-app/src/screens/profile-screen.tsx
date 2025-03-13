import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { screenNames } from "../constants/screen-names";
import { MyText } from "../components/core/my-text";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View>
      <MyText>ProfileScreen</MyText>
    </View>
  );
};

export const profileScreen = {
  name: screenNames.profile,
  component: ProfileScreen,
  options: {
    tabBarIcon: ({ color, size, focused }) => (
      <Feather name="user" color={color} size={25} />
    ),
    headerShown: false,
  } as BottomTabNavigationOptions,
};
