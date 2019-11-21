import defaultSettings from '@/settings'

const title = defaultSettings.title || '小棕熊'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
