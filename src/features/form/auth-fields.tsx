import { FieldValues } from "react-hook-form";
import { CommonTextField, TextFieldProps } from "./fields";

export const AuthTextField = <T extends FieldValues>(
  props: Omit<TextFieldProps<T>, "inputVariant" | "variant" | "checkWorld">
) => (
  <CommonTextField
    inputVariant="tariff"
    variant="tariff"
    checkWorld={false}
    {...props}
  />
);
