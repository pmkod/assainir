import { MyText } from "../../components/core/my-text";
import { PasswordResetForm } from "../../components/forms/password-reset-form";
import { screenNames } from "../../constants/screen-names";
import { AuthFormLayout } from "../../layouts/auth-form-layout";
import { NativeStackScreen } from "../../style/types/screens";

const PasswordResetScreen = () => {
  return (
    <AuthFormLayout>
      <PasswordResetForm />
    </AuthFormLayout>
  );
};

export const passwordResetScreen: NativeStackScreen = {
  name: screenNames.passwordReset,
  component: PasswordResetScreen,
  options: {
    animation: "slide_from_right",

    headerTitle: () => {
      return (
        <MyText fontSize={24} fontWeight="semiBold">
          Mot de passe oublié
        </MyText>
      );
    },
  },
};
