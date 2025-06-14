import ApiDatasource from "../../../api/apiDatasource";
import NamedAPIResource from "../../models/namedApiResource";
import { Pokemon, PokemonData } from "../../models/pokemon";
import PokemonListResponse from "../../models/pokemonListResponse";

abstract class PokedexDatasource {
    abstract getPokemonList: (limit: number, offset: number) => Promise<PokemonListResponse>;
    abstract getPokemonByName: (name: string) => Promise<Pokemon>;
}

class PokedexDatasourceImpl implements PokedexDatasource{
    domain: string;
    constructor(private api: ApiDatasource) {
        this.domain = "https://pokeapi.co/api/v2/";
    }
    getPokemonList = async (limit: number, offset: number) => {
        const response = await this.api.get(
            `${this.domain}pokemon?limit=${limit}&offset=${offset}`
        );
        const data =response as unknown as { count: number, next: string | null, previous: string | null, results: NamedAPIResource[] };
        return new PokemonListResponse(data.count, data.next, data.previous, data.results);
    }
    getPokemonByName = async (name: string) => {

        const response = await this.api.get(
            `${this.domain}pokemon/${name}`);
        return new Pokemon(response as unknown as PokemonData);
    }
}

export {PokedexDatasource, PokedexDatasourceImpl};