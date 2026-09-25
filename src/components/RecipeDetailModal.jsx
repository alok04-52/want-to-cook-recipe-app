import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allRecipes } from './data/recipes'; // रेसिपी डेटा का इम्पोर्ट

export default function RecipeDetailPage() {
  const { id } = useParams();
  
  // यूआरएल (URL) से आईडी निकाल कर मैचिंग रेसिपी ढूंढना
  const recipe = allRecipes.find(r => r.id === parseInt(id));

  // अगर रेसिपी नहीं मिलती है तो ये एम्प्टी स्टेट दिखेगा
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-sm w-full">
          <span className="text-5xl block mb-3">🔍</span>
          <h2 className="text-xl font-bold text-gray-800">Recipe Not Found!</h2>
          <p className="text-sm text-gray-400 mt-1">The recipe you are looking for doesn't exist.</p>
          <Link to="/" className="mt-5 inline-block bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-sm">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
        
        {/* 📸 टॉप बैनर और बड़ी इमेज */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-gray-100">
          <img 
            src={recipe.img} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          {/* डार्क ओवरले ताकि टेक्स्ट साफ़ दिखे */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          
          {/* बैक टू होम बटन */}
          <Link 
            to="/" 
            className="absolute top-4 left-4 bg-white/95 hover:bg-white text-gray-800 text-xs font-bold px-4 py-2 rounded-full backdrop-blur-xs transition-all shadow-md flex items-center gap-1.5"
          >
            ← Back to Home
          </Link>
          
          {/* इमेज के ऊपर दिखने वाला टेक्स्ट टाइटल */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] font-black uppercase tracking-widest bg-orange-500 px-2.5 py-1 rounded-md shadow-sm">
              {recipe.category} Cuisine
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 tracking-tight drop-shadow-md leading-tight">
              {recipe.title}
            </h1>
          </div>
        </div>

        {/* 📋 रेसिपी की पूरी जानकारी */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* ⚡ क्विक स्टैट्स बार (Time, Rating, Calories) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-orange-50/40 border border-orange-100 p-3 sm:p-4 rounded-2xl shadow-xs">
              <span className="block text-gray-400 text-[10px] font-extrabold uppercase tracking-wider">Cooking Time</span>
              <span className="text-sm sm:text-base font-black text-orange-600 mt-0.5 block">⏱️ {recipe.time}</span>
            </div>
            <div className="bg-amber-50/40 border border-amber-100 p-3 sm:p-4 rounded-2xl shadow-xs">
              <span className="block text-gray-400 text-[10px] font-extrabold uppercase tracking-wider">Rating</span>
              <span className="text-sm sm:text-base font-black text-amber-600 mt-0.5 block">⭐ {recipe.rating}</span>
            </div>
            <div className="bg-gray-50 border border-gray-100 p-3 sm:p-4 rounded-2xl shadow-xs">
              <span className="block text-gray-400 text-[10px] font-extrabold uppercase tracking-wider">Calories</span>
              <span className="text-sm sm:text-base font-black text-gray-700 mt-0.5 block">🔥 {recipe.calories}</span>
            </div>
          </div>

          {/* 🥦 सामग्री (Ingredients Section) */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🥬</span> Ingredients Required
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recipe.ingredients?.map((ingredient, i) => (
                <div 
                  key={i} 
                  className="bg-gray-50/80 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-100/70 hover:bg-orange-50/20 hover:border-orange-100 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span>{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 👨‍🍳 बनाने का तरीका (Instructions Section) */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>👨‍🍳</span> Step-by-Step Cooking Method
            </h3>
            <ol className="space-y-3.5">
              {recipe.instructions?.map((step, i) => (
                <li 
                  key={i} 
                  className="flex items-start space-x-4 bg-gray-50/30 p-4 rounded-xl border border-gray-100/70 hover:shadow-xs transition-shadow"
                >
                  {/* स्टेप नंबर बबल */}
                  <span className="bg-gradient-to-br from-orange-500 to-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-xs shadow-orange-100">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed font-medium text-gray-600 text-sm sm:text-base">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

        </div>

      </div>
    </div>
  );
}
