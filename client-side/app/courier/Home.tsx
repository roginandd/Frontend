import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SwitchIcon from "@/components/svg/couriers/SwitchIcon";

const screenWidth = Dimensions.get("window").width;

const Home = () => {
  return (
    <LinearGradient
      colors={["#545EE1", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            alignItems: "center",
            paddingTop: "10%",
            marginTop: Platform.OS === "android" ? "10%" : 0,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Pasabuy
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "white",
            }}
          >
            Student service delivery
          </Text>
        </View>

        {/* User Card */}
        <View
          style={{
            backgroundColor: "#3C49B8",
            borderRadius: 30,
            padding: 25,
            marginTop: 30,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Hello,{" "}
            <Text style={{ color: "#44E36C", fontWeight: "bold" }}>
              Christian
            </Text>
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 13 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#6274F3",
                alignSelf: "flex-start",
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderRadius: 10,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Commissioner
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: "3%" }}>
              <SwitchIcon />
            </View>
          </View>
        </View>

        {/* Dashboard */}
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#3C49B8",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
                flex: 1,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Total Deliveries
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                100
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#3C49B8",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Total Earnings
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                ₱1,000.50
              </Text>
            </View>
          </View>

          {/* Row 2 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#3C49B8",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
                flex: 1,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Total Complaints
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                1
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#3C49B8",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Average Distance
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                2 km
              </Text>
            </View>
          </View>

          {/* Row 3 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#3C49B8",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Average Time
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                20 mins
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
