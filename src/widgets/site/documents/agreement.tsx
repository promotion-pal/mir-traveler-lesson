interface DocumentList {
  title: string;
  text: string[];
  explanation?: string;
  variant?: string;
}

export interface Document {
  title: string;
  list: DocumentList[];
}

export function AgreementDocument({ documet }: { documet: Document }) {
  return (
    <section className="bg-gray-light mainWrapper">
      <div className="container">
        <p className="mt-6 text-2xl font-semibold">{documet.title}</p>

        <div className="mt-4 md:flex md:gap-7">
          <div className="space-y-0 md:flex-[2]">
            {documet.list.map((el) => (
              <div key={el.title} className="rounded-xl bg-white px-5 py-6">
                <p className="mb-4 text-xl font-medium">{el.title}</p>

                <div className={"space-y-5"}>
                  {el.explanation && (
                    <p className="text-lg">{el.explanation}</p>
                  )}
                  {el.text.map((text, i) => (
                    <p key={i} className="text-lg">
                      {el.variant == "list" && <span className="mr-3" />} {text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-10 md:mt-0 md:flex-[1]">
            {/* <AdditionalInfoCart
              title="Стать партнёром"
              description={[
                "Мы предлагаем лучшие условия и поддержку для вашего бизнеса.",
              ]}
              link={APP_ROUTES.HOME.BECOME_PARTNER}
              className="bg-white"
            />

            <AdditionalInfoCart
              title="Служба поддержки"
              description={["Пн-Пт 9.00–19.00", "Сб-Вс выходной"]}
              link={APP_ROUTES.HOME.CONTACT}
              className="bg-white"
              action="Написать"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
