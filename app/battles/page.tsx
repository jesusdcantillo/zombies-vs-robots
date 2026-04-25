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
    <div className="app-page theme-battles">
      <h1>Simulador de Batallas</h1>
      <div className="actions-row">
        <Link href="/characters" className="btn btn-blue">
          Volver a Personajes
        </Link>
      </div>

      {error ? <p className="error">{error}</p> : null}

      <form action={startBattle} className="panel form-grid">
        <div>
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

        <div>
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

        <button type="submit" className="btn-amber">
          ¡Iniciar Batalla!
        </button>
      </form>

      <section style={{ marginTop: "1.25rem" }}>
        <h2>Historial de Batallas</h2>

        {battles.length === 0 ? (
          <p>Aun no hay batallas registradas.</p>
        ) : (
          <div className="grid">
            {battles.map((battle) => (
              <div key={battle.id} className="panel">
                <p>
                  <strong>Batalla #{battle.id}</strong>:{" "}
                  {battle.character1.name} vs {battle.character2.name}
                </p>
                <p className="muted">
                  Ganador: <strong>{battle.winner.name}</strong> | Turnos:{" "}
                  {battle.turns}
                </p>
                <Link href={`/battles/${battle.id}`} className="btn btn-violet">
                  Ver resultado
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
