import React from 'react'

const MainQnA = () => {
  return (
    <div>

      <div class="board_wrap">
        <div class="board_title">
          <strong>Q & A</strong>
        </div>
        <div class="btn_wrap_2">
            <a href="/NoticeWrite" class="btn_insert">글쓰기</a>
            {/* <a href="#" class="btn_update">수정</a> */}
          </div>
        <div class="board_list_wrap">
          <div class="board_list">
            <div class="top">
              <div class="num">번호</div>
              <div class="title">제목</div>
              <div class="writer">글쓴이</div>
              <div class="date">작성일</div>
              <div class="count">조회</div>
            </div>
            <div>
              <div class="num">5</div>
              <div class="title"><a href="/NoticeView" class="content">글 제목이 들어갑니다</a></div>
              <div class="writer">김영빈</div>
              <div class="date">2023.05.09</div>
              <div class="count">123</div>
            </div>
            <div>
              <div class="num">4</div>
              <div class="title"><a href="/NoticeView" class="content">글 제목이 들어갑니다</a></div>
              <div class="writer">김영빈</div>
              <div class="date">2023.05.09</div>
              <div class="count">123</div>
            </div>
            <div>
              <div class="num">3</div>
              <div class="title"><a href="/NoticeView" class="content">글 제목이 들어갑니다</a></div>
              <div class="writer">김영빈</div>
              <div class="date">2023.05.09</div>
              <div class="count">123</div>
            </div>
            <div>
              <div class="num">2</div>
              <div class="title"><a href="/NoticeView" class="content">글 제목이 들어갑니다</a></div>
              <div class="writer">김영빈</div>
              <div class="date">2023.05.09</div>
              <div class="count">123</div>
            </div>
            <div>
              <div class="num">1</div>
              <div class="title"><a href="/NoticeView" class="content">글 제목이 들어갑니다</a></div>
              <div class="writer">김영빈</div>
              <div class="date">2023.05.09</div>
              <div class="count">123</div>
            </div>
          </div>
          <div class="board_page">
            <a href="#" class="bt first">first</a>
            <a href="#" class="bt prev">prev</a>
            <a href="#" class="num on">1</a>
            <a href="#" class="num ">2</a>
            <a href="#" class="num">3</a>
            <a href="#" class="num">4</a>
            <a href="#" class="num">5</a>
            <a href="#" class="bt next">next</a>
            <a href="#" class="bt last">last</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainQnA;