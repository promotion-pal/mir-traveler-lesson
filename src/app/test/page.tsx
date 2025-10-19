"use client";
import { useBearStore } from "@/features/store";
import { Button } from "@/shared/ui/button";
import React from "react";

export default function page() {
  const { bears, removeAllBears, increasePopulation } = useBearStore();

  return (
    <div className="flex bg-zinc-300 flex-col space-y-5 justify-center items-center h-[100vh]">
      <h1 className="text-2xl">Медведей: {bears}</h1>
      <Button onClick={increasePopulation}>Добавить мишку</Button>
      <Button onClick={removeAllBears}>Обнулить</Button>
    </div>
  );
}
