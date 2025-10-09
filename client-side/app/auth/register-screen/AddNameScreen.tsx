import AuthLeftButton from "@/components/svg/AuthLeftButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "@/components/Button";

const AddNameScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState<string>("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Left Button */}
        <View style={{ marginTop: 50, marginLeft: 20 }}>
          <AuthLeftButton onPress={() => navigation.goBack()} />
        </View>

        {/* Content */}
        <View style={{ flex: 1, paddingHorizontal: 30, marginTop: 30 }}>
          {/* Title */}
          <Text style={{ fontSize: 24, fontWeight: "600", color: "#000" }}>
            Add name
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
            Put your preferred name to be displayed
          </Text>

            {/* Email Input */}
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 14, color: "#000", marginBottom: 8 }}>
              Display name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder=""
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: "#545EE1",
                borderRadius: 8,
                padding: 15,
                fontSize: 16,
              }}
            />
          </View>

          {/* Send Code Button */}
          <View style={{ marginTop: "40%" }}>
            <Button
              title="Sign up"
              onPress={() => {}}
              backgroundColor="#5B5FED"
              textColor="#FFFFFF"
              padding={18}
              borderRadius={30}
              fontSize={16}
              fontWeight="600"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddNameScreen;
