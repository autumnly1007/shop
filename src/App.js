import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import Item from './component/Item.js';
import Detail from './pages/Detail.js';
import About from './pages/About.js';
import Event from './pages/Event';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  let [shoes, setShoes] = useState(data);
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
                navigate('/detail');
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
                  axios
                    .get('https://codingapple1.github.io/shop/data2.json')
                    .then((res) => {
                      let copy = [...shoes];
                      res.data.forEach((item) => {
                        copy.push(item);
                      });
                      console.log(copy);
                      setShoes(copy);
                    })
                    .catch(() => {
                      console.log('fail');
                    });
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
        <Route path='*' element={<div>없는페이지</div>} />
      </Routes>
    </div>
  );
}

export default App;
