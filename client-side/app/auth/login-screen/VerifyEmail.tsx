import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Button } from "@/components/Button";
import AuthLeftButton from "@/components/svg/AuthLeftButton";

type VerifyEmailRouteParams = {
  email: string;
};

const VerifyEmail = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<{ params: VerifyEmailRouteParams }, "params">>();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const email = route.params?.email || "your email";

  const maskedEmail = email.replace(
    /^(.{2}).*(@.*)$/,
    (_, start, end) => `${start}*****${end}`
  );
  const handleInput = (index: number, value: string): void => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const newCode = [...code];
      pastedCode.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char;
        }
      });
      setCode(newCode);

      const nextIndex = Math.min(index + pastedCode.length, 5);
      setFocusedIndex(nextIndex);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      setFocusedIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string): void => {
    if (key === "Backspace" && !code[index] && index > 0) {
      setFocusedIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (): void => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      Keyboard.dismiss();
    }
  };

  const handleSendAgain = (): void => {
    // Reset code
    setCode(["", "", "", "", "", ""]);
    setFocusedIndex(0);
    inputRefs.current[0]?.focus();
    // Add your resend code logic here
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 50 }}>
          <AuthLeftButton onPress={() => navigation.goBack()} />

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                color: "#000",
                marginBottom: 12,
              }}
            >
              Please check your email
            </Text>
            <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
              We've sent a code to{" "}
              <Text style={{ fontWeight: "600" }}>{maskedEmail}</Text>
            </Text>
            <TouchableOpacity onPress={handleSendAgain}>
              <Text
                style={{ fontSize: 14, color: "#545EE1", fontWeight: "600" }}
              >
                Send again
              </Text>
            </TouchableOpacity>
          </View>

          {/* Code Input Boxes */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 40,
              marginBottom: 40,
            }}
          >
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                style={{
                  width: 48,
                  height: 56,
                  borderWidth: 2,
                  borderColor:
                    digit || focusedIndex === index ? "#545EE1" : "#E5E7EB",
                  borderRadius: 8,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  backgroundColor: "#FFFFFF",
                }}
                value={digit}
                onChangeText={(value) => handleInput(index, value)}
                onKeyPress={({ nativeEvent: { key } }) =>
                  handleKeyPress(index, key)
                }
                onFocus={() => setFocusedIndex(index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Verify Button */}
          <Button
            title="Verify"
            onPress={handleVerify}
            backgroundColor="#545EE1"
            textColor="#fff"
            borderRadius={30}
            padding={18}
            fontSize={16}
            fontWeight="600"
            disabled={code.some((digit) => !digit)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyEmail;
