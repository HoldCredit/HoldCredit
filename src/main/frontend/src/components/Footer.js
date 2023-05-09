import React from 'react'
import './css/Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
     <div className="contents">
        <ul class="footer_copy">
        <p><span class="blind">HOLD CREDIT</span></p>
        <li>서울특별시 강남구 테헤란로14길 6, 신용을자바팀 </li>
        <li>TEL : 010-7745-7721 | FAX:010-7745-7721</li>
        <li>Copyrightⓒ 2017 HOLD CREDIT &amp; DATA. All Rights Reserved.</li>
        <a class="link_youtube" href="https://www.youtube.com/" target="_blank" title="새창열림">
            <span class="ico_sns">유튜브</span>
        </a>
        </ul>
     </div>
    </footer>
    
  )
}

export default Footer