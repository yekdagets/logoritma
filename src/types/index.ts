export type LogoStyle = "no-style" | "monogram" | "abstract" | "mascot" | "neo";

export type GenerationStatus = "idle" | "processing" | "done" | "error";

export interface LogoRequest {
  id: string;
  prompt: string;
  style: LogoStyle;
  status: GenerationStatus;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}

export type RootStackParamList = {
  Input: undefined;
  Output: { requestId: string };
};
