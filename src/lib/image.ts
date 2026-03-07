export function buildSrcSet(
  sources: Array<[src: string | null | undefined, width: number]>,
): string | undefined {
  const entries = sources
    .filter(([src]) => Boolean(src))
    .map(([src, width]) => `${src} ${width}w`);

  return entries.length ? entries.join(", ") : undefined;
}
