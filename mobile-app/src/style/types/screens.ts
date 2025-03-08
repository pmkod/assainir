import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export type RootStackParamList = any;

export interface NativeStackScreen {
  name: string;
  options: NativeStackNavigationOptions;
  component: any;
}

export interface BottomTabScreen {
  name: string;
  options: BottomTabNavigationOptions;
  component: any;
}
