import { AppPathPrefix } from 'constants-es'

const buildLink = (link: string, app: `${AppPathPrefix}`): string => {
  return `/${app}${link}`
}

export const buildAdminLink = (link: string): string => {
  return buildLink(link, 'admin')
}

export const buildClientLink = (link: string): string => {
  return buildLink(link, 'client')
}
