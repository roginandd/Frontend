import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const PhoneInput = () => {
  const [countryCode, setCountryCode] = useState("+63");
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.row}>
      <RNPickerSelect
        onValueChange={(value) => setCountryCode(value)}
        value={countryCode}
        items={[
          { label: "🇵🇭 +63", value: "+63" },
          { label: "🇺🇸 +1", value: "+1" },
          { label: "🇬🇧 +44", value: "+44" },
        ]}
        style={{
          inputAndroid: { fontSize: 20, padding: 10 },
          inputIOS: { fontSize: 20, padding: 10 },
        }}
      />
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
          width: 280,
        }}
        placeholder="000 00000 0000"
        placeholderTextColor="#999" // optional lighter color for hint
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: "400",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderColor: "#545EE1",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default PhoneInput;
