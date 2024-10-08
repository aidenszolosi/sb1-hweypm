import React from 'react';
import { DollarSign } from 'lucide-react';
import { User } from '../types';

interface PayoutCalculatorProps {
  users: User[];
}

const PayoutCalculator: React.FC<PayoutCalculatorProps> = ({ users }) => {
  const totalAmount = users.reduce((sum, user) => 
    sum + user.drinks.reduce((userSum, drink) => userSum + drink.price, 0), 0
  );

  const sortedUsers = [...users].sort((a, b) => {
    const aTotal = a.drinks.reduce((sum, drink) => sum + drink.price, 0);
    const bTotal = b.drinks.reduce((sum, drink) => sum + drink.price, 0);
    return bTotal - aTotal;
  });

  return (
    <div>
      <p className="text-center mb-4">
        <span className="font-medium text-blue-300">Total Amount:</span> 
        <span className="text-2xl font-bold ml-2 gradient-text">${totalAmount.toFixed(2)}</span>
      </p>
      <ul className="space-y-2">
        {sortedUsers.map((user) => {
          const userTotal = user.drinks.reduce((sum, drink) => sum + drink.price, 0);
          return (
            <li key={user.id} className="flex justify-between items-center bg-gray-700 bg-opacity-50 rounded-md px-3 py-2 transition-all duration-300 hover:bg-opacity-70">
              <span className="font-medium text-blue-300">{user.name}</span>
              <span className="flex items-center text-green-400">
                <DollarSign size={16} className="mr-1" />
                {userTotal.toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PayoutCalculator;