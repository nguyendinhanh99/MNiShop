// purchaseSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buyData: [],
    purchaseDataCount: 0,
    // Thêm initialState mới để lưu trữ số lượng đơn hàng có trạng thái === 1
    pendingOrdersCount: 0,
};

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        setBuyData(state, action) {
            state.buyData = action.payload;
        },
        setPurchaseDataCount(state, action) {
            state.purchaseDataCount = action.payload;
        },
        // Thêm reducer để cập nhật số lượng đơn hàng có trạng thái === 1
        setPendingOrdersCount(state, action) {
            state.pendingOrdersCount = action.payload;
        },
    },
});

export const { setBuyData, setPurchaseDataCount, setPendingOrdersCount } = purchaseSlice.actions;

export default purchaseSlice.reducer;
