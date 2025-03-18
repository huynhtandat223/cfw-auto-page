import UIBuilder from "@/components/page-builder";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return <UIBuilder />;
}
