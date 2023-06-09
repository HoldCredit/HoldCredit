import React, {useEffect, useState} from "react";
import {Navbar, Container, Nav, NavDropdown, Dropdown} from "react-bootstrap";
import './css/Header.css';
import {useDispatch, useSelector} from "react-redux";
import {handleLogout} from "../store/CustomerNameStore";
import {useNavigate} from "react-router-dom";

const Header = () => {

  const customerName = useSelector((state) => state.customerName)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(customerName)
  }, [customerName]);

  const doLogout = () => {
    dispatch(handleLogout(''))
  }

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>

        <Navbar.Brand onClick={() => navigate('/')}><div className="logo">HOLD CREDIT</div></Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/Service')}>서비스소개</Nav.Link>
            <Nav.Link onClick={() => navigate('/CreditRating')}>신용평가란</Nav.Link>
            <NavDropdown title="고객센터" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/MainNotice')}>공지사항</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/MainQnA')}>Q & A</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/MainFaQ')}>자주 묻는 질문</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/MainMaps')}>찾아오시는길</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {
              (customerName != '')  ?
                <>
                  <Nav.Link >{customerName} 님 환영합니다. </Nav.Link>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                      메뉴
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate('/EditMember')}>회원정보수정</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate('/creditform')}>금융정보입력</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate('/Dashboard')}>대시보드</Dropdown.Item>
                      <Dropdown.Item onClick={doLogout}>로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
                :
                <>
                  <Nav.Link onClick={() => navigate('/LoginPage')}>로그인</Nav.Link>
                  <Nav.Link eventKey={2} onClick={() => navigate('/JoinForm')}>회원가입</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;