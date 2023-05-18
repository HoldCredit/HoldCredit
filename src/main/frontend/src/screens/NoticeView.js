import React from 'react'
import './css/Board.css'

const DetailView = () => {
  return (

    <div class="board_wrap">
      <div class="board_title">
        <strong>공지사항</strong>
      </div>
      <div class="board_view_wrap">
        <div class="board_view">
          <div class="title_back">
          <div class="title">
            글 제목이 들어갑니다.
          </div>
          <div class="info">
            <dl>
              <dt>번호</dt>
              <dd>1</dd>
            </dl>
            <dl>
              <dt>글쓴이</dt>
              <dd>김영빈</dd>
            </dl>
            <dl>
              <dt>작성일</dt>
              <dd>2023.05.09</dd>
            </dl>
            <dl>
              <dt>수정일</dt>
              <dd>2023.06.09</dd>
            </dl>
            <dl>
              <dt>조회</dt>
              <dd>33</dd>
            </dl>
            <dl>
              <dt>첨부파일</dt>
              <dd>?</dd>
            </dl>
          </div>
          </div>
          <div class="cont">
            글내용이들어갑니다.<br />
            글내용이들어갑니다.<br />
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.<br />
            글내용이들어갑니다.<br />
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.<br />
            글내용이들어갑니다.<br />
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.<br />
            글내용이들어갑니다.<br />
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.<br />
            글내용이들어갑니다.<br />
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.<br />
            글내용이들어갑니다.<br />
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.<br />
            글내용이들어갑니다.<br />
            글내용이들어갑니다.
            글내용이들어갑니다.
            글내용이들어갑니다.
          </div>
          <div class="btn_wrap">
            <a href="/MainNotice" class="btn_list">목록</a>
            <a href="/NoticeEdit" class="btn_update">수정</a>
            <a href="/NoticeEdit" id="btn_delete">삭제</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailView;