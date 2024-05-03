import { twMerge } from 'tailwind-merge'

import { ClassValue, clsx } from 'clsx'

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
