import React, { useState } from 'react';
import Navbar from './Navbar';
import PopularSlider from './PopularSlider';
import Tranding from './Tranding';
export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wantToCookList, setWantToCookList] = useState([]);

  const toggleWantToCook = (recipe) => {
    if (wantToCookList.some(item => item.id === recipe.id)) {
      setWantToCookList(wantToCookList.filter(item => item.id !== recipe.id));
    } else {
      setWantToCookList([...wantToCookList, recipe]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60">
      <Navbar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cookCount={wantToCookList.length} 
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <PopularSlider 
            activeCategory={activeCategory} 
            searchQuery={searchQuery} 
            wantToCookList={wantToCookList}
            onCookToggle={toggleWantToCook}
          />
        </div>
        <div className="shrink-0">
          <Tranding cookList={wantToCookList} onRemove={toggleWantToCook} />
        </div>
      </main>
    </div>
  );
}
