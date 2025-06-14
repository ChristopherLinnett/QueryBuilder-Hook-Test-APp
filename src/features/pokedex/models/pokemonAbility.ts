import NamedAPIResource from "./namedApiResource";

interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export default PokemonAbility;