import { Text, View, Image, Dimensions } from "react-native";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";
import StandingMan from "@/components/svg/StandingMan";

const VeryifyingAccount = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#545EE1",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <StandingMan />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            gap: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            We're still verifying{"\n"}your account
          </Text>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 20,
              marginBottom: 60,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
                lineHeight: 24,
                marginBottom: 8,
              }}
            >
              Unfortunately, your account still undergo on some verification
              process.
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              Thank you for your patience.
            </Text>
          </View>

          <Button
            title="Exit"
            onPress={() => {
              navigation.navigate("LoginScreen" as never);
            }}
            backgroundColor="#fff"
            textColor="#545EE1"
            borderColor="#fff"
            borderWidth={1}
            borderRadius={30}
            fontSize={20}
            fontWeight="bold"
            padding={10}
            margin={10}
            width={180}
            height={50}
          />
        </View>
      </View>
    </View>
  );
};

export default VeryifyingAccount;
