import { setCartState } from "@/actions/set-cart-state";
import { useCartStore } from "@/store/cart";
import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";

type Props = {
    item: CartListItem;
}

export const CartProductItem = ({ item }: Props) => {
    const cartStore = useCartStore(state => state);

    const updateCookie = async () => {
        const updatedCart = useCartStore.getState().cart;
        console.log(`updatedCart ?`, updatedCart);
        await setCartState(updatedCart);
    }

    const handleRemove = async () => {
        cartStore.removeItem(item.product.id);
        await updateCookie();
    }

    const handleMinus = async () => {
        if (item.quantity > 1) {
            cartStore.updateQuantity(item.product.id, item.quantity - 1);
            await updateCookie();
        }else {
            await handleRemove();
        }
    }

    const handlePlus = async () => {
        console.log("##### a1ui ");
        cartStore.updateQuantity(item.product.id, item.quantity + 1);
        await updateCookie();
    }

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
                   <div className="text-sm mb-2"> {item.product.label}</div>
                   <div className="hidden text-xs text-gray-500 md:block">COD: {item.product.id} </div>
                </div>
                <div>
                    <div className=" w-30 flex border text-gray-500 border-gray-200 rounded-sm text-center">
                        <div onClick={handleMinus}  className="size-10 text-2xl flex justify-center items-center cursor-pointer">
                            -
                        </div>
                        <div className="size-10 text-lg border-x border-gray-200 flex justify-center items-center">{item.quantity}</div>
                        <div onClick={handlePlus} className="size-10 text-2xl flex justify-center items-center cursor-pointer">
                            +
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-24 flex flex-col justify-between items-end md:flex-row md:w-40 md:items-center">
                <div className="text-lg text-blue-600">
                    R$ {item.product.price.toFixed(2)}
                </div>
                <div>
                    <div onClick={handleRemove} className="size-12 border border-gray-200 flex justify-center items-center rounded-sm"> <Image src={"/assets/ui/trash.png"} alt="" width={24} height={24} /> </div>
                </div>
            </div>
        </div>
    )
}