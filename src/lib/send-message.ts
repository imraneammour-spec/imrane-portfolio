export async function sendProjectMessage(
  endpoint: string,
  data: FormData,
  signal: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const response = await fetcher(endpoint, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
    signal,
  });
  const result = await response.json();
  if (!response.ok || result.ok === false || result.errors?.length)
    throw new Error("Your message was not accepted by the delivery service.");
}
