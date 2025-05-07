import { useEffect, useState, lazy, Suspense } from "react";
import { Tarjeta } from "tarjeta-lib";

const CharacterDetail = lazy(() => import("detailApp/CharacterDetail"));

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
          <Suspense
            fallback={
              <p className="text-center text-gray-600">Cargando detalle...</p>
            }
          >
            <CharacterDetail
              nombre={selectedCharacter.name}
              imagen={selectedCharacter.image}
              especie={selectedCharacter.species}
              ultimaUbicacion={selectedCharacter.location.name}
              primeraAparicion={selectedCharacter.origin.name}
              estado={
                selectedCharacter.status === "Alive"
                  ? "Vivo"
                  : selectedCharacter.status === "Dead"
                  ? "Muerto"
                  : "Desconocido"
              }
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};
