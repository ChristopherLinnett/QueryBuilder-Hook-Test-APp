import { InfiniteData } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { BACKGROUND_COLOURS } from "../../../core/constants/background_colours";
import ApiDatasource from "../../api/apiDatasource";
import { PokedexDatasourceImpl } from "../../pokedex/data/datasource/pokedexDatasource";
import { PokedexRepoImplementation } from "../../pokedex/domain/repos/pokedexRepo";
import PokemonListResponse from "../../pokedex/models/pokemonListResponse";
import HookBuilder from "../../queryBuilder/hookBuilder";
import { QueryBuilder } from "../../queryBuilder/queryBuilder";
import RebuildCounter from "./RebuildConter";

const { getPokemonList, getPokemon } = new PokedexRepoImplementation(new PokedexDatasourceImpl(new ApiDatasource(axios)));

type PokemonList = InfiniteData<PokemonListResponse, unknown> | undefined;

const pokemonToDisplay = (pokemonList: PokemonList) => pokemonList?.pages.flatMap((page) => page.results).map((pokemon) => pokemon.name);

const Opener: React.FC = () => {
  return (
    <div className="flex flex-col p-4 bg-green-200">
      <RebuildCounter descriptor="page" />
      <QueryBuilder useQuery={getPokemonList}>
        {({ data: pokemonList, isPending: listIsLoading, error: listError }) => {
          return (
            <div className="flex flex-col p-4 bg-red-200">
              <RebuildCounter descriptor="pokemonList" />
              {listError && <p>Error: {listError.message}</p>}
              {listIsLoading && <p>Loading...</p>}
              {(!pokemonList || pokemonList.pages[0].results.length === 0) && !listError && !listIsLoading && <p>No data found</p>}
              {pokemonList && pokemonToDisplay(pokemonList)?.length === 0 ? (
                <p>No Pokemon found</p>
              ) : (
                <HookBuilder hook={useState} params={undefined}>
                  {([selectedPokemon, setSelectedPokemon]) => {
                    return (
                      <>
                        {pokemonToDisplay(pokemonList!)?.map((pokemonName, index) => (
                          <QueryBuilder key={pokemonName} useQuery={getPokemon} params={pokemonName}>
                            {({ data: pokemon, isPending: pokemonIsLoading }) => (
                              <button
                                onClick={() => setSelectedPokemon(pokemonName)}
                                className={
                                  (pokemonName === selectedPokemon ? "bg-red-500" : BACKGROUND_COLOURS[index % BACKGROUND_COLOURS.length]) +
                                  " flex items-center gap-4 w-fit"
                                }
                              >
                                {pokemonIsLoading ? (
                                  <p>Loading...</p>
                                ) : (
                                  <div className="flex gap-4 items-center">
                                    <img src={pokemon?.sprites.front_default ?? ""} alt={pokemon?.name} className="w-16 h-16" />
                                  </div>
                                )}
                                <RebuildCounter descriptor={pokemon?.name ?? ""} />
                              </button>
                            )}
                          </QueryBuilder>
                        ))}
                      </>
                    );
                  }}
                </HookBuilder>
              )}
            </div>
          );
        }}
      </QueryBuilder>
    </div>
  );
};

export default Opener;
