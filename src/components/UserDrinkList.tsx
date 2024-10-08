import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { User } from '../types';

interface UserDrinkListProps {
  users: User[];
  addDrink: (userId: number) => void;
  removeDrink: (userId: number, index: number) => void;
}

const UserDrinkList: React.FC<UserDrinkListProps> = ({ users, addDrink, removeDrink }) => {
  return (
    <ul className="space-y-4">
      {users.map((user) => (
        <li key={user.id} className="bg-gray-700 bg-opacity-50 rounded-md p-4 transition-all duration-300 hover:bg-opacity-70">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-lg text-blue-300">{user.name}</span>
            <button
              onClick={() => addDrink(user.id)}
              className="btn p-1 rounded-full transition-all duration-300 hover:scale-110"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          <ul className="space-y-2">
            {user.drinks.map((drink, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-600 bg-opacity-50 rounded-md px-3 py-1 transition-all duration-300 hover:bg-opacity-70">
                <span>{drink.name}</span>
                <div className="flex items-center">
                  <span className="mr-2">${drink.price.toFixed(2)}</span>
                  <button
                    onClick={() => removeDrink(user.id, index)}
                    className="text-red-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                  >
                    <MinusCircle size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default UserDrinkList;