import React from "react";
import { LogBox } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import Cadastro from "./src/Screen/cadastro";
import Home from "./src/Screen/home";
import Login from "./src/Screen/login";
import Temperatura from "./src/Screen/temperatura";
import PH from "./src/Screen/ph";


LogBox.ignoreAllLogs();


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// Drawer Navigator (após o login)
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Temperatura" component={Temperatura} />
      <Drawer.Screen name="PH" component={PH} />
    </Drawer.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cadastro" 
        component={Cadastro} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={DrawerNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}