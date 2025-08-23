import { app } from "@/shared/config/app";
import { ROUTE } from "@/shared/config/path";
import Link from "next/link";

export function LkFooter() {
  const listLink = [
    {
      label: "Договор оферты",
      link: ROUTE.DOCUMENTS.OFFER_AGREE,
    },
    {
      label: "Обработка данных",
      link: ROUTE.DOCUMENTS.PERSON_DATA,
    },
    {
      label: "Политика конфиденциальности",
      link: ROUTE.DOCUMENTS.USER_AGREE,
    },
  ];

  const mapFooter = [
    {
      title: "Карта сайта",
      label: "Контакты",
      link: ROUTE.SITE.CONTACT,
    },
  ];

  return (
    <footer className="mt-auto pb-5 pt-10 md:mt-28">
      <div className="container flex flex-col space-y-6">
        <div className="flex flex-col-reverse items-start justify-between md:flex-row md:items-start">
          {mapFooter.map((el) => (
            <div key={el.label} className="mt-6">
              <p className="font-medium">{el.title}</p>
              <Link
                className="mt-3 inline-block hover:text-primary"
                href={el.link}
              >
                {el.label}
              </Link>
            </div>
          ))}

          <Link
            href={`mailto:${app.contact.email}`}
            className="text-lg font-medium hover:text-primary"
          >
            {app.contact.email}
          </Link>
        </div>

        <div className="flex flex-col items-start justify-between space-y-7 md:flex-row md:items-center">
          <div className="flex flex-col gap-4 md:flex-row">
            {listLink.map((el) => (
              <Link key={el.label} href={el.link} className="underline">
                {el.label}
              </Link>
            ))}
          </div>

          <p>
            © {app.years} {app.legalInformation.companyName}. Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
}
