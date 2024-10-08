import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import DrinkTracker from './pages/DrinkTracker';
import AddDrinks from './pages/AddDrinks';
import Leaderboard from './pages/Leaderboard';
import { User, Drink } from './types';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice', drinks: [] },
    { id: 2, name: 'Bob', drinks: [] },
    { id: 3, name: 'Charlie', drinks: [] },
  ]);
  const [drinks, setDrinks] = useState<Drink[]>([
    { id: 1, name: 'Beer', price: 5, calories: 150, abv: 5, packSize: 6, packPrice: 30 },
    { id: 2, name: 'Wine', price: 7, calories: 120, abv: 12, packSize: 1, packPrice: 7 },
    { id: 3, name: 'Cocktail', price: 10, calories: 200, abv: 15, packSize: 1, packPrice: 10 },
  ]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedDrinks = localStorage.getItem('drinks');
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedDrinks) setDrinks(JSON.parse(storedDrinks));
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('drinks', JSON.stringify(drinks));
  }, [users, drinks]);

  const addDrink = (userId: number, drinkId: number, quantity: number) => {
    const drinkToAdd = drinks.find(drink => drink.id === drinkId);
    if (drinkToAdd) {
      setUsers(users.map(user =>
        user.id === userId
          ? { ...user, drinks: [...user.drinks, ...Array(Math.round(quantity)).fill(drinkToAdd)] }
          : user
      ));
    }
  };

  const removeDrink = (userId: number, index: number) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, drinks: user.drinks.filter((_, i) => i !== index) }
        : user
    ));
  };

  return (
    <Router>
      <div className="min-h-screen text-white overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <nav className="mb-8">
            <ul className="flex justify-center space-x-4">
              <li><Link to="/" className="btn">Drink Tracker</Link></li>
              <li><Link to="/add-drinks" className="btn">Add Drinks</Link></li>
              <li><Link to="/leaderboard" className="btn">Leaderboard</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<DrinkTracker users={users} drinks={drinks} addDrink={addDrink} removeDrink={removeDrink} />} />
            <Route path="/add-drinks" element={<AddDrinks drinks={drinks} setDrinks={setDrinks} />} />
            <Route path="/leaderboard" element={<Leaderboard users={users} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;