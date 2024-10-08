import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Drink } from '../types';

interface AddDrinksProps {
  drinks: Drink[];
  setDrinks: React.Dispatch<React.SetStateAction<Drink[]>>;
}

const AddDrinks: React.FC<AddDrinksProps> = ({ drinks, setDrinks }) => {
  const [newDrink, setNewDrink] = useState<Omit<Drink, 'id' | 'price'>>({
    name: '',
    calories: 0,
    abv: 0,
    packSize: 1,
    packPrice: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDrink({ ...newDrink, [name]: name === 'name' ? value : parseFloat(value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDrink.name && newDrink.packPrice > 0 && newDrink.packSize > 0) {
      const unitPrice = newDrink.packPrice / newDrink.packSize;
      setDrinks([...drinks, { ...newDrink, id: drinks.length + 1, price: unitPrice }]);
      setNewDrink({ name: '', calories: 0, abv: 0, packSize: 1, packPrice: 0 });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Add New Drink</h2>
      <form onSubmit={handleSubmit} className="card glass-effect">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-blue-300">
            Drink Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newDrink.name}
            onChange={handleInputChange}
            className="input w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="packSize" className="block text-sm font-medium mb-2 text-blue-300">
            Pack Size
          </label>
          <input
            type="number"
            id="packSize"
            name="packSize"
            value={newDrink.packSize}
            onChange={handleInputChange}
            className="input w-full"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="packPrice" className="block text-sm font-medium mb-2 text-blue-300">
            Pack Price ($)
          </label>
          <input
            type="number"
            id="packPrice"
            name="packPrice"
            value={newDrink.packPrice}
            onChange={handleInputChange}
            className="input w-full"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="calories" className="block text-sm font-medium mb-2 text-blue-300">
            Calories (per drink)
          </label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={newDrink.calories}
            onChange={handleInputChange}
            className="input w-full"
            min="0"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="abv" className="block text-sm font-medium mb-2 text-blue-300">
            ABV (%)
          </label>
          <input
            type="number"
            id="abv"
            name="abv"
            value={newDrink.abv}
            onChange={handleInputChange}
            className="input w-full"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        {newDrink.packPrice > 0 && newDrink.packSize > 0 && (
          <div className="mb-4 text-center">
            <p className="text-green-400">
              Unit Price: ${(newDrink.packPrice / newDrink.packSize).toFixed(2)}
            </p>
          </div>
        )}
        <button type="submit" className="btn w-full flex items-center justify-center">
          <Plus size={20} className="mr-2" />
          Add Drink
        </button>
      </form>
    </div>
  );
};

export default AddDrinks;