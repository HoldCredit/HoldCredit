import React from 'react'
import './css/Board.css'

const NoticeWrite = () => {
    return (
        <div>

            <div class="board_wrap">
                <div class="board_title">
                    <strong>공지사항</strong>
                </div>
                <div class="board_write_wrap">
                    <div class="board_write">
                        <div class="title_back">
                        <div class="title">
                        <dl>
                            <dt>제목</dt>
                            <dd><input type="text" id="write_input" placeholder="title" /></dd>
                        </dl>
                        </div>
                        </div>
                        <div class="title_back">
                        <div class="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd><input type="text" id="write_input" placeholder="write" /></dd>
                        </dl>
                        <dl>
                            <dt>비밀번호</dt>
                            <dd><input type="password" id="write_input" placeholder="password" /></dd>
                        </dl>
                        </div>
                        </div>
                        <div class="cont">
                            <textarea placeholder="내용 입력"></textarea>
                        </div>

                        <div class="btn_wrap">
                            <a href="/MainNotice" class="btn_insert">등록</a>
                            <a href="/MainNotice" class="btn_update">취소</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeWrite;