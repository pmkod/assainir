import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { Space } from "../components/core/space";

export const AuthFormLayout = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Space height={20} />
      <View
        style={{
          paddingHorizontal: 24,
          maxWidth: 800,
          width: "100%",
          marginHorizontal: "auto",
        }}
      >
        {children}
      </View>
      <Space height={30} />
    </ScrollView>
  );
};
