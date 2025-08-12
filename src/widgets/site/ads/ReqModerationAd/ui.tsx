"use client";

import { ModerationAd, TransportModerationAd } from "@/features/api/site/ad";
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

  return <div>ui</div>;
}

const Text = ({ label, text }: { label: string; text: string }) => (
  <div className="text-lg">
    <p className="text-gray-200">{label}</p>
    <p>{text}</p>
  </div>
);
