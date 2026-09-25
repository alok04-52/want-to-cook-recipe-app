import React from 'react';

export default function Navbar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery, cookCount }) {
  const categories = ['All', 'Indian', 'Chinese', 'Thai', 'Japanese'];

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side Title Brand + Count Tracker Bubble badge indicator */}
        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-2xl font-black tracking-tight text-gray-800">
            🍳 Want to <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Cook?</span>
          </span>
          {cookCount > 0 && (
            <span className="bg-green-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-bounce">
              {cookCount} Active
            </span>
          )}
        </div>

        {/* Center Search bar component block element line */}
        <div className="w-full md:max-w-md relative flex items-center">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, ingredients..." 
            className="w-full pl-4 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Right Selection pills navigation category items filters */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0 justify-start md:justify-end">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
}
