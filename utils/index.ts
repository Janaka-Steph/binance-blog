import {IncomingMessage} from 'http'

export const generateSlugFromTitle = (title: string) => title.toString().toLowerCase()
  .replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w-]+/g, '') // Remove all non-word chars
  .replace(/--+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from the start of text
  .replace(/-+$/, '') // Trim - from the end of text

/**
 * Get base URL
 * Suited for Now deployment
 * @param req
 */
export const getBaseURL = (req?: IncomingMessage) => {
  if (req) {
    const isDev = process.env.NODE_ENV === 'development' || process.env.NOW_REGION === 'dev1'
    const protocol = req.headers['x-forwarded-proto'] || isDev ? 'http' : 'https'
    const host = req.headers['x-forwarded-host'] || req.headers.host
    return `${protocol}://${host}`
  }
  return window.location.origin
}
