import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [localizacao, setLocalizacao] = useState({
    latitude: -33.867886,
    longitude: -63.987,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  //Coordenadaspara o MapView
  const regiaoInicialMapa = {
    //São Paulo
    latitude: -23.533773,
    longitude: -46.65529,

    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  //nessa função estamos pegando os dados da latitude e longitude dentro do usestate e alterando para a latitude/longitude de onde a pessoa clicar/selecionar no mapa
  const marcarLocal = (event) => {
    setLocalizacao({
      ...localizacao, //usado para manter os deltas

      //obtendo novos valores a partir do evento de pressionar
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <MapView
          onPress={marcarLocal}
          mapType="standard"
          style={estilos.mapa}
          initialRegion={regiaoInicialMapa}
          userInterfaceStyle="dark"
        >
          <Marker coordinate={localizacao} draggable>
            <Image source={require("./assets/ghost.png")} />
          </Marker>
        </MapView>
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
