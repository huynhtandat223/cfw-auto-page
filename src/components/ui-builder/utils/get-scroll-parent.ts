export function getScrollParent(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;

  const style = getComputedStyle(element);
  const excludeStaticParent = style.position === "absolute";
  const overflowRegex = /(auto|scroll)/;

  if (style.position === "fixed") return document.body;

  let parent = element.parentElement;
  while (parent) {
    const style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === "static") {
      parent = parent.parentElement;
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return document.body;
} 