import { fetchPokemon } from "../../fetchers";
import Image from "next/image";
import Link from "next/link";

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await fetchPokemon(params.name);
  if (!pokemon)
    return (
      <div className="place-self-center text-center py-20">
        Pokemon <span className="font-bold">{params.name}</span> not found.
      </div>
    );

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center gap-8 py-16">
      <div className="relative w-full">
        <Link
          href="/"
          className="absolute transition-colors hover:text-zinc-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-8 w-8 fill-current"
          >
            <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
          </svg>
        </Link>
        <h1 className="text-center text-4xl font-bold capitalize">
          {params.name}
        </h1>
      </div>
      <Image
        src={pokemon.sprite}
        height={200}
        width={200}
        alt={pokemon.name}
        priority
        className="rounded-full bg-zinc-300"
      />

      <div className="w-full">
        <h2 className="w-full border-b text-center text-2xl font-medium">
          Stats
        </h2>
        <ul className="grid grid-cols-2">
          {pokemon.stats.map((stat) => (
            <li key={stat.name} className="flex flex-col items-center p-2">
              <span className="text-lg font-light capitalize">{stat.name}</span>
              <p
                className={`text-2xl font-medium ${
                  stat.value < 30
                    ? "text-red-500"
                    : stat.value < 60
                    ? "text-orange-500"
                    : stat.value < 90
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {stat.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col md:flex-row justify-center w-full gap-4 md:gap-16">
        <div className="md:w-1/2">
          <h2 className="border-b text-2xl font-medium text-center">
            Abilities
          </h2>
          <ul className="grid grid-cols-2">
            {pokemon.abilities.slice(0, 10).map((ability) => (
              <li
                key={ability}
                className="capitalize text-lg font-light text-center md:text-left"
              >
                {ability}
              </li>
            ))}
            {pokemon.abilities.length > 10 && (
              <p className="text-center md:text-left italic">
                ... and {pokemon.abilities.length - 10} more.
              </p>
            )}
          </ul>
        </div>

        <div className="md:w-1/2">
          <h2 className="border-b text-2xl font-medium text-center">Moves</h2>
          <ul className="grid grid-cols-2">
            {pokemon.moves.slice(0, 10).map((move) => (
              <li
                key={move}
                className="capitalize text-lg font-light text-center md:text-left"
              >
                {move}
              </li>
            ))}
            {pokemon.moves.length > 10 && (
              <p className="text-center md:text-left italic">
                ... and {pokemon.moves.length - 10} more.
              </p>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
