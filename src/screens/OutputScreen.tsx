import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { colors, typography } from "../theme";
import { SCREEN_TITLES } from "../constants";
import { getLogoRequest } from "../services/logoService";
import Header from "../components/common/Header";
import PromptOutput from "../components/features/PromptOutput";
import PreviewLogo from "../components/features/PreviewLogo";
import { LogoRequest } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type OutputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Output"
>;
type OutputScreenRouteProp = RouteProp<RootStackParamList, "Output">;

function OutputScreen() {
  const route = useRoute<OutputScreenRouteProp>();
  const navigation = useNavigation<OutputScreenNavigationProp>();

  const { requestId } = route.params;

  const [logoData, setLogoData] = useState<LogoRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        setLoading(true);
        const data = await getLogoRequest(requestId);
        setLogoData(data);
      } catch (err) {
        console.error("Error fetching logo data:", err);
        setError("Failed to load logo data");
      } finally {
        setLoading(false);
      }
    };

    fetchLogoData();
  }, [requestId]);

  const handleCopyPrompt = () => {
    Alert.alert("Copied", "Prompt copied to clipboard");
  };

  const renderCloseButton = () => {
    return (
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate("Input", { resetStatus: true })}
      >
        <Ionicons name="close" size={24} color={colors.text} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={SCREEN_TITLES.OUTPUT}
        rightComponent={renderCloseButton()}
      />

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={colors.primaryGradientStart}
            />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : logoData ? (
          <>
            <PreviewLogo imageUrl={logoData.imageUrl || ""} size="large" />

            <PromptOutput
              prompt={logoData.prompt}
              style={logoData.style}
              onCopy={handleCopyPrompt}
            />
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No logo data available</Text>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    ...sharedStyles.centered,
  },
  errorContainer: {
    flex: 1,
    ...sharedStyles.centered,
  },
  errorText: {
    ...sharedStyles.text,
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    padding: 8,
  },
});

export default OutputScreen;
