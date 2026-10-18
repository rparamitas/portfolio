/*
 * X (Twitter) card reuses the exact same generated artwork as the Open Graph
 * image — both platforms expect the large 1200×630 summary_large_image card.
 * The layout is colocated here via re-exports so the two stay in sync.
 */
export { alt, size, contentType } from "./opengraph-image";
export { default } from "./opengraph-image";
