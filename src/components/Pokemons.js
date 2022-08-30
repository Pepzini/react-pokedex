import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

// import {useNavigate} from 'react-router-dom'
import "../App.css";

const Pokemons = ({ pokemon, loading }) => {

  return (
    <>
      <div className="pokemon-container">
        {loading ? (
          <Loader />
        ) : (

          pokemon.map((pokemon) => {
            // add background colour to cards
            const style = `img-container ${pokemon.types[0].type.name}`
            return (
              <div className="pokemon-container">
                <Link to={`/pokemonsinfo/${pokemon.id}`} key={pokemon.id}>
                  <div className="pokemon-card">

                    <div className={style}>
                      <img src={pokemon.sprites.front_default} alt="pokemon" />
                    </div>
                    <div className="pokemon-info">
                      <h3>#{pokemon.id}</h3>
                      <h3>{pokemon.name}</h3>

                      <p>
                        <span>Types: </span>
                        {pokemon.types.map((type, index) => {
                          return (
                            <span key={index}>
                              {type.type.name}
                              {index !== pokemon.types.length - 1 && ", "}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </Link>

              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Pokemons;
