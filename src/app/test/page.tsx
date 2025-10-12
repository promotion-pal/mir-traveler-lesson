"use client";

import { useBearStore } from "@/features/store";
import { Button } from "@/shared/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

export default function page() {
  const { bears, isLoad, sumStatistics, removeAllBears, increasePopulation } =
    useBearStore();

  return (
    <div className="flex relative bg-zinc-300 flex-col space-y-5 justify-center items-center h-[100vh]">
      <h1 className="text-2xl">Медведей: {bears}</h1>
      <Button onClick={increasePopulation}>Добавить мишку</Button>
      <Button onClick={removeAllBears}>Обнулить</Button>
      <Button onClick={sumStatistics}>Получить статистику</Button>

      {isLoad && (
        <Loader2
          size={60}
          className="animate-spin text-amber-500 absolute top-1/2 left-1/2"
        />
      )}
    </div>
  );
}
