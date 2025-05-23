import React from "react";
import CharacterList from "./components/CharacterList";

function App() {
  return (
    <>
      <div className=" bg-gray-50">
        <h1 className="text-3xl font-bold text-center py-6">Personajes</h1>
        <CharacterList searchText={""} resetSearch={() => {}} />
      </div>
    </>
  );
}

export default App;
