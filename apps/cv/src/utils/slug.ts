export function generateSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const RESERVED_SLUGS = ['base', 'registry'];

export function generateUniqueSlug(label: string, existingSlugs: string[]): string {
  const base = generateSlug(label);
  const taken = [...existingSlugs, ...RESERVED_SLUGS];
  if (!taken.includes(base)) {
    return base;
  }
  let counter = 2;
  while (taken.includes(`${base}-${counter}`)) {
    counter++;
  }
  return `${base}-${counter}`;
}
