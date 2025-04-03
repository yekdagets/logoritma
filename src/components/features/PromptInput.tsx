import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors, typography } from "../../theme";

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSurpriseMe: () => void;
  maxLength?: number;
}

function PromptInput({
  value,
  onChangeText,
  onSurpriseMe,
  maxLength = 500,
}: PromptInputProps) {
  return (
    <View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Enter Your Prompt</Text>
        <TouchableOpacity onPress={onSurpriseMe}>
          <Text style={styles.surpriseMeText}>🎲 Surprise me</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.inputContainer,
          value.length > 0 && styles.inputContainerActive,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="A blue lion logo reading 'HEXA' in bold letters"
          placeholderTextColor="#71717A"
          multiline
          numberOfLines={4}
          maxLength={maxLength}
        />
        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    color: colors.text,
    fontFamily: typography.fontFamily,
    fontSize: 20,
    fontWeight: "800",
  },
  surpriseMeText: {
    color: colors.text,
    fontFamily: typography.fontFamily,
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
  },
  inputContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    minHeight: 120,
    width: 342,
    height: 175,
  },
  inputContainerActive: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    color: colors.text,
    fontSize: 16,
    fontFamily: typography.fontFamily,
    marginBottom: 8,
    flex: 1,
  },
  counter: {
    fontFamily: typography.fontFamily,
    fontWeight: "400",
    fontSize: 11,
    textAlign: "center",
    color: "#71717A",
    alignSelf: "flex-start",
  },
});

export default PromptInput;
