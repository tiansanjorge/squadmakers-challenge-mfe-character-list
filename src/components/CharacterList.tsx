import { useEffect, useState } from "react";
import { Tarjeta } from "tarjeta-lib";

type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
  location: { name: string };
  origin: { name: string };
  status: "Alive" | "Dead" | "unknown";
};

export const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
  }, []);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {characters.map((char) => (
          <Tarjeta
            key={char.id}
            nombre={char.name}
            especie={char.species}
            imagen={char.image}
            ultimaUbicacion={char.location.name}
            primeraAparicion={char.origin.name}
            estado={
              char.status === "Alive"
                ? "Vivo"
                : char.status === "Dead"
                ? "Muerto"
                : "Desconocido"
            }
            esFavorito={false}
            onClick={() => setSelectedCharacter(char)}
          />
        ))}
      </div>

      {selectedCharacter && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Personaje seleccionado:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(selectedCharacter, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
