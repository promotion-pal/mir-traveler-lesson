"use client";

import { Person, userService } from "@/features/api/site/user";
import { CommonLoader } from "@/shared/common";
import { ROUTE } from "@/shared/config/path";
import { cn } from "@/shared/lib/utils";
import {
  Archive,
  BellIcon,
  ChartPieIcon,
  CircleUserRoundIcon,
  HeartIcon,
  LogOutIcon,
  StarIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface NavItem {
  icon?: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
  className?: string;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    icon: CircleUserRoundIcon,
    label: "Мои данные",
    href: ROUTE.LK.USER,
  },
  {
    icon: WalletIcon,
    label: "Мой баланс",
    href: ROUTE.LK.WALLET,
  },
  {
    icon: Archive,
    label: "Мои объявления",
    href: ROUTE.LK.USER,
  },
  {
    icon: HeartIcon,
    label: "Избранное",
    href: ROUTE.LK.USER,
  },

  {
    icon: ChartPieIcon,
    label: "Статистика",
    href: "/lk/stats",
  },
  {
    icon: StarIcon,
    label: "Отзывы",
    href: "/lk/reviews",
  },
  {
    icon: BellIcon,
    label: "Уведомления",
    href: ROUTE.LK.NOTIFICATIONS,
    // exact: true,
  },
];

function LkSidebar(props: Person) {
  const { activeLink } = useLkSidebar();

  return (
    <aside className={"top-24 rounded-2xl h-fit bg-white pt-4 lg:sticky]"}>
      <div className="mb-4 px-6">
        <h2 className="mb-1 text-2xl font-semibold">{props.first_name}</h2>

        <div className="flex items-center gap-2">
          <span className="text-gray">{props.favorite_count} избранных</span>
        </div>
      </div>

      <nav>
        <ul className={"flex flex-col overflow-x-auto px-6 pb-4"}>
          {NAV_ITEMS.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className={cn(
                  "elative flex items-center gap-3 py-1.5 w-max rounded-md font-medium transition lg:w-full",
                  activeLink === i
                    ? "before:absolute before:h-8 before:-left-4 before:bg-amber-200 text-indigo-400 before:w-0.5"
                    : "hover:bg-gray-100",
                  item.className
                )}
              >
                {item.icon && <item.icon size={18} />} {item.label}
                {item.exact && (
                  <p className="font-normal text-gray-500">
                    {/* {session.all_notification_count} */}
                  </p>
                )}
              </Link>
            </li>
          ))}
          <li>
            <button className="flex mt-5 items-center gap-2">
              <LogOutIcon size={18} />
              Выйти
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

const useLkSidebar = () => {
  const [user, setIsUser] = useState<Person>();

  useEffect(() => {
    userService
      .getMe({ withToken: true })
      .then(setIsUser)
      .catch((error) => console.log(error));
  }, []);

  const pathname = usePathname();

  const activeLink = useMemo(() => {
    return NAV_ITEMS.findIndex((item) =>
      item.exact ? pathname === item.href : pathname.startsWith(item.href)
    );
  }, [pathname]);

  return { user, activeLink };
};

const ClientLkSidebar = () => {
  const { user } = useLkSidebar();
  return user ? <LkSidebar {...user} /> : <CommonLoader />;
};

export { ClientLkSidebar };
