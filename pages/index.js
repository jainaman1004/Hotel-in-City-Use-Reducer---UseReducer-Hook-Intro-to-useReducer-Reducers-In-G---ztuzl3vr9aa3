import React, { useReducer, useEffect, useState } from "react";

const initialState = { hotels: [], filteredHotels: [], city: "" };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS": return {...state, hotels : [...action.payload]}
     
    case "FILTER": 
      return{
        ...state,
        filteredHotels:[...state.hotels].filter((hotel)=>{
          const regex = new RegExp(action.payload, 'i');
          if(!regex.test('')) 
          return  regex.test(hotel.city);
        }),
        city : action.payload
      }
     
    default: return {...state}
   
  }
}
export default function Home() {
   const [state, dispatch] = useReducer(reducer, initialState);
 

  console.log(state.hotels)

  useEffect(() => {
    fetch('https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels').then((response)=>{
      return response.json();
    }).then((result)=>{
      console.log(result)
      dispatch({type: "FETCH_SUCCESS", payload : result})
    })
  },[]);
  function handleCityInput(e){
    dispatch({type : 'FILTER', payload: e.target.value})
  }
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter city name"
        value={state.city}
        onChange={(e)=>{
          handleCityInput(e)
        }}
      />
     
        {state.filteredHotels.map((hotel, index)=>(
          <p key={index}>{hotel.hotel_name}</p>
        ))}
     
    </div>
  );
  }
