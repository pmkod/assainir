import { useDidUpdate } from "@mantine/hooks";
import {
  type LegacyRef,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
} from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  useFormContext,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { MyText } from "./my-text";
import { useTheme } from "../../style/hooks/use-theme";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const { clearErrors, watch } = useFormContext();
  const fieldValue = watch(props.name);
  useDidUpdate(() => {
    clearErrors(props.name);
  }, [fieldValue]);

  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

//
//
//
//

interface FormItemProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const FormItem = forwardRef(
  ({ children, style }: FormItemProps, ref: LegacyRef<View>) => {
    return (
      <View ref={ref} style={[style]}>
        {children}
      </View>
    );
  }
);

//
//
//
//

interface FormLabelProps {
  children: string;
}

const FormLabel = forwardRef(
  ({ children }: FormLabelProps, ref: LegacyRef<View>) => {
    const { getFieldState } = useFormContext();
    const fieldContext = useContext(FormFieldContext);
    const { theme } = useTheme();

    return (
      <MyText
        ref={ref}
        style={{
          marginBottom: 4,
          color: getFieldState(fieldContext.name).error ? "red" : theme.gray900,
          fontSize: 16,
        }}
      >
        {children}
      </MyText>
    );
  }
);

//
//
//
//
//

interface FormDescriptionProps {
  children: ReactNode;
}

const FormDescription = forwardRef(
  ({ children }: FormDescriptionProps, ref: LegacyRef<View>) => {
    return (
      <MyText
        ref={ref}
        style={{
          fontSize: 18,
          color: "gray",
        }}
      >
        {children}
      </MyText>
    );
  }
);

//
//
//

interface FormMessageProps {
  children?: ReactNode;
}

const FormMessage = forwardRef(
  ({ children }: FormMessageProps, ref: LegacyRef<View>) => {
    const { getFieldState } = useFormContext();
    const fieldContext = useContext(FormFieldContext);
    const error = getFieldState(fieldContext.name).error;
    const body = error?.message ?? children;

    if (!body) {
      return null;
    }

    return (
      <MyText
        ref={ref}
        style={{
          color: "red",
          fontSize: 12,
          fontWeight: "400",
          marginTop: 2,
        }}
      >
        {body}
      </MyText>
    );
  }
);

//
//
//

export {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  // FormProvider,
  type SubmitHandler,
};
