"use client"

import { useCartStore } from "@/store/cart"
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Address } from '@/types/address';
import { useAuthStore } from "@/store/auth";
import { getUserAddresses } from "@/actions/get-user-addresses";
import { getShippingInfo } from "@/actions/get-shipping-info";

export const ShippingBoxLogged = () => {
    const { token, hydrated } = useAuthStore(state => state);
    const cartStore = useCartStore(state => state);
    const [addresses, setAdressess] = useState<Address[]>([]);
    const [peding, startTransition] = useTransition();


    useEffect(() => {
        if (hydrated && token) {
            startTransition(() => {
                getUserAddresses(token).then(addresses => setAdressess(addresses));
            });
        }
    }, [token, hydrated]);

    useEffect(() => {
        if (cartStore.selectedAddressId) {
           updateShipingInfo();
        }
    }, [cartStore.selectedAddressId, cartStore.shippingDays]);

    const handleSelectAddress = async (e: ChangeEvent<HTMLSelectElement>) => {
        cartStore.clearShipping();
        const id = parseInt(e.target.value);
        if (id) {
            const address = addresses.find(addr => addr.id === id);
            if (address) {
                cartStore.setShippingZipcode(address.zipcode);
                cartStore.setSelectedAddressId(id);
            }
        }
    }

    const updateShipingInfo = async() => {
        if (cartStore.shippingZipcode.length > 4) {
            const shippingInfo = await getShippingInfo(cartStore.shippingZipcode);
            if (shippingInfo) {
                cartStore.setShippingCost(shippingInfo.cost);
                cartStore.setShippingDays(shippingInfo.days);
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <select onChange={handleSelectAddress} value={cartStore.selectedAddressId ?? ''} className="flex-1 px-6 py-5 bg-white border border-gray-200 rounded-sm">
                <option value="">{addresses.length === 0 ? 'Nenhum endereço cadastrado' : 'Selecione um endereço'}</option>
                {addresses.map(item => (
                    <option key={item.id} value={item.id}>{item.street}, {item.number} - {item.city} ({item.zipcode})</option>
                ))}
            </select>
            <button className="cursor-pointer px-6 py-5 bg-blue-600 text-white border-0 rounded-sm">
                Adicionar novo endereço
            </button>
        </div>
    )
}