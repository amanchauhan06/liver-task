import React from 'react';
import RecentlyViewed from './components/RecentlyViewed';
import './styles/App.css';

function App() {
  // Mock user ID (in real app, this would come from authentication)
  const userId = "d3nEzeMItvhe88BAIUiwLM8csCv2";

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Profile</h1>
      </header>
      <main>
        <RecentlyViewed userId={userId} />
      </main>
    </div>
  );
}

export default App;