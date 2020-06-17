import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue For Buspos'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}
