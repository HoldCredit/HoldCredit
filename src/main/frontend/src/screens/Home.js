import React from 'react'
import './css/Home.css'

const Home = () => {
  return (
    <div class="home_page">
      <div class="intro_main_content">
        <h3 class="tit_main">신용을 자바<br></br>HOLD CREDIT</h3>
        <p class="tit_sub">
          팀장 : 추경현<br></br>
          팀원 : 오근주, 김영빈, 김창민, 김해란<br></br>
        </p>
        <p class="tit_sub2">
          당신의 신용을 평가하세요 !<br></br>
        </p>
        <ul class="list_store">
          <li><button class="button">평가하기</button></li>
        </ul>
      </div>
      <div class = "row">
      <div class="intro_cont">
        <div class="cont_img">
          (예시)
        </div>
        <div class="cont_txt">
          <h3>클릭 한번으로<br />내 신용평가 점수 확인하기 !</h3>
          <p>간단한 정보입력으로<br />자신의 신용등급을 평가 받을 수 있습니다.</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home