import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GenerationStatus } from "../../types";
import { colors, gradients, typography } from "../../theme";
import { CHIP_STATUS } from "../../constants";

interface StatusChipProps {
  status: GenerationStatus;
  onPress?: () => void;
}

type StatusConfig = {
  [key in GenerationStatus]: {
    backgroundColor?: string;
    iconBackgroundColor: string;
    useGradient?: boolean;
    icon?: React.ReactNode;
  };
};

const statusConfig: StatusConfig = {
  idle: {
    backgroundColor: "transparent",
    iconBackgroundColor: "transparent",
  },
  processing: {
    backgroundColor: colors.cardBackground,
    iconBackgroundColor: colors.cardBackground,
    icon: <ActivityIndicator size="small" color={colors.text} />,
  },
  done: {
    useGradient: true,
    iconBackgroundColor: "#4A3AFF",
  },
  error: {
    backgroundColor: colors.error,
    iconBackgroundColor: colors.errorLight,
  },
};

function StatusChip({ status, onPress }: StatusChipProps) {
  if (status === "idle") {
    return null;
  }

  const config = statusConfig[status];
  const statusTexts =
    status === "processing"
      ? CHIP_STATUS.PROCESSING
      : status === "done"
      ? CHIP_STATUS.DONE
      : CHIP_STATUS.ERROR;

  const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    if (config.useGradient) {
      return (
        <LinearGradient
          colors={
            [colors.primaryGradientStart, colors.primaryGradientEnd] as [
              string,
              string
            ]
          }
          start={gradients.primary.start}
          end={gradients.primary.end}
          style={styles.contentContainer}
        >
          {children}
        </LinearGradient>
      );
    }
    return (
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: config.backgroundColor },
        ]}
      >
        {children}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: config.iconBackgroundColor },
        ]}
      >
        {config.icon}
      </View>
      <ContentWrapper>
        <Text style={styles.text}>{statusTexts.title}</Text>
        <Text style={styles.helperText}>{statusTexts.helper}</Text>
      </ContentWrapper>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 342,
    height: 70,
    borderRadius: 16,
    overflow: "hidden",
  },
  iconContainer: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  contentContainer: {
    width: 272,
    height: 70,
    padding: 12,
    justifyContent: "center",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  text: {
    color: colors.text,
    fontFamily: typography.fontFamily,
    fontSize: 16,
    fontWeight: "500",
  },
  helperText: {
    color: colors.text,
    opacity: 0.8,
    fontFamily: typography.fontFamily,
    fontSize: 12,
    marginTop: 4,
  },
});

export default StatusChip;
