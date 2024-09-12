import React, { useEffect, useState } from 'react';

const ArtGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [numArtworks, setNumArtworks] = useState(10); // default to 10 artworks

  useEffect(() => {
    const fetchArtworks = async () => {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q='painting'`);
      const data = await response.json();
      const objectIDs = data.objectIDs.slice(0, numArtworks); // Get the first 'numArtworks' items

      const artworkPromises = objectIDs.map(id =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
      );

      const artworkData = await Promise.all(artworkPromises);
      setArtworks(artworkData);
    };

    fetchArtworks();
  }, [numArtworks]);

  return (
    <div>
      <h1>Your Name's Gallery</h1>
      <input 
        type="number" 
        value={numArtworks} 
        min="1" max="20" 
        onChange={(e) => setNumArtworks(e.target.value)} 
      />
      <div className="gallery">
        {artworks.map(art => (
          <div key={art.objectID} className="art-item">
            <h2>{art.artistDisplayName}</h2>
            <img src={art.primaryImageSmall} alt={art.title} />
            <p>Title: {art.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtGallery;
