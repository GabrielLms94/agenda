# create database agenda;

use agenda;

create table agenda
(
    id          int primary key auto_increment,
    lugar      varchar(70),
    descripcion varchar(255),
    fecha varchar(50) ,
    hora varchar (5)
)