import { UseQueryResult } from "@tanstack/react-query";
import { Pokemon } from "../../models/pokemon";
import PokedexRepo from "../repos/pokedexRepo";
import { CustomException } from "../../../../core/errors/customExceptions";

class GetPokemon {
    constructor(private repo: PokedexRepo) {}
    call = (name: string) => this.repo.getPokemon(name);
}

export type GetPokemonQuery = (name: string) => UseQueryResult<Pokemon, CustomException>;

export default GetPokemon;