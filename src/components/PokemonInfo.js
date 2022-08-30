import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Loader from "./Loader";
import { FaAngleLeft } from "react-icons/fa";
import "../App.css";
import axios from "axios";

const PokemonInfo = ({pokemon}) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  //give each progress bar a different color

  const [favorites, setFavorites] = useState([])
  
  const localFavorites = JSON.parse(localStorage.getItem("favorites"))
  
  const id = window.location.pathname.split("/")[2];

  const getPokemonDetails = async (id) => {
    const details = await getPokemonData(id);
    setPokemonDetails(details.data);
    console.log(details.data);
    setLoading(false);
  };

  const getPokemonData = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res;
    };

    useEffect(() => {
      const fetch = async (id) => {
        const details = await getPokemonData(id);
        setPokemonDetails(details.data);
        console.log(details.data);
        setLoading(false);
        return
    }

    fetch(id);

    setFavorites(localFavorites)
  }, [id, localFavorites])

  //give each progress bar a different color
  const getBarColor = (percentage) => {
    if (percentage < 30) {
      return "danger";
    } else if (percentage < 60) {
      return "warning";
    } else {
      return "success";
    }
  };
  //define pokemon types
  const types = pokemonDetails ? pokemonDetails.types.map((type) => type.type.name) : [];
  const style = `pokemon-details-header ${types.join(" ")}`;
  

  // add pokemon to favorites in local storage just once
  const addToFavorites = (pokemonDetails) => {
    console.log(pokemonDetails)
    if (!isFavorite(pokemonDetails)) {
      favorites.push(pokemonDetails);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }

  //remove pokemon from favorites in local storage
  const removeFromFavorites = (pokemonDetails) => {
    const newFavorites = favorites.filter((pokemon) => pokemon.id !== pokemonDetails.id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  }
  //check if pokemon is in favorites 
  const isFavorite = (pokemonDetails) => {
    return favorites.includes(pokemonDetails);
  }

  //set value of favorite button to add and remove from favorites
  // const [favorite, setFavorite] = useState(isFavorite(pokemonDetails));
  // useEffect(() => {
  //   setFavorite(isFavorite(pokemonDetails));
  // } ,[pokemonDetails]); 
    return (
    <>
      {loading ? (
        <Loader />
      ) : (
       
        <div className="pokemon-page">
           <div className="pokemon-details-header-back">
              <FaAngleLeft className="pokemon-details-header-back-icon" onClick={
                () => {
                  window.history.back();
                }
              }/>
            </div>
          <div className={style}> 
            <div className="pokemon-details-text">
              <h1>{pokemonDetails.name}</h1>
              <p>{pokemonDetails.types[0].type.name}</p>
            </div>
            <div className="pokemon-details-image">
              <img src={pokemonDetails.sprites.front_default} alt="pokemon" />
            </div>
          </div>
          <div className="pokemon-details-stats">
            <div className="pokemon-details-text">
              <h4>Height</h4>
              <p>{pokemonDetails.height}</p>
            </div>
            <div className="pokemon-details-text">
              <h4>Weight</h4>
              <p>{pokemonDetails.weight}</p>
            </div>
            <div className="pokemon-details-text">
              <h4>BMI</h4>
              <p>{(pokemonDetails.weight / pokemonDetails.height / pokemonDetails.height).toFixed(2)}</p>
              
            </div>
          </div>
          <div className="pokemon-details-abililties">
            <div className="progessbar-header">
                <h2>Abilities</h2>
            </div>
            <div className="progressbar">
              <h4>Hp</h4>
              <ProgressBar
                variant={getBarColor(pokemonDetails.stats[0].base_stat)}
                now={pokemonDetails.stats[0].base_stat}
              />
            </div>
            <div className="progressbar">
              <h4>Attack</h4>
              <ProgressBar
                variant={getBarColor(pokemonDetails.stats[1].base_stat)}
                now={pokemonDetails.stats[1].base_stat}
              />
            </div>
            <div className="progressbar">
              <h4>Defense</h4>
              <ProgressBar
                variant={getBarColor(pokemonDetails.stats[2].base_stat)}
                now={pokemonDetails.stats[2].base_stat}
              />
            </div>
            <div className="progressbar">
              <h4>Sp. Attack</h4>
              <ProgressBar
                variant={getBarColor(pokemonDetails.stats[3].base_stat)}
                now={pokemonDetails.stats[3].base_stat}
              />
            </div>
            <div className="progressbar">
              <h4>Sp. Defense</h4>
              <ProgressBar
                variant={getBarColor(pokemonDetails.stats[4].base_stat)}
                now={pokemonDetails.stats[4].base_stat}
              />
            </div>
            <div className="progressbar">
              <h4>Speed</h4>
              <ProgressBar
                variant={getBarColor(pokemonDetails.stats[5].base_stat)}
                now={pokemonDetails.stats[5].base_stat}
              />
            </div>
          </div>
          {/* add and remove pokemon from favourite with one button */}
          <div className="pokemon-details-favourite">
            <button className="add-to-favorites" onClick={() => {
              isFavorite(pokemonDetails) ? removeFromFavorites(pokemonDetails) : addToFavorites(pokemonDetails);
            }
            }>
              {/* check if pokemon is in favorites and set button text accordingly */}
              {isFavorite(pokemonDetails) ? "Remove from favorites" : "Add to favorites"}
            </button>

          </div>

        </div>
      )}
    </>
  );
};

export default PokemonInfo;

