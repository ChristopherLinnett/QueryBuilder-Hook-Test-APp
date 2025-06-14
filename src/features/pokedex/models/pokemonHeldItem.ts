import NamedAPIResource from "./namedApiResource";

interface PokemonHeldItemVersionDetail {
    rarity: number;
    version: NamedAPIResource;
}

interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersionDetail[];
}

export default PokemonHeldItem;