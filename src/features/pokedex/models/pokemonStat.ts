import NamedAPIResource from "./namedApiResource";

interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

export default PokemonStat;