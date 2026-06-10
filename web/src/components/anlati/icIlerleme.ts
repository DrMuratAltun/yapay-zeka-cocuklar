'use client'

import { createContext, useContext } from 'react'

/** Konu içi sayfalayıcı (IcSayfa) durumunu çerçeveye bildirir —
 *  yan menü aktif konuda "📄 2/3" gösterebilsin. */
export interface IcIlerlemeDurum {
  sayfa: number
  toplam: number
}

export const IcIlerlemeContext = createContext<{ bildir: (d: IcIlerlemeDurum) => void } | null>(null)

export const useIcIlerleme = () => useContext(IcIlerlemeContext)
