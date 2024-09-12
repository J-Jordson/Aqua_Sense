import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { database } from "../services/firebaseConfig";
import { ref, onValue, update} from 'firebase/database';

export default function Home() {
  const [vermelho, setVermelho] = useState(false);
  const [azul, setAzul] = useState(false);
  const [verde, setVerde] = useState(false);

  

  const [temperatureData, setTemperatureData] = useState([]);
  const [phData, setPhData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    // Referência para o caminho no Firebase onde os dados de temperatura são armazenados
    const tempRef = ref(database, '/sensor2/temperatura');

    // Ouvindo atualizações em tempo real dos dados de temperatura
    const unsubscribeTemp = onValue(tempRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tempValues = Object.values(data).map(entry => entry.temperatura);
        const timeValues = Object.values(data).map(entry => entry.hora); // Ajustado para acessar `hora`

        setTemperatureData(tempValues);
        setTimestamps(timeValues); // Atualiza os timestamps para os gráficos
      }
    });

    // Referência para o caminho no Firebase onde os dados de pH são armazenados
    const phRef = ref(database, '/sensor2/ph');

    // Ouvindo atualizações em tempo real dos dados de pH
    const unsubscribePh = onValue(phRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const phValues = Object.values(data).map(entry => entry.ph);
        setPhData(phValues);
      }
    });


    // LEDD
    const ledRef = ref(database, '/LED');

    const unsubscribe = onValue(ledRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVermelho(data.vermelho);
        setAzul(data.azul);
      }
    });


    // Limpar ouvintes quando o componente desmontar
    return () => {
      unsubscribe();
      unsubscribeTemp();
      unsubscribePh();
    };
  }, []);

  
 // Função para alternar o estado de uma cor no Firebase
 const toggleLed = (color) => {
  const ledRef = ref(database, '/LED');
  if (color === 'vermelho') {
    update(ledRef, { vermelho: !vermelho });
    setVermelho(!vermelho); // Atualizando estado local
  } else if (color === 'azul') {
    update(ledRef, { azul: !azul });
    setAzul(!azul); // Atualizando estado local
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Iluminação</Text>
      
      <Text style={styles.title}>Controle de LEDs</Text>

      <View style={styles.ledControl}>
        <Text>LED Vermelho</Text>
        <Switch
          value={vermelho}
          onValueChange={() => toggleLed('vermelho')}
        />
      </View>

      <View style={styles.ledControl}>
        <Text>LED Azul</Text>
        <Switch
          value={azul}
          onValueChange={() => toggleLed('azul')}
        />
      </View>

      

      
      
      
      

      <Text style={styles.chartTitle}>Temperatura em Tempo Real</Text>
      <LineChart
        data={{
          labels: timestamps.slice(-5), // Mostrar apenas os últimos 5 timestamps
          datasets: [
            {
              data: temperatureData.slice(-5), // Mostrar apenas os últimos 5 dados de temperatura
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          backgroundColor: "#1c313a",
          backgroundGradientFrom: 'skyblue',
          backgroundGradientTo: 'lightblue',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#2a8c9c",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <Text style={styles.chartTitle}>pH em Tempo Real</Text>
      <LineChart
        data={{
          labels: timestamps.slice(-5), // Mostrar apenas os últimos 5 timestamps
          datasets: [
            {
              data: phData.slice(-5), // Mostrar apenas os últimos 5 dados de pH
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#1c313a",
          backgroundGradientFrom: 'grey',
          backgroundGradientTo: 'grey',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#2a8c9c",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  ledControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
