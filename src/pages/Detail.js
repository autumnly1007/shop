import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail(props) {
  let { id } = useParams();
  let curItem = props.shoes.find((item) => item.id === Number(id));
  let [count, setCount] = useState(0);
  let [num, setNum] = useState('');

  useEffect(() => {
    if (isNaN(num) == true) {
      alert('숫자만 입력해 주세요.');
    }
  }, [num]);

  return (
    <div className='container'>
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
