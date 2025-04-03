import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients, typography } from "../../theme";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string | [string, string];
  icon?: React.ReactNode;
}

function CustomButton({
  onPress,
  title,
  loading = false,
  disabled = false,
  style,
  textStyle,
  backgroundColor,
  icon,
}: CustomButtonProps) {
  const isDisabled = disabled || loading;
  const isGradient = Array.isArray(backgroundColor);

  const renderButtonContent = () => {
    if (loading) {
      return <ActivityIndicator color={colors.text} />;
    }

    return (
      <View style={styles.contentContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    );
  };

  if (isGradient) {
    const gradientColors = backgroundColor as [string, string];

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[styles.button, isDisabled && styles.disabled, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradientColors}
          start={gradients.primary.start}
          end={gradients.primary.end}
          style={styles.gradient}
        >
          {renderButtonContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const defaultColor = colors.primaryGradientStart;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor: isDisabled
            ? colors.cardBackground
            : (backgroundColor as string) || defaultColor,
        },
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      {renderButtonContent()}
    </TouchableOpacity>
  );
}

const commonStyles = {
  centered: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
};

const styles = StyleSheet.create({
  button: {
    width: 342,
    height: 56,
    borderRadius: 50,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    height: "100%",
    ...commonStyles.centered,
  },
  contentContainer: {
    flexDirection: "row",
    ...commonStyles.centered,
    gap: 8,
  },
  iconContainer: {
    width: 20,
    height: 20,
    ...commonStyles.centered,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: typography.fontFamily,
  },
  disabled: {
    opacity: 0.7,
  },
});

export default CustomButton;
