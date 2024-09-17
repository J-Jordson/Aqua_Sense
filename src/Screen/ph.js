import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { database } from "../services/firebaseConfig";
import { ref, onValue } from 'firebase/database';

const PhAlert = () => {
  const [latestPh, setLatestPh] = useState(null);

  useEffect(() => {
    const phRef = ref(database, '/sensor2/ph');

    // Ouvindo as atualizações em tempo real
    const unsubscribe = onValue(phRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        // Obter a última data e o valor de pH correspondente
        const keys = Object.keys(data);
        const latestKey = keys[keys.length - 1]; // Última data no banco
        const latestPhValue = data[latestKey].ph; // Valor do pH
        setLatestPh(latestPhValue);

        // Comparar se o pH está fora dos limites aceitáveis (ajuste conforme necessário)
        if (latestPhValue < 6.5) {
          Alert.alert("Alerta", "pH muito baixo: " + latestPhValue);
        } else if (latestPhValue > 8) {
          Alert.alert("Alerta", "pH muito alto: " + latestPhValue);
        }
      }
    });

    // Limpar ouvinte quando o componente desmontar
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bloco}>
        <Text style={styles.title}>Último valor de pH:</Text>
        <Text style={styles.temp}>
          {latestPh !== null ? latestPh : "Carregando..."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bloco: {
    width: 457,
    margin: 10,
    padding: 25,
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: '#0cbcf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  temp: {
    fontSize: 48,
    color: '#F1F4FF',
    marginTop: 10,
  },
});

export default PhAlert;
