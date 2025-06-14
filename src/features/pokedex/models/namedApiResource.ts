interface NamedAPIResource<T = string> {
    name: T;
    url: string;
}
export default NamedAPIResource;