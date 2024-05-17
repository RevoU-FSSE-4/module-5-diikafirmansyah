// pages/dashboard.tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";

const URL = "https://pokeapi.co/api/v2/pokemon";
const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

type Props = {
  defaultPokemonData?: IPokemon;
};

interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
}
interface MyDashboard {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
}
interface PropsDashboard {
  dashboard: MyDashboard;
}
function PokemonInfo({ dashboard }: PropsDashboard) {
  return (
    <div>
      <div className="flex justify-center h-screen">
        <div className="flex justify-center items-center max-w-96 flex-col h-full bg-blue">
          <div>
            <ul>
              <li>id {dashboard.id}</li>
              <li>name {dashboard.name}</li>
              <li>base_experience {dashboard.base_experience}</li>
              <li>height {dashboard.height}</li>
              <li>is_default {dashboard.is_default}</li>
              <li>order {dashboard.order}</li>
              <li>weight {dashboard.weight}</li>
            </ul>
          </div>

          <img src={`${IMG_URL}${dashboard.id}.png`} />

          {
            <div className="animate-spin w-16 mt-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
              </svg>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    if (!params || !params.dashboardId) {
        return {
          notFound: true,
        };
      }
      try {
        const response = await fetch(`${URL}/${params.dashboardId}`);
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        const dashboard: MyDashboard = await response.json();
        console.log("server", dashboard);
        return {
          props: {
            dashboard,
          },
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          notFound: true,
        };
      }
    };
export default PokemonInfo;
