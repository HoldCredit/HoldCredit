-- 고객 삽입 (id: cust, pwd: 123)
insert INTO customer  (customer_no, customer_id, password, customer_name, birth, gender, phone_num, email, join_date,update_date, authority, job, education_level)
VALUES (10000, 'cust', '123', 'test 고객', TO_DATE('1995-09-07', 'YYYY-MM-DD'), 'MALE', 01099893798, '1230@123.com', sysdate, sysdate, 'customer', 'WORKER', 'HIGH');

-- 관리자 삽입 (id: admin, pwd: 123)
insert INTO customer  (customer_no, customer_id, password, customer_name, birth, gender, phone_num, email, join_date,update_date, authority, job, education_level)
VALUES (10001, 'admin', '123', 'test 관리자', TO_DATE('1995-09-07', 'YYYY-MM-DD'), 'MALE', 01099893798, '1230@123.com', sysdate, sysdate, 'admin', 'WORKER', 'HIGH');
