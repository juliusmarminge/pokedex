import { z } from "zod";

const generationPokemonSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

const basePokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprite: z.string().url(),
});

/**
 * Fetch all pokemons from a generation
 */
export async function fetchFirstPokemonGeneration() {
  const res = await fetch("https://pokeapi.co/api/v2/generation/1");
  if (!res.ok) throw new Error("Failed to fetch generation data");
  const data = await res.json();
  const pokemons = z.array(generationPokemonSchema).parse(data.pokemon_species);
  const pokemonIds = pokemons.map(
    (pokemon) => pokemon.url.split("/").at(-2) as string
  );
  return await Promise.all(
    pokemonIds.map(async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Failed to fetch pokemon data");
      const data = await res.json();
      return basePokemonSchema.parse({
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
      });
    })
  );
}

const detailedPokemonSchema = basePokemonSchema.extend({
  abilities: z.array(z.string()),
  moves: z.array(z.string()),
  baseExperience: z.number(),
  stats: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
    })
  ),
});

/**
 * Fetch a single Pokemon by its name
 */
export async function fetchPokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) return null;

  const data = await res.json();
  return detailedPokemonSchema.parse({
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    abilities: data.abilities.map((ability: any) => ability.ability.name),
    moves: data.moves.map((move: any) => move.move.name),
    baseExperience: data.base_experience,
    stats: data.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  });
}
