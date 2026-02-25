import { useEffect, useMemo, useState } from "react";

type Params = Record<string, string | number | undefined>;

export function useGetData<T>(url: string, params?: Params, enabled = true) {
  const [state, setState] = useState<{
    data: T | null;
    error: string | null;
    resolvedUrl: string | null;
  }>({
    data: null,
    error: null,
    resolvedUrl: null,
  });

  const requestUrl = useMemo(() => {
    if (!params) {
      return url;
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, String(value));
      }
    });

    const query = searchParams.toString();

    return query ? `${url}?${query}` : url;
  }, [params, url]);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    fetch(requestUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((payload) => {
        setState({
          data: payload,
          error: null,
          resolvedUrl: requestUrl,
        });
      })
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }

        setState({
          data: null,
          error: e instanceof Error ? e.message : "Unknown error",
          resolvedUrl: requestUrl,
        });
      });

    return () => {
      controller.abort();
    };
  }, [enabled, requestUrl]);

  const isLoading = enabled && state.resolvedUrl !== requestUrl;
  const data = enabled && state.resolvedUrl === requestUrl ? state.data : null;
  const error = enabled && state.resolvedUrl === requestUrl ? state.error : null;

  return { data, isLoading, error };
}
