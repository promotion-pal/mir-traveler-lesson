import { FieldValues } from "react-hook-form";
import { CommonTextAreaField, CommonTextField, TextFieldProps } from "./fields";

export const ContactsTextField = <T extends FieldValues>(
  props: Omit<TextFieldProps<T>, "inputVariant" | "variant" | "checkWorld">
) => <CommonTextField inputVariant="big" checkWorld={false} {...props} />;

export const ContactsTextAreaField = <T extends FieldValues>(
  props: Omit<TextFieldProps<T>, "inputVariant" | "variant" | "checkWorld">
) => <CommonTextAreaField inputVariant="big" checkWorld={false} {...props} />;
