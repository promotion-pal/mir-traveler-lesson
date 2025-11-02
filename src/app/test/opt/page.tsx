"use client";

import { Button } from "@/shared/ui/button";
import { useCallback, useState, useMemo, memo } from "react";

export default function TestOptPage() {
  return (
    <div>
      <TestUseCallback />
      <TestUseMemo />
      <TestMemo />
    </div>
  );
}

function TestUseCallback() {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const calc = useCallback(() => {
    setCount(count + 1);
  }, []);

  const calc2 = useCallback(() => {
    setCount2(count2 + 1);
  }, []);

  return (
    <div className="space-y-3">
      <Button onClick={calc}>Кнопка 1: {count}</Button>
      <Button onClick={calc2}>Кнопка 2: {count2}</Button>
    </div>
  );
}

function TestUseMemo() {
  const [number, setNumber] = useState<number>(100);

  const calcValue = useMemo(() => {
    return number * 1000 + 800 * 8000;
  }, []);

  const calc = useCallback(() => {
    setNumber(number + 67);
  }, [number]);

  return (
    <div className="mt-10">
      <p> Значение: {number}</p>
      <p> Вычесленное значение {calcValue}</p>
      <Button onClick={calc}>Кнопка {number}</Button>
    </div>
  );
}

function TestMemo() {
  return (
    <div>
      <TitleMemoizedUi title="" value="" />
    </div>
  );
}

interface TitleProps {
  title: string;
  value: string;
}

const TitleMemoizedUi = memo(function TitleMemoizedUi({
  title,
  value,
}: TitleProps) {
  return <div></div>;
});
