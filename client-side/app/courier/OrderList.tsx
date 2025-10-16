import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/Button";
import ExpandOrder from "@/components/svg/ExpandOrder";
import MinimizeOrderIcon from "@/components/svg/MinimizeOrderIcon";
import { order_list } from "@/constants/order_list";
import NoOrderPoster from "@/components/svg/NoOrderPoster";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OrderList = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleExpand = (orderId: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const hasOrders = Array.isArray(order_list) && order_list.length > 0;

  return (
    <LinearGradient
      colors={["#545EE1", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: "20%",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontWeight: "700", fontSize: 36 }}>
          Orders
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "300",
            fontSize: 16,
            marginBottom: hasOrders ? 20 : 0,
          }}
        >
          List of available orders
        </Text>

        {!hasOrders ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NoOrderPoster />
            <Text style={{ marginTop: 20, color: "#2B2E35", fontSize: 25 }}>
              No New Orders
            </Text>
          </View>
        ) : (
          <FlatList
            data={order_list}
            keyExtractor={(item) => item.orderId.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => {
              const isExpanded = expandedOrderId === item.orderId;
              return (
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 16,
                    elevation: 2,
                  }}
                >
                  {/* Header */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 18, color: "#000" }}>
                        Order No.
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: "600" }}>
                        #{item.orderId}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => toggleExpand(item.orderId)}
                      activeOpacity={0.7}
                    >
                      {isExpanded ? (
                        <MinimizeOrderIcon width={18} height={18} />
                      ) : (
                        <ExpandOrder width={18} height={18} />
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <View
                      style={{
                        marginTop: 15,
                        borderTopWidth: 1,
                        borderColor: "#ddd",
                        paddingTop: 15,
                        gap: 20,
                      }}
                    >
                      {/* Buy Section */}
                      <View>
                        <Text
                          style={{
                            fontWeight: "700",
                            fontSize: 16,
                            paddingVertical: 5,
                          }}
                        >
                          🛒 Buy
                        </Text>
                        <Text style={{ color: "#555" }}>
                          {item.locationBought}
                        </Text>
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            padding: 8,
                            marginTop: 6,
                            gap: 10,
                          }}
                        >
                          <Text>{item.specification}</Text>
                        </View>
                      </View>

                      {/* Delivery Instructions */}
                      <View>
                        <Text
                          style={{
                            fontWeight: "700",
                            fontSize: 16,
                            paddingVertical: 5,
                          }}
                        >
                          Delivery Instructions:
                        </Text>
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 8,
                            padding: 8,
                            marginTop: 6,
                          }}
                        >
                          <Text>{item.instructions}</Text>
                        </View>
                      </View>

                      {/* Delivery Section */}
                      <View>
                        <Text
                          style={{
                            fontWeight: "700",
                            fontSize: 16,
                            paddingVertical: 5,
                          }}
                        >
                          📍 Delivery
                        </Text>
                        <Text style={{ color: "#555" }}>
                          {item.placeDelivered}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 6,
                            paddingVertical: 5,
                          }}
                        >
                          <Text style={{ fontWeight: "600" }}>
                            Delivery Fee:
                          </Text>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: "#aaa",
                              borderRadius: 6,
                              paddingHorizontal: 8,
                              marginLeft: 5,
                            }}
                          >
                            <Text style={{ fontWeight: "600" }}>₱50</Text>
                          </View>
                        </View>
                      </View>

                      {/* Confirm Button */}
                      <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Button
                          onPress={() => {}}
                          textColor="white"
                          fontWeight="bold"
                          fontSize={17}
                          title="Confirm pickup"
                          height={50}
                          width="90%"
                          borderRadius={30}
                          backgroundColor="#545EE1"
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            }}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default OrderList;
