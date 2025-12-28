import { useEffect, useState } from "react";

type Params = Record<string, string | number | undefined>;

export function useGetData<T>(url: string, params?: Params, enabled = true) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then(setData)
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Unknown error");
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, [url, enabled]);

  return { data, isLoading, error };
}
