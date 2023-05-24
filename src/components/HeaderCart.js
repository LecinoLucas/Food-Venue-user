import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/system';

const StyledShoppingCartIcon = styled(ShoppingCartIcon)({
    color: 'white',
});

const CartIcon = ({ cartItems }) => (
    <button className="flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out border-0 cursor-pointer bg-transparent">
        <div className="relative">
            <StyledShoppingCartIcon />
            {cartItems > 0 && (
                <span className="bg-red-500 rounded-full h-5 w-5 text-white text-xs absolute -top-1 -right-1 flex justify-center items-center">{cartItems}</span>
            )}
        </div>
        <p className="ml-2 text-white">
            <span>R$ 0,00</span>
        </p>
    </button>
);

export default CartIcon;
