import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteCharacter } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CharactersPageProps {
  searchParams: {
    tipo?: string;
  };
}

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps) {
  const params = await searchParams;
  const tipo = params.tipo;

  const characters = await prisma.character.findMany(
    tipo && tipo !== "todos"
      ? {
          where: {
            type: tipo,
          },
        }
      : undefined,
  );

  const filters = [
    { label: "Todos", value: "todos" },
    { label: "Zombies", value: "zombie" },
    { label: "Robots", value: "robot" },
  ];

  return (
    <div className="app-page theme-characters">
      <h1>Personajes</h1>

      <div className="actions-row">
        <Link href="/characters/new" className="btn btn-teal">
          Crear personaje
        </Link>
        <Link href="/battles" className="btn btn-amber">
          Ir a batallas
        </Link>
      </div>

      <div className="filters">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={
              filter.value === "todos"
                ? "/characters"
                : `/characters?tipo=${filter.value}`
            }
            className={`filter-chip ${
              tipo === filter.value || (!tipo && filter.value === "todos")
                ? "active"
                : ""
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="grid">
        {characters.map((c) => (
          <div key={c.id} className="panel">
            <p>
              {c.name} ({c.type})
            </p>
            <p className="muted">
              ❤️ {c.health} | ⚔️ {c.attack} | 🛡️ {c.defense} | ⚡ {c.speed}
            </p>
            <form action={deleteCharacter}>
              <input type="hidden" name="id" value={c.id} />
              <button type="submit" className="btn-red">
                Eliminar
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
