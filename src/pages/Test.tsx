import AutoForm from "@/components/ui/auto-form";
import { ShadcnAdminLayout } from "./AutoPage";

import { toast } from "sonner";
import * as z from "zod";

export function InputForm() {
  const formSchema = z.object({
    guestListName: z.string(),
    invitedGuests: z
      .array(
        // Define the fields for each item
        z.object({
          name: z.string(),
          age: z.coerce.number(),
        }),
      )
      .describe("Guests invited to the party")
      .default([
        {
          name: "John",
          age: 24,
        },
        {
          name: "Jane",
          age: 20,
        },
      ]),
  });
  return (
    <ShadcnAdminLayout>
      <AutoForm
        formSchema={formSchema}
        onSubmit={(data) =>
          toast("values:", {
            description: JSON.stringify(data, null, 2),
          })
        }
      >
        <button type="submit">Send now</button>
      </AutoForm>
    </ShadcnAdminLayout>
  );
}
