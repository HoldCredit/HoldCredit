import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Board.css';

function MainQna(props) {

  const[qna, setQna] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    fetchNotice();
  }, [currentPage]);

   const fetchNotice = () => {
      axios.get(`http://localhost:8080/api/Qna?page=${currentPage}&size=5`)
        .then(res => {
          setQna(res.data.content);
          setTotalPages(res.data.totalPages);
        });
    }

  const navigate = useNavigate();

  const createQna = () => {
    navigate('/QnaWrite');
  };

  const readQna = (id) => {
  try {
    axios.put(`http://localhost:8080/api/qnaHits/${id}`).then(res => {
    navigate(`/QnaView/${id}`);
    });
  } catch (error) {
    console.error('Error hit count : error');
  }

 }

   const handlePaginationClick = (page) => {
     if(page >= 0 ){
     setCurrentPage(page);
     }
   };

   const renderPaginationItems = () => {
     const pages = [];

     if (totalPages <= 5) {
       for (let i = 0; i < totalPages; i++) {
         pages.push(
           <a
             key={i}
             className={i === currentPage ? 'num on' : 'num'}
             onClick={() => handlePaginationClick(i)}
           >
             {i + 1}
           </a>
         );
       }
     } else {
       const startPage = Math.floor(currentPage / 5) * 5;

       for (let i = startPage; i < startPage + 5; i++) {
         if (i < totalPages) {
           pages.push(
             <a
               key={i}
               className={i === currentPage ? 'num on' : 'num'}
               onClick={() => handlePaginationClick(i)}
             >
               {i + 1}
             </a>
           );
         }
       }
     }

     return pages;
   };

 const handleSubmit = (event) => {
     event.preventDefault();

     const keyword = event.target.keyword.value;

     axios.get(`http://localhost:8080/api/Qna?keyword=${keyword}&page=${currentPage}&size=5`)
       .then(res => {
         setQna(res.data.content);
         setTotalPages(res.data.totalPages);
       })
       .catch(error => {
         console.error(error);
       });
   };

  return (
    <div>

      <div class="board_wrap">
        <div class="board_title">
          <strong>Q & A</strong>
           <div className="notice_search">
             <form className="search_form" onSubmit={handleSubmit}>
             <input type="text" name="keyword" className="form-control" id="search" placeholder="궁금하신 내용이 있으면 검색어를 입력해주세요" />
             <button type="submit" className="search_btn">
             <span class="img_search">검색</span>
             </button>
            </form>
           </div>
        </div>
        <div class="btn_wrap_2">
          <a class="btn_insert" onClick={createQna}>글쓰기</a>
          {/* <a href="#" class="btn_update">수정</a> */}
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
            {qna.map((item) => (
            <div className="notice_read" key = {item.id}>
              <div className="num"><input type ="checkbox" id="check_box" />{item.id}</div>
              <div className="title"><a onClick={() => readQna(item.id)} class="content">{item.title}</a></div>
              <div className="writer">{item.writer}</div>
              <div className="date">{item.createDate}</div>
              <div className="count">{item.hits}</div>
            </div>
            ))}
          </div>
          <div className="board_page">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="paging">
                <a
                  className={currentPage > 0 ? 'bt prev' : 'bt prev disabled'}
                  onClick={() => handlePaginationClick(currentPage - 1)}
                >
                  {"<"}
                </a>
                {renderPaginationItems()}
                <a
                  className={currentPage < totalPages - 1 ? 'bt next' : 'bt next disabled'}
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

export default MainQna;