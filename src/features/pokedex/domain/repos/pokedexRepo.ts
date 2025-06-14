import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PokedexDatasource } from "../../data/datasource/pokedexDatasource";
import PokemonListResponse from "../../models/pokemonListResponse";
import { CustomException } from "../../../../core/errors/customExceptions";
import PageParams from "../../models/pageParams";
import { Pokemon } from "../../models/pokemon";
import { GetPokemonListQuery } from "../usecases/getPokemonList";
import { GetPokemonQuery } from "../usecases/getPokemon";

abstract class PokedexRepo {
    abstract getPokemonList: GetPokemonListQuery;
    abstract getPokemon: GetPokemonQuery;
 }

export class PokedexRepoImplementation implements PokedexRepo {
    constructor(private datasource: PokedexDatasource) { }
    getPokemonList = () => {
        const query = useInfiniteQuery<
            PokemonListResponse,
            CustomException,
            InfiniteData<PokemonListResponse>,
            ["pokemonList"],
            PageParams
        >({
            queryKey: ["pokemonList"],
            initialPageParam: { limit: 20, offset: 0 },
            queryFn: async ({ pageParam }) =>
                this.datasource.getPokemonList(pageParam.limit, pageParam.offset),
            getNextPageParam: (lastPage) => {
                if (!lastPage.next) return undefined;
                const url = new URL(lastPage.next);
                const limit = Number(url.searchParams.get('limit') || 20);
                const offset = Number(url.searchParams.get('offset') || 0);
                return { limit, offset };
            },
            getPreviousPageParam: (firstPage) => {
                if (!firstPage.previous) return undefined;
                const url = new URL(firstPage.previous);
                const limit = Number(url.searchParams.get('limit') || 20);
                const offset = Number(url.searchParams.get('offset') || 0);
                return { limit, offset };
            }
        });
        return query;
    }

    getPokemon = (name: string) => {
        const query = useQuery<Pokemon, CustomException>({
            queryKey: ["getPokemon", name],
            queryFn: () => this.datasource.getPokemonByName(name),
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: Infinity,
            enabled: !!name && name !== "",
        });
        return query;
    }
}

export default PokedexRepo;
