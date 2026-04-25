"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createCharacter } from "../actions";

export default function NewCharacterPage() {
  const [state, formAction] = useActionState(createCharacter, null);

  return (
    <div className="app-page theme-characters">
      <form action={formAction} className="panel form-grid">
        <h1>Nuevo personaje</h1>

        {state?.error && <p className="error">{state.error}</p>}

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

        <div
          className="actions-row"
          style={{ marginTop: "0.25rem", marginBottom: 0 }}
        >
          <button type="submit" className="btn-teal">
            Crear
          </button>
          <Link href="/characters" className="btn btn-blue">
            Volver a personajes
          </Link>
        </div>
      </form>
    </div>
  );
}
