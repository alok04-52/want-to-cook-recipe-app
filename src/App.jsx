import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ⚡ यहाँ रास्ता (path) ठीक किया गया है:
import Home from "./components/Home"; 
import RecipeDetailPage from "./RecipeDetailPage"; 

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50/50 antialiased">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}
