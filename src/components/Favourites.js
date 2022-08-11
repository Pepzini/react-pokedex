import React from 'react'
import PokemonInfo from "./PokemonInfo";
import Loader from "./Loader";
import {Link} from 'react-router-dom';
import '../App.css';


const Favourites = ({pokemon, loading}) => {
  // get data from local storage
  const data = JSON.parse(localStorage.getItem('favourites')) || [];
  // console.log(data);
  const style = `img-container ${pokemon.types[0].type.name}`


  return (
    <div className="favourites">
    {/* display favourites as cards */}
      {data.map((pokemon) => (
       <div className="pokemon-container">
       <Link to={`/pokemonsinfo/${pokemon.id}`}>
         <div className="pokemon-card" key={pokemon.id} onClick={() =>
           console.log(pokemon.id)}>

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
      ))}
    </div>
  )
}

export default Favourites