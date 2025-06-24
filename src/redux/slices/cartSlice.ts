import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type CartItems = {
    name: string;
    amount: number;
    image: string;
    price: number;
    product: string;
};

type ShippingAddress = {
    fullName: string;
    address: string;
    city: string;
    postalCode: number;
};

export type CartState = {
    cartItem: CartItems[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    user: string;
    isPaid: boolean;
    paidAt: string;
    isDelivered: boolean;
    deliveredAt: string;
};
const initialState: CartState = {
    cartItem: [],
    shippingAddress: {
        fullName: '',
        address: '',
        city: '',
        postalCode: 0,
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItems>) => {
            // Kiểm tra nếu sản phẩm đã có trong giỏ thì tăng số lượng, ngược lại thì thêm mới
            const exitItem = state.cartItem.find((item) => item.product === action.payload.product);

            if (exitItem) {
                exitItem.amount = action.payload.amount;
            } else {
                state.cartItem.push(action.payload);
            }
        },

        // Xóa sản phẩm khỏi giỏ hàng dựa vào product id
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItem = state.cartItem.filter((item) => item.product !== action.payload);
        },
        // Xóa nhiều sản phẩm khỏi giỏ hàng
        removeMultipleFromCart: (state, action: PayloadAction<string[]>) => {
            state.cartItem = state.cartItem.filter((item) => !action.payload.includes(item.product));
        },
        clearCart: (state) => {
            state.cartItem = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, removeMultipleFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
