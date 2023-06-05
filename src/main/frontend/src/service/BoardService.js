import axios from 'axios';

const NOTICE_API_BASE_URL = "http://localhost:8080/api/Notice";
const QNA_API_BASE_URL = "http://localhost:8080/api/Qna";
const FAQ_API_BASE_URL = "http://localhost:8080/api/faq";


//게시글 가져오기
const getNotice = () => {
    return axios.get(NOTICE_API_BASE_URL);
};

const getQna =() => {
    return axios.get(QNA_API_BASE_URL);
};

const getFaq = () => {
  return axios.get(FAQ_API_BASE_URL);
}

//게시글 등록하기
const createNotice = (notice) => {
    return axios.post(NOTICE_API_BASE_URL, notice);
};

const createQna = (qna) => {
    return axios.post(QNA_API_BASE_URL, qna);
};

const createFaq = (qna) => {
  return axios.post(FAQ_API_BASE_URL, qna);
};



const BoardService = {

  getNotice,
  getQna,
  getFaq,
  createNotice,
  createQna,
  createFaq,

};



export default BoardService;