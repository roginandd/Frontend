import { Text, View, Image, Dimensions } from "react-native";
import { Button } from "../../components/Button";

const GetStartedScreen = () => {
  const { width, height } = Dimensions.get("window");

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
          marginTop: 50,
        }}
      >
        <Image
          source={require("../../assets/images/standing_man.png")}
          style={{
            width: width * 0.9,
            height: height * 0.4,
          }}
          resizeMode="contain"
        />
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
            Deliver and Earn{"\n"}with Ease
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "400",
              textAlign: "center",
              marginBottom: 60,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            As a student you can send parcels quickly and safely. With your
            account, you can also be a courier or a commissioner — all at the
            same time.
          </Text>

          <Button
            title="Get Started"
            onPress={() => {}}
            backgroundColor="#fff"
            textColor="#545EE1"
            borderColor="#fff"
            borderWidth={1}
            borderRadius={30}
            fontSize={16}
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

export default GetStartedScreen;
