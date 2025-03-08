import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import { passwordResetValidationSchema } from "../../validation/schemas/auth-validation-schemas";
import { Alert } from "../core/alert";
import { FormField, FormItem, FormLabel, FormMessage } from "../core/form";
import { Space } from "../core/space";
import { Button } from "../core/button";
import { Input } from "../core/input";

export const PasswordResetForm = () => {
  const navigation = useNavigation();
  const form = useForm<z.infer<typeof passwordResetValidationSchema>>({
    resolver: zodResolver(passwordResetValidationSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",

    defaultValues: {
      email: "",
    },
  });

  const passwordReset: SubmitHandler<
    z.infer<typeof passwordResetValidationSchema>
  > = async (data) => {
    try {
      // await passwordResetRequest(data);
      // navigation.navigate(userVerificationScreenName, {
      // 	purpose: userVerificationPurposes.passwordReset,
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
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>

            <Input {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <Space height={24} />
      <Button
        text="Continuer"
        onPress={form.handleSubmit(passwordReset)}
        isLoading={form.formState.isSubmitting}
      />
    </FormProvider>
  );
};
