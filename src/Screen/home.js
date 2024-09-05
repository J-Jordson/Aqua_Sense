import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { database } from "../services/firebaseConfig";
import { ref, onValue } from 'firebase/database';

export default function Home() {
  const [vermelho, setVermelho] = useState(false);  /* o estado do botom está false por padrão ou  desativado*/                                                
  const [azul, setAzul] = useState(false);
  const [verde, setVerde] = useState(false);

  const [dataPath1, setDataPath1] = useState(null); /* Banco de Dados Temperatura */ 
  const [dataPath2, setDataPath2] = useState(null);  /* Banco de Dados PH */ 

  useEffect(() => {
    // Referência para a Temperatura no Realtime Database
    const dataRef1 = ref(database, '/dados/temp/valor/');
    
    // Ouvinte para o primeiro caminho
    const unsubscribe1 = onValue(dataRef1, (snapshot) => {
      const fetchedData1 = snapshot.val();
      setDataPath1(fetchedData1);
    }, (error) => {
      console.error('Erro ao buscar dados da Temperatura: ', error);
    });

    // Referência para o PH no Realtime Database
    const dataRef2 = ref(database, '/dados/ph/valor/');
    
    // Ouvinte para o segundo caminho
    const unsubscribe2 = onValue(dataRef2, (snapshot) => {
      const fetchedData2 = snapshot.val();
      setDataPath2(fetchedData2);
    }, (error) => {
      console.error('Erro ao buscar dados do PH: ', error);
    });

    // Limpar ouvintes quando o componente desmontar
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, []);


  const toggleSwitchVermelho = async () => {
    const newValue = !vermelho;
    setVermelho(newValue);
  };

  const toggleSwitchAzul = async () => {
    const newValue = !azul;
    setAzul(newValue);
  };

  const toggleSwitchVerde = async () => {
    const newValue = !verde;
    setVerde(newValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Iluminação</Text>
      
      <View style={styles.row}>
        <Text>Vermelho</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#FF0000" }}
          thumbColor={vermelho ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitchVermelho}
          value={vermelho}
        />
      </View>
      
      <View style={styles.row}>
        <Text>Azul</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#0000FF" }}
          thumbColor={azul ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitchAzul}
          value={azul}
        />
      </View>
      
      <View style={styles.row}>
        <Text>Verde</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#00FF00" }}
          thumbColor={verde ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitchVerde}
          value={verde}
        />
      </View>


      <View style={styles.container}>
        <Text style={styles.title}>Temperatura: </Text>
        <Text style={styles.text}>
          {dataPath1 ? JSON.stringify(dataPath1, null, 2) : 'Carregando dados...'}
      </Text>

      <Text style={styles.title}>PH: </Text>
        <Text style={styles.text}>
          {dataPath2 ? JSON.stringify(dataPath2, null, 2) : 'Carregando dados...'}
        </Text>
      </View>

      {/* Gráfico de Temperatura */}
      <Text style={styles.chartTitle}>Temperatura</Text>
      <LineChart
        data={{
          labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
          datasets: [
            {
              data: [20, 25, 22, 28, 26, 30],
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      {/* Gráfico de pH */}
      <Text style={styles.chartTitle}>pH</Text>
      <LineChart
        data={{
          labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
          datasets: [
            {
              data: [7, 7.2, 6.8, 7.4, 7.1, 7.3],
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#1c313a",
          backgroundGradientFrom: "#1c313a",
          backgroundGradientTo: "#2a8c9c",
          decimalPlaces: 2,
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
});

