import { UserVerificationForm } from "@/components/forms/user-verification-form";
import { userVerificationScreenName } from "@/constants/screens-names-constants";
import { useRNI18n } from "@repo/locales";
import type { NativeStackScreen } from "@/types/screens";
import { MyText } from "@repo/react-native-ui";

const UserVerificationScreen = () => {
	return <UserVerificationForm />;
};

export const userVerificationScreen: NativeStackScreen = {
	name: userVerificationScreenName,
	component: UserVerificationScreen,
	options: {
		animation: "slide_from_right",

		headerTitle: () => {
			const { t } = useRNI18n();
			return (
				<MyText fontSize={24} fontWeight="semiBold">
					{t("userVerification")}
				</MyText>
			);
		},
	},
};
