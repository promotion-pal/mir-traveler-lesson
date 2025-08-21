"use client";

import { ModerationAd, TransportModerationAd } from "@/features/api/site/ads";
import { CommonLoader } from "@/shared/common";
import React, { useEffect, useState } from "react";

const mockAd: TransportModerationAd = {
  id: 1,
  title: "Аренда транспорта за лапшу",
  status: "",
  address: "Пушкина 67",
  transport_type: {},
};

export function ReqModerationAdUi() {
  const [ad, setAd] = useState<ModerationAd | null>(null);

  useEffect(() => {
    setAd(mockAd);
  }, []);

  return ad ? (
    <section className="bg-white border-[3px] border-gray-300 text-black p-4 rounded-xl">
      <p className="text-xl">Просмотр заявки на модерацию</p>
      <p>Объявление #{ad.id}</p>

      <Text label="Заголовок" text="Аренда квартиры в центре города" />
    </section>
  ) : (
    <CommonLoader />
  );
}

const Text = ({ label, text }: { label: string; text: string }) => (
  <div className="text-lg">
    <p className="text-gray-400">{label}</p>
    <p>{text}</p>
  </div>
);
