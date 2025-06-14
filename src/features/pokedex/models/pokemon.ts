import NamedAPIResource from "./namedApiResource";
import PokemonAbility from "./pokemonAbility";
import PokemonCries from "./pokemonCries";
import PokemonHeldItem from "./pokemonHeldItem";
import PokemonMove from "./pokemonMove";
import PokemonSprites from "./pokemonSprites";
import PokemonStat from "./pokemonStat";
import PokemonTypePast, { PokemonType, PokemonTypeLabel } from "./pokemonType";
import VersionGameIndex from "./versionGameIndex";

export interface PokemonData {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    species: NamedAPIResource;
    sprites: PokemonSprites;
    cries: PokemonCries;
    stats: PokemonStat[];
    types: PokemonType[];
    past_types: PokemonTypePast[];
}

export class Pokemon {
    id: number;
    name: string;
    baseExperience: number;
    height: number;
    isDefault: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    gameIndices: VersionGameIndex[];
    heldItems: PokemonHeldItem[];
    locationAreaEncounters: string;
    moves: PokemonMove[];
    species: NamedAPIResource;
    sprites: PokemonSprites;
    cries: PokemonCries;
    stats: PokemonStat[];
    types: PokemonType[];
    pastTypes: PokemonTypePast[];

    constructor(data: PokemonData) {
        this.id = data.id;
        this.name = data.name;
        this.baseExperience = data.base_experience;
        this.height = data.height;
        this.isDefault = data.is_default;
        this.order = data.order;
        this.weight = data.weight;
        this.abilities = data.abilities;
        this.forms = data.forms;
        this.gameIndices = data.game_indices;
        this.heldItems = data.held_items;
        this.locationAreaEncounters = data.location_area_encounters;
        this.moves = data.moves;
        this.species = data.species;
        this.sprites = data.sprites;
        this.cries = data.cries;
        this.stats = data.stats;
        this.types = data.types;
        this.pastTypes = data.past_types || [];
    }

    get mainType(): PokemonTypeLabel {
        return this.types[0].type.name!
    }

    getBaseStatByName(statName: string): number | undefined {
        const stat = this.stats.find(s => s.stat.name === statName);
        return stat ? stat.base_stat : undefined;
    }

    get defaultSprite(): string | null {
        return this.sprites.front_default;
    }

    get officialArtwork(): string | null {
        return this.sprites.other?.["official-artwork"]?.front_default || null;
    }
}