"use client";

import { AdditionalInfoCartUi } from "@/entities/site/additionalInfoCart";
import { api } from "@/features/api/fetch";
import { userService } from "@/features/api/site/user";
import { CommonFrom, CommonTextField } from "@/features/form";
import {
  ContactsTextAreaField,
  ContactsTextField,
} from "@/features/form/contacts-fields";
import { app } from "@/shared/config/app";
import ImgBgLandscape from "@/shared/icon/contacts/landscape.png";
import ImgSmile from "@/shared/icon/contacts/smile.png";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import z from "zod";

export default function ContactPage() {
  const contactsSchema = z.object({
    email: z.string(),
    text: z.string(),
  });

  return (
    <div className="mainWrapper">
      <div className="container">
        <p className="text-4xl font-semibold mb-10">Контакты</p>

        <div className="space-y-5">
          <section className="grid gap-5 md:grid-cols-[50%_50%]">
            <div className="grid min-h-[200px] items-center rounded-lg bg-blue-100 md:grid-cols-[40%_60%]">
              <div className="space-y-4 px-7">
                <p className="text-3xl font-medium">{app.contact.email}</p>
                <p className="text-3xl font-normal">{app.contact.phone}</p>
              </div>

              <div className="relative hidden h-full w-full self-end">
                <div className="absolute bottom-0 right-0 h-[80%] w-full">
                  <Image
                    src={ImgBgLandscape}
                    alt="Фоновое изображение"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <AdditionalInfoCartUi type="partner" />
              <AdditionalInfoCartUi type="support" />
            </div>
          </section>

          <section className="space-y-10 sm:flex sm:bg-gray-100">
            <div className="relative h-[500px] w-[350px] overflow-hidden rounded-xl">
              <Image fill src={ImgSmile} alt="smile" className="object-cover" />

              <p className="absolute bottom-3 left-[50%] w-10/12 -translate-x-1/2 text-3xl font-semibold text-white">
                Планируйте впечатления вместе с {app.siteName}
              </p>
            </div>

            <div className="mx-auto rounded-lg bg-gray-100 px-3 py-20 md:max-w-[50%]">
              <p className="text-2xl font-medium">Есть вопросы?</p>

              <p className="text-xl">
                Напишите нам и мы свяжемся с вами в ближайшее время!
              </p>

              <CommonFrom
                schema={contactsSchema}
                defaultValues={{ email: "", text: "" }}
                onSubmit={async (data) => {
                  await userService.contactingSupport(data);
                }}
              >
                {(form) => (
                  <div className="space-y-5 mt-5">
                    <ContactsTextField
                      form={form}
                      name="email"
                      placeholder="Email"
                    />
                    <ContactsTextAreaField
                      form={form}
                      name="text"
                      placeholder="Опишите вопрос"
                    />

                    <div className="grid md:grid-cols-[1fr_150px] gap-4 justify-between">
                      <p className="text-sm">
                        Отправляя форму, вы соглашаетесь c обработкой
                        персональных данных и условиями пользовательских
                        соглашений
                      </p>
                      <Button size="lg">Отправит</Button>
                    </div>
                  </div>
                )}
              </CommonFrom>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
