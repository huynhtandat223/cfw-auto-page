import { componentRegistry } from "./component-registry";

export function isPrimitiveComponent(component: typeof componentRegistry[keyof typeof componentRegistry]) {
  return typeof component === "string" || component.type === "primitive";
} 