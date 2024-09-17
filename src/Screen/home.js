import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { database } from "../services/firebaseConfig";
import { ref, onValue, update} from 'firebase/database';

export default function Home() {
  const [relay1Status, setRelay1Status] = useState('OFF');
  const [relay2Status, setRelay2Status] = useState('OFF');

  

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
    const relayRef = ref(database, '/ilum'); // Mudando o caminho para "/ilum"

    const unsubscribe = onValue(relayRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRelay1Status(data.relay1Status || 'OFF'); // Puxando o status de "relay1Status"
        setRelay2Status(data.relay2Status || 'OFF'); // Puxando o status de "relay2Status"
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
 const toggleRelay = (relay) => {
  const relayRef = ref(database, '/ilum'); // Mudando o caminho para "/ilum"
  
  if (relay === 'relay1Status') {
    const newState = relay1Status === 'ON' ? 'OFF' : 'ON';
    update(relayRef, { relay1Status: newState });
    setRelay1Status(newState); // Atualizando estado local
  } else if (relay === 'relay2Status') {
    const newState = relay2Status === 'ON' ? 'OFF' : 'ON';
    update(relayRef, { relay2Status: newState });
    setRelay2Status(newState); // Atualizando estado local
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
    

      <Text style={styles.title}>Controle da Iluminação</Text>

      <View style={styles.ledControl}>
        <Text>Luz Verde</Text>
        <Switch
          value={relay1Status === 'ON'}
          onValueChange={() => toggleRelay('relay1Status')}
          trackColor={{ true: 'lightgreen', false: 'gray' }}
          thumbColor={relay1Status === 'ON' ? 'green' : 'white'}
        />
      </View>

      <View style={styles.ledControl}>
        <Text>Luz Azul</Text>
        <Switch
          value={relay2Status === 'ON'}
          onValueChange={() => toggleRelay('relay2Status')}
          trackColor={{ true: 'lightblue', false: 'gray' }}
          thumbColor={relay2Status === 'ON' ? 'blue' : 'white'}
        />
      </View>
      

      
      
      
      

      <Text style={styles.chartTitle}>Gráfico Temperatura</Text>
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

      <Text style={styles.chartTitle}>Gráfico PH</Text>
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
    gap: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
