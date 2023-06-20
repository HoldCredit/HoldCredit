import React, {useEffect, useState} from 'react';
import BoardService from '../service/BoardService';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import '../store/CustomerNameStore'
import './css/Board.css';


function MainFaQ(props) {

  const [faq, setFaq] = useState([]);
  const [auth, setAuth] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedFaq, setSelectedFaq] = useState(null);


// 세션에 저장된 토큰 값을 가져옵니다.
  const storedToken = sessionStorage.getItem("loginData");
// 토큰이 존재할 경우 해독합니다.
  const decodedToken = storedToken ? jwtDecode(storedToken) : null;
// 해독된 정보에서 고객 번호를 추출합니다.
  const customerNo = decodedToken ? decodedToken.sub : null;


  useEffect(() => {
    axios.get(`/customerModify/${customerNo}`)
      .then((res) => {
        console.log(res.data);
        setAuth(res.data);
      })
      .catch((error) => {
        console.log('회원수정 페이지 에러:' + error);
      });
  }, []);


  useEffect(() => {
    fetchFaq();
  }, [currentPage]);

  const fetchFaq = () => {
    axios.get(`http://localhost:8080/api/faq?page=${currentPage}&size=5`)
      .then(res => {
        const fetchedFaq = res.data.content.map(faq => {
          if (faq.pwd) {
            faq.title = `🔒 ${faq.title}`;
            faq.isPrivate = true;
          } else {
            faq.isPrivate = false;
          }
          return faq;
        });
        setFaq(fetchedFaq);
        setTotalPages(res.data.totalPages);
      });
  };

  const navigate = useNavigate();

  const createFaq = () => {

    if (customerNo == null) {
      alert("로그인후 진행해주세요")
      return;
    }


    if (decodedToken.auth == "CUSTOMER") {
      alert('관리자만 글을 수정할 수 있습니다.');
    } else {
      console.log("Inside else statement");
      navigate('/MainFaqWrite');
    }
  };

  const handlePaginationClick = (page) => {
    if (page >= 0) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(<a key={i} className={i === currentPage ? 'num on'
            : 'num'} onClick={() => handlePaginationClick(i)}
          >
            {i + 1}
          </a>
        );
      }
    } else {
      const startPage = Math.floor(currentPage / 5) * 5;

      for (let i = startPage; i < startPage + 5; i++) {
        if (i < totalPages) {
          pages.push(<a key={i}
                        className={i === currentPage ? 'num on' : 'num'} onClick={() => handlePaginationClick(i)}
            >
              {i + 1}
            </a>
          );
        }
      }
    }

    return pages;
  };


  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    const searchInput = document.getElementById("search");

    switch (selectedOption) {
      case "제목":
        searchInput.placeholder = "제목을 입력해주세요";
        break;
      case "내용":
        searchInput.placeholder = "내용을 입력해주세요";
        break;

      default:
        searchInput.placeholder = "검색어를 입력해주세요";
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const keyword = event.target.keyword.value;
    const selectElement = document.getElementById("select_value");
    const selectedOption = selectElement.options[selectElement.selectedIndex].text;

    switch (selectedOption) {
      case "제목":
        handleSubmitTitle(keyword);
        break;
      case "내용":
        handleSubmitContent(keyword);
        break;
      default:
        console.error("Invalid search option");
        break;
    }
  };

  const handleSubmitTitle = (keyword) => {
    axios
      .get(`http://localhost:8080/api/faq?keyword=${keyword}&page=${currentPage}&size=5&field=title`)
      .then((res) => {
        setFaq(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSubmitContent = (keyword) => {
    axios
      .get(`http://localhost:8080/api/faq?keyword=${keyword}&page=${currentPage}&size=5&field=content`)
      .then((res) => {
        setFaq(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>

      <div class="board_wrap">
        <div class="board_title">
          <strong>자주 묻는 질문</strong>
          <div className="notice_search">
            <div className="select_wrapper">
              <select className="select" id="select_value" title="검색유형 선택" onChange={handleSelectChange}>
                <option className="option" value="제목">제목</option>
                <option className="option" value="내용">내용</option>
              </select>
            </div>
            <form className="search_form" onSubmit={handleSubmit}>
              <input type="text" name="keyword" className="form-control" id="search"
                     placeholder="검색어를 입력해주세요"/>
              <button type="submit" className="search_btn">
                <span class="img_search">검색</span>
              </button>
            </form>
          </div>
        </div>
        <div class="btn_wrap_2">
          <a class="btn_insert" onClick={createFaq}>글쓰기</a>
          {/* <a href="#" class="btn_update">수정</a> */}
        </div>
        <div className="board_list_wrap">
          <div className="board_list">
            <div className="faq_top">
              <div className="faq_num">번호</div>
              <div className="faq_title">제목</div>
            </div>
            {faq.map((item) => (
              <div className="faq_top_2" key={item.id}>
                <div className="test">
                  <div className="faq_num">{item.id}</div>
                  <div className="faq_title" onClick={() => setSelectedFaq(item.id === selectedFaq ? null : item.id)}>
                    {item.title}
                  </div>
                </div>
                {item.id === selectedFaq && (
                  <div className="faq_content">
                    <div className="txt">{item.content}</div>
                  </div>
                )}
              </div>
            ))}

          </div>
          <div className="board_page">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div className="paging">
                <a className={currentPage > 0 ? 'bt prev' : 'bt prev disabled'}
                   onClick={() => handlePaginationClick(currentPage - 1)}
                >
                  {"<"} </a>
                {renderPaginationItems()}
                <a className={currentPage < totalPages - 1 ? 'bt next' : 'bt next disabled'}
                   onClick={() => handlePaginationClick(currentPage + 1)}
                >
                  {">"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainFaQ;