import { StatusBar } from 'expo-status-bar';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import {MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react';
import { disableErrorHandling } from 'expo';
import Home from './screens/Home';
import Navigator from './routes/routes'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    secondary: 'yellow',
  },
};

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{flex: 1, paddingTop: 100}}>
      <PaperProvider theme={theme}>
        {/* <Home /> */}
        <Navigator />
      </PaperProvider>
    </View>
    </TouchableWithoutFeedback>
  )
}

