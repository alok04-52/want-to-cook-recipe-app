import React from 'react';
import { allRecipes } from '../data/recipes'; // रेसिपी डेटा का इम्पोर्ट

export default function PopularSlider({ activeCategory, searchQuery, wantToCookList, onCookToggle }) {
  
  // कैटगरी और सर्च के हिसाब से रेसिपीज को फ़िल्टर करना
  const filtered = allRecipes.filter(recipe => {
    const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // नया टैब ओपन करने के लिए फंक्शन
  const handleCardClick = (id) => {
    window.open(`/recipe/${id}`, '_blank');
  };

  return (
    <div className="w-full">
      {/* हेडर काउंटर */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">
          {activeCategory} Recipes
        </h1>
        <span className="text-xs font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full shadow-xs">
          {filtered.length} Items Available
        </span>
      </div>

      {/* रेसिपी ग्रिड लेआउट */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((recipe) => {
            // चेक करें कि ये रेसिपी कुकिंग लिस्ट में पहले से है या नहीं
            const isAdded = wantToCookList.some(item => item.id === recipe.id);

            return (
              <div 
                key={recipe.id} 
                onClick={() => handleCardClick(recipe.id)} // पूरे कार्ड पर क्लिक करने से न्यू टैब खुलेगा
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* 📸 असली फूड इमेज कंटेनर */}
                  <div className="w-full h-44 bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
                    <img 
                      src={recipe.img} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* इमेज के ऊपर तैरता हुआ कैटेगरी टैग */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-500 border border-gray-100 shadow-xs">
                      {recipe.category}
                    </div>
                  </div>

                  {/* क्युज़ीन टैग */}
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block">
                    {recipe.category} Cuisine
                  </span>

                  {/* रेसिपी का नाम */}
                  <h3 className="text-base font-bold text-gray-800 mt-0.5 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </h3>
                </div>

                {/* नीचे का इंफो बार और बटन */}
                <div>
                  <div className="flex items-center justify-between mt-3 pb-3 text-xs text-gray-500 border-b border-gray-50">
                    <span>⏱️ {recipe.time}</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      ⭐ {recipe.rating}
                    </span>
                  </div>

                  {/* कुकिंग लिस्ट बटन */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // न्यू टैब को खुलने से रोकेगा जब सिर्फ बटन दबाया जाए
                      onCookToggle(recipe);
                    }}
                    className={`w-full mt-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 shadow-xs ${
                      isAdded 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-100'
                    }`}
                  >
                    {isAdded ? '✓ Added to Cook List' : '➕ Want to Cook'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* रेसिपी न मिलने पर दिखने वाला एम्प्टी स्टेट */
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
          <span className="text-4xl block mb-2">🔍</span>
          <p className="text-sm font-medium">No recipes match your filter or search.</p>
        </div>
      )}
    </div>
  );
}
