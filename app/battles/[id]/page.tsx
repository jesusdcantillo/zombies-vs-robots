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
      <div className="app-page theme-battles">
        <h1>Batalla no encontrada</h1>
        <Link href="/battles">← Volver</Link>
      </div>
    );
  }

  return (
    <div className="app-page theme-battles">
      <div className="highlight" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", margin: 0 }}>
          🏆 ¡{battle.winner.name} GANA!
        </h2>
        <p className="muted">en {battle.turns} turnos</p>
      </div>

      <div className="two-col" style={{ marginTop: "1rem" }}>
        <div
          className="panel"
          style={{
            backgroundColor:
              battle.winner.id === battle.character1.id ? "#dcfce7" : "#fee2e2",
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
          className="panel"
          style={{
            backgroundColor:
              battle.winner.id === battle.character2.id ? "#dcfce7" : "#fee2e2",
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

      <div className="panel" style={{ marginTop: "1rem" }}>
        <h3>Resumen</h3>
        <p>
          Ganador: <strong>{battle.winner.name}</strong>
        </p>
        <p>Turnos: {battle.turns}</p>
        <p>
          Combate: {battle.character1.name} vs {battle.character2.name}
        </p>
      </div>

      <div className="actions-row" style={{ marginTop: "1rem" }}>
        <Link href="/battles" className="btn btn-amber">
          Nueva Batalla
        </Link>
        <Link href="/characters" className="btn btn-blue">
          Ver Personajes
        </Link>
      </div>
    </div>
  );
}
