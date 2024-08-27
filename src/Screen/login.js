import React, { useState } from "react"; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../services/firebaseConfig";

import { StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity } from 'react-native';  
import Logo from './../../assets/aquak.png'; 

export default function Login({ navigation }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    
    // Configuração logar do Firebase
    const handleLogin = async () => {
        try {
            const value = await signInWithEmailAndPassword(auth, login, password);
            Alert.alert('Bem-vindo', value.user.email);
            navigation.navigate('Home');
        } catch (error) {
            console.log('Erro:', error);
            let errorMessage;
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'O e-mail fornecido é inválido.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Usuário não encontrado.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Senha incorreta.';
                    break;
                default:
                    errorMessage = 'Erro ao fazer login. Tente novamente.';
            }
            Alert.alert('Erro de Autenticação', errorMessage);
        }
    };
    
    

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={Logo} // Usando a imagem importada
                    style={styles.logo} 
                />
            </View>
            
            <Text style={styles.welcome}>Bem Vindo!</Text>
            
    
            <TextInput
                placeholder="Digite o seu email: "
                value={login}
                onChangeText={setLogin}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

    
            <TextInput
                placeholder="Digite a sua senha: "
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}
            />
    
    
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Entrar </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Cadastro')}
            >
                <Text style={styles.buttonText}>Cadastrar </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7', // cor de fundo
    },
    logoContainer: {
        marginBottom: 60, // Espaço entre a imagem e o texto
    },
    logo: {
        width: 200, // Ajuste a largura
        height: 200, // Ajuste a altura 
        resizeMode: 'cover', // Ajusta a imagem para caber no contêiner
    },
    welcome: { // Adicione a definição de estilo para "welcome"
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
        width: 307,
        height: 51.2,
        color: '#626262', 
    },
    label: {
        fontSize: 15,
        marginBottom: 5,
        alignSelf: 'flex-start',
        paddingLeft: 50,

    },
    forgotPassword: { // Defina o estilo para "forgotPassword"
        marginTop: 10,
    },
    forgotPasswordText: { // Defina o estilo para "forgotPasswordText"
        color: 'blue',
    },
    button: {
        width: 307,
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
    buttonText: { // Defina o estilo para "buttonText"
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        
    },
});
