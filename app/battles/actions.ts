"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function startBattle(formData: FormData) {
  const char1Id = Number(formData.get("char1"));
  const char2Id = Number(formData.get("char2"));

  if (!Number.isInteger(char1Id) || !Number.isInteger(char2Id)) {
    redirect("/battles?error=Selecciona%20dos%20personajes%20validos");
  }

  if (char1Id === char2Id) {
    redirect(
      "/battles?error=Debes%20seleccionar%20dos%20personajes%20diferentes",
    );
  }

  const [char1, char2] = await Promise.all([
    prisma.character.findUnique({ where: { id: char1Id } }),
    prisma.character.findUnique({ where: { id: char2Id } }),
  ]);

  if (!char1 || !char2) {
    redirect("/battles?error=Personajes%20no%20encontrados");
  }

  // Simular batalla
  const result = simulateBattle(char1, char2);

  // Guardar batalla en DB
  const battle = await prisma.battle.create({
    data: {
      character1Id: char1Id,
      character2Id: char2Id,
      winnerId: result.winnerId,
      turns: result.turns,
    },
  });

  redirect(`/battles/${battle.id}`);
}

interface Character {
  id: number;
  name: string;
  type: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

interface BattleResult {
  winnerId: number;
  turns: number;
}

function simulateBattle(char1: Character, char2: Character): BattleResult {
  let c1Health = char1.health;
  let c2Health = char2.health;
  let turns = 0;

  // Simular turnos
  while (c1Health > 0 && c2Health > 0) {
    turns++;

    // Ataque de char1
    if (c1Health > 0) {
      const damage = Math.max(1, char1.attack - char2.defense * 0.5);
      c2Health -= damage;

      if (c2Health <= 0) break;
    }

    // Ataque de char2
    if (c2Health > 0) {
      const damage = Math.max(1, char2.attack - char1.defense * 0.5);
      c1Health -= damage;

      if (c1Health <= 0) break;
    }
  }

  const winnerId = c1Health > c2Health ? char1.id : char2.id;

  return {
    winnerId,
    turns,
  };
}
