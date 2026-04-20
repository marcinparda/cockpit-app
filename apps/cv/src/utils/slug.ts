export function generateSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateUniqueSlug(label: string, existingSlugs: string[]): string {
  const base = generateSlug(label);
  if (!existingSlugs.includes(base)) {
    return base;
  }
  let counter = 2;
  while (existingSlugs.includes(`${base}-${counter}`)) {
    counter++;
  }
  return `${base}-${counter}`;
}
