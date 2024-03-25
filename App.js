import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

export default function App() {
  const regiaoInicialMapa = {
    latitude: -10,
    longitude: -55,

    // Define o zoom do mapa. Quanto menor o valor, maior o zoom do mapa.
    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <MapView
          mapType="hybrid"
          style={estilos.mapa}
          initialRegion={regiaoInicialMapa}
          userInterfaceStyle="dark"
        />
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapa: {
    width: "100%",
    height: "100%",
  },
});
