import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack"; 
import Login from "./src/Screen/login"; 
import Cadastro from "./src/Screen/cadastro";
import Home from "./src/Screen/home"; 

const Stack = createStackNavigator(); 

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          options={{headerShown: false}} 
          name='Login'  component={Login}    
        />

      <Stack.Screen 
          options={{headerShown: false}} 
          name='Cadastro'  component={Cadastro}    
        />
        <Stack.Screen 
          options={{ headerShown: false }} 
          name='Home'  
          component={Home}    
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}