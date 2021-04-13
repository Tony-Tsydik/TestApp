import React from 'react';
import PersonList from './components/personsList';
import GoogleApiWrapper from './components/buildingPlan';

const App = () => {
  return (
    <div>
      <GoogleApiWrapper/>
      <PersonList />
    </div>
  );
}

export default App;
