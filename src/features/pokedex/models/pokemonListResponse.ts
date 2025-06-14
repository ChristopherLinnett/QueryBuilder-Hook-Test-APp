import NamedAPIResource from "./namedApiResource";

class PokemonListResponse {
    constructor(public count: number, public next: string | null, public previous: string | null, public results: NamedAPIResource[]) {}

}

export default PokemonListResponse;