import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack"; 
import Login from "./src/Screen/login"; 
import Cadastro from "./src/Screen/cadastro";

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

      </Stack.Navigator>
    </NavigationContainer>
  )
}