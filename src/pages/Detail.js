import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == 'blue' ? 'white' : 'black')};
  padding: 10px;
`;

function Detail(props) {
  let { id } = useParams();
  let curItem = props.shoes.find((item) => item.id === Number(id));
  let [count, setCount] = useState(0);
  let [num, setNum] = useState('');
  let [alert, setAlert] = useState(true);

  useEffect(() => {
    if (isNaN(num) == true) {
      window.alert('숫자만 입력해 주세요.');
    }

    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);

    // useEffect 실행 전에 return문이 실행됨
    // 기존 로직 제거 시 유용함 (초기화)
    return () => {
      clearTimeout(a);
    };
  }, [num]);

  useEffect(() => {}); // 1. 재렌러딩 될 때 마다 코드를 실행해야 하는 경우
  useEffect(() => {}, []); // 2. mount 시 1회만 코드를 실행해야 하는 경우 (dependency 비우기)
  useEffect(() => {
    return () => {
      // 3. unmount 시 1회만 코드를 실행해야 하는 경우 (dependency 비우기)
    };
  }, []);
  // 4. useEffect 실행 전에 무언가를 실행해야 하는 경우 return () => { }
  // 5. 특정 state 만 변경해야 하는 경우 [state명] (dependency 설정)

  return (
    <div className='container'>
      <YellowBtn bg='blue'>버튼</YellowBtn>
      <YellowBtn bg='orange'>버튼</YellowBtn>
      <input
        type='text'
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
      {alert === true ? <div className='alert alert-warning'>2초이내 구매시 할인</div> : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className='row'>
        <div className='col-md-6'>
          <img src={`https://codingapple1.github.io/shop/shoes${curItem.id + 1}.jpg`} width='100%' />
        </div>
        <div className='col-md-6'>
          <h4 className='pt-5'>{curItem.title}</h4>
          <p>{curItem.content}</p>
          <p>{curItem.price}원</p>
          <button className='btn btn-danger'>주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
