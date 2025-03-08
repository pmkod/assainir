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
import { GestureResponderEvent, Pressable, View } from "react-native";
import { MyText } from "../core/my-text";
import { useTheme } from "../../style/hooks/use-theme";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { font } from "../../style/font";

interface OptionProps {
  selected: boolean;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Option = ({ selected, label, onPress }: OptionProps) => {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      {({ pressed }) => (
        <View
          style={{
            width: "100%",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1.5,
            backgroundColor: selected
              ? theme.blue100
              : pressed
              ? theme.gray200
              : theme.transparent,
            borderColor: selected ? theme.blue : theme.gray300,
            borderRadius: 5,
          }}
        >
          <MyText fontWeight="semiBold" color={selected ? "blue" : "gray700"}>
            {label}
          </MyText>
        </View>
      )}
    </Pressable>
  );
};

const userTypes = {
  company: {
    id: 1,
    name: "Entreprise",
  },
  household: {
    id: 2,
    name: "Ménage",
  },
};

export const SignupForm = () => {
  // const [termsAndPrivacyPolicyAccepted, setTermsAndPrivacyPolicyAccepted] =
  // 	useState(false);
  const form = useForm<z.infer<typeof signupFormValidationSchema>>({
    resolver: zodResolver(signupFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
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

  const [selectedUserTypeId, setselectedUserTypeId] = useState<
    number | undefined
  >(undefined);

  const selectUserType = (userTypeId: number) => {
    setselectedUserTypeId(userTypeId);
  };

  const checkIfUserTypeSelected = (userTypeId: number) => {
    return userTypeId === selectedUserTypeId;
  };

  const checkIfCompanySelected = () =>
    selectedUserTypeId === userTypes.company.id;
  const checkIfHouseholdSelected = () =>
    selectedUserTypeId === userTypes.household.id;
  const checkIfCompanyOrHouseholdSelected = () =>
    selectedUserTypeId === userTypes.company.id ||
    selectedUserTypeId === userTypes.household.id;

  const { theme } = useTheme();
  return (
    <FormProvider {...form}>
      <View style={{ backgroundColor: "" }}>
        <MyText
          style={{
            marginBottom: 4,
            fontSize: 16,
          }}
        >
          Vous êtes
        </MyText>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Option
            label={userTypes.company.name}
            selected={checkIfUserTypeSelected(userTypes.company.id)}
            onPress={() => selectUserType(userTypes.company.id)}
          />
          <Option
            label={userTypes.household.name}
            selected={checkIfUserTypeSelected(userTypes.household.id)}
            onPress={() => selectUserType(userTypes.household.id)}
          />
        </View>
      </View>
      <Space height={20} />

      {form.formState.errors.root && (
        <Alert
          variant="outline"
          status="destructive"
          description={form.formState.errors.root.serverCatch.message}
          style={{ marginBottom: 12 }}
        />
      )}
      {checkIfHouseholdSelected() && (
        <>
          <FormField
            control={form.control}
            name="firstNameAndLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom & Prenom</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Space height={20} />
        </>
      )}
      {checkIfCompanySelected() && (
        <>
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'entreprise</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Space height={20} />
        </>
      )}
      {checkIfCompanyOrHouseholdSelected() && (
        <>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Space height={20} />
        </>
      )}
      {checkIfHouseholdSelected() && (
        <>
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone</FormLabel>
                <Picker
                  selectedValue={form.watch("area")}
                  onValueChange={(itemValue, itemIndex) =>
                    field.onChange(itemValue)
                  }
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 16,
                    borderRadius: 2,
                    fontFamily: font.regular,
                    color: theme.gray700,
                    borderColor: theme.gray600,
                    paddingVertical: 10,
                    fontSize: 15,
                  }}
                  
                >
                  <Picker.Item label="Sélectionner" />
                  <Picker.Item label="BEL-AIR" value="bel-air" />
                  <Picker.Item label="ANDOKOI" value="andokoi" />
                  <Picker.Item label="BANCO 2" value="banco-2" />
                  <Picker.Item
                    label="GESCO-MAMIE ADJOUA"
                    value="gesco-mamie-adjoua"
                  />
                  <Picker.Item
                    label="ADIOPO-ATTIESS0"
                    value="adiopo-attiesso"
                  />
                </Picker>
                <FormMessage />
              </FormItem>
            )}
          />
          <Space height={20} />
        </>
      )}
      {checkIfCompanySelected() && (
        <>
          <FormField
            control={form.control}
            name="managerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du responsable</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Space height={20} />
        </>
      )}
      {checkIfCompanyOrHouseholdSelected() && (
        <>
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

          <FormField
            control={form.control}
            name="confirmPassword"
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
        </>
      )}
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
      {checkIfCompanyOrHouseholdSelected() && (
        <>
          <Space height={30} />

          <Button
            text="S'inscrire"
            onPress={form.handleSubmit(signup)}
            isLoading={form.formState.isSubmitting}
          />
        </>
      )}
    </FormProvider>
  );
};
