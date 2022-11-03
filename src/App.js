import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import Item from './component/Item.js';
import Detail from './pages/Detail.js';
import About from './pages/About.js';
import Event from './pages/Event.js';
import Cart from './pages/Cart.js';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(2);
  let navigate = useNavigate();

  return (
    <div className='App'>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/cart');
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path='/'
          element={
            <>
              <div className='main-bg' style={{ backgroundImage: `url(${bg}))` }}></div>
              <div className='container'>
                <div className='row'>
                  {shoes.map((item, idx) => {
                    return <Item item={item} idx={idx} />;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  if (count > 3) {
                    alert('상품이 더 이상 존재하지 않습니다.');
                    return;
                  }

                  // 로딩중 UI 보여주기

                  // axios 가 JSON 을 array, object 로 자동으로 변환해줌
                  axios
                    .get(`https://codingapple1.github.io/shop/data${count}.json`)
                    .then((res) => {
                      /*let copy = [...shoes];
                      res.data.forEach((item) => {
                        copy.push(item);
                      });
                      */
                      let copy = [...shoes, ...res.data];
                      console.log(copy);
                      setShoes(copy);
                      setCount(count + 1);

                      // 로딩중 UI 숨기기
                    })
                    .catch(() => {
                      console.log('fail');
                      // 로딩중 UI 숨기기
                    });

                  // fetch 사용 시 json 을 array/object 로 명시적 변환 해야함
                  /*fetch('https://codingapple1.github.io/shop/data2.json')
                    .then((결과) => 결과.json())
                    .then((data) => {});
                  */

                  // 동시에 ajax 여러 개 요청하기
                  //Promise.all([axios.get('/url1'), axios.get('/url2')]).then(() => {});
                }}
              >
                버튼
              </button>
            </>
          }
        />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>멤버</div>} />
          <Route path='location' element={<div>위치</div>} />
        </Route>
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<div>없는페이지</div>} />
      </Routes>
    </div>
  );
}

export default App;
