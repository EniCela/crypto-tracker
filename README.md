
<!-- Crypto Tracker -->

Crypto Tracker is a real-time cryptocurrency tracking app built with React, TypeScript, Redux, MUI, and Axios. It fetches live market data from the CoinGecko API, supports paginated loading, and allows users to filter coins by time intervals (1H, 1D, 1W, 1M, 1Y, All). Each coin is displayed in a CryptoCard, enabling users to add or remove coins from their portfolio. The app includes polling to refresh the currently viewed page every 10 seconds and modal alerts for portfolio actions. It offers a clean, responsive, and interactive experience for cryptocurrency .

<!-- Technologies Used -->

React

TypeScript

Redux

Material-UI (MUI)

Axios


<!-- Final version of Crypto Tracker(Main feature) -->

- Implemented full Crypto Tracker with paginated fetching from CoinGecko API.
- Added polling to refresh only the current page every 10 seconds.
- Refactored CryptoCard to accept `Coin` type directly, removing manual object creation.
- Integrated add/remove portfolio functionality with Redux state management.
- Maintains multiple pages in state for "Load More" without losing previous data.
- Clean UI with responsive components.
- Modal alerts for coin add/remove actions.
- Optimized polling to avoid unnecessary re-fetches for other pages.


<!-- Getting Started -->

    Clone the repository git clone <your-repo-url>

<!-- Navigate to the project folder -->
    cd crypto-tracker

<!-- Install dependencies -->
    npm install

<!-- Run the development server -->
    npm start

<!-- Open the app -->
    Navigate to http://localhost:3000 in your browser.

