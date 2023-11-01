import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import {Button, Stack} from "react-bootstrap";
import storeItems from "../data/items.json"
import {formatCurrency} from "../currency/formatCurrency.ts";
type CartItemProps = {
    id:number
    quantity:number
}
export function CartItem({id, quantity}: CartItemProps) {
    const {removeFromCart} = useShoppingCart()
    const {increaseCartQuantity} = useShoppingCart()
    const {decreaseCartQuantity} = useShoppingCart()

    const item = storeItems.find (i => i.id === id)
    if (item == null) return null
    return (
        <Stack direction="horizontal" gap={3} className = "d-flex align-items-center">
            <img

                src={item.imgUrl}
                className = "w-25 h1 object-fit -cover"
                //style={{
                //width:"100px",
                // height:"60px",
                // objectFit:"cover",

                //}}
            />
            <div className = "me - auto">
                <div>
                    {item.name}{" "}
                    { quantity > 1 && (
                        <span className = "text-muted" style ={{fontSize:"0.8rem"}}>
                            x{quantity}
                        </span>
                    )

                    }
                </div>

            </div>
            <div className = "text-muted" style ={{fontSize:"0.75rem"}}>
                {formatCurrency(item.price)}
            </div>
            {/*todo функция форматтера валюты везде, где есть прайс */}
            <div>{formatCurrency(item.price * quantity )}</div>
            <Button
                onClick = {() => decreaseCartQuantity(item.id)}
                variant="info"
            > - </Button>
            <Button
                onClick = {() => increaseCartQuantity(item.id)}
                variant="info"
            > + </Button>
            <Button
                variant= "outline-danger"
                size = "sm"
                onClick = {() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    )
}
