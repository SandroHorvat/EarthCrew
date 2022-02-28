/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store/Store';
import Authentication from './src/navigation/auth/Authentication';
import { RecoilRoot } from 'recoil';

const EarthCrewAppMain = () => {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RecoilRoot>
          <PaperProvider>
            <Authentication />
          </PaperProvider>
        </RecoilRoot>
      </PersistGate>
    </Provider>
  );
};

export default EarthCrewAppMain;
