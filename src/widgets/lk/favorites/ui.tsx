"use client";

import { userService } from "@/features/api/site/user";
import { CommonEmpty } from "@/shared/common";
import { useEffect, useState } from "react";

const ClientFavoritesUi = () => {
  const [ads, setAds] = useState<null>(null);

  useEffect(() => {
    userService.getFavorites().then((res) => console.log(res));
  }, []);

  if (!ads) return <CommonEmpty />;

  return <div></div>;
};

export { ClientFavoritesUi };
