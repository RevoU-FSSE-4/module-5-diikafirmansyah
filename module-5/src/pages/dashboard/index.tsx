// pages/dashboard.tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";

const URL = "https://pokeapi.co/api/v2/pokemon";
const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

type Props = {
  defaultPokemonData?: Pokemon;
};

type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
};

const Dashboard: React.FC<Props> = ({ defaultPokemonData }) => {
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(
    // defaultPokemonData
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const pokemonName = formData.get("PokemonName") as string;
    await getPokemonDataByName(pokemonName);
  };

  const getPokemonDataByName = async (pokemonName: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/${pokemonName}`);
      const result = await response.json();
      if (response.ok) {
        setPokemonData(result);
        setLoading(false);
      } else throw new Error("get pokemon data by name failed!");
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center h-screen">
        <div className="flex justify-center items-center max-w-96 flex-col h-full bg-blue">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="PokemonName"
              placeholder="Pokemon Name"
              className="text-black border border-slate-600 rounded-md px-4 py-2 mb-2"
            />
            <button type="submit" className="border-4 border bg-black-200 px-2.5">
              Submit
            </button>
          </form>
          {!loading && pokemonData && (
            <img src={`${IMG_URL}${pokemonData.id}.png`} alt={pokemonData.name} />
          )}
          {loading && (
            <div className="animate-spin w-16 mt-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const defaultResponse = await fetch(`${URL}/`);
    const defaultPokemonData = await defaultResponse.json();
    return { props: { defaultPokemonData } };
  } catch (error) {
    console.error("Error fetching default pokemon data:", error);
    return { props: {} };
  }
};

export default Dashboard;
