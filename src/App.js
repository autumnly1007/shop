import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import Item from './component/Item.js';
import Detail from './pages/Detail.js';

function App() {
  let [shoes] = useState(data);
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
            </>
          }
        />
        <Route path='/detail' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
