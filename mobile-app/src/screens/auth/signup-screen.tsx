import { MyText } from "../../components/core/my-text";
import { SignupForm } from "../../components/forms/signup-form";
import { screenNames } from "../../constants/screen-names";
import { AuthFormLayout } from "../../layouts/auth-form-layout";
import { NativeStackScreen } from "../../style/types/screens";

const SignupScreen = () => {
  return (
    <AuthFormLayout>
      <SignupForm />
    </AuthFormLayout>
  );
};

export const signupScreen: NativeStackScreen = {
  name: screenNames.signup,
  component: SignupScreen,
  options: {
    animation: "slide_from_right",

    headerTitle: () => {
      return (
        <MyText fontSize={24} fontWeight="semiBold">
          S'inscrire
        </MyText>
      );
    },
  },
};
