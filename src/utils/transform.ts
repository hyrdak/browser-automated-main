import { isEmpty, pickBy } from 'lodash'

import { COMMAND_NODE_ICONS, CommandNode,  } from 'components/common/react-flows/constants/enum'

export const toArray = <T = any>(data?: T | T[]): T[] => {
  if (!data) {
    return []
  }

  return Array.isArray(data) ? data : [data]
}

export const getNestedChildren = (
  data: any[],
  parentId: number | null,
): any[] => {
  const out: any = []

  // eslint-disable-next-line @typescript-eslint/no-for-in-array
  for (const i in data) {
    const itemParentId = data[i].parentId ?? null
    if (itemParentId === parentId) {
      const children = getNestedChildren(data, data[i].id)

      const dataPush: any = {
        ...data[i],
      }

      if (children.length) {
        dataPush.children = children
      }

      out.push(dataPush)
    }
  }

  return out
}

export function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'))
}

export const toSlug = (str: string): string =>
  str
    .toLowerCase()
    .normalize('NFD') // chuyển về dạng tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu tổ hợp
    .replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D')) // chuyển chữ đ/Đ thành d/D
    .replace(/\s+/g, '-')

export const getAllChildren = (data: any[], parentId: number): any[] => {
  const children: any[] = []
  // grab the children
  const posts: any[] = []
  for (const item of data) {
    if (item.parentId === parentId) {
      posts.push(item)
    }
  }

  // now grab the grand children
  for (const child of posts) {
    // recursion!! hurrah
    const gChildren = getAllChildren(data, child.id)

    // merge the grand children into the children array
    if (!isEmpty(gChildren)) {
      children.push(...gChildren)
    }
  }

  // merge in the direct descendants we found earlier
  children.push(...posts)

  return children
}

export const titleCase = (value: string) =>
  value
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(' ')

export const htmlToText = (htmlString: string): string =>
  htmlString.replace(/<[^>]+>/g, '').replace(/\n/g, ' ')

export const normalizeString = (str: string) => {
  if (!str) {
    return ''
  }

  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const getPageOffset = (
  page: number | string,
  limit: number | string,
) => {
  const offset = +page > 1 ? (+page - 1) * +limit : 0

  return offset
}

export const toDateFromTimestamp = (timestamp: number) =>
  new Date(timestamp * 1000)

export function base64EncodeUnicode(str: string) {
  // first we use encodeURIComponent to get percent-encoded Unicode,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        // return String.fromCharCode(('0x' + p1) as any)
        return String.fromCharCode(parseInt(p1, 16))
      },
    ),
  )
}

export function base64DecodeUnicode(str: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )
}

export function getFilenameFromPath(path: string) {
  const pathSplit = path.split('/')

  return pathSplit[pathSplit.length - 1]
}

export function pickByNotEmpty(data: any) {
  return pickBy(
    data,
    (value) =>
      value !== null &&
      value !== undefined &&
      value !== '' &&
      (typeof value === 'object' ? !isEmpty(value) : true),
  )
}
export function getIcon(type: CommandNode) {
  if(!type) return null
  const Icon =  COMMAND_NODE_ICONS[type]
  
return  Icon
}
