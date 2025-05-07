import "./App.css";
import { Tarjeta } from "tarjeta-lib";

function App() {
  return (
    <>
      <Tarjeta
        nombre="Rick Sanchez"
        especie="Humano"
        imagen="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        ultimaUbicacion="Citadel of Ricks"
        primeraAparicion="Pilot"
        estado="Vivo"
        esFavorito
        onClick={() => alert("Clicked")}
      />
      <h1 className="underline">Hello</h1>
    </>
  );
}

export default App;
