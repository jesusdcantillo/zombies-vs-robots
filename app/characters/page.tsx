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
    <div>
      <h1>Personajes</h1>

      <Link href="/characters/new">Crear personaje</Link>

      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={
              filter.value === "todos"
                ? "/characters"
                : `/characters?tipo=${filter.value}`
            }
            style={{
              padding: "0.5rem 1rem",
              backgroundColor:
                tipo === filter.value || (!tipo && filter.value === "todos")
                  ? "#0070f3"
                  : "#e5e5e5",
              color:
                tipo === filter.value || (!tipo && filter.value === "todos")
                  ? "white"
                  : "black",
              textDecoration: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      {characters.map((c) => (
        <div key={c.id}>
          <p>
            {c.name} ({c.type})
          </p>
          <p>
            ❤️ {c.health} | ⚔️ {c.attack} | 🛡️ {c.defense} | ⚡ {c.speed}
          </p>
          <form action={deleteCharacter}>
            <input type="hidden" name="id" value={c.id} />
            <button type="submit">Eliminar</button>
          </form>
        </div>
      ))}
    </div>
  );
}
