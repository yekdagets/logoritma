import { LogoStyle } from "../types";

export const COLLECTION_NAMES = {
  LOGO_REQUESTS: "logo_requests",
};

export const LOGO_STYLES: Array<{
  id: LogoStyle;
  label: string;
  icon: string;
}> = [
  { id: "no-style", label: "No Style", icon: "circle-outline" },
  { id: "minimalist", label: "Minimalist", icon: "circle-outline" },
  { id: "abstract", label: "Abstract", icon: "circle-outline" },
  { id: "mascot", label: "Mascot", icon: "circle-outline" },
  { id: "neo", label: "Neo", icon: "circle-outline" },
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
    helper: "Tap to see progress",
  },
  DONE: {
    title: "Your design is ready!",
    helper: "Tap to see it",
  },
  ERROR: {
    title: "Oops! Something went wrong",
    helper: "Click to try again",
  },
};

export const DEFAULT_LOGO_URL =
  "https://via.placeholder.com/300/ffffff?text=HC";
