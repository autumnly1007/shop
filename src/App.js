import { lazy, Suspense, useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import './App.css';
import data from './data.js';
import axios from 'axios';
import bg from './img/bg.png';
import Event from './pages/Event.js';
import Item from './component/Item.js';
import About from './pages/About.js';

//import Detail from './pages/Detail.js';
//import Cart from './pages/Cart.js';

// 메인 페이지에서 보여줄 필요가 없는 컴포넌트
// 사이트를 발행할 때에도 별도의 js 파일로 분리됨
// 장점: 필요해질 때 import 되기 때문에 자원 절약 가능
// 단점: 해당 컴포넌트를 렌더링 할때 약간의 로딩시간 발생
const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

function App() {
  let [shoes, setShoes] = useState(data);
  let [count, setCount] = useState(2);
  let navigate = useNavigate();

  // JSON.stringify()
  let obj = { name: 'ahn' };
  localStorage.setItem('data', JSON.stringify(obj));

  // JSON.parse()
  let getItem = localStorage.getItem('data');
  //console.log(JSON.parse(getItem).name);

  useEffect(() => {
    if (!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  // react-query 를 이용한 ajax 요청
  let result = useQuery('', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      console.log('요청됨');
      return a.data;
    });
  });

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
          <Nav className='ms-auto'>
            반갑습니다. {result.isLoading && '로딩중'}
            {result.error && '에러가 발생했습니다.'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;
