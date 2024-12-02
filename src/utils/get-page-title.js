import defaultSettings from '@/settings'

const title = defaultSettings.title || '安徽省跨境电商创新服务中心公共服务平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
