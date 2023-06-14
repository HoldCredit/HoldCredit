import React, { useEffect, useState } from 'react';
import BoardService from '../service/BoardService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import '../store/CustomerNameStore'
import './css/Board.css';

function MainQna(props) {

const[qna, setQna] = useState([]);
const[auth, setAuth] = useState({});
const [currentPage, setCurrentPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);

// 세션에 저장된 토큰값 가져오기
const storedToken = sessionStorage.getItem("loginData");
// 토큰값 해석
const decodedToken = jwtDecode(storedToken);
// 해석한 정보에서 회원번호만 추출
const customerNo = decodedToken.sub;

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
fetchQna();
}, [currentPage]);

const fetchQna = () => {
axios.get(`http://localhost:8080/api/Qna?page=${currentPage}&size=5`)
.then(res => {
const fetchedQna = res.data.content.map(qna => {
if (qna.pwd) {
qna.title = `🔒 ${qna.title}`;
qna.isPrivate = true;
} else {
qna.isPrivate = false;
}
return qna;
});
setQna(fetchedQna);
setTotalPages(res.data.totalPages);
});
};

const navigate = useNavigate();

const createQna = () => {
navigate('/QnaWrite');
};

const readQna = (id) => {
const selectedQna = qna.find(item => item.id === id);
if( auth.authority == "ADMIN"){
navigate(`/QnaView/${id}`);
return;
}
if (selectedQna.isPrivate) {
const password = prompt("비밀번호를 입력하세요:");
if (password === selectedQna.pwd) {
navigate(`/QnaView/${id}`);
} else {
alert("비밀번호가 일치하지 않습니다.");
console.log("비밀번호가 일치하지 않습니다.");
}
} else {
navigate(`/QnaView/${id}`);
}

};


const handlePaginationClick = (page) => {
if(page >= 0 ){
setCurrentPage(page);
}
};

const renderPaginationItems = () => {
const pages = [];

if (totalPages <= 5) { for (let i=0; i < totalPages; i++) { pages.push( <a key={i} className={i===currentPage ? 'num on'
    : 'num' } onClick={()=> handlePaginationClick(i)}
    >
    {i + 1}
    </a>
    );
    }
    } else {
    const startPage = Math.floor(currentPage / 5) * 5;

    for (let i = startPage; i < startPage + 5; i++) { if (i < totalPages) { pages.push( <a key={i}
        className={i===currentPage ? 'num on' : 'num' } onClick={()=> handlePaginationClick(i)}
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
        .get(`http://localhost:8080/api/Qna?keyword=${keyword}&page=${currentPage}&size=5&field=title`)
        .then((res) => {
        setQna(res.data.content);
        setTotalPages(res.data.totalPages);
        })
        .catch((error) => {
        console.error(error);
        });
        };

        const handleSubmitContent = (keyword) => {
        axios
        .get(`http://localhost:8080/api/Qna?keyword=${keyword}&page=${currentPage}&size=5&field=content`)
        .then((res) => {
        setQna(res.data.content);
        setTotalPages(res.data.totalPages);
        })
        .catch((error) => {
        console.error(error);
        });
        };

        const handleSubmitWriter = (keyword) => {
        axios
        .get(`http://localhost:8080/api/Qna?keyword=${keyword}&page=${currentPage}&size=5&field=writer`)
        .then((res) => {
        setQna(res.data.content);
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
                    <strong>Q & A</strong>
                    <div className="notice_search">
                        <form className="search_form" onSubmit={handleSubmit}>
                            <input type="text" name="keyword" className="form-control" id="search"
                                placeholder="검색어를 입력해주세요" />
                            <button type="submit" className="search_btn">
                                <span class="img_search">검색</span>
                            </button>
                        </form>
                        <div className="select_wrapper">
                            <select className="select" id="select_value" title="검색유형 선택" onChange={handleSelectChange}>
                                <option value="제목">제목</option>
                                <option value="내용">내용</option>
                                <option value="작성자">작성자</option>
                            </select>
                        </div>
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
                        <div className="notice_read" key={item.id}>
                            <div className="num">{item.id}</div>
                            <div className="title" onClick={()=> readQna(item.id)}>
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
                        <div style={{ display: 'flex' , justifyContent: 'center' , alignItems: 'center' }}>
                            <div className="paging">
                                <a className={currentPage> 0 ? 'bt prev' : 'bt prev disabled'}
                                    onClick={() => handlePaginationClick(currentPage - 1)}
                                    >
                                    {"<"} </a>
                                        {renderPaginationItems()}
                                        <a className={currentPage < totalPages - 1 ? 'bt next' : 'bt next disabled' }
                                            onClick={()=> handlePaginationClick(currentPage + 1)}
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