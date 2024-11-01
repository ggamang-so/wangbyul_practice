drop table if exists member ;
drop table if exists article ;


CREATE TABLE member (
    member_id VARCHAR(25) PRIMARY KEY,
    member_pw VARCHAR(255) NOT NULL,
    name VARCHAR(40) not null, 
    email varchar(50) not null, 
    birthday date not null, 
    nickname varchar(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE article (
	id serial primary key,
    title VARCHAR(255) not null,
    content VARCHAR ,
    member_id VARCHAR(255) not null,
    category int not null,
    start_date date not null,
    end_date date not null, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert INTO member (member_id, member_pw, name, email, birthday, nickname) 
values('ggamangso', '$2a$10$Y4e0es8aWenNxM9ATAWfw.GPllquDpLAEmmJuRq62LGwdjA570QOm','paul', 'ggamangso@hahah.com', '1988-08-24','gga' ),
		('test', '$2a$10$kMkGD1stFC.9K9te3wBe3OdtEGMmKgyN.VYhgILENmOF7FTforIWG','bob','bobbob@hihi.com','1994-01-24' , null);
						
insert into article (title, content, member_id, category,start_date, end_date) 
values('샘플1', '샘플1 컨텐츠', 'ggamangso',1, '2024-10-01', '2024-10-24'),
		('샘플2', '샘플2 컨텐츠', 'ggamangso', 3, '2024-10-03', '2024-10-12'),
		('샘플3', '샘플3 컨텐츠', 'ggamangso' ,2, '2024-10-02', '2024-10-05'),
		('샘플4', '샘플4 컨텐츠', 'test' ,5, '2024-10-15', '2024-10-16'),
		('샘플5', '샘플5 컨텐츠', 'test' ,6, '2024-09-01', '2024-10-26');

select * from member;

--delete from study.article where id=1;

select * from article;

commit;

update member set member_pw = '$2a$10$Y4e0es8aWenNxM9ATAWfw.GPllquDpLAEmmJuRq62LGwdjA570QOm' where member_id='ggamangso';

select member_id, count(*) as count from article group by member_id order by count desc limit 5;

COPY article(title, content, member_id, category, start_date, end_date, created_at)
FROM 'C:\lhwWorkspace\leehyunwoo\kendotest/articles.csv'
DELIMITER ','
CSV HEADER;

select count(id) from article;

select date(created_at) as date, count(*) as count from article group by date(created_at) order by date(created_at) desc;

select currval('article_id_seq');

select count(id) from article where 1=1 and category = cast('1' as integer);
select count(id) from article where category = 1;
select count(id) from article where 1=1  AND start_date = cast('2024-01-01' as date);