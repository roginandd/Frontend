import { View, Text } from "react-native";
import BigCheck from "@/components/svg/BigCheck";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@/components/Button";

const ApplicationSuccessful = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingTop: 50,
      }}
    >
      {/* Centered content */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        <BigCheck width={160} height={200} />

        <Text
          style={{
            color: "#000",
            fontSize: 25,
            fontWeight: "700",
            textAlign: "center",
            lineHeight: 32,
          }}
        >
          Your application is submitted successfully
        </Text>

        <View style={{ width: "80%", marginTop: 30 }}>
          <Button
            title="Okay"
            onPress={() => navigation.navigate("VeryifyingAccount" as never)}
            backgroundColor="#545EE1"
            textColor="#fff"
            borderColor="#545EE1"
            borderRadius={30}
            padding={15}
            width="100%"
            height={56}
            fontWeight="bold"
            fontSize={18}
          />
        </View>
      </View>
    </View>
  );
};

export default ApplicationSuccessful;
