/**
 * Transformation
 */

export function slugify(text) {
  return text
    .normalize('NFD')
    .trim()
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-');
}
