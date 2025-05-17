// import React from "react";

/**
 * Reusable list component
 *
 * @param {item:} - an array of items to be displayed
 * @returns a reusable list component
 */
export default function ListComponent({ item }) {
  return (
    <div className="list_container">
      <div className="image_div">
        <img src={item.image} alt={item.alt} className="image" />
      </div>

      <div className="text_div">
        <p className="name">{item.name}</p>
        <p className="episode">{item.episode.length} episodes</p>
      </div>
    </div>
  );
}
