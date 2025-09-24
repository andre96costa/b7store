import { CartListItem } from "@/types/cart-list-item";
import { CartProductItem } from "./cart-product-item";

type Props = {
    initiaList: CartListItem[];
}

export const CartProductList = ({ initiaList }: Props) => {
    return (
        <div className="bg-white border mb:border-b-0 border-gray-200">
            {initiaList.map(item => (
                <CartProductItem key={item.product.id} item={item} />
            ))}
        </div>
    )
}