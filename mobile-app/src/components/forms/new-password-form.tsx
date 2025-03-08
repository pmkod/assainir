import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { newPasswordFormValidationSchema } from "../../validation/schemas/auth-validation-schemas";
import { Alert } from "../core/alert";
import { FormField, FormItem, FormLabel, FormMessage } from "../core/form";
import { Space } from "../core/space";
import { Button } from "../core/button";
import { useQueryClient } from "@tanstack/react-query";
import { PasswordInput } from "../core/password-input";

export const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof newPasswordFormValidationSchema>>({
    resolver: zodResolver(newPasswordFormValidationSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {},
  });
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const onSubmit = async ({
    newPassword,
    newPasswordConfirmation,
  }: z.infer<typeof newPasswordFormValidationSchema>) => {
    if (!newPasswordConfirmation) {
      form.setError("newPasswordConfirmation", {
        message: "Confirmer le mot de passe",
      });
      return;
    }
    if (newPassword !== newPasswordConfirmation) {
      form.setError("newPasswordConfirmation", {
        message: "Le mot de passe ne correspond pas",
      });
      return;
    }
    try {
      // await newPasswordRequest(newPassword);
      // queryClient.refetchQueries({ queryKey: [loggedInUserQueryKey] });
      // navigation.navigate(bottomTabNavigatorName);
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
        name="newPassword"
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
      <Space height={20} />
      <FormField
        control={form.control}
        name="newPasswordConfirmation"
        render={({ field, fieldState, formState }) => (
          <FormItem>
            <FormLabel>Confirmer le mot de passe</FormLabel>
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
      <Space height={30} />
      <Button
        text="Continuer"
        onPress={form.handleSubmit(onSubmit)}
        isLoading={form.formState.isSubmitting}
      />
    </FormProvider>
  );
};
