import type { AddressForm } from '@base/types/core/addressForm.model'

export class AddressUtil {
  static formatAddressForm(address: AddressForm | null): string {
    if (address == null) {
      return ''
    }

    return `${address.street} ${address.number}, ${address.postalCode} ${address.city}, ${address.country.toUpperCase()}`
  }
}
