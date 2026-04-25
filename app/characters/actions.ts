"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionState = {
  error?: string;
} | null;

function validateStats(value: number, field: string) {
  if (isNaN(value)) return `${field} debe ser un número`;
  if (value <= 0) return `${field} debe ser mayor que 0`;
  if (value > 100) return `${field} no puede ser mayor a 100`;
  return null;
}

export async function createCharacter(
  _prevState: ActionState,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const health = Number(formData.get("health"));
  const attack = Number(formData.get("attack"));
  const defense = Number(formData.get("defense"));
  const speed = Number(formData.get("speed"));

  // Valida nombre con mínimo 3 caracteres
  if (!name || name.trim().length < 3) {
    return { error: "El nombre debe tener al menos 3 caracteres" };
  }

  const statsError =
    validateStats(health, "Vida") ||
    validateStats(attack, "Ataque") ||
    validateStats(defense, "Defensa") ||
    validateStats(speed, "Velocidad");

  if (statsError) return { error: statsError };

  // Valida nombre único
  const existing = await prisma.character.findUnique({
    where: { name },
  });

  if (existing) {
    return { error: "Ya existe un personaje con ese nombre" };
  }

  // Crear
  await prisma.character.create({
    data: { name, type, health, attack, defense, speed },
  });

  revalidatePath("/characters");
  redirect("/characters");
}

export async function deleteCharacter(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.character.delete({
    where: { id },
  });

  revalidatePath("/characters");
}
