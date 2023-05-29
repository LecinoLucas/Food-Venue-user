import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/system';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../context/CardContext';

const StyledShoppingCartIcon = styled(ShoppingCartIcon)({
    color: 'white',
});

const CartIcon = () => {
    const { cartItems } = useContext(CartContext);
    const history = useHistory();
    const totalPrice = cartItems.reduce((total, item) => total + item.preco, 0);
    const redirectToCarrinho = () => {
        history.push('/carrinho')
    }
    return (
        <button onClick={redirectToCarrinho} className="flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out border-0 cursor-pointer bg-transparent">
            <div className="relative">
                <StyledShoppingCartIcon />
                {cartItems.length > 0 && (
                    <span className="bg-red-500 rounded-full h-5 w-5 text-white text-xs absolute -top-1 -right-1 flex justify-center items-center">{cartItems.length}</span>
                )}
            </div>
            <p className="ml-2 text-white">
                <span>R$ {totalPrice.toFixed(2)}</span>
            </p>
        </button>
    );
};

export default CartIcon;
