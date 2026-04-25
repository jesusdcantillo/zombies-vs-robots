"use client";

import { useActionState } from "react";
import { createCharacter } from "../actions";

export default function NewCharacterPage() {
  const [state, formAction] = useActionState(createCharacter, null);

  return (
    <form action={formAction}>
      <h1>Nuevo personaje</h1>

      {/* ERROR */}
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}

      <label>
        Nombre
        <input name="name" placeholder="Nombre" required />
      </label>

      <label>
        Tipo
        <select name="type">
          <option value="zombie">Zombie</option>
          <option value="robot">Robot</option>
        </select>
      </label>

      <label>
        Vida
        <input name="health" type="number" min="1" max="100" required />
      </label>

      <label>
        Ataque
        <input name="attack" type="number" min="1" max="100" required />
      </label>

      <label>
        Defensa
        <input name="defense" type="number" min="1" max="100" required />
      </label>

      <label>
        Velocidad
        <input name="speed" type="number" min="1" max="100" required />
      </label>

      <button type="submit">Crear</button>
    </form>
  );
}
