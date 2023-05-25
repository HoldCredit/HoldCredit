import axios from 'axios';
//이부분 필요없어서 석제할꺼에요~~~근주
const CUSTOMER_API_BASE_URL = "http://localhost:8080/customerModify/21";
//21번을 no로 알아서 불러오도록 수정해야함!!!! 아직 그냥 숫자 박아놨어용~
//아래 링크는 회원 수정시 들어가는 링크인데 오류 나는지는 봐야함ㅋㅋ 얘도 21 박아논거 수정필요!
const MODIFY_API_BASE_URL = "http://localhost:8080/customerModify/Modify/21";

//회원정보 불러오기
const getCustomer = ()=>{
    return axios.get(CUSTOMER_API_BASE_URL);
};

//아마도 회원 정보 수정할때 필요 부분?
const getModify = ()=>{
    return axios.get(MODIFY_API_BASE_URL);
};

//회원수정 등록하기
const modifyCustomer = (customer) =>{
    return axios.post()
};



