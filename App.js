import { StatusBar, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function App() {
  return (
    <>
      <StatusBar />
      <View style={estilos.container}>
        <MapView style={estilos.mapa} />
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  mapa: { width: "100%", height: "100%" },
});
