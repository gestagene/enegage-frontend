import { useState, useEffect, type DependencyList } from "react";

export function useFetch<T>(fn: () => Promise<T>, deps: DependencyList = []) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("test");
        const result = await fn();
        setData(result);
        console.log(result);
      } catch (err: any) {
        setError(err.message);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, deps);
  return { data, isLoading, error };
}
