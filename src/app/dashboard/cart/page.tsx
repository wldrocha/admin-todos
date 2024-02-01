import { Product, products } from '@/products'
import { ItemCard } from '@/shopping-cart'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Shopping cart',
  description: 'Shopping cart with SEO'
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = []
  for (const id of Object.keys(cart)) {
    const product = products.find((p) => p.id === id)
    if (product) {
      productsInCart.push({ product, quantity: cart[id] })
    }
  }

  return productsInCart
}

export default function CartPage() {
  const cookieStore = cookies()
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')
  const productInCart = getProductsInCart(cart)

  return (
    <div>
      <h1 className='text-5xl'>Product Cart</h1>
      <hr className='mb-2' />
      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {productInCart.map(({ product, quantity }) => (
            <ItemCard key={product} product={product} quantity={quantity} />
          ))}
        </div>
      </div>
    </div>
  )
}
