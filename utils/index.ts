export const generateSlugFromTitle = (title: string) => title.toString().toLowerCase()
  .replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w-]+/g, '') // Remove all non-word chars
  .replace(/--+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from the start of text
  .replace(/-+$/, '') // Trim - from the end of text