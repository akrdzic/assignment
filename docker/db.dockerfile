FROM postgres:9.5.17

ADD docker/clean_dump.sql /home/dump.sql
RUN cp /home/dump.sql /docker-entrypoint-initdb.d