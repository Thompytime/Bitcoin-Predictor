import React, { useState, useEffect } from 'react';
import axios from 'axios';
import awsconfig from './aws-exports'; // Your Amplify config file
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get('https://your-lambda-api-url.com');
        setBitcoinPrice(response.data.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    fetchBitcoinPrice();
  }, []);

  return (
    <div className="App">
      <h1>Bitcoin Price Prediction Game</h1>
      <h2>Current Bitcoin Price: ${bitcoinPrice ? bitcoinPrice : 'Loading...'}</h2>
      {/* Add prediction game UI here */}
    </div>
  );
}

export default withAuthenticator(App); // Wrap with authentication
