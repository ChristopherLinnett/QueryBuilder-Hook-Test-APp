import NamedAPIResource from "./namedApiResource";

interface PokemonMoveVersionGroupDetail {
    level_learned_at: number;
    version_group: NamedAPIResource;
    move_learn_method: NamedAPIResource;
}

interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: PokemonMoveVersionGroupDetail[];
}

export default PokemonMove;