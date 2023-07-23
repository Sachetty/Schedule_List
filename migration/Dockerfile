# cat Dockerfile
FROM mysql:latest

RUN chown -R mysql:root /var/lib/mysql/

ENV MYSQL_DATABASE="db_schedule"
ENV MYSQL_USER="teste"
ENV MYSQL_PASSWORD="senha123"
ENV MYSQL_ROOT_PASSWORD="senha123"

ADD data.sql /etc/mysql/data.sql

RUN sed -i 's/MYSQL_DATABASE/db_schedule/g' /etc/mysql/data.sql
RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d

EXPOSE 3306