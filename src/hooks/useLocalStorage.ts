import { useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved || saved === "undefined" || saved === "null") {
        return defaultValue;
      }
      return JSON.parse(saved);
    } catch {
      return defaultValue;
    }
  });

  function setAndPersist(newValue: T) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, setAndPersist] as const;
}
