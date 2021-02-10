import React from 'react';
import './Gallery.css';

function Gallery(props) {
  return (
    <ul className="gallery">
      {props.cards}
    </ul>
  );
}

export default Gallery;