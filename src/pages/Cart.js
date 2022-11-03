import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increase, increaseNum, changeName } from './../store/userSlice.js';
import { deleteItem, increaseCount } from './../store.js';

function Cart() {
  // 스토어에 있던 state 를 가져오는 함수
  let state = useSelector((state) => {
    return state;
  });

  // 스토어 있던 state 에서 원하는 것만 가져오기
  let cart = useSelector((state) => {
    return state.cart;
  });

  // store.js 에 요청을 보내주는 함수
  let dispatch = useDispatch();

  return (
    <div>
      {state.user.name} ({state.user.age}) 의 장바구니
      <button
        onClick={() => {
          dispatch(increaseNum(100));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button
                    onClick={() => {
                      // redux state 변경
                      dispatch(increaseCount(item.id));
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      // redux state 삭제
                      dispatch(deleteItem(item.id));
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
