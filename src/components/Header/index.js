import { BrowserRouter as Router, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import images from "../../assets/images";
import styles from '../Header/Header.module.scss'
import classNames from "classnames/bind";

const cx =  classNames.bind(styles)

function Navs() {
  return (
    <>
      <Navbar variant="dark" className={cx('nav-header')}>
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          
          <div className={cx('header')}>
          <div className={cx('header-logo-name')} >
            <img src={images.logo} alt='logo'/>
              <h4 className = {cx('header-name')}>Học viện công nghệ bưu chính viễn thông</h4>
          </div >
            <Nav className="me-auto">
           
              <Nav.Link as = {Link} to="/Login" className={cx('login')}>Login</Nav.Link>
              
            </Nav>
          </div >
        </Container>
      </Navbar>
      
    </>

  );
}

export default Navs;
