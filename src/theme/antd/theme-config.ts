import type { ThemeConfig } from 'antd'

export const antdThemeConfig: ThemeConfig = {
  token: {
    fontFamily: 'Agbalumo, sans-serif',
    colorPrimary: '#21bcd3',
  },
  components: {
    Form: {
      itemMarginBottom: 16,
    } as any,
    Input: {
      controlOutline: 'none',
    },
    
  },
}
