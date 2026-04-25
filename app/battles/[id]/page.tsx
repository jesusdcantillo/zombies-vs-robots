import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BattlePageProps {
  params: {
    id: string;
  };
}

export default async function BattlePage({ params }: BattlePageProps) {
  const { id } = await params;
  const battleId = Number(id);

  const battle = await prisma.battle.findUnique({
    where: { id: battleId },
    include: {
      character1: true,
      character2: true,
      winner: true,
    },
  });

  if (!battle) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Batalla no encontrada</h1>
        <Link href="/battles">← Volver</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px" }}>
      <Link href="/battles">← Nueva Batalla</Link>

      <div
        style={{
          marginTop: "2rem",
          padding: "2rem",
          border: "2px solid #ffd700",
          borderRadius: "8px",
          backgroundColor: "#fffacd",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "2rem", margin: 0 }}>
          🏆 ¡{battle.winner.name} GANA!
        </h2>
        <p style={{ textAlign: "center", margin: "0.5rem 0 0 0" }}>
          en {battle.turns} turnos
        </p>
      </div>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
        }}
      >
        <div
          style={{
            padding: "1rem",
            border: "2px solid #ccc",
            borderRadius: "8px",
            backgroundColor:
              battle.winner.id === battle.character1.id ? "#90EE90" : "#FFB6C6",
          }}
        >
          <h3>{battle.character1.name}</h3>
          <p>Tipo: {battle.character1.type}</p>
          <p>❤️ Vida: {battle.character1.health}</p>
          <p>⚔️ Ataque: {battle.character1.attack}</p>
          <p>🛡️ Defensa: {battle.character1.defense}</p>
          <p>⚡ Velocidad: {battle.character1.speed}</p>
          {battle.winner.id === battle.character1.id && <p>✅ GANADOR</p>}
        </div>

        <div
          style={{
            padding: "1rem",
            border: "2px solid #ccc",
            borderRadius: "8px",
            backgroundColor:
              battle.winner.id === battle.character2.id ? "#90EE90" : "#FFB6C6",
          }}
        >
          <h3>{battle.character2.name}</h3>
          <p>Tipo: {battle.character2.type}</p>
          <p>❤️ Vida: {battle.character2.health}</p>
          <p>⚔️ Ataque: {battle.character2.attack}</p>
          <p>🛡️ Defensa: {battle.character2.defense}</p>
          <p>⚡ Velocidad: {battle.character2.speed}</p>
          {battle.winner.id === battle.character2.id && <p>✅ GANADOR</p>}
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          lineHeight: "1.6",
          fontSize: "0.9rem",
          overflowX: "auto",
        }}
      >
        <h3>Resumen</h3>
        <p>
          Ganador: <strong>{battle.winner.name}</strong>
        </p>
        <p>Turnos: {battle.turns}</p>
        <p>
          Combate: {battle.character1.name} vs {battle.character2.name}
        </p>
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link
          href="/battles"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Nueva Batalla
        </Link>
        <Link
          href="/characters"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#666",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Ver Personajes
        </Link>
      </div>
    </div>
  );
}
