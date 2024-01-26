import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from 'navigation/Navigation';
import * as eva from '@eva-design/eva';
import { default as theme } from "../custom-theme.json";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Store, { persistor } from 'store/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import AlertDialog from 'components/AlertDialog';
const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <SafeAreaProvider>
            <AlertDialog />
            <Navigation />
          </SafeAreaProvider>
        </ApplicationProvider>
      </PersistGate>
    </Provider>

  );
};
export default App;