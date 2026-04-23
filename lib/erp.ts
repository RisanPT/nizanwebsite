export const ERP_API_URL =
  process.env.NEXT_PUBLIC_ERP_API_URL?.replace(/\/$/, '') || 'http://localhost:5001';

type RequestOptions = {
  path: string;
  body: Record<string, unknown>;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data?.message === 'string' ? data.message : 'Failed to submit form'
    );
  }

  return data as T;
}

export async function postToErp({ path, body }: RequestOptions) {
  const response = await fetch(`${ERP_API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return parseResponse<Record<string, unknown>>(response);
}

export async function getFromErp<T>(path: string) {
  const response = await fetch(`${ERP_API_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return parseResponse<T>(response);
}
