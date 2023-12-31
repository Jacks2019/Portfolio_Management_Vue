import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template2'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
