import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { database } from "../services/firebaseConfig";
import { ref, onValue } from 'firebase/database';

const TemperatureAlert = () => {
  const [latestTemp, setLatestTemp] = useState(null);

  useEffect(() => {
    const tempRef = ref(database, '/sensor2/temperatura');

    // Ouvindo as atualizações em tempo real
    const unsubscribe = onValue(tempRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        // Obter a última data e o valor de temperatura correspondente
        const keys = Object.keys(data);
        const latestKey = keys[keys.length - 1]; // Última data no banco
        const latestTemperature = data[latestKey].temperatura; // Valor da temperatura
        setLatestTemp(latestTemperature);

        // Comparar se a temperatura está fora dos limites (menor que 20 ou maior que 25)
        if (latestTemperature < 20) {
          Alert.alert("Alerta", "Temperatura muito baixa: " + latestTemperature + "°C");
        } else if (latestTemperature > 25) {
          Alert.alert("Alerta", "Temperatura muito alta: " + latestTemperature + "°C");
        }
      }
    });

    // Limpar ouvinte quando o componente desmontar
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.bloco}>

      <Text style={styles.title}>Última Temperatura:</Text>
      <Text style={styles.temp}>
        {latestTemp !== null ? latestTemp + "°C" : "Carregando..."}
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

export default TemperatureAlert;
