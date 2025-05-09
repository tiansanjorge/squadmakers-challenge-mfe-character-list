import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import CharacterList from "./CharacterList";
import * as ReactList from "react";
console.log("React in list:", ReactList);

const CharacterListWithStore = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CharacterList />
    </PersistGate>
  </Provider>
);

export default CharacterListWithStore;
