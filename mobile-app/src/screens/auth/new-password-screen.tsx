import { MyText } from "../../components/core/my-text";
import { NewPasswordForm } from "../../components/forms/new-password-form";
import { screenNames } from "../../constants/screen-names";
import { AuthFormLayout } from "../../layouts/auth-form-layout";
import { NativeStackScreen } from "../../style/types/screens";

const NewPasswordScreen = () => {
  return (
    <AuthFormLayout>
      <NewPasswordForm />
    </AuthFormLayout>
  );
};

export const newPasswordScreen: NativeStackScreen = {
  name: screenNames.newPassword,
  component: NewPasswordScreen,
  options: {
    animation: "slide_from_right",

    headerTitle: () => {
      return (
        <MyText fontSize={24} fontWeight="semiBold">
          Nouveau mot de passe
        </MyText>
      );
    },
  },
};
