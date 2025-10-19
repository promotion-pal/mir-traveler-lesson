"use client";

import { Button } from "@/shared/ui/button";
import { useState } from "react";

export default function TestOptPage() {
  return <div>page</div>;
}

function testUseCallback() {
  const [cont, setCount] = useState<number>(0);

  const calc = () => {
    setCont(cont + 1);
  };

  return (
    <div className="space-y-3">
      <p> Счетчик: {cont}</p>
      <Button onClick={calc}>+1</Button>
    </div>
  );
}
