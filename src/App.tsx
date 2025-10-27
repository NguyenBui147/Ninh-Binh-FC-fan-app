import React from 'react';
import { store } from './app-redux/store/index';
import { Provider } from 'react-redux';
import RootNavigator from './navigation/RootNavigator'; 

const App = () => {
  return (
    
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;