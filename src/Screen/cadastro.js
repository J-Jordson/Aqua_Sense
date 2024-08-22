import React from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Image } from "react-native";
import { ButtonGrande } from "../Components/buttonGrande";
import Logo from './../../assets/aquak.png';

const Cadastro = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={Logo} 
                    style={styles.logo} 
                />
            </View>

            <View>
                <Text style={styles.txt}>Cadastro</Text>
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
            <TextInput
                placeholder='Confirmar Password'
                secureTextEntry={true}
                style={styles.input}
            />
            <View style={styles.espacoButton}>
                <ButtonGrande
                    title="Fazer cadastro"
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

export default Cadastro;
