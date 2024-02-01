/* 


*/

import { getCookie, hasCookie, setCookie } from 'cookies-next'

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    return JSON.parse((getCookie('cart') as string) ?? '{}')
  }

  return {}
}

export const addProductToCart = (id: string): void => {
  const cookieCart = getCookieCart()

  cookieCart[id] = cookieCart[id] ? cookieCart[id] + 1 : 1

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string): void => {
  const cookieCart = getCookieCart()

  delete cookieCart[id]

  setCookie('cart', JSON.stringify(cookieCart))
}
