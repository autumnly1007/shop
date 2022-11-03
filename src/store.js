import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js';

// Redux store 안에 모든 state 를 넣지 않는 것이 좋음
// 컴포넌트 간 공유가 필요하지 않은 경우 useState() 만 써도 됨

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
  reducers: {
    changeStock(state) {
      return state + 1;
    },
  },
});

export let { changeStock } = stock.actions;

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    increaseCount(state, action) {
      //state[action.payload].count += 1; // 정렬 시 문제 발생
      let num = state.findIndex((obj) => {
        return obj.id === action.payload;
      });
      state[num].count += 1;
    },
    insertItem(state, action) {
      let num = state.findIndex((obj) => {
        return obj.id === action.payload.id;
      });
      if (num === -1) {
        state.push({ id: action.payload.id, name: action.payload.title, count: 1 });
      } else {
        state[num].count += 1;
      }
    },
    deleteItem(state, action) {
      let num = state.findIndex((obj) => {
        return obj.id === action.payload;
      });
      if (state[num].count === 1) {
        state.splice(num, 1);
      } else {
        state[num].count -= 1;
      }
    },
  },
});

export let { increaseCount, insertItem, deleteItem } = cart.actions;

export default configureStore({
  // state 를 여기에 등록해야 사용 가능
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
