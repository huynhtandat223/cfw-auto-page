import { z } from "zod";
import { Layer } from "../store/layer-store";

export const componentRegistry = {
  button: {
    type: "component",
    schema: z.object({
      variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).default("default"),
      size: z.enum(["default", "sm", "lg", "icon"]).default("default"),
      className: z.string().optional(),
      children: z.string().optional(),
    }),
    defaultChildren: "Click me",
  },
  input: {
    type: "component",
    schema: z.object({
      type: z.enum(["text", "password", "email", "number"]).default("text"),
      placeholder: z.string().optional(),
      className: z.string().optional(),
    }),
    defaultChildren: "",
  },
  // Add more components as needed
} as const;

export function generateFieldOverrides(layer: Layer) {
  return {
    className: {
      fieldType: "text",
      description: "CSS classes to apply to the component",
    },
    children: {
      fieldType: "text",
      description: "Content to display inside the component",
    },
  };
} 