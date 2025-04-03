import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { colors, typography } from "../theme";
import { LOGO_STYLES, SCREEN_TITLES } from "../constants";
import { createLogoRequest } from "../services/logoService";
import Header from "../components/common/Header";
import StatusChip from "../components/common/StatusChip";
import CustomButton from "../components/common/CustomButton";
import PromptInput from "../components/features/PromptInput";
import { LogoStyle, GenerationStatus } from "../types";

type InputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Input"
>;

const SURPRISE_ME_PROMPTS = [
  "A minimalist tech logo with abstract circuit patterns",
  "A playful mascot logo for a coffee shop with a fox character",
  "A professional logo for a law firm using balanced serif fonts",
  "A blue lion logo reading 'HEXA' in bold letters",
];

function InputScreen() {
  const navigation = useNavigation<InputScreenNavigationProp>();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>("no-style");
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLogo = async () => {
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      setStatus("processing");

      const requestId = await createLogoRequest(prompt, selectedStyle);
      setCurrentRequestId(requestId);

      setIsLoading(false);
    } catch (error) {
      console.error("Error creating logo request:", error);
      setStatus("error");
      setIsLoading(false);
    }
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * SURPRISE_ME_PROMPTS.length);
    setPrompt(SURPRISE_ME_PROMPTS[randomIndex]);
  };

  const handleStatusChipPress = () => {
    if (status === "done" && currentRequestId) {
      navigation.navigate("Output", { requestId: currentRequestId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={SCREEN_TITLES.INPUT} />

      {status !== "idle" && (
        <StatusChip status={status} onPress={handleStatusChipPress} />
      )}

      <View style={styles.content}>
        <PromptInput
          value={prompt}
          onChangeText={setPrompt}
          onSurpriseMe={handleSurpriseMe}
        />

        <Text style={styles.sectionLabel}>Logo Styles</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stylesContainer}
        >
          {LOGO_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleItem,
                selectedStyle === style.id && styles.selectedStyleItem,
              ]}
              onPress={() => setSelectedStyle(style.id)}
            >
              <View style={styles.styleIconContainer}>
                {/* icon coming here */}
              </View>
              <Text style={styles.styleText}>{style.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Create"
          onPress={handleCreateLogo}
          loading={isLoading}
          disabled={!prompt.trim()}
          backgroundColor={[
            colors.primaryGradientStart,
            colors.primaryGradientEnd,
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const sharedStyles = {
  text: {
    fontFamily: typography.fontFamily,
    color: colors.text,
  },
  centered: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionLabel: {
    ...sharedStyles.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  stylesContainer: {
    paddingVertical: 8,
    gap: 12,
  },
  styleItem: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    ...sharedStyles.centered,
    padding: 8,
  },
  selectedStyleItem: {
    borderWidth: 2,
    borderColor: colors.primaryGradientStart,
  },
  styleIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    marginBottom: 8,
    ...sharedStyles.centered,
  },
  styleText: {
    ...sharedStyles.text,
    fontSize: 12,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 16,
    alignItems: "center",
  },
});

export default InputScreen;
