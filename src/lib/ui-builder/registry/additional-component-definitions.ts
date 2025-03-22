import { Label } from "@/components/ui/label";
import { z } from "zod";
import { ComponentRegistry } from "./component-registry";
import { childrenAsTextareaFieldOverrides } from "./form-field-overrides";

export const AdditionalComponentDefinitions: ComponentRegistry = {
  Label: {
    component: Label,
    schema: z.object({
      asChild: z.boolean().optional().default(false),
      htmlFor: z.string().optional(),
      children: z.any().optional(),
    }),
    from: "@/components/ui/label",
    defaultChildren: "Text",
    fieldOverrides: {
      children: (layer) => childrenAsTextareaFieldOverrides(layer),
    },
  },
};
