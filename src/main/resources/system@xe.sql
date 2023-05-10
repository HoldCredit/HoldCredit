create user holdcredit identified by credit;
grant connect, resource, dba to holdcredit;
commit;

--customer 테이블 DB에 삽입해볼때
select * from customer;

INSERT INTO customer  (customer_no, customer_id, password, customer_name, birth, gender, phone_num, email, join_date, admin_level, job, education_level)
VALUES (customer_no_SEQ_GENERATOR.NEXTVAL, 'gj09', '240', '쮸', TO_DATE('1996-07-18', 'YYYY-MM-DD'), 'F', 1042933333, 'jju240@tistory.com', SYSDATE, 0, 0, 0);

--FAQ 테이블 DB에 삽입해볼때
INSERT INTO FAQ (faq_no, customer_no, title, content)
VALUES (FAQ_SEQ.NEXTVAL, 1, '제목2.', '내용2.');

--Notice 테이블 DB에 삽입해볼때
INSERT INTO Notice (notice_no, customer_no, title, content, hits, attach)
VALUES (NOTICE_SEQ.NEXTVAL, 1, '제목', '내용', 0, 'n');

--Attach 테이블 DB에 삽입해볼때
INSERT INTO Attach (attach_no, notice_no, origin_file_name, stored_file_name, path, ext, delete_attach)
VALUES (ATTACH_SEQ.nextval, 1, '원본이름',  '등록이름',  '경로', '확장자명', 'N');