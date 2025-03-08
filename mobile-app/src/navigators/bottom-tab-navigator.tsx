// import { bottomTabNavigatorName } from "@/constants/navigators-names-constants";
// import { homeScreen } from "@/screens/home-screen";
// import { profileScreen } from "@/screens/profile-screen";
// import { transactionsScreen } from "@/screens/transactions/transactions-screen";
// import type { NativeStackScreen } from "@/types/screens";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {
// 	CommonActions,
// 	useNavigation,
// 	useRoute,
// } from "@react-navigation/native";
// import { font, useTheme } from "@repo/react-native-ui";
// import { useEffect } from "react";

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
// 	const navigation = useNavigation();
// 	const { theme } = useTheme();

// 	const { params } = useRoute() as {
// 		params: {
// 			switchToScreen?: string;
// 		};
// 	};
// 	useEffect(() => {
// 		if (params !== undefined && params.switchToScreen !== undefined) {
// 			navigation.dispatch(
// 				CommonActions.reset({
// 					index: 0,
// 					routes: [{ name: params.switchToScreen }],
// 				}),
// 			);
// 		}
// 	}, [params]);

// 	// useEffect(() => {
// 	//   if (isError) {
// 	//     navigateAndCleanHistory(firstScreenName);
// 	//   }
// 	// }, [isError]);
// 	// ! Implement it with task manager

// 	return (
// 		<>
// 			<Tab.Navigator
// 				screenOptions={{
// 					tabBarStyle: {
// 						height: 72,
// 						backgroundColor: theme.white,
// 						borderTopColor: theme.gray200,
// 						paddingTop: 11,
// 						paddingBottom: 10,
// 					},

// 					tabBarHideOnKeyboard: true,
// 					tabBarVisibilityAnimationConfig: {
// 						show: { animation: "timing", config: { delay: 0, duration: 0 } },
// 						hide: { animation: "timing", config: { delay: 0, duration: 0 } },
// 					},
// 					tabBarLabelStyle: {
// 						fontSize: 14,
// 						fontFamily: font.regular,
// 					},
// 					headerTitleStyle: {
// 						fontFamily: font.bold,
// 					},
// 					headerStyle: {
// 						backgroundColor: theme.white,
// 					},
// 					headerTintColor: theme.gray900,
// 					headerShadowVisible: false,
// 					tabBarInactiveTintColor: theme.gray500,
// 					tabBarActiveTintColor: theme.blue,
// 					tabBarBadgeStyle: {
// 						fontSize: 12,
// 						marginTop: 7,
// 						// marginRight: 2,
// 						transform: [{ translateX: -1 }],
// 						fontFamily: font.bold,
// 						backgroundColor: theme.blue,
// 						// marginRight: 5,
// 					},
// 				}}
// 				detachInactiveScreens
// 			>
// 				<Tab.Screen {...homeScreen} />
// 				<Tab.Screen {...transactionsScreen} />
// 				<Tab.Screen {...profileScreen} />
// 			</Tab.Navigator>
// 		</>
// 	);
// };

// export const bottomTabNavigator: NativeStackScreen = {
// 	name: bottomTabNavigatorName,
// 	component: BottomTabNavigator,
// 	options: {
// 		animation: "none",
// 		headerShown: false,
// 	},
// };
