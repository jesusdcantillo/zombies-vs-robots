import Link from "next/link";

export default function Home() {
  return (
    <div className="app-page home-centered">
      <div className="home-card panel">
        <h1>Zombies vs Robots</h1>
        <p className="muted">¿Qué quieres crear?</p>
        <div
          className="actions-row"
          style={{
            marginTop: "0.9rem",
            justifyContent: "center",
            marginBottom: 0,
          }}
        >
          <Link href="/characters" className="btn btn-teal">
            Personajes
          </Link>
          <Link href="/battles" className="btn btn-amber">
            Batallas
          </Link>
        </div>
      </div>
    </div>
  );
}
