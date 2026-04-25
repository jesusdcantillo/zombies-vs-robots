import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { startBattle } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BattlesPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function BattlesPage({ searchParams }: BattlesPageProps) {
  const { error } = await searchParams;
  const [characters, battles] = await Promise.all([
    prisma.character.findMany(),
    prisma.battle.findMany({
      include: {
        character1: true,
        character2: true,
        winner: true,
      },
      orderBy: {
        id: "desc",
      },
    }),
  ]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Simulador de Batallas</h1>
      <Link
        href="/characters"
        style={{ marginBottom: "1rem", display: "block" }}
      >
        ← Volver a Personajes
      </Link>

      {error ? (
        <p style={{ color: "#b00020", marginBottom: "1rem" }}>{error}</p>
      ) : null}

      <form action={startBattle}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="char1">Personaje 1: </label>
          <select id="char1" name="char1" required>
            <option value="">Seleccionar...</option>
            {characters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.type})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="char2">Personaje 2: </label>
          <select id="char2" name="char2" required>
            <option value="">Seleccionar...</option>
            {characters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.type})
              </option>
            ))}
          </select>
        </div>

        <button type="submit">¡Iniciar Batalla!</button>
      </form>

      <section style={{ marginTop: "2rem" }}>
        <h2>Historial de Batallas</h2>

        {battles.length === 0 ? (
          <p>Aun no hay batallas registradas.</p>
        ) : (
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {battles.map((battle) => (
              <div
                key={battle.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#fafafa",
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>Batalla #{battle.id}</strong>:{" "}
                  {battle.character1.name} vs {battle.character2.name}
                </p>
                <p style={{ margin: "0.35rem 0 0 0" }}>
                  Ganador: <strong>{battle.winner.name}</strong> | Turnos:{" "}
                  {battle.turns}
                </p>
                <Link href={`/battles/${battle.id}`}>Ver resultado</Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
