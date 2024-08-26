import React, { useState } from "react"; 


import { StyleSheet, Text, View, TextInput, Image,  SafeAreaView, Button } from 'react-native';  
import Logo from './../../assets/aquak.png'; 
import { auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';



export default function Cadastro({ navigation }){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function cadastrar(){
        await createUserWithEmailAndPassword(auth, email, password)
        .then( (value) => {
          alert('Usuário criado: ' + value.user.email);
          navigation.navigate('Login');
        })
        .catch( (error) => {
          if(error.code === 'auth/weak-password'){
            alert('Sua senha deve ter pelo menos 6 caracteres');
            return;
          }
          if(error.code === 'auth/invalid-email'){
            alert('Email inválido');
            return;
          }else{
            alert('Ops, algo deu errado');
            return;
          }
        })
      
        setEmail('');
        setPassword('');
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={Logo} 
                    style={styles.logo} 
                />
            </View>

            <View>
                <Text style={styles.txt}>Registre-se</Text>
            </View>


            
            <TextInput
                placeholder='Digite o seu email'
                keyboardType='email-address'
                style={styles.input}
                onChangeText={(texto) => setEmail(texto) }
                value={email}
            />

            <TextInput
                placeholder='Digite a sua senha'
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(texto) => setPassword(texto) }
                value={password}
            />
            <View style={styles.button}>
                <Button
                  title="Fazer cadastro"
                  onPress={cadastrar}
                />
            </View>
        
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    logoContainer: {
        marginBottom: 60,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
    txt: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F1F4FF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        width: 357,
        height: 51.2,
        color: '#626262', 
    },
    label: {
        fontSize: 15,
        marginBottom: 5,
        alignSelf: 'flex-start',
        paddingLeft: 50,

    },
    button: {
        width: 357,
        height: 51.2,
        margin: 10,
        flexShrink: 0,
        borderRadius: 10,
        backgroundColor: '#1FA8BB',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1FA8BB',
        shadowOffset: { width: 0, height: 7.314 },
        shadowOpacity: 0.25,
        shadowRadius: 7.314,
        elevation: 7.314,
      },
    espacoButton: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
});

