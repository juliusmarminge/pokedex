import Image from "next/image";
import Link from "next/link";

import { fetchFirstPokemonGeneration } from "./fetchers";

export default async function Home() {
  /**
   * Next.js app directory is static (i.e. cached) by default.
   */
  const pokemons = await fetchFirstPokemonGeneration();

  return (
    <main className="mx-auto max-w-2xl space-y-4 py-16">
      <h1 className="text-center text-4xl font-bold">Pokemons</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <Link
            key={pokemon.id}
            href={`/pokemon/${pokemon.name}`}
            className="flex flex-col items-center justify-center rounded-lg border p-4 transition-all hover:scale-105 hover:bg-zinc-900"
          >
            <h2 className="text-xl font-medium capitalize">{pokemon.name}</h2>
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              priority
              height={100}
              width={100}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
