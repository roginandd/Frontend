import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

interface SwitchRoleProps {
  isVisible: boolean;
  onClose: () => void;
}

const SwitchRole: React.FC<SwitchRoleProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Are you sure you want to change roles?
          </Text>

          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: "#545EE1",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Switch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SwitchRole;
