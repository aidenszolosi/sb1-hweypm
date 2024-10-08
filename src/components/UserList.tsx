import React from 'react';
import { PlusCircle, MinusCircle, Beer } from 'lucide-react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  updateDrinks: (userId: number, increment: boolean) => void;
}

const UserList: React.FC<UserListProps> = ({ users, updateDrinks }) => {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
          <span className="font-medium text-gray-800">{user.name}</span>
          <div className="flex items-center space-x-2">
            <Beer className="text-yellow-500" size={20} />
            <button
              onClick={() => updateDrinks(user.id, false)}
              className="text-red-500 hover:text-red-600"
            >
              <MinusCircle size={20} />
            </button>
            <span className="font-bold">{user.drinks}</span>
            <button
              onClick={() => updateDrinks(user.id, true)}
              className="text-green-500 hover:text-green-600"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;