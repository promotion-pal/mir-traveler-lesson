import { cn } from "@/shared/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { businessAdService } from "../api/lk/business-ad";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Loader2, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/shared/ui/textarea";

export interface Fields<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  isDisable?: boolean;
  className?: string;
  checkWorld?: boolean;
  checkAddressDuplicate?: boolean;
  allowedPattern?: RegExp;
  mask?: (value: string) => string;
  maxLength?: number;
}

const textFieldVariants = cva("text-black", {
  variants: {
    variant: {
      default: "text-gray-500",
      tariff: "",
      ad: "focus:border-blue-500 space-y-0 rounded-lg border-2 border-gray-200 px-2 py-1",
    },
    inputVariant: {
      default: "text-black",
      tariff: "bg-gray-100 focus:ring-2 focus:ring-primary",
      ad: "m-0 p-0 pr-6 text-black",
      big: "p-5 bg-white ",
    },
  },
  defaultVariants: {
    variant: "default",
    inputVariant: "default",
  },
});

interface TextFieldProps<T extends FieldValues>
  extends Fields<T>,
    VariantProps<typeof textFieldVariants> {}

const CommonTextField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  isDisable = false,
  className,
  variant,
  inputVariant,
  checkWorld = true,
  checkAddressDuplicate = false,
  mask,
  allowedPattern,
  maxLength,
}: TextFieldProps<T>) => {
  const { checkBadWorld, checkAddressDuplicates, isLoad } =
    useCommonTextField<T>();

  const onBlur = (value: string) => {
    checkWorld && checkBadWorld(form, name, value);
    checkAddressDuplicate && checkAddressDuplicates(form, name, value);
  };

  const handleChange = (value: string) => {
    let processedValue = value;

    if (mask) {
      processedValue = mask(processedValue);
    }

    if (allowedPattern) {
      if (!allowedPattern.test(processedValue)) {
        return;
      }
    }

    if (maxLength) {
      processedValue = processedValue.slice(0, maxLength);
    }

    form.setValue(name, processedValue as any);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("relative", textFieldVariants({ variant }), className)}
        >
          {label && (
            <FormLabel className={cn("text-gray-500")}>{label}</FormLabel>
          )}
          <FormControl>
            <div>
              <Input
                disabled={isDisable}
                className={cn(textFieldVariants({ inputVariant }))}
                placeholder={placeholder}
                {...field}
                onBlur={(e) => onBlur(e.target.value)}
                onChange={(e) => handleChange(e.target.value)}
              />

              {isLoad && (
                <Loader2Icon className="absolute right-2 top-2 animate-spin text-gray-300" />
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const useCommonTextField = <T extends FieldValues>() => {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const checkBadWorld = async (
    form: UseFormReturn<T>,
    name: FieldPath<T>,
    text: string
  ) => {
    setIsLoad(true);
    clearError(form, name);

    try {
      await businessAdService.checkText(text);
    } catch (error) {
      console.log(error);
      setCustomError(form, name, "Недопустимые слова");
    } finally {
      setIsLoad(false);
    }
  };

  const checkAddressDuplicates = async (
    form: UseFormReturn<T>,
    name: FieldPath<T>,
    address: string
  ) => {
    try {
      await businessAdService.checkAddressDuplicates("transport", address);
    } catch (error) {
      console.log(error);
      setCustomError(form, name, "Адресс уже использован");
    } finally {
      setIsLoad(false);
    }
  };

  //   const address = async (text: string) => {
  //     setIsLoad(true);

  //     try {
  //       await api.postWithToken(`/site/address/address_hints/`, {
  //         prompt: text,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoad(false);
  //     }
  //   };

  const setCustomError = (
    form: UseFormReturn<T>,
    name: FieldPath<T>,
    message: string
  ) => {
    form.setError(name, {
      type: "manual",
      message: message,
    });
  };

  const clearError = (form: UseFormReturn<T>, name: FieldPath<T>) => {
    form.clearErrors(name);
  };

  return {
    checkBadWorld,
    checkAddressDuplicates,
    isLoad,
  };
};

const CommonTextAreaField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  isDisable = false,
  className,
  variant,
  inputVariant,
  checkWorld = true,
  checkAddressDuplicate = false,
}: TextFieldProps<T>) => {
  const { checkBadWorld, checkAddressDuplicates, isLoad } =
    useCommonTextField<T>();

  const onBlur = (value: string) => {
    checkWorld && checkBadWorld(form, name, value);
    checkAddressDuplicate && checkAddressDuplicates(form, name, value);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("relative", textFieldVariants({ variant }), className)}
        >
          {label && (
            <FormLabel className={cn("text-gray-500")}>{label}</FormLabel>
          )}
          <FormControl>
            <div>
              <Textarea
                disabled={isDisable}
                className={cn(textFieldVariants({ inputVariant }))}
                placeholder={placeholder}
                {...field}
                onBlur={(e) => onBlur(e.target.value)}
              />

              {isLoad && (
                <Loader2 className="absolute right-2 top-2 animate-spin text-gray-300" />
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { type TextFieldProps, CommonTextAreaField, CommonTextField };
