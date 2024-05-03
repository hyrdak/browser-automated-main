export function stringTemplate(
  template: string,
  args: {
    [key: string]: string
  } = {},
  patternType: 'mustache' | 'colon' = 'mustache',
): string {
  let newText = template
  for (const key in args) {
    const pattern = patternType === 'mustache' ? `{{${key}}}` : `:${key}`
    const regex = new RegExp(pattern, 'g')

    newText = newText.replace(regex, args[key])
  }

  return newText
}

export function formatNumber(value: number): string {
  const result = new Intl.NumberFormat('vi-VN', {
    currency: 'VND',
    unitDisplay: 'narrow',
  }).format(value)

  return result
}
export const formatPhone = (phone: string = ''): string => {
  let newPhone = phone ?? ''
  if (
    typeof newPhone === 'string' &&
    (newPhone.startsWith('+84') || newPhone.startsWith('0'))
  ) {
    if (newPhone.startsWith('+84')) {
      newPhone = `0${newPhone.substring(3, newPhone.length)}`
    }

    return newPhone
  }

  return newPhone
}
export const convertNewPhonePrefix = (phone: string): string => {
  const NEW_PHONE_PREFIX = {
    // VINAPHONE
    '0123': '083',
    '0124': '084',
    '0125': '085',
    '0127': '081',
    '0129': '082',
    // MOBIFONE
    '0120': '070',
    '0121': '079',
    '0122': '077',
    '0126': '076',
    '0128': '078',
    // VIETTEL
    '0162': '032',
    '0163': '033',
    '0164': '034',
    '0165': '035',
    '0166': '036',
    '0167': '037',
    '0168': '038',
    '0169': '039',
    // VIETNAMOBILE
    '0186': '056',
    '0188': '058',
    // GMOBILE
    '0199': '059',
  }
  const oldPrefix = phone.substring(0, 4)
  const newPrefix = NEW_PHONE_PREFIX[oldPrefix as keyof typeof NEW_PHONE_PREFIX]
  if (!newPrefix) {
    return phone
  }
  const tail = phone.substring(4, 11)
  phone = newPrefix + tail

  return phone
}
