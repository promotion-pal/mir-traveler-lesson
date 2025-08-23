"use client";

import { Person, userService } from "@/features/api/site/user";
import { useEffect, useState } from "react";

interface UseDefinitionUserFnResult {
  user: Person | null;
  isLoading: boolean;
}

export const useDefinitionUserFn = (): UseDefinitionUserFnResult => {
  const [user, setUser] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await userService.getMe({ withToken: true });
        setUser(userData);
      } catch (err) {
        console.error("User data error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading };
};
