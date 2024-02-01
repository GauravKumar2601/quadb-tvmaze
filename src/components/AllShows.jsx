import React, { useEffect, useState } from "react";
import ShowItem from "./ShowItem";

const AllShows = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();
        setShows(data.slice(0, 9)); // Take the first 8 shows
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="all-shows">
      {shows.map((show) => (
        <ShowItem key={show.show.id} show={show.show} />
      ))}
    </div>
  );
};

export default AllShows;
