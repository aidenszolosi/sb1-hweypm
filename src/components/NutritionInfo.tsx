import React from 'react';
import { Drink } from '../types';

interface NutritionInfoProps {
  drinks: Drink[];
}

const NutritionInfo: React.FC<NutritionInfoProps> = ({ drinks }) => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-4 text-center gradient-text">Nutrition Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {drinks.map((drink) => (
          <div key={drink.id} className="bg-gray-800 bg-opacity-50 rounded-md p-4 transition-all duration-300 hover:bg-opacity-70 hover:transform hover:scale-105">
            <h4 className="font-semibold mb-2 text-blue-300">{drink.name}</h4>
            <p>Calories: <span className="text-green-400">{drink.calories}</span></p>
            <p>ABV: <span className="text-yellow-400">{drink.abv}%</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionInfo;