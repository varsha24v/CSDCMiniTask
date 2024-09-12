import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
      const data = await response.json();
      setArtwork(data);
    };

    fetchArtwork();
  }, [id]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{artwork.artistDisplayName}</h1>
      <img src={artwork.primaryImage} alt={artwork.title} />
      <p>Title: {artwork.title}</p>
      <p>Date: {artwork.objectDate}</p>
      <p>Medium: {artwork.medium}</p>
      <p>Dimensions: {artwork.dimensions}</p>
    </div>
  );
};

export default ArtworkDetail;
