import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import PokedexRepo from "../repos/pokedexRepo";
import { CustomException } from "../../../../core/errors/customExceptions";
import PokemonListResponse from "../../models/pokemonListResponse";

class GetPokemonList {
    constructor(private repo: PokedexRepo) {}
    call = () => this.repo.getPokemonList();
}

export type GetPokemonListQuery = () => UseInfiniteQueryResult<InfiniteData<PokemonListResponse, unknown>, CustomException>;

export default GetPokemonList;