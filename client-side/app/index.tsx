import { View, StatusBar, Text } from "react-native";
import GetStartedScreen from "./auth/GetStartedScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#545EE1",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#545EE1"
        translucent={true}
        hidden={false}
      />
      <GetStartedScreen />
    </View>
  );
}
