import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { screenNames } from "../../constants/screen-names";
import { Alert } from "../core/alert";
import { FormField, FormItem, FormLabel, FormMessage } from "../core/form";
import { Input } from "../core/input";
import { Space } from "../core/space";
import { PasswordInput } from "../core/password-input";
import { Pressable, View } from "react-native";
import { MyText } from "../core/my-text";
import { Button } from "../core/button";
import { loginFormValidationSchema } from "../../validation/schemas/auth-validation-schemas";
import { loginRequest } from "../../services/auth-service";
import { useQueryClient } from "@tanstack/react-query";
import { navigatorNames } from "../../constants/navigator-names";

export const LoginForm = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof loginFormValidationSchema>>({
    resolver: zodResolver(loginFormValidationSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onSubmit",
  });

  const login: SubmitHandler<
    z.infer<typeof loginFormValidationSchema>
  > = async (values) => {
    const { success, message } = await loginRequest(values);

    if (success) {
      navigation.navigate(navigatorNames.bottomTab);
    } else {
      form.setError("root.serverCatch", {
        message,
      });
    }

    console.log(success);
    console.log(message);

    try {
      // await loginRequest(data);
      // navigation.navigate(emailVerificationScreenName, {
      //   purpose: emailVerificationPurposes.login,
      //   emailToVerify: data.email,
      // });
      // userVerificationPurposes.login
      // navigation.navigate(userVerificationScreenName, {
      // 	purpose: userVerificationPurposes.login,
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
  const goToPasswordResetPage = () => {
    navigation.navigate(screenNames.passwordReset);
  };
  return (
    <FormProvider {...form}>
      {form.formState.errors.root?.serverCatch.message && (
        <Alert
          variant="outline"
          status="destructive"
          description={form.formState.errors.root.serverCatch.message}
          style={{ marginBottom: 12 }}
        />
      )}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Input {...field} />
          </FormItem>
        )}
      />
      <Space height={20} />
      <FormField
        control={form.control}
        name="password"
        render={({ field, fieldState, formState }) => (
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <PasswordInput
              secureTextEntry={true}
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 12,
        }}
      >
        <Pressable
          onPress={goToPasswordResetPage}
          style={{ paddingTop: 8, paddingBottom: 14 }}
        >
          <MyText>Mot de passe oublié</MyText>
        </Pressable>
      </View>
      <Button
        onPress={form.handleSubmit(login)}
        text="Se connecter"
        size="lg"
        isLoading={form.formState.isSubmitting}
      />
    </FormProvider>
  );
};
