import { ImageSourcePropType } from "react-native";
import { LogoStyle } from "../types";

export const COLLECTION_NAMES = {
  LOGO_REQUESTS: "logo_requests",
};

export const LOGO_STYLES: Array<{
  id: LogoStyle;
  label: string;
  icon: ImageSourcePropType;
}> = [
  {
    id: "no-style",
    label: "No Style",
    icon: require("../../assets/logo-styles-images/no-style.png"),
  },
  {
    id: "monogram",
    label: "Monogram",
    icon: require("../../assets/logo-styles-images/monogram.png"),
  },
  {
    id: "abstract",
    label: "Abstract",
    icon: require("../../assets/logo-styles-images/abstract.png"),
  },
  {
    id: "mascot",
    label: "Mascot",
    icon: require("../../assets/logo-styles-images/mascot.png"),
  },
  {
    id: "neo",
    label: "Neo",
    icon: require("../../assets/logo-styles-images/neo.png"),
  },
];

export const SCREEN_TITLES = {
  INPUT: "AI Logo",
  OUTPUT: "Your Design",
};

export const APP_TEXT = {
  PROMPT_PLACEHOLDER: "Enter your prompt",
  CREATE_BUTTON: "Create",
  SCREEN_READER_HINT: "A touch less logo reflecting in bold letters.",
};

export const CHIP_STATUS = {
  PROCESSING: {
    title: "Creating your design...",
    helper: "Ready in 2 minutes",
  },
  DONE: {
    title: "Your design is ready!",
    helper: "Tap to see it.",
  },
  ERROR: {
    title: "Oops! Something went wrong",
    helper: "Click to try again.",
  },
};

export const DEFAULT_LOGO_URL =
  "https://via.placeholder.com/300/ffffff?text=HC";

export const SURPRISE_ME_PROMPTS = [
  "A minimalist tech logo with abstract circuit patterns",
  "A playful mascot logo for a coffee shop with a fox character",
  "A professional logo for a law firm using balanced serif fonts",
  "A blue lion logo reading 'HEXA' in bold letters",
];
