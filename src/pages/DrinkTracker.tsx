import React, { useState } from 'react';
import { Beer } from 'lucide-react';
import DrinkSelector from '../components/DrinkSelector';
import UserDrinkList from '../components/UserDrinkList';
import PayoutCalculator from '../components/PayoutCalculator';
import NutritionInfo from '../components/NutritionInfo';
import { User, Drink } from '../types';

interface DrinkTrackerProps {
  users: User[];
  drinks: Drink[];
  addDrink: (userId: number, drinkId: number, quantity: number) => void;
  removeDrink: (userId: number, index: number) => void;
}

const DrinkTracker: React.FC<DrinkTrackerProps> = ({ users, drinks, addDrink, removeDrink }) => {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddDrink = (userId: number) => {
    if (selectedDrink) {
      addDrink(userId, selectedDrink.id, Math.round(quantity));
      setQuantity(1);
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2 gradient-text float-animation">What do you want to drink?</h1>
        <p className="text-gray-400 text-lg">Track, calculate, and split drink costs with ease.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="card mb-8 glass-effect">
          <div className="flex items-center justify-center mb-6">
            <Beer size={32} className="text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold gradient-text">Drink Tracker</h2>
          </div>
          <DrinkSelector
            drinks={drinks}
            selectedDrink={selectedDrink}
            onSelectDrink={setSelectedDrink}
          />
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-blue-300">
              Quantity
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="quantity"
                min="0.25"
                max="10"
                step="0.25"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                className="w-full mr-4"
              />
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0.25, parseFloat(e.target.value) || 0.25))}
                className="input w-20 text-center"
                step="0.25"
                min="0.25"
              />
            </div>
          </div>
          <UserDrinkList
            users={users}
            addDrink={handleAddDrink}
            removeDrink={removeDrink}
          />
        </div>
        <div className="card glass-effect">
          <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Payout Summary</h2>
          <PayoutCalculator users={users} />
        </div>
      </div>
      <NutritionInfo drinks={drinks} />
    </div>
  );
};

export default DrinkTracker;