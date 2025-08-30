import React from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { ArrowUpRight, Type } from "lucide-react";
import Link from "next/link";
import { ROUTE } from "@/shared/config/path";

type AdditionalInfoCartType = "partner" | "support";

interface AdditionalInfoCart {
  title: string;
  description: string[];
  link?: string;
  action?: string;
}

export function AdditionalInfoCartUi({
  type,
}: {
  type: AdditionalInfoCartType;
}) {
  const typeInfoCart: Record<AdditionalInfoCartType, AdditionalInfoCart> = {
    partner: {
      title: "Стать партнёром",
      // link: ROUTE.SITE.CONTACT,
      description: [
        "Мы предлагаем лучшие условия и поддержку для вашего бизнеса.",
      ],
    },
    support: {
      title: "Служба поддержки",
      // link: ROUTE.SITE.CONTACT,
      description: ["Пн-Пт 9.00–19.00", "Сб-Вс выходной"],
    },
  };

  return (
    <div className={cn("rounded-xl bg-gray-100 px-4 py-6")}>
      <p className="text-xl font-medium">{typeInfoCart[type].title}</p>

      <div className="mt-4 flex flex-col">
        {typeInfoCart[type].description.map((el) => (
          <p key={el} className="text-lg text-gray-600">
            {el}
          </p>
        ))}

        {typeInfoCart[type].link && (
          <Link href={typeInfoCart[type].link}>
            <Button variant="link" className="mt-6 flex w-full justify-between">
              {typeInfoCart[type].action && (
                <span className="flex-1 rounded-full bg-primary p-3 text-white">
                  {typeInfoCart[type].action}
                </span>
              )}

              <div className="ml-auto inline-flex rounded-full bg-primary p-3 text-white">
                <ArrowUpRight />
              </div>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
