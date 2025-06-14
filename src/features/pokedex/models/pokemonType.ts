import NamedAPIResource from "./namedApiResource";

export type PokemonTypeLabel = 
    | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
    | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
    | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export interface PokemonType {
    slot: number;
    type: NamedAPIResource<PokemonTypeLabel>;
}

interface PokemonTypePast {
    generation: NamedAPIResource;
    types: PokemonType[];
}

export default PokemonTypePast;