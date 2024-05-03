import { get, isEmpty } from 'lodash'

interface Tree {
  [key: string]: any
  children?: Tree[]
}

export const findItemInNestedArray = <V = any, RS = any>(
  data: RS[] | Tree[],
  key: string,
  value: V,
): RS | Tree | null => {
  const dataLength = data.length
  let itemFound: Tree | null = null

  for (let i = 0; i < dataLength; i++) {
    const item: Tree = data[i] as Tree

    if (typeof value === 'function' && value(item[key])) {
      return (itemFound = item)
    } else if (item[key] === value) {
      return (itemFound = item)
    }

    if (!itemFound && !isEmpty(item.children)) {
      const tempResult = findItemInNestedArray<V>(
        item.children as Tree[],
        key,
        value,
      )

      if (tempResult) {
        itemFound = tempResult
      }
    }
  }

  return itemFound
}

export const getParentsOfItemInNestedArray = <V = any, RS = Tree>(
  data: RS[],
  key: string[],
  value: V,
  parents: RS[] = [],
): { found: boolean; parents: RS[] } => {
  const dataLength = data.length
  let result = {
    found: false,
    parents: [] as RS[],
  }

  for (let i = 0; i < dataLength; i++) {
    const item: Tree = data[i] as Tree

    if (typeof value === 'function' && value(get(item, key))) {
      return {
        found: true,
        parents,
      }
    } else if (get(item, key) === value) {
      return {
        found: true,
        parents,
      }
    }

    if (!result.found && !isEmpty(item.children)) {
      const maybeParents = [...parents, item]
      const maybeResult = getParentsOfItemInNestedArray<V, RS | Tree>(
        item.children as RS[],
        key,
        value,
        maybeParents,
      )

      if (maybeResult.found) {
        result = maybeResult as any
      }
    }
  }

  return result
}

export const mapTreeData = (data: any[]): any =>
  data.map((item) => {
    let children

    if (!isEmpty(item.children)) {
      children = mapTreeData(item.children)
    }

    return {
      title: item.name,
      value: item.id,
      children,
    }
  })
