import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography } from "../../theme";
import { LogoStyle } from "../../types";

interface PromptOutputProps {
  prompt: string;
  style: LogoStyle;
  onCopy?: () => void;
}

function PromptOutput({ prompt, style, onCopy }: PromptOutputProps) {
  const formatStyleName = (styleId: LogoStyle): string => {
    const words = styleId.split("-");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.promptLabel}>Prompt</Text>
        <TouchableOpacity onPress={onCopy} style={styles.copyButton}>
          <Ionicons name="copy-outline" size={16} color="#A1A1AA" />
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.promptText}>{prompt}</Text>
      <View style={styles.styleTagContainer}>
        <Text style={styles.styleText}>{formatStyleName(style)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  promptLabel: {
    fontFamily: typography.fontFamily,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  copyButton: {
    height: 16,
    borderRadius: 16,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  copyText: {
    fontFamily: typography.fontFamily,
    fontSize: 11,
    fontWeight: 400,
    color: "#A1A1AA",
  },
  promptText: {
    fontFamily: typography.fontFamily,
    fontWeight: "400",
    color: colors.text,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 12,
  },
  styleTagContainer: {
    backgroundColor: "#FAFAFA1A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  styleText: {
    fontFamily: typography.fontFamily,
    color: colors.text,
    fontSize: 12,
  },
});

export default PromptOutput;
