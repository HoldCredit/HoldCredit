import BoardService from '../service/BoardService';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import '../store/CustomerNameStore'
import './css/Board.css';

function MainNotice(props) {
  const {id} = useParams();
  const [notice, setNotice] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [notices, setNotices] = useState({});

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
        setNotices(res.data);
      })
      .catch((error) => {
        console.log('회원수정 페이지 에러:' + error);
      });
  }, []);

  useEffect(() => {
    fetchNotice();
  }, [currentPage]);

  const fetchNotice = () => {
    axios.get(`http://localhost:8080/api?page=${currentPage}&size=5`)
      .then(res => {
        const fetchedNotices = res.data.content.map(notice => {
          if (notice.pwd) {
            notice.title = `🔒 ${notice.title}`;
            notice.isPrivate = true;
          } else {
            notice.isPrivate = false;
          }
          return notice;
        });
        setNotice(fetchedNotices);
        setTotalPages(res.data.totalPages);
      });
  };

  const navigate = useNavigate();

  const createNotice = () => {
    console.log("notices.authority:", notices.authority);
    if (customerNo == null) {
      alert("로그인후 진행해주세요")
      return;
    }

    if (notices.authority !== "ADMIN") {
      console.log(notices.authority);
      alert('관리자만 글을 작성할 수 있습니다.');
    } else {
      console.log("Inside else statement");
      navigate('/NoticeWrite');
    }
  };


   const readNotice = (id) => {
    try {
        axios.put(`http://localhost:8080/api/hits/${id}`).then(res => {
            navigate(`/NoticeView/${id}`);
        });
    } catch (error) {
          console.error('Error hit count : error');
        }
    }
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
      case "작성자":
        searchInput.placeholder = "작성자를 입력해주세요";
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
      case "작성자":
        handleSubmitWriter(keyword);
        break;
      default:
        console.error("Invalid search option");
        break;
    }
  };

  const handleSubmitTitle = (keyword) => {
    axios
      .get(`http://localhost:8080/api?keyword=${keyword}&page=${currentPage}&size=5&field=title`)
      .then((res) => {
        setNotice(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitContent = (keyword) => {
    axios
      .get(`http://localhost:8080/api?keyword=${keyword}&page=${currentPage}&size=5&field=content`)
      .then((res) => {
        setNotice(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitWriter = (keyword) => {
    axios
      .get(`http://localhost:8080/api?keyword=${keyword}&page=${currentPage}&size=5&field=writer`)
      .then((res) => {
        setNotice(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div>
      <div className="board_wrap">
        <div className="board_title">
          <strong className="title_notice">공지사항</strong>
          <div className="notice_search">
            <div className="select_wrapper">
              <select className="select" id="select_value" title="검색유형 선택" onChange={handleSelectChange}>
                <option className="option" value="제목">제목</option>
                <option className="option" value="내용">내용</option>
                <option className="option" value="작성자">작성자</option>
              </select>
            </div>
            <form className="search_form" onSubmit={handleSubmit}>
              <div className="search_input_wrapper">
                <input type="text" name="keyword" className="form-control" id="search"
                       placeholder="검색어를 입력해주세요"/>
                <button type="submit" className="search_btn">
                  <span className="img_search">검색</span>
                </button>
              </div>
            </form>
          </div>
        </div>


        <div className="btn_wrap_2">
          <a href="#" className="btn_insert" onClick={createNotice}>
            글쓰기
          </a>
        </div>
        <div className="board_list_wrap">
          <div className="board_list">
            <div className="top">
              <div className="num">번호</div>
              <div className="title">제목</div>
              <div className="writer">글쓴이</div>
              <div className="date">작성일</div>
              <div className="count">조회</div>
            </div>
            {notice.map((item) => (
              <div className="notice_read" key={item.id}>
                <div className="num">
                  {item.id}
                </div>
                <div className="title" onClick={() => readNotice(item.id)}>
                  <a className="content">
                    {item.title}
                  </a>
                </div>
                <div className="writer">{item.writer}</div>
                <div className="date">{item.createDate}</div>
                <div className="count">{item.hits}</div>
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
  );
}

export default MainNotice;