"use client";

import { userService } from "@/features/api/site/user";
import { app } from "@/shared/config/app";
import { ROUTE } from "@/shared/config/path";
import { cn } from "@/shared/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  CarFrontIcon,
  EarthIcon,
  HouseIcon,
  MenuIcon,
  SearchIcon,
  TreePalmIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
          <SheetTitle>
            <LogoNavigationUi />
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <AdNavigateUi />
          <LineHeaderUi />
          <PagesNavigateUi />
        </div>

        <BtnAuthHeaderUi />
      </SheetContent>
    </Sheet>
  </div>
);

const DesktopHeaderUi = () => (
  <section className="hidden md:block fixed top-4 left-0 w-full z-50">
    <div className="container grid grid-cols-[10%_85%] gap-5 p-5 bg-gray-100 rounded-xl items-center">
      <LogoNavigationUi />

      <div className="space-y-3">
        <PagesNavigateUi />
        <LineHeaderUi />
        <div className="flex items-center justify-between">
          <AdNavigateUi />
          <BtnAuthHeaderUi />
        </div>
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
    {
      title: "Аренда жилья",
      icon: HouseIcon,
      link: ROUTE.SITE.ADS({ category: "housing" }),
    },
    {
      title: "Аренда транспорта",
      icon: CarFrontIcon,
      link: ROUTE.SITE.ADS({ category: "transport" }),
    },
    {
      title: "Туры и экскурсии",
      icon: EarthIcon,
      link: ROUTE.SITE.ADS({ category: "tour" }),
    },
    {
      title: "Отдых и развлечения",
      icon: TreePalmIcon,
      link: ROUTE.SITE.ADS({ category: "recreation" }),
    },
  ];

  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
      {routes.map((item) => (
        <li key={item.link}>
          <Link
            href={item.link}
            className="items-center font-normal text-lg gap-2 transition hover:text-teal flex"
          >
            {item.icon && (
              <item.icon className="text-gray-400 hidden md:block" size={20} />
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
    { title: "Контакты", link: ROUTE.SITE.CONTACT },
    // { title: "Блог", link: "" },
    { title: "Пользовательское соглашение", link: ROUTE.DOCUMENTS.PERSON_DATA },
    { title: "Политика конфиденциальности", link: ROUTE.DOCUMENTS.USER_AGREE },
    { title: "Договор оферты", link: ROUTE.DOCUMENTS.OFFER_AGREE },
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

const BtnAuthHeaderUi = () => {
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await userService.getMe({ withToken: true });
        if (isMounted) {
          setAuthState("authenticated");
        }
      } catch (error) {
        if (isMounted) {
          setAuthState("unauthenticated");
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const style = "bg-primary md:w-24 w-full mt-5 md:mt-0 rounded-full";

  if (authState === "loading") {
    return <Skeleton className={cn("h-9", style)} />;
  }

  return (
    <Link
      href={
        authState === "authenticated"
          ? ROUTE.ADMIN.DICTIONARIES
          : ROUTE.AUTH.LOGIN
      }
      className={cn(
        "text-lg font-medium text-center text-white px-5 py-1",
        style
      )}
    >
      {authState === "authenticated" ? "Кабинет" : "Войти"}
    </Link>
  );
};

const SearchHeaderUi = () => (
  <div>
    <SearchIcon />
  </div>
);

const LineHeaderUi = () => <div className="h-px bg-gray-400" />;
