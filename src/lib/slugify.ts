import slugify from "slugify";

export function toSlug(title: string, maxLength = 60): string {
  let slug = slugify(title, { lower: true, strict: true, trim: true });

  if (slug.length > maxLength) {
    slug = slug.slice(0, maxLength);
    const lastHyphen = slug.lastIndexOf("-");
    if (lastHyphen > 0) {
      slug = slug.slice(0, lastHyphen);
    }
  }

  return slug;
}
