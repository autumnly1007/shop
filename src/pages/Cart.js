import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increase, increaseNum, changeName } from './../store/userSlice.js';
import { deleteItem, increaseCount } from './../store.js';
import { memo, useMemo, useState } from 'react';

// memo: 전송되는 props 가 변할 때만 재렌더링 해줌
// 항상 재렌더링 전에 비교 작업을 함
let Child = memo(function () {
  console.log('리렌더링');
  return <div>자식컴포넌트</div>;
});

function fnMemo() {
  return '반복문 10억번 돌린 결과';
}

function Cart() {
  // useMemo: 컴포넌트 렌더링 시 1회만 실행
  // dependency 가 변화할 때만 동작함
  // useEffect 는 렌더링 후에 실행
  // useMemo 는 렌더링 될 때 실행
  let result = useMemo(() => {
    return fnMemo();
  }, []);

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

  let [count, setCount] = useState(0);

  return (
    <div>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
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
