import React from 'react';
import { Drink } from '../types';

interface DrinkSelectorProps {
  drinks: Drink[];
  selectedDrink: Drink | null;
  onSelectDrink: (drink: Drink) => void;
}

const DrinkSelector: React.FC<DrinkSelectorProps> = ({ drinks, selectedDrink, onSelectDrink }) => {
  return (
    <div className="mb-6">
      <label htmlFor="drink-select" className="block text-sm font-medium mb-2 text-blue-300">
        Select a drink
      </label>
      <select
        id="drink-select"
        value={selectedDrink?.id || ''}
        onChange={(e) => {
          const drink = drinks.find(d => d.id === parseInt(e.target.value));
          if (drink) onSelectDrink(drink);
        }}
        className="input w-full transition-all duration-300 hover:ring-2 hover:ring-blue-500"
      >
        <option value="">Choose a drink</option>
        {drinks.map((drink) => (
          <option key={drink.id} value={drink.id}>
            {drink.name} - ${drink.price.toFixed(2)} (Pack: ${drink.packPrice.toFixed(2)} for {drink.packSize})
          </option>
        ))}
      </select>
    </div>
  );
};

export default DrinkSelector;