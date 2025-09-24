import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";

type Props = {
    item: CartListItem;
}

export const CartProductItem = ({ item }: Props) => {
    return (
        <div className="flex items-center p-6 gap-4 md:gap-8 border-0 md:border-b border-gray-200">
            <div className="border border-gray-200 p-1">
                <Image 
                    src={item.product.image}
                    alt={item.product.label}
                    width={96}
                    height={96}
                    className="size-24 md:size-16"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between items-end md:flex-row md:items-center">
                <div>
                   <div className="text-sm"> {item.product.label}</div>
                   <div className="hidden text-xs text-gray-500 mt-2 md:block">COD: {item.product.id} </div>
                </div>
                <div>{item.quantity}</div>
            </div>
            <div className="w-24 flex flex-col justify-between items-end md:flex-row md:w-40 md:items-center">
                <div className="text-lg text-blue-600">
                    R$ {item.product.price.toFixed(2)}
                </div>
                <div>
                    <div className="size-12 border border-gray-200 flex justify-center items-center rounded-sm"> <Image src={"/assets/ui/trash.png"} alt="" width={24} height={24} /> </div>
                </div>
            </div>
        </div>
    )
}