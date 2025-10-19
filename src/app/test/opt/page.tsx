"useClient";
import { useState } from "react";
export default function TestOptPage() {
  return <div><testUseCallback>></div>;
}

function testUseCallback() {
  const [count, setCount] = useState<number>(0);
}

const calc = () => {
  setCount(count + 1);
};

return (
    <div className="space-y-3">
    <p>Счетчик: {count}</p>
    <Button onClick={calc}>+1</Button>
</div>
);
}
