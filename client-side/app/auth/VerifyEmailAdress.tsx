import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Button } from "@/components/Button";
import AuthLeftButton from "@/components/svg/AuthLeftButton";

const VerifyEmailAdress: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");

  const handleInput = (value: string): void => {
    setEmail(value);
    console.log(email);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 50, gap: 20 }}>
        <AuthLeftButton onPress={() => navigation.goBack()} />

        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#000",
              marginBottom: 12,
            }}
          >
            Enter your email address
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            Your email address will serve as a backup and a login credential{" "}
          </Text>
        </View>
        <TextInput
          style={{
            fontSize: 20,
            fontWeight: "400",
            backgroundColor: "#FFFFf",
            padding: 10,
            paddingHorizontal: 20,
            borderColor: "#545EE1",
            borderWidth: 1,
            borderRadius: 10,
            color: "#000",
            width: "100%",
            marginBottom: 40,
          }}
          value={email}
          onChangeText={handleInput}
          keyboardType="email-address"
          placeholder="Enter your email address"
          placeholderTextColor="#999"
        />
        {/* Verify Button */}
        <Button
          title="Continue"
          onPress={() => {
            handleInput(email);
          }}
          backgroundColor="#545EE1"
          textColor="#fff"
          borderColor="#545EE1"
          borderRadius={30}
          padding={15}
          width="100%"
          height={56}
          margin={0}
          fontWeight="bold"
          fontSize={18}
        />
      </View>
    </View>
  );
};

export default VerifyEmailAdress;
