"use client";

import { CommonFrom, CommonFromProps } from "@/features/form";
import { CommonTextField } from "@/features/form/fields";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Check, Paintbrush2Icon, XIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { z, ZodType } from "zod";

interface WrapperDialogProps<T extends ZodType> extends CommonFromProps<T> {
  title: string;
  description?: string;
  trigger?: ReactNode;
}

export function WrapperDialogEdits<T extends ZodType>({
  title,
  description,
  schema,
  defaultValues,
  data,
  onSubmit,
  children,
  trigger,
}: WrapperDialogProps<T>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Paintbrush2Icon />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[70%]">
        <CommonFrom
          schema={schema}
          defaultValues={defaultValues}
          data={data}
          onSubmit={onSubmit}
        >
          {(form) => (
            <>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>

                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </DialogHeader>

              <div className="py-7">{children(form)}</div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Отменить</Button>
                </DialogClose>
                <Button type="submit">Сохранить</Button>
              </DialogFooter>
            </>
          )}
        </CommonFrom>
      </DialogContent>
    </Dialog>
  );
}

interface WrapperDialogManagerAgreementProps {
  onConfirm: () => Promise<void>;
  onReject: (comment: string) => Promise<void>;
  disable: { confirm: boolean; reject: boolean };
}

export const WrapperDialogManagerAgreement = ({
  onConfirm,
  onReject,
  disable,
}: WrapperDialogManagerAgreementProps) => {
  const { moderation, isLoad } = useDialogManagerAgreement();

  const schema = z.object({
    comment: z.string().min(1, "Комментарий обязателен"),
  });

  return (
    <section className="flex gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="destructive">
            <XIcon />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[70%]">
          <CommonFrom
            schema={schema}
            defaultValues={{ comment: "" }}
            onSubmit={async (data) => {
              moderation(() => onReject(data.comment));
            }}
          >
            {(form) => (
              <>
                <DialogHeader>
                  <DialogTitle>Отклонить заявку</DialogTitle>
                </DialogHeader>

                <div className="py-5">
                  <CommonTextField
                    form={form}
                    name="comment"
                    label="Причина отклонения заявки"
                    inputVariant="tariff"
                    variant="tariff"
                  />
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Отменить</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isLoad || disable.reject}>
                    {isLoad ? "Загрузка..." : "Сохранить"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </CommonFrom>
        </DialogContent>
      </Dialog>

      <Button
        size="icon"
        onClick={() => moderation(onConfirm)}
        disabled={isLoad || disable.confirm}
      >
        <Check />
      </Button>
    </section>
  );
};

export const useDialogManagerAgreement = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const moderation = async (callback: () => Promise<void>) => {
    setIsLoad(true);
    try {
      await callback();
      window.location.reload();
    } catch (error) {
      console.error("Ошибка модерации:", error);
      throw error;
    } finally {
      setIsLoad(false);
    }
  };

  return {
    isLoad,
    moderation,
  };
};
