import AuthLeftButton from "@/components/svg/AuthLeftButton";
import DatePicker from "@/components/DatePicker";
import { useNavigation } from "expo-router";
import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Button } from "@/components/Button";

const PersonalInformation = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Create refs for each input field
  const firstNameRef = useRef<TextInput>(null);
  const middleNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View
        style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 25, gap: 15 }}
      >
        <AuthLeftButton onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 35, fontWeight: "500", gap: 10 }}>
          Enter your personal information
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "400", color: "#666" }}>
          Please fill in the form below to make it easier for us to get to know
          you.
        </Text>
        <View style={{ flexDirection: "column", gap: 10 }}>
          <View style={{ flexDirection: "column", gap: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Personal</Text>
            <TextInput
              ref={firstNameRef}
              style={{
                fontSize: 16,
                fontWeight: "400",
                borderWidth: 1,
                borderRadius: 10,
                padding: 15,
                color: "#000",
              }}
              placeholder="First Name"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
              returnKeyType="next"
              onSubmitEditing={() => middleNameRef.current?.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              ref={middleNameRef}
              style={{
                fontSize: 16,
                fontWeight: "400",
                borderWidth: 1,
                borderRadius: 10,
                padding: 15,
                color: "#000",
              }}
              placeholder="Middle Name"
              placeholderTextColor="#999"
              value={middleName}
              onChangeText={setMiddleName}
              returnKeyType="next"
              onSubmitEditing={() => lastNameRef.current?.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              ref={lastNameRef}
              style={{
                fontSize: 16,
                fontWeight: "400",
                borderWidth: 1,
                borderRadius: 10,
                padding: 15,
                color: "#000",
              }}
              placeholder="Last Name"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
              returnKeyType="next"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              blurOnSubmit={false}
            />

            <DatePicker
              label="Date of Birth"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              maximumDate={new Date()}
              placeholder="MM/DD/YYYY"
            />

            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>Password</Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  ref={passwordRef}
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 15,
                    paddingRight: 45,
                    color: "#000",
                  }}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                    padding: 5,
                  }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={{ fontSize: 20 }}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                Confirm Password
              </Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  ref={confirmPasswordRef}
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 15,
                    paddingRight: 45,
                    color: "#000",
                  }}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                    padding: 5,
                  }}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text style={{ fontSize: 20 }}>
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? "#545EE1" : "#000"}
              />

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ fontSize: 14 }}>
                  Please confirm that you agree to our
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#545EE1",
                      fontWeight: "600",
                      marginLeft: 4,
                    }}
                  >
                    terms & conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              title="Continue"
              onPress={() => {}}
              backgroundColor="#545EE1"
              textColor="#fff"
              borderColor="#545EE1"
              borderRadius={30}
              padding={15}
              width="100%"
              height={56}
              fontWeight="bold"
              fontSize={18}
              disabled={!isChecked}
              marginTop={30}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInformation;
