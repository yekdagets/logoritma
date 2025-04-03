import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LogoRequest, RootStackParamList } from "../types";
import { colors, typography } from "../theme";
import {
  COLLECTION_NAMES,
  LOGO_STYLES,
  SCREEN_TITLES,
  SURPRISE_ME_PROMPTS,
} from "../constants";
import { createLogoRequest, getLogoRequest } from "../services/logoService";
import Header from "../components/common/Header";
import StatusChip from "../components/common/StatusChip";
import CustomButton from "../components/common/CustomButton";
import PromptInput from "../components/features/PromptInput";
import { LogoStyle, GenerationStatus } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

type InputScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Input"
>;
type InputScreenRouteProp = RouteProp<RootStackParamList, "Input">;

function InputScreen() {
  const navigation = useNavigation<InputScreenNavigationProp>();
  const route = useRoute<InputScreenRouteProp>();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>("no-style");
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [logoData, setLogoData] = useState<LogoRequest | null>(null);

  const handleRetry = () => {
    setStatus("idle");
    setCurrentRequestId(null);
    setLogoData(null);
  };

  useEffect(() => {
    if (route.params?.resetStatus) {
      setStatus("idle");
      setCurrentRequestId(null);
      setLogoData(null);

      navigation.setParams({ resetStatus: undefined });
    }
  }, [route.params]);

  const handleCreateLogo = async () => {
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      setStatus("processing");
      setPrompt("");

      // for viewing error state - testing purpose
      if (prompt.toLowerCase().includes("error")) {
        setTimeout(() => {
          setStatus("error");
          setIsLoading(false);
        }, 2000);
        return;
      }
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

  useEffect(() => {
    if (!currentRequestId) return;

    const unsubscribe = onSnapshot(
      doc(db, COLLECTION_NAMES.LOGO_REQUESTS, currentRequestId),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log(`Document updated - new status: ${data.status}`);

          setStatus(data.status);

          if (data.status === "error") {
            console.error("Logo generation failed");
          }
        }
      },
      (error) => {
        console.error("Error listening to document:", error);
      }
    );

    return () => unsubscribe();
  }, [currentRequestId]);

  useEffect(() => {
    if (currentRequestId && status === "done") {
      getLogoRequest(currentRequestId)
        .then((data) => {
          setLogoData(data);
        })
        .catch((error) => {
          console.error("Error fetching logo data:", error);
        });
    }
  }, [currentRequestId, status]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={SCREEN_TITLES.INPUT} />

      {status !== "idle" && (
        <StatusChip
          status={status}
          onPress={handleStatusChipPress}
          logoUrl={status === "done" ? logoData?.imageUrl : undefined}
          onRetry={handleRetry}
        />
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
          {LOGO_STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <TouchableOpacity
                key={style.id}
                onPress={() => setSelectedStyle(style.id)}
              >
                <Image
                  source={style.icon}
                  style={[
                    styles.styleIcon,
                    isSelected && styles.selectedStyleIcon,
                  ]}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    styles.styleText,
                    isSelected && styles.selectedStyleText,
                  ]}
                >
                  {style.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
          icon={
            <Image
              source={require("../../assets/stars.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
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
    ...sharedStyles.centered,
    flex: 1,
    padding: 16,
  },
  sectionLabel: {
    ...sharedStyles.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  stylesContainer: {
    paddingVertical: 8,
    gap: 12,
  },
  styleIcon: {
    width: 90,
    height: 90,
    borderRadius: 13.71,
    marginBottom: 8,
  },
  selectedStyleIcon: {
    borderWidth: 2,
    borderColor: colors.border,
  },
  styleText: {
    fontFamily: typography.fontFamily,
    fontSize: 13,
    fontWeight: "400",
    color: "#71717A",
    textAlign: "center",
  },
  selectedStyleText: {
    fontWeight: "700",
    color: colors.text,
  },
  buttonContainer: {
    padding: 16,
    alignItems: "center",
  },
});

export default InputScreen;
