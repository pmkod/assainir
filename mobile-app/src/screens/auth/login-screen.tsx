import { MyText } from "../../components/core/my-text";
import { LoginForm } from "../../components/forms/login-form";
import { screenNames } from "../../constants/screen-names";
import { AuthFormLayout } from "../../layouts/auth-form-layout";
import { NativeStackScreen } from "../../style/types/screens";

const LoginScreen = () => {
  return (
    <AuthFormLayout>
      <LoginForm />
    </AuthFormLayout>
  );
};

export const loginScreen: NativeStackScreen = {
  name: screenNames.login,
  component: LoginScreen,
  options: {
    animation: "slide_from_right",
    headerTitle: () => {
      return (
        <MyText fontSize={24} fontWeight="semiBold">
          Connexion
        </MyText>
      );
    },
  },
};
