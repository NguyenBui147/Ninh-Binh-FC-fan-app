import React from 'react';
import { store } from './app-redux/store/index';
import { Provider } from 'react-redux';
import RootNavigator from './navigation/RootNavigator';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <Provider store={store}>
      <CartProvider>
        <RootNavigator />
      </CartProvider>
    </Provider>
  );
};

export default App;