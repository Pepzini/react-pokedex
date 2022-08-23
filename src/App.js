import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from "./components/Main";
import PokemonInfo from "./components/PokemonInfo";
import Favourites from "./components/Favourites";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/react-pokedex" element={<Main />} />
          <Route path="/pokemonsinfo/:id" element={<PokemonInfo />} />
          <Route path="/favourites" element={<Favourites />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
