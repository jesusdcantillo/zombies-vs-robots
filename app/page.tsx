import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Zombies vs Robots</h1>
      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <Link
          href="/characters"
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Personajes
        </Link>
        <Link
          href="/battles"
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#f3007a",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Batallas
        </Link>
      </div>
    </div>
  );
}
