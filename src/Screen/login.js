import { useNavigation } from "@react-navigation/core";
import React from "react"; 
import { SafeAreaView, StyleSheet, Text, View, TextInput, Image } from 'react-native'; 
import { ButtonGrande } from "../Components/buttonGrande"; 
import Logo from './../../assets/aquak.png'; 

const Login = () => {
    
      const navigation = useNavigation();

      function funCadastro () {
        navigation.navigate('Cadastro')
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={Logo} // Usando a imagem importada
                    style={styles.logo} 
                />
            </View>

            <View>
                <Text style={styles.txt}>Login</Text>
            </View>
            <TextInput
                placeholder='Email'
                keyboardType='email-address'
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                secureTextEntry={true}
                style={styles.input}
            />
            <View style={styles.espacoButton}>
                <ButtonGrande
                    title="AVANÇAR"
                />

                 <ButtonGrande
                    title="Cadastro"
                    onPress={funCadastro}
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
        backgroundColor: '#f7f7f7', //cor de fundo
    },
    logoContainer: {
        marginBottom: 60, // Espaço entre a imagem e o texto
    },
    logo: {
        width: 200, // Ajuste a largura
        height: 200, // Ajuste a altura 
        resizeMode: 'cover', // Ajusta a imagem para caber no contêiner
    },
    txt: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        width: '75%',
        color: 'black', 
    },
    espacoButton: {
        width: '60%', 
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    }
});

export default Login; 
