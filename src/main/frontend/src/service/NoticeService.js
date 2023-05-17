import axios from 'axios';

const NOTICE_API_BASE_URL = "http://localhost:8080/api/Notice";

const getNotice = () => {
  return axios.get(NOTICE_API_BASE_URL);
};

const createNotice = (notice) => {
  return axios.post(NOTICE_API_BASE_URL, notice);
};




const NoticeService = {

  getNotice,
  createNotice,

};



export default NoticeService;