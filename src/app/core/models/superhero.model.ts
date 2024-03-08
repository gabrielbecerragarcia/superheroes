export interface Superhero {
  name: string;
  id: string;
  response: string;
  powerstats: {
    intelligence: string | null;
    strength: string;
    speed: string | null;
    durability: string | null;
    power: string | null;
    combat: string | null;
  };
  biography: {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string | null;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    "group-affiliation": string;
    relatives: string;
  };
  image: {
    url: string;
  };
}


