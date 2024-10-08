import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface DrinkFormProps {
  onAddUser: (name: string) => void;
}

const DrinkForm: React.FC<DrinkFormProps> = ({ onAddUser }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddUser(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-l px-2 py-1 w-full"
          placeholder="Enter name"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600 transition duration-200"
        >
          <UserPlus size={20} />
        </button>
      </div>
    </form>
  );
};

export default DrinkForm;