export interface Superhero {
  name: string;
  id: string;
  response: string;
  powerstats: {
    intelligence: string | null;
    strength: string;
    power: string | null;
  };
  biography: {
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string | null;
  };
}


