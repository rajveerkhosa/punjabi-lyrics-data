import { getSong } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { artist: string; song: string } }) {
  const song = await getSong(params.artist, params.song);
  if (!song) return <main style={{ padding: 24 }}>Song not found.</main>;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>{song.title}</h1>
      <a href={`/${song.artist.slug}`} style={{ textDecoration: "underline", color: "#555" }}>
        {song.artist.name}
      </a>

      {/* render your G/R/T sections here (TripleView or simple <pre>) */}
      {song.sections.map((sec: any, i: number) => (
        <section key={i} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, marginTop: 16 }}>
          {sec.label && <h3 style={{ fontWeight: 700 }}>{sec.label}</h3>}
          <pre>{sec.g.join("\n")}</pre>
          <pre>{sec.r.join("\n")}</pre>
          <pre>{sec.t.join("\n")}</pre>
        </section>
      ))}
    </main>
  );
}

