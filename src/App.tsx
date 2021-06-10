import React from 'react';
import './App.css';
import { RestaurantFinder } from './Components/restaurantFinder';


function App() {
  return (
    <div
      style={{ display: "flex", flex: 1, height: "100vh", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}
    >
      Header
      <RestaurantFinder />
      Footer
    </div>
  );
}

export default App;
