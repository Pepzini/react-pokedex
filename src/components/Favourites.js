import React from 'react'
import Loader from "./Loader";
import {Link} from 'react-router-dom';
import '../App.css';


const Favourites = ({pokemon, loading}) => {
   //check if pokemon is in favorites
    const isFavorite = (pokemon) => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      return favorites.includes(pokemon);
    }
    //get favorites from local storage
    const getFavorites = () => {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    }

    const filteredFavourites = getFavorites().filter((c, index) =>{
      return getFavorites().indexOf(c) === index;
    })

    return (
      <div className="favourites">
        {loading ? (
          <Loader />
        ) : (
          <div className="pokemon-container">
            {getFavorites().map((pokemon) => (
              <Link to={`/pokemonsinfo/${pokemon.id}`} key={pokemon.id}>
              <div className="pokemon-card" >
              <div className ="img-container">
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
            ))
            }
            {/* show no message if no favorites */}
            {getFavorites().length === 0 && (
              <div className="no-favorites">
                <h3>No favorites</h3>
              </div>  
            )}
          </div>
        )}
      </div>
    );
}

export default Favourites