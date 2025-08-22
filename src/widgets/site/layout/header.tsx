import { app } from "@/shared/config/app";
import { ROUTE } from "@/shared/config/path";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/shared/ui/sheet";
import {
  CarFrontIcon,
  EarthIcon,
  HouseIcon,
  MenuIcon,
  SearchIcon,
  TreePalmIcon,
} from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <MobileHeaderUi />
      <DesktopHeaderUi />
    </header>
  );
}

const MobileHeaderUi = () => (
  <div className="md:hidden">
    <Sheet>
      <section className="fixed top-0 left-0 w-full z-50">
        <div className="flex px-5 py-4 text-white justify-between rounded-sm bg-gray-300">
          <SearchHeaderUi />
          <LogoNavigationUi />
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
        </div>
      </section>

      <SheetContent className="px-6">
        <SheetHeader>
          <LogoNavigationUi />
        </SheetHeader>

        <div className="space-y-4">
          <AdNavigateUi />
          <LineHeaderUi />
          <PagesNavigateUi />
        </div>
      </SheetContent>
    </Sheet>
  </div>
);

const DesktopHeaderUi = () => (
  <section className="hidden md:block fixed top-4 left-0 w-full z-50">
    <div className="container grid grid-cols-[10%_85%] gap-5 p-5 bg-gray-100 rounded-xl items-center">
      <LogoNavigationUi />

      <div className="space-y-4">
        <PagesNavigateUi />
        <LineHeaderUi />
        <AdNavigateUi />
      </div>
    </div>
  </section>
);

const LogoNavigationUi = () => (
  <div
    className="text-lg md:text-3xl md: text-center 
bg-gradient-to-r from-[#22b813] to-[#57a0dc] 
bg-clip-text text-transparent"
  >
    <strong>{app.siteName}</strong>
  </div>
);

const AdNavigateUi = () => {
  const routes = [
    { title: "Главная", link: ROUTE.SITE.MAIN },
    { title: "Аренда жилья", icon: HouseIcon, link: ROUTE.SITE.MAIN },
    { title: "Аренда транспорта", icon: CarFrontIcon, link: ROUTE.AUTH.LOGIN },
    { title: "Туры и экскурсии", icon: EarthIcon, link: "" },
    { title: "Отдых и развлечения", icon: TreePalmIcon, link: "" },
  ];

  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
      {routes.map((item) => (
        <li key={item.link}>
          <Link
            href={item.link}
            className="items-center font-normal text-lg gap-1.5 transition hover:text-teal flex"
          >
            {item.icon && (
              <item.icon className="text-gray-400 hidden" size={20} />
            )}
            <p>{item.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const PagesNavigateUi = () => {
  const routes = [
    { title: "Контакты", link: ROUTE.SITE.MAIN },
    { title: "Блог", link: "" },
    { title: "Юридическая информация", link: ROUTE.AUTH.LOGIN },
  ];

  return (
    <ul className="flex flex-col md:flex-row gap-4 text-gray-500">
      {routes.map((item) => (
        <li key={item.link}>
          <Link
            href={item.link}
            className="items-center gap-1.5 font-medium transition hover:text-teal flex"
          >
            <p>{item.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const SearchHeaderUi = () => (
  <div>
    <SearchIcon />
  </div>
);

const LineHeaderUi = () => <div className="h-px bg-gray-400" />;
