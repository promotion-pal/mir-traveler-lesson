"use client";

import { ROUTE } from "@/shared/config/path";
import { useRouter } from "next/navigation";

export const useAuthFn = () => {
  const router = useRouter();

  const api = (serviceMethod: (data: any) => Promise<void>) => {
    return async (data: any) => {
      try {
        await serviceMethod(data);
        router.push(ROUTE.SITE.MAIN);
      } catch (error) {
        throw error;
      }
    };
  };

  return {
    api,
  };
};
