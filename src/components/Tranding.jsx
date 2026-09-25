import React, { useState } from 'react';

export default function Tranding({ cookList = [], onRemove }) {
  // यह स्टेट ट्रैक करेगी कि कौन सी रेसिपी पर खाना बनाना शुरू हो चुका है
  const [cookingStatus, setCookingStatus] = useState({});

  const trendingRecipes = [
    { 
      id: 1, 
      title: 'Paneer Butter Masala',
      cuisine: 'Indian', 
      rating: '4.9', 
      time: '35 min', 
      img: 'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-1.jpg' 
    },
    { 
      id: 9, 
      title: 'Dim Sums / Dumplings', 
      cuisine: 'Chinese', 
      rating: '4.7', 
      time: '25 min', 
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi3rYArEI_lHs_On8iWFgjsw63rwpyTkWWs5Nv4au2pA&s=1' 
    },
    { 
      id: 15, 
      title: 'Classic Pad Thai', 
      cuisine: 'Thai', 
      rating: '4.8', 
      time: '20 min', 
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKwwXsowCfjYM0ho0WcKNCLn_udu_ME2DWdyIY7jesFA&s=10'
    },
  ];

  // रेसिपी कार्ड या नाम पर नॉर्मल क्लिक करने के लिए
  const handleRecipeClick = (id) => {
    window.open(`/recipe/${id}`, '_blank');
  };

  // ⚡ 'Start Cooking' बटन दबाने पर स्टेटस चेंज होगा और रेसिपी न्यू टैब में खुलेगी
  const handleStartCooking = (id, e) => {
    e.stopPropagation(); // ताकि पीछे का कार्ड क्लिक ट्रिगर न हो
    
    setCookingStatus(prev => {
      const currentStatus = prev[id];
      
      // अगर पहले 'Waiting' था, तो अब 'Cooking' होगा और न्यू टैब खुलेगा
      if (!currentStatus) {
        window.open(`/recipe/${id}`, '_blank');
        return { ...prev, [id]: 'cooking' };
      }
      
      // अगर पहले से 'Cooking' था, तो अब 'Done' (Ready to eat) हो जाएगा
      if (currentStatus === 'cooking') {
        return { ...prev, [id]: 'done' };
      }
      
      // अगर पहले 'Done' था, तो फिर से पकाने पर 'Cooking' होगा और दोबारा टैब खुलेगा
      if (currentStatus === 'done') {
        window.open(`/recipe/${id}`, '_blank');
        return { ...prev, [id]: 'cooking' };
      }
      
      return prev;
    });
  };

  return (
    <aside className="w-full lg:w-80 space-y-6 sticky top-24 self-start">
      
      {/* ================= SECTION 1: INTERACTIVE COOKING LIST ================= */}
      <div className="bg-gradient-to-b from-white to-gray-50/30 border border-gray-100 rounded-3xl p-5 shadow-sm">
        
        {/* हेडर काउंटर बबल */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-lg shadow-xs shadow-orange-50">
              🍳
            </div>
            <h2 className="text-base font-black text-gray-800 tracking-tight">Your Cooking Tray</h2>
          </div>
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md shadow-orange-100">
            {cookList.length} Items
          </span>
        </div>

        {/* सिलेक्टेड रेसिपी आइटम्स की कार्ड लिस्ट */}
        {cookList.length > 0 ? (
          <div className="space-y-4 max-h-[420px] overflow-y-auto no-scrollbar pr-1">
            {cookList.map((item) => {
              const status = cookingStatus[item.id];

              return (
                <div 
                  key={item.id} 
                  onClick={() => handleRecipeClick(item.id)} // पूरे कार्ड पर कहीं भी क्लिक करने से रेसिपी खुलेगी
                  className={`p-3 rounded-2xl border transition-all duration-300 relative group flex flex-col bg-white cursor-pointer ${
                    status === 'cooking' 
                      ? 'border-amber-400 bg-amber-50/20 shadow-xs' 
                      : status === 'done'
                      ? 'border-green-300 bg-green-50/10 opacity-75'
                      : 'border-gray-100 hover:border-orange-100 hover:shadow-xs'
                  }`}
                >
                  {/* टॉप रो: इमेज, नाम और डिलीट बटन */}
                  <div className="flex items-start space-x-3 min-w-0">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100/80 shadow-xs" 
                    />
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="text-xs font-bold text-gray-800 truncate leading-snug group-hover:text-orange-600 transition-colors">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5 tracking-wide uppercase">{item.category} • {item.time}</p>
                    </div>

                    {/* डिलीट बटन */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // ताकि रेसिपी पेज ओपन न हो जब सिर्फ डिलीट दबाया जाए
                        onRemove(item);
                      }}
                      className="absolute top-2 right-2 text-gray-300 hover:text-red-500 bg-gray-50 hover:bg-red-50 w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center transition-all"
                      title="Remove from list"
                    >
                      ✕
                    </button>
                  </div>

                  {/* बॉटम रो: इंटरएक्टिव कुकिंग स्टेटस ऑप्शन */}
                  <div className="mt-3 pt-2.5 border-t border-gray-50 flex items-center justify-between gap-2">
                    {/* लाइव स्टेटस टेक्स्ट */}
                    <div className="text-[10px] font-extrabold tracking-wider uppercase">
                      {status === 'cooking' && <span className="text-amber-600 animate-pulse">🔥 Cooking Now...</span>}
                      {status === 'done' && <span className="text-green-600">✅ Ready to Eat!</span>}
                      {!status && <span className="text-gray-400">💤 Waiting...</span>}
                    </div>

                    {/* मुख्य एक्शन बटन जो स्टेटस भी बदलेगा और रेसिपी भी खोलेगा */}
                    <button
                      onClick={(e) => handleStartCooking(item.id, e)}
                      className={`text-[10px] font-black px-3 py-1.5 rounded-xl transition-all duration-200 uppercase tracking-wider ${
                        status === 'cooking'
                          ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                          : status === 'done'
                          ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          : 'bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white'
                      }`}
                    >
                      {status === 'cooking' ? 'Finish' : status === 'done' ? 'Cook Again' : 'Start Cooking 👨‍🍳'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* खाली होने पर दिखने वाला ख़ूबसूरत एम्प्टी स्टेट */
          <div className="text-center py-10 text-gray-400">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2.5 text-2xl shadow-inner">
              🍽️
            </div>
            <p className="text-xs font-bold leading-relaxed text-gray-400">
              Your kitchen tray is empty.<br />
              <span className="text-[10px] font-medium text-gray-300">Add recipes below to plan your meal!</span>
            </p>
          </div>
        )}
      </div>

      {/* ================= SECTION 2: TRENDING NOW ================= */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-gray-50">
          <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center text-lg shadow-xs shadow-red-50">
            🔥
          </div>
          <h2 className="text-base font-black text-gray-800 tracking-tight">Trending Now</h2>
        </div>

        <div className="space-y-3">
          {trendingRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              onClick={() => handleRecipeClick(recipe.id)}
              className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-orange-50/40 border border-transparent hover:border-orange-100/60 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-xs">
                <img 
                  src={recipe.img} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-orange-500 block">{recipe.cuisine}</span>
                <h3 className="text-xs font-bold text-gray-700 truncate group-hover:text-orange-600 transition-colors mt-0.5">{recipe.title}</h3>
                <div className="flex items-center space-x-2 mt-1 text-[11px] text-gray-400 font-medium">
                  <span className="text-amber-500 font-bold">⭐ {recipe.rating}</span>
                  <span>•</span>
                  <span>{recipe.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}
