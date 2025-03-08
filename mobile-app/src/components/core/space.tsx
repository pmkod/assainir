import { View } from "react-native";

export const Space = ({
	width = 0,
	height = 0,
}: {
	height?: number;
	width?: number;
}) => {
	return <View style={{ width, height }} />;
};
