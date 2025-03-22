import { ComponentRegistry } from "@/lib/ui-builder/registry/component-registry";
import { z } from "zod";
import { InputField } from "./input-field";

export const FormComponentDefintions: ComponentRegistry = {
  InputField: {
    component: InputField,
    schema: z.object({
      type: z.string().optional().default("text"),
      placeholder: z.string().optional(),
    }),
    from: "@/components/form-builder/input-field",
    fieldOverrides: {},
  },
};
