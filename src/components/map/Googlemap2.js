import { Map, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';

const Googlemap2 = ({ google }) => {
  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Map
        google={google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDz273zXB2Y-Cz1IbI5moI0IRYTtHMn90E'
    //apiKey: 'AIzaSyARdVcREeBK44lIWnv5-iPijKqvlSAVwbw'
})(Googlemap2);