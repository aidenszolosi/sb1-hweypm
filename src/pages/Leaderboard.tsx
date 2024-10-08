import React from 'react';
import { Trophy, Beer } from 'lucide-react';
import { User } from '../types';

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const sortedByCount = [...users].sort(
    (a, b) => b.drinks.length - a.drinks.length
  );
  const sortedByAlcohol = [...users].sort((a, b) => {
    const aTotal = a.drinks.reduce(
      (sum, drink) => sum + drink.abv * drink.price,
      0
    );
    const bTotal = b.drinks.reduce(
      (sum, drink) => sum + drink.abv * drink.price,
      0
    );
    return bTotal - aTotal;
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center gradient-text">
        Leaderboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card glass-effect">
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <Trophy size={24} className="text-yellow-400 mr-2" />
            Most Drinks
          </h3>
          <ul className="space-y-2">
            {sortedByCount.map((user, index) => (
              <li
                key={user.id}
                className="flex items-center justify-between bg-gray-700 bg-opacity-50 rounded-md px-3 py-2"
              >
                <span className="font-medium text-blue-300">{user.name}</span>
                <span className="flex items-center text-yellow-400">
                  <Beer size={16} className="mr-1" />
                  {user.drinks.length}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card glass-effect">
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <Trophy size={24} className="text-purple-400 mr-2" />
            Highest Alcohol Consumption
          </h3>
          <ul className="space-y-2">
            {sortedByAlcohol.map((user, index) => (
              <li
                key={user.id}
                className="flex items-center justify-between bg-gray-700 bg-opacity-50 rounded-md px-3 py-2"
              >
                <span className="font-medium text-blue-300">{user.name}</span>
                <span className="flex items-center text-purple-400">
                  {user.drinks
                    .reduce((sum, drink) => sum + drink.abv, 0)
                    .toFixed(1)}{' '}
                  units
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
