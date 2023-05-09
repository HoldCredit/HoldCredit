import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import './css/Header.css';
const Header = () => {

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>

        <Navbar.Brand href="/"><div className="logo">HOLD CREDIT</div></Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Service">서비스소개</Nav.Link>
            <Nav.Link href="/CreditRating">신용평가란</Nav.Link>
            <NavDropdown title="고객센터" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">공지사항</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Q & A
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">자주 묻는 질문</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/LoginPage">로그인</Nav.Link>
            <Nav.Link eventKey={2} href="/JoinForm">
              회원가입
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;