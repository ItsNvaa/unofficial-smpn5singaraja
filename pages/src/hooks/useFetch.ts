import { useState, useEffect } from "react";

export default function useFetch({
  url,
  method = "GET",
  payload,
}: {
  url: string;
  method?: string;
  payload?: object;
}) {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function retrive(): Promise<void> {
    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      setDatas(result);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    retrive();
  }, [url]);

  return { datas, error, loading };
}
