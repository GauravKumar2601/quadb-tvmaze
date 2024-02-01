import React from "react";
import { Link } from "react-router-dom";

const ShowItem = ({ show }) => {
  const { id, name, summary, image } = show;

  return (
    image && (
      <div className="show-item">
        <Link to={`/show/${id}`}>
          <img src={image && image.medium} alt={name} />
          <h2 style={{ textDecoration: "none" }}>{name}</h2>
        </Link>
      </div>
    )
  );
};

export default ShowItem;
