import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { signupFormValidationSchema } from "../../validation/schemas/auth-validation-schemas";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "../core/alert";
import { FormField, FormItem, FormLabel, FormMessage } from "../core/form";
import { Space } from "../core/space";
import { Input } from "../core/input";
import { PasswordInput } from "../core/password-input";
import { Button } from "../core/button";

export const SignupForm = () => {
  // const [termsAndPrivacyPolicyAccepted, setTermsAndPrivacyPolicyAccepted] =
  // 	useState(false);
  const form = useForm<z.infer<typeof signupFormValidationSchema>>({
    resolver: zodResolver(signupFormValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const navigation = useNavigation();
  const signup = async (values: z.infer<typeof signupFormValidationSchema>) => {
    form.clearErrors();
    // if (!termsAndPrivacyPolicyAccepted) {
    // 	form.setError("root.serverCatch", {
    // 		message: t("youMustAcceptTermsAndPolicy"),
    // 	});
    // 	return;
    // }

    try {
      // await signupRequest(values);
      // navigation.navigate(userVerificationScreenName, {
      // 	purpose: userVerificationPurposes.signup,
      // });
    } catch (err: any) {
      // if (err?.errors) {
      // 	const error = err.errors[0];
      // 	if (error.field) {
      // 		form.setError(error.field, {
      // 			message: t(
      // 				error.code as keyof (typeof languagesLoadForReactNative)["en"],
      // 			),
      // 		});
      // 	} else {
      // 		form.setError("root.serverCatch", {
      // 			message: t(
      // 				error.code as keyof (typeof languagesLoadForReactNative)["en"],
      // 			),
      // 		});
      // 	}
      // 	return;
      // }
      // form.setError("root.serverCatch", {
      // 	message: t(exceptionCodes.somethingWentWrong),
      // });
    }
  };

  // useEffect(() => {
  // 	if (termsAndPrivacyPolicyAccepted) {
  // 		form.clearErrors();
  // 	}
  // }, [termsAndPrivacyPolicyAccepted]);

  // const goToTermsScreen = () => {
  // 	navigation.navigate(termsScreenName);
  // };

  // const goToPrivacyPolicyScreen = () => {
  // 	navigation.navigate(privacyPolicyScreenName);
  // };
  return (
    <FormProvider {...form}>
      {form.formState.errors.root && (
        <Alert
          variant="outline"
          status="destructive"
          description={form.formState.errors.root.serverCatch.message}
          style={{ marginBottom: 12 }}
        />
      )}
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <Input {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <Space height={20} />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prenom</FormLabel>
            <Input {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <Space height={20} />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse mail</FormLabel>
            <Input {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <Space height={20} />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <PasswordInput {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <Space height={20} />

      {/* <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 14 }}>
				<Checkbox
					value={termsAndPrivacyPolicyAccepted}
					onValueChange={setTermsAndPrivacyPolicyAccepted}
				/>
				<View style={{ flex: 1 }}>
					<MyText fontSize={15} color="gray600" style={{ lineHeight: 18 }}>
						{t("iReadAndIAccept")}{" "}
						<MyText color="blue" onPress={goToTermsScreen}>
							{t("termsOfUse")}
						</MyText>{" "}
						{t("andThe")}{" "}
						<MyText color="blue" onPress={goToPrivacyPolicyScreen}>
							{t("privatePolicy")}
						</MyText>
					</MyText>
				</View>
			</View> */}
      <Space height={18} />

      <Button
        text="S'inscrire"
        onPress={form.handleSubmit(signup)}
        isLoading={form.formState.isSubmitting}
      />
    </FormProvider>
  );
};
