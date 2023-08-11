import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getCardData = async () => {

    const res = await fetch(
      'https://pixabay.com/api/?key=38769115-beb656b93ba995ec36d39afd3&per_page=10&image_type=photo&pretty=true&page='+page
    );

    const data = await res.json();


    // setCard(data.hits)
console.log(card)




  
    setCard((prev) => [...prev, ...data.hits]);
    setLoading(false);
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  const handelInfiniteScroll = async () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >=document.documentElement.scrollHeight) {
        
        setPage((prev) => prev + 1);
        console.log(page)

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <>
    loading ?<div className='cards'>
    {card.map((card) => (
        <div className="img">

          <img src={card.userImageURL} alt="loading" key={card.id} />

        </div>
        
      ))}
      </div> : <h1>loading</h1>;
    
      
    </>
  );
}

export default App;
