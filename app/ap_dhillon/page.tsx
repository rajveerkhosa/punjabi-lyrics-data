import Link from "next/link";
import { getArtists, getSong } from "@/lib/data";

export const dynamic = "force-dynamic"; // always read latest from GitHub

export default async function Page({ params }: { params: { artist: string } }) {
  const artists = await getArtists();
  const artist = artists.find((a: any) => a.slug === params.artist);
  if (!artist) return <main style={{ padding: 24 }}>Artist not found.</main>;

  const songs = await Promise.all(artist.songs.map((s: string) => getSong(artist.slug, s)));

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>{artist.name}</h1>
      <ul>
        {songs.filter(Boolean).map((s: any) => (
          <li key={s.slug}>
            <Link href={`/${artist.slug}/${s.slug}`}>{s.title}</Link>
          </li>
        ))}
      </ul>
      <p><Link href="/">← Home</Link></p>
    </main>
  );
}

