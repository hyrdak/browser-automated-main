import { useAppSelector } from "libs/redux"

import { StateReactFlow } from "./interface"

interface UseReactFlow extends StateReactFlow {}

export const useReactFlow = (): UseReactFlow => {
  const reactFlow = useAppSelector((state:any) => state.reactFlow)

  return reactFlow
}
