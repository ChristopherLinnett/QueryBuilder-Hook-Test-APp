import axios from "axios";
import ApiDatasource from "../../api/apiDatasource";
import { PokedexDatasourceImpl } from "../../pokedex/data/datasource/pokedexDatasource";
import { PokedexRepoImplementation } from "../../pokedex/domain/repos/pokedexRepo";
import { QueryBuilder } from "../../queryBuilder/queryBuilder";
import RebuildCounter from "./RebuildConter";

const bgColors = [
  "bg-red-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-teal-100",
  "bg-orange-100",
  "bg-lime-100",
];

const { getPokemonList, getPokemon } = new PokedexRepoImplementation(
  new PokedexDatasourceImpl(new ApiDatasource(axios))
);

const Opener: React.FC = () => {
  return (
    <div className="flex flex-col p-4 bg-green-200">
      <RebuildCounter descriptor="page" />
      <QueryBuilder useQuery={getPokemonList}>
        {(result) => {
          return (
            <div className="flex flex-col p-4 bg-red-200">
              <RebuildCounter descriptor="pokemonList" />
              {result.error && <p>Error: {result.error.message}</p>}
              {result.isPending && <p>Loading...</p>}
              {!result.data && !result.error && !result.isPending && (
                <p>No data found</p>
              )}
              {result.data &&
                (() => {
                  const pokemonToDisplay = result.data.pages
                    .flatMap((page) => page.results)
                    .map((pokemon) => pokemon.name);

                  if (pokemonToDisplay.length === 0)
                    return <p>No Pokemon found</p>;

                  return (
                    <>
                      {pokemonToDisplay.map((pokemonName, index) => (
                        <QueryBuilder
                          key={pokemonName}
                          useQuery={getPokemon}
                          params={pokemonName}
                        >
                          {(result) => (
                            <div
                              className={`flex items-center m-2 w-fit px-4 ${
                                bgColors[index % bgColors.length]
                              }`}
                            >
                              {result.isLoading ? (
                                <p>Loading...</p>
                              ) : (
                                <div className="flex gap-4 items-center">
                                  <img
                                    src={
                                      result.data?.sprites.front_default ?? ""
                                    }
                                    alt={result.data?.name}
                                    className="w-16 h-16"
                                  />
                                </div>
                              )}
                              <RebuildCounter
                                descriptor={result.data?.name ?? ""}
                              />
                            </div>
                          )}
                        </QueryBuilder>
                      ))}
                    </>
                  );
                })()}
            </div>
          );
        }}
      </QueryBuilder>
    </div>
  );
};

export default Opener;
