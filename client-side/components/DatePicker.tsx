import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  placeholder?: string;
}

const DatePicker = ({
  label,
  value,
  onChange,
  maximumDate,
  minimumDate,
  placeholder = "MM/DD/YYYY",
}: DatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date>(value);

  const handleConfirmDate = () => {
    onChange(tempDate);
    setShowDatePicker(false);
  };

  const handleCancelDate = () => {
    setTempDate(value);
    setShowDatePicker(false);
  };

  return (
    <View style={{ flexDirection: "column", gap: 10 }}>
      {label && (
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{label}</Text>
      )}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 15,
        }}
        onPress={() => {
          setTempDate(value);
          setShowDatePicker(true);
        }}
      >
        <Text style={{ color: "#000" }}>
          {value ? value.toLocaleDateString() : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelDate}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
          activeOpacity={1}
          onPress={handleCancelDate}
        >
          <TouchableOpacity activeOpacity={1}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E5E5E5",
                }}
              >
                <TouchableOpacity onPress={handleCancelDate}>
                  <Text style={{ fontSize: 16, color: "#000" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirmDate}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#34C759",
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate}
                style={{
                  alignSelf: "center",
                }}
                mode="date"
                display="spinner"
                textColor="black"
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setTempDate(selectedDate);
                  }
                }}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DatePicker;
