import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtGallery from './ArtGallery';
import ArtworkDetail from './ArtworkDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArtGallery />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
