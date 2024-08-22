import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";

// Tipo de botão
interface ButtonProps extends TouchableOpacityProps {
    title: string; 
}

export function ButtonGrande({ title, ...props }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4169E1',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#00008b',
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});
