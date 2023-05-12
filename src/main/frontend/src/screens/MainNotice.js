import React, { useEffect, useState } from 'react';
import NoticeService from '../service/NoticeService';
import './css/Board.css';

function MainNotice(props) {

const[notice, setNotice] = useState([]);

 useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const data = await NoticeService();
        setNotice(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchNoticeData();
  }, []);

  return (
    <div>

      <div class="board_wrap">
        <div class="board_title">
          <strong>공지사항</strong>

        </div>
        <div class="btn_wrap_2">
          <a href="/NoticeWrite" class="btn_insert">글쓰기</a>
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
            {notice.map((item) => (
            <div className="notice_read" key = {item.notice_no}>
              <div className="num"><input type ="checkbox" id="check_box" />{item.notice_no}</div>
              <div className="title"><a href="/NoticeView" class="content">{item.title}</a></div>
              <div className="writer">{item.customer_name}</div>
              <div className="date">{item.reg_date}</div>
              <div className="count">{item.hits}</div>
            </div>
            ))}
          </div>
          <div class="board_page">
            <a href="#" class="bt first">{"<<"}</a>
            <a href="#" class="bt prev">{"<"}</a>
            <a href="#" class="num on">1</a>
            <a href="#" class="num ">2</a>
            <a href="#" class="num">3</a>
            <a href="#" class="num">4</a>
            <a href="#" class="num">5</a>
            <a href="#" class="bt next">{">"}</a>
            <a href="#" class="bt last">{">>"}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNotice;