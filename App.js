// App.js - Navegación directa a la pantalla de comunicación
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunicationScreen from './src/screens/CommunicationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Communication"
        screenOptions={{
          headerStyle: { backgroundColor: '#6C63FF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Communication" 
          component={CommunicationScreen} 
          options={{ 
            title: '💬 Comunicación',
            headerLeft: null, 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}