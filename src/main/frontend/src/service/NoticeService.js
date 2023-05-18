import axios from 'axios';

const NoticeService = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/Notice');
    const data = response.data;
    console.log(data); // 가져온 데이터 활용 예시
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default NoticeService;