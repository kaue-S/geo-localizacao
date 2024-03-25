import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  /* State para monitorar dados da atulização atual do usuário inicialmente, nulo */
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      /* ACessando o status da requisição de permissão de uso dos recursos de geolocalização */
      const { status } = await Location.requestForegroundPermissionsAsync();

      /* Se o status não for liberado/permitido, então será dado um alerta notificando o usuário. */
      if (status !== "granted") {
        Alert.alert("Ops!", "Você não autorizou o use do geolocalização");
        return;
      }

      /* Se o status estiver ok, obtemos os dados de localização */
      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
    }

    obterLocalizacao();
  }, []);

  console.log(minhaLocalizacao);

  //state com a lat/long inicial que sera alterada dentro da função "marcarLocal".
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
        <View>
          <Button onPress={marcarLocal} title="Onde estou?" />
        </View>
        <View>
          <MapView
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
