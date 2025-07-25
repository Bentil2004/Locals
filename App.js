import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainStackNavigator from "./Navigation/MainStackNavigator";
import {app} from './firebaseConfig';
import { UserProvider } from "./app/context/UserContext";

const App = () => {
  return (
    <SafeAreaProvider style={styles.root}>
    <UserProvider>
    <MainStackNavigator />
    </UserProvider>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  // root: {
  //   flex: 1,
  //   backgroundColor: "#ffff",
  // },
});

export default App;
