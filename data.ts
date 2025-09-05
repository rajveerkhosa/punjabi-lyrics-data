// lib/data.ts
const BASE = process.env.DATA_BASE!; // set this in .env.local and on Vercel

// Small helper to fetch JSON from your data repo
export async function get<T>(p: string, revalidate = 300): Promise<T> {
  const res = await fetch(`${BASE}${p}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`Fetch failed: ${p} (${res.status})`);
  return res.json() as Promise<T>;
}

// Data helpers
export const getArtists = () => get<any>('/artists.json');
export const getSong = (artistSlug: string, songSlug: string) =>
  get<any>(`/songs/${artistSlug}/${songSlug}.json`).catch(() => null);

