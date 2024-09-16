import { createNumber, createString } from '@base/mocks/utils.mock'
import type { Price } from '@base/models/price/price.model'
import type { Product } from '@cart/models/product/detail/product.model'
import type { ProductUuid } from '@cart/models/product/productUuid.model'
import { generateUuid } from '@shared/utils/uuid/generateUuid.util'

export function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: generateUuid() as ProductUuid,
    isDetail: true,
    name: createString(12),
    price: createNumber(0, 100) as Price,
    ...overrides,
  } satisfies Product
}

export function createProducts(count: number): Product[] {
  return Array.from({ length: count }, () => createProduct())
}
