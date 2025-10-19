import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import {
  CommissionData,
  Coordinates,
  GeoapifyFeature,
} from "@/types/interfaces";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation } from "expo-router";
import { OrdersRouteProp } from "@/types/types";
import { useRoute } from "@react-navigation/native";
import { courierCoordinates } from "@/constants/courier_coordinate";
import { GEOAPIFY_KEY } from "@env";
import { useAuthStore } from "../api/store/auth_store";
import { PostOrderRequestDTO } from "../api/dto/request/order.request.dto";
import { postOrder } from "../api/orders";

const screenWidth = Dimensions.get("window").width;

const Orders: React.FC = () => {
  const [deviceLocation, setDeviceLocation] = useState<Coordinates | null>(
    null
  );
  const [selectedPin, setSelectedPin] = useState<Coordinates | null>(null);
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const [commissionData, setCommissionData] = useState<CommissionData>({
    address: "",
    specification: "",
    deliveryInstructions: "",
    coordinates: { latitude: 0, longitude: 0 },
  });

  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const courierLocation = courierCoordinates;
  const recentSearched = useRef<GeoapifyFeature[]>([]);
  const mapRef = useRef<MapView>(null);
  const route = useRoute<OrdersRouteProp>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestDto, setRequestDto] = useState<PostOrderRequestDTO>(
    {} as PostOrderRequestDTO
  );

  const params = route.params;
  const returnAddress = params?.returnAddress;
  const returnLocation = params?.returnLocation;

  const { user } = useAuthStore();
  const postOrderFunction = async (): Promise<void> => {
    try {
      if (!user) {
        Alert.alert("Error", "User not found.");
        return;
      }

      const dto: PostOrderRequestDTO = {
        customerId: user.userIdPK,
        request: commissionData.specification,
        tipFee: 0,
        status: "Pending",
        priority: 0,
        locationLatitude: courierLocation.latitude,
        locationLongitude: courierLocation.longitude,
        customerLatitude: commissionData.coordinates.latitude,
        customerLongitude: commissionData.coordinates.longitude,
        deliveryDistance: coordinates.length > 0 ? coordinates.length : 0,
        deliveryNotes: commissionData.deliveryInstructions,
      };

      setIsLoading(true);
      const response = await postOrder(dto);
      setIsLoading(false);

      Alert.alert("Success", "Order successfully created!");
      console.log("Order created:", response);
    } catch (err: any) {
      setIsLoading(false);
      console.error(
        "Order creation failed:",
        err.response?.data || err.message
      );
      Alert.alert(
        "Error",
        "Failed to create order. Check console for details."
      );
    }
  };

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Request permission and get current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required.");
        return;
      }
      if (courierLocation && params?.returnLocation) {
        (async () => {
          const route = await fetchRoute(
            courierLocation,
            params.returnLocation
          );
          setCoordinates(route);
        })();
      }

      const current = await Location.getCurrentPositionAsync({});

      setDeviceLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });

      setSelectedPin({
        latitude: returnLocation?.latitude ?? current.coords.latitude,
        longitude: returnLocation?.longitude ?? current.coords.longitude,
      });

      setCommissionData({
        address: returnAddress || "",
        specification: "",
        deliveryInstructions: "",
        coordinates: {
          latitude: returnLocation?.latitude ?? current.coords.latitude,
          longitude: returnLocation?.longitude ?? current.coords.longitude,
        },
      });
      setIsLoading(false);
    })();
  }, []);

  const fetchRoute = async (start: Coordinates, end: Coordinates) => {
    try {
      const url = `https://api.geoapify.com/v1/routing?waypoints=${start.latitude},${start.longitude}|${end.latitude},${end.longitude}&mode=drive&apiKey=${GEOAPIFY_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      // Extract coordinates as { latitude, longitude } objects
      const routeCoords = data.features[0].geometry.coordinates[0].map(
        ([lon, lat]: [number, number]) => ({
          latitude: lat,
          longitude: lon,
        })
      );

      return routeCoords;
    } catch (error) {
      console.error("Error fetching route:", error);
      return [];
    }
  };
  const fetchAutocomplete = useCallback(
    async (text: string) => {
      if (text.length === 0) return setSearchResults(recentSearched.current);

      if (!deviceLocation) return;

      const { latitude, longitude } = deviceLocation as Coordinates;
      const params = new URLSearchParams({
        text,
        apiKey: GEOAPIFY_KEY || "",
        limit: "5",
        filter: "countrycode:ph",
        bias: `proximity:${longitude},${latitude}`,
      });

      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?${params}`
      );

      const data = await res.json();
      setSearchResults(data.features || []);
    },
    [deviceLocation]
  );

  const handleAddressChange = useCallback(
    (text: string) => {
      setCommissionData((prev) => ({ ...prev, address: text }));

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        if (text.trim().length === 0) {
          setSearchResults(recentSearched.current);
        } else {
          fetchAutocomplete(text);
        }
      }, 300);
    },
    [fetchAutocomplete]
  );

  const navigation = useNavigation<any>();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={["#545EE1", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1, paddingHorizontal: 20, paddingTop: "10%" }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>
              Commission
            </Text>
          </View>

          <Text style={{ fontSize: 18, color: "white", marginBottom: 10 }}>
            Enter details for commission
          </Text>
          <Text style={{ color: "#FFD966", fontSize: 12, marginBottom: 5 }}>
            NOTE: Delivery fee may vary depending on location.
          </Text>
          {isLoading ? (
            <ActivityIndicator
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
                marginBottom: 15,
              }}
              size="large"
              color="#545EE1"
            />
          ) : (
            deviceLocation && (
              <MapView
                ref={mapRef}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
                // Map centers initially on returnLocation (or fallback)
                initialRegion={{
                  latitude:
                    returnLocation?.latitude ??
                    selectedPin?.latitude ??
                    deviceLocation.latitude,
                  longitude:
                    returnLocation?.longitude ??
                    selectedPin?.longitude ??
                    deviceLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                // Allow panning and zooming freely — not a controlled region
                onPress={() =>
                  navigation.navigate("LocationPicker", {
                    returnAddress: commissionData.address,
                    returnLocation: selectedPin ||
                      deviceLocation || { latitude: 0, longitude: 0 },
                  })
                }
              >
                {/* Fixed Marker — DOES NOT FOLLOW MAP */}
                {returnLocation && (
                  <Marker
                    coordinate={returnLocation}
                    title="Delivery / Pickup Location"
                    description={returnAddress}
                  />
                )}
                <Marker
                  coordinate={courierLocation}
                  title="Courier Location"
                  description="Courier Location"
                />
                <Polyline
                  coordinates={coordinates}
                  strokeColor="#545EE1"
                  strokeWidth={4}
                />
              </MapView>
            )
          )}
          {/* Inputs */}
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
              Address *
            </Text>
            <TextInput
              placeholder="Address"
              placeholderTextColor="#BFC5FF"
              value={commissionData.address}
              onChangeText={handleAddressChange}
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: 10,
                marginBottom: 5,
              }}
            />
            <Button
              title="Clear"
              onPress={() => {
                setCommissionData({
                  address: "",
                  specification: "",
                  deliveryInstructions: "",
                  coordinates: { latitude: 0, longitude: 0 },
                });
                setSearchResults([]);
                recentSearched.current = [];
              }}
            />
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                maxHeight: 160,
                marginBottom: 10,
              }}
            >
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={searchResults}
                keyExtractor={(item) => item.properties.place_id}
                renderItem={({ item }) => {
                  const distance = item.properties.distance ?? null;
                  let distanceLabel = "";
                  if (distance !== null) {
                    if (distance >= 1000) {
                      distanceLabel = `${(distance / 1000).toFixed(1)} km away`;
                    } else {
                      distanceLabel = `${Math.round(distance)} m away`;
                    }
                  }
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("LocationPicker", {
                          returnAddress: item.properties.formatted,
                          returnLocation: {
                            latitude: item.geometry.coordinates[1],
                            longitude: item.geometry.coordinates[0],
                          },
                        })
                      }
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        borderBottomWidth: 0.5,
                        borderColor: "#ccc",
                      }}
                    >
                      <Text style={{ color: "#333", fontWeight: "600" }}>
                        {item.properties.formatted}
                      </Text>

                      {item.properties.distance && (
                        <Text style={{ color: "#666", fontSize: 12 }}>
                          {distanceLabel}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            {/* Autocomplete Dropdown */}
            {/* Specification */}
            <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
              Specification *
            </Text>
            <TextInput
              placeholder="Order Specification"
              placeholderTextColor="#BFC5FF"
              value={commissionData.specification}
              onChangeText={(val) =>
                setCommissionData((prev) => ({
                  ...prev,
                  specification: val,
                }))
              }
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: 10,
                marginBottom: 10,
              }}
            />

            <Text style={{ color: "white", fontSize: 14, marginBottom: 5 }}>
              Delivery Instructions:
            </Text>
            <TextInput
              placeholder="Example: Room code, Building, etc."
              placeholderTextColor="#BFC5FF"
              value={commissionData.deliveryInstructions}
              onChangeText={(val) =>
                setCommissionData((prev) => ({
                  ...prev,
                  deliveryInstructions: val,
                }))
              }
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
              }}
              multiline
            />
          </View>

          {/* Order Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#3C49B8",
              paddingVertical: 15,
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 25,
              marginTop: 10,
            }}
            onPress={postOrderFunction}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
              ₱ {orderPrice} Delivery Fee
            </Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Order
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Orders;
