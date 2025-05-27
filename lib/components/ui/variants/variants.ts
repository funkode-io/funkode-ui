export const validVariants = ["default", "primary", "secondary", "accent", "info", "success", "warning", "error"];

export type Variant = typeof validVariants[number];

export function isVariant(value: string): value is Variant {
  return validVariants.includes(value);
}
