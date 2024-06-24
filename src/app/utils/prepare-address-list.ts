import { AddressTypeEnum } from "../enums/address-type.enum";
import { IAddressToDisplay } from "../interfaces/address-to-display.interface";
import { IAddress } from "../interfaces/user/address.interface";
import { AddressList } from "../types/address-list";
import { addressTypeDescriptionMap } from "./address-type-description-map";

export const prepareAddressList = (originalUserAdressList: AddressList, isDisplayAdress: boolean, callback: (address: IAddressToDisplay) => void) => {
  Object.keys(addressTypeDescriptionMap).map(Number).forEach((addressType: number) => {
    const addressFound = originalUserAdressList.find((userAddress) => userAddress.type === addressType);

    let address = {} as IAddressToDisplay;

    if (isDisplayAdress) {
      address = returnAddressToDisplay(addressFound, addressType)
    } else {
      address = returnAddressToEdit(addressFound, addressType)
    }

    callback({
      ...address,
    });
  })
}

const returnAddressToEdit = (address: IAddress | undefined, addressType: number) =>  {
  if(!address) {
    return {
      typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
      type: addressType,
      street: '',
      complement: '',
      country: '',
      state: '',
      city: '',
    }
  };

  return {
    typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
    ...address
  }
}

const returnAddressToDisplay = (address: IAddress | undefined, addressType: number) =>  {
  if(!address) {
    return {
      typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
      type: addressType,
      street: '-',
      complement: '-',
      country: '-',
      state: '-',
      city: '-',
    }
  };

  return {
    typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
    ...address
  }
}
