import styles from "../Login/Login.module.scss";
import classNames from "classnames/bind";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import images from "../../assets/images";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {useState, useEffect} from "react";
import { handleLoginApi,getApi} from "../../service/accountService";

const cx = classNames.bind(styles);
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");


  useEffect(() => {
    console.log('ad');
    async function fetchData() {
      // You can await here
      let x = await getApi("mckd221");
    console.log('data node.js', x);
    
      // ...
    }
    fetchData();
    
},[])

  // // useEffect( ()=>{

  // // },[])

  const handleChangeInputU = (e) =>{
    console.log("1")
    setUsername(e.target.value)
  }

  const handleChangeInputPass = (e) =>{
    setPassword(e.target.value)
    console.log("2")
  }
  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      setErr("");
      const a=await handleLoginApi(username,password)
      console.log(a)
      if(a){
        if(a.message !== "ok"){
          setErr(a.message)
        }
        console.log("login thanh cong")
      }
      
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className={cx("wrapper")}>
      {console.log("reren")}
      <div className="col-12" style={{color:'red'}}>{err}</div>
      <Container>
        <Row>
          <Col sm={5} className={cx("image-login")}>
            <img src={images.background} alt="" />
          </Col>
          <Col sm={7} className={cx("login")}>
            <div className={cx("login-wrapper")}>
              <Form className={cx("login-form")}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    Tên đăng nhập
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      placeholder="Tên đăng nhập"
                     value={username}
                     onChange={(e) => handleChangeInputU(e)}
                      className={cx("placehoder-name")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label column sm={2}>
                    Mật khẩu
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="password"
                     value={password}
                     onChange={(e) => handleChangeInputPass(e)}
                      placeholder="Mật khẩu"
                      className={cx("placehoder-name")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalCheck"
                >
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Form.Check
                      label="Nhớ mật khẩu"
                      className={cx("form-remember-pass")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Nav className="me-auto x" >
                      {/* <Nav.Link as={Link} to="/bangdiem" className={cx('login-btn')} >
                        Đăng nhập
                      </Nav.Link> */}
                      <button onClick={(e)=>handleLogin(e)}> 
                         Đăng nhập
                      </button>
                    </Nav>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
