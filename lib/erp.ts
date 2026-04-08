const ERP_API_URL =
  process.env.NEXT_PUBLIC_ERP_API_URL?.replace(/\/$/, '') || 'http://localhost:5002';

type RequestOptions = {
  path: string;
  body: Record<string, unknown>;
};

export async function postToErp({ path, body }: RequestOptions) {
  const response = await fetch(`${ERP_API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data?.message === 'string' ? data.message : 'Failed to submit form'
    );
  }

  return data;
}
