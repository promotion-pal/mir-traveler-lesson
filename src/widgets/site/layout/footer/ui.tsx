import { ROUTE } from "@/shared/config/path";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface SiteMapItem {
  page: string;
  url: string;
}

const DEFAULT_INFO = {
  map: [
    { page: "Главная", url: ROUTE.SITE.MAIN },
    { page: "Аренда жилья", url: ROUTE.SITE.MAIN },
    { page: "Аренда транспорта", url: ROUTE.SITE.MAIN },
    { page: "Туры и экскурсии", url: ROUTE.SITE.MAIN },
    { page: "Отдых и развлечения", url: ROUTE.SITE.MAIN },
  ],
  domain: "string",
  email: "string",
  companyName: "string",
  address: "string",
  inn: "string",
  kpp: "string",
  ogrn: "string",
  phone: "",
};

export function Footer() {
  return (
    <footer className="mt-auto rounded-tl-2xl rounded-tr-2xl bg-gray-100 px-5 pb-8 pt-6 md:bg-gray-light md:pt-14">
      <DesktopFooter {...DEFAULT_INFO} />
      <MobileFooter {...DEFAULT_INFO} />
      <div className="mt-12 h-[1px] w-full rounded-full bg-gray-400" />
      <FooterBottom {...DEFAULT_INFO} />
    </footer>
  );
}

interface FooterDesktopProps {
  map: SiteMapItem[];
  phone: string;
  domain: string;
}

function DesktopFooter(props: FooterDesktopProps) {
  return (
    <div className={cn("justify-between container md:flex hidden")}>
      <Brand {...props} />
      <SiteMap {...props} />

      <div className="flex flex-col justify-between pb-5">
        <PersonalAccount />
      </div>

      <div className="w-96">
        <FormEmail />
      </div>

      <div className="flex flex-col">
        <Phone phone={props.phone} />
        <SocialNetworkDesktop className="mt-9" />
      </div>
    </div>
  );
}

export function MobileFooter(props: FooterDesktopProps) {
  return (
    <div className={cn("flex-col md:hidden")}>
      <div className="flex items-center justify-between">
        <Brand {...props} />
        <Phone {...props} />
      </div>

      <div className="flex items-start justify-between">
        <div>
          <SiteMap {...props} />
          {/* <Partner /> */}
          <PersonalAccount />
        </div>
      </div>

      <FormEmail />
    </div>
  );
}

interface FooterBottomProps {
  domain: string;
  email: string;
  companyName: string;
  address: string;
  inn: string;
  kpp: string;
  ogrn: string;
}
const FooterBottom = (props: FooterBottomProps) => (
  <div className="flex flex-col md:container">
    <div className={cn("mt-10 flex items-end justify-between md:items-start")}>
      <div className={"flex w-[70%] flex-wrap justify-between gap-x-5 gap-y-2"}>
        <p>
          При использовании материалов ссылка
          <br />
          на{" "}
          <a href={props.domain} className="hover:underline">
            {props.domain}
          </a>{" "}
          обязательна
        </p>
        <a href={ROUTE.SITE.MAIN} className="hover:underline">
          Политика конфиденциальности
        </a>
        <a href={ROUTE.SITE.MAIN} className="hover:underline">
          Пользовательское соглашение
        </a>
      </div>

      <p>&copy; 2025 г.</p>
    </div>

    <p className="mt-5 text-white md:text-black">
      Контакты:{" "}
      <Link href={`mailto:${props.email}`} className="text-primary">
        {props.email}
      </Link>
    </p>

    <div className="mt-6 flex items-center justify-between text-white md:text-black">
      <div>
        <p>{props.companyName}</p>
        <p className="mt-4">{props.address}</p>
      </div>

      <div>
        <p>{props.inn}</p>
        <p>{props.kpp}</p>
        <p>{props.ogrn}</p>
      </div>
    </div>
  </div>
);

function Brand(props: { domain: string }) {
  return (
    <div>
      <h6 className="bg-gradient-to-r from-[#22b813] to-[#57a0dc] bg-clip-text text-4xl font-bold leading-[80%] text-transparent">
        {props.domain}
      </h6>

      <div className={cn("mt-3")}>
        <p>&copy; ООО &laquo;МИТРА&raquo;</p>
        <p>Все права защищены</p>
      </div>
    </div>
  );
}

function SiteMap(props: { map: SiteMapItem[] }) {
  return (
    <div className={cn("")}>
      <p className="text-lg font-semibold text-primary">Карта сайта</p>

      <nav className="flex flex-col gap-1">
        {props.map.map((item, index) => (
          <a
            key={index}
            href={item.url}
            className="transition-colors hover:text-primary"
          >
            {item.page}
          </a>
        ))}
      </nav>
    </div>
  );
}

function PersonalAccount() {
  return (
    <Link
      href={ROUTE.SITE.MAIN}
      className={cn("mt-9 flex items-center space-x-3")}
    >
      {/* <Image src={accountIcon} width={15} height={15} alt="Иконка" /> */}
      <p>Личный кабинет</p>
    </Link>
  );
}

function FormEmail() {
  return (
    <div className="mt-auto md:mt-0">
      <p className={cn("mt-2")}>
        Заполняя форму, вы соглашаетесь с{" "}
        <Link className="underline" href={ROUTE.SITE.MAIN}>
          политикой обработки персональных данных
        </Link>
      </p>
    </div>
  );
}

function Phone(props: { phone: string }) {
  return (
    <div>
      <h5 className="text-2xl font-semibold text-primary">{props.phone}</h5>
      <p className={cn("mt-2 text-end text-xs")}>Ежедневно с 9.00 до 18.00</p>
    </div>
  );
}

export function SocialNetworkDesktop({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      {/* <IconButton iconKey="email" link="Mirtraveler@mail.ru" />
      <IconButton iconKey="email" link="Mirtraveler@mail.ru" />
      <IconButton iconKey="email" link="Mirtraveler@mail.ru" /> */}
    </div>
  );
}
