import { useState } from "react";

const [count, setCount] = useState(0);

export function Coba() {
  return (
    <div>
      <p>Angka: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
    </div>
  );
}
