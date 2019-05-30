--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.17
-- Dumped by pg_dump version 9.5.17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: data; Type: SCHEMA; Schema: -; Owner: assignment
--

CREATE SCHEMA data;


ALTER SCHEMA data OWNER TO assignment;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: delete_post(integer, integer); Type: FUNCTION; Schema: data; Owner: assignment
--

CREATE FUNCTION data.delete_post(p_id integer, p_u_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
  _row_count integer;
BEGIN

  IF p_id IS NULL OR NOT EXISTS (SELECT 1 FROM data.posts p WHERE p.id = p_id LIMIT 1) THEN
    RETURN -1; -- POST DOES NOT EXIST
  END IF;

  IF p_u_id IS NULL OR NOT EXISTS (SELECT 1 FROM data.users u WHERE u.id = p_u_id LIMIT 1) THEN
    RETURN -2; -- USER DOES NOT EXIST
  END IF;

  DELETE FROM data.posts p WHERE p.id = p_id AND p.user_id = p_u_id;

  GET DIAGNOSTICS _row_count = ROW_COUNT;

  IF _row_count = 0 THEN
    return -3; -- USER NOT POST AUTHOR
  END IF;

  RETURN p_id;

END ;
$$;


ALTER FUNCTION data.delete_post(p_id integer, p_u_id integer) OWNER TO assignment;

--
-- Name: get_posts(character varying, integer, integer, integer, integer); Type: FUNCTION; Schema: data; Owner: assignment
--

CREATE FUNCTION data.get_posts(p_q character varying DEFAULT ''::character varying, p_id integer DEFAULT NULL::integer, p_user_id integer DEFAULT NULL::integer, p_limit integer DEFAULT 100, p_offset integer DEFAULT 0) RETURNS TABLE(id integer, name character varying, user_id integer, content json, likes integer, user_full_name text)
    LANGUAGE plpgsql
    AS $$
DECLARE
  likes integer;
BEGIN

  RETURN QUERY
  SELECT p.id, p.name, p.user_id, p.content, p.number_of_likes as likes, CONCAT( u.first_name, ' ', u.last_name) as user_full_name
  FROM data.posts p left join data.users u ON p.user_id = u.id
  WHERE
    lower(p.name) LIKE concat('%', lower(p_q), '%')
    AND (p_id IS NULL OR p.id = p_id)
    AND (p_user_id IS NULL OR p.user_id = p_user_id)
  LIMIT p_limit OFFSET p_offset;

END ;
$$;


ALTER FUNCTION data.get_posts(p_q character varying, p_id integer, p_user_id integer, p_limit integer, p_offset integer) OWNER TO assignment;

--
-- Name: get_user_by_email(character varying); Type: FUNCTION; Schema: data; Owner: assignment
--

CREATE FUNCTION data.get_user_by_email(u_email character varying) RETURNS TABLE(id integer, first_name character varying, last_name character varying, email character varying, password character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN

  RETURN QUERY
  SELECT u.id, u.first_name, u.last_name, u.email, u.password
  FROM data.users u
  WHERE u.email = u_email
  LIMIT 1;

END;
$$;


ALTER FUNCTION data.get_user_by_email(u_email character varying) OWNER TO assignment;

--
-- Name: insert_post(character varying, json, integer); Type: FUNCTION; Schema: data; Owner: assignment
--

CREATE FUNCTION data.insert_post(p_name character varying, p_content json, p_user_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
  p_id integer;
BEGIN

  IF NOT EXISTS (SELECT 1 FROM data.users u WHERE u.id = p_user_id LIMIT 1) THEN
    return -1; -- USER DOES NOT EXIST
  END IF;

  INSERT INTO data.posts (name, content, user_id)
  VALUES (p_name, p_content, p_user_id)
  RETURNING id INTO p_id;

  RETURN p_id;
END ;
$$;


ALTER FUNCTION data.insert_post(p_name character varying, p_content json, p_user_id integer) OWNER TO assignment;

--
-- Name: insert_user(character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: data; Owner: assignment
--

CREATE FUNCTION data.insert_user(u_first_name character varying, u_last_name character varying, u_email character varying, u_password character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
  u_id integer;
BEGIN

  IF EXISTS (SELECT 1 from data.users u WHERE u.email = u_email LIMIT 1) THEN
    RETURN -1; -- EMAIL USED
  END IF;

  INSERT INTO data.users (first_name, last_name, email, password)
  VALUES (u_first_name, u_last_name, u_email, u_password)
  RETURNING id INTO u_id;

  RETURN u_id;

END ;
$$;


ALTER FUNCTION data.insert_user(u_first_name character varying, u_last_name character varying, u_email character varying, u_password character varying) OWNER TO assignment;

--
-- Name: like_post(integer); Type: FUNCTION; Schema: data; Owner: assignment
--

CREATE FUNCTION data.like_post(p_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
  likes integer;
BEGIN

  IF p_id IS NULL OR NOT EXISTS (SELECT 1 FROM data.posts p WHERE p.id = p_id LIMIT 1) THEN
    RETURN -1; -- POST DOES NOT EXIST
  END IF;

  UPDATE data.posts p
  SET number_of_likes = number_of_likes + 1
  WHERE p.id = p_id
  RETURNING number_of_likes INTO likes;

  SELECT p.number_of_likes INTO likes
  FROM data.posts p
  WHERE p.id = p_id
  LIMIT 1;

  RETURN likes;
END ;
$$;


ALTER FUNCTION data.like_post(p_id integer) OWNER TO assignment;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: posts; Type: TABLE; Schema: data; Owner: assignment
--

CREATE TABLE data.posts (
    id integer NOT NULL,
    name character varying(255),
    user_id integer,
    content json,
    number_of_likes integer DEFAULT 0
);


ALTER TABLE data.posts OWNER TO assignment;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: data; Owner: assignment
--

CREATE SEQUENCE data.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE data.posts_id_seq OWNER TO assignment;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: data; Owner: assignment
--

ALTER SEQUENCE data.posts_id_seq OWNED BY data.posts.id;


--
-- Name: users; Type: TABLE; Schema: data; Owner: assignment
--

CREATE TABLE data.users (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE data.users OWNER TO assignment;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: data; Owner: assignment
--

CREATE SEQUENCE data.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE data.users_id_seq OWNER TO assignment;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: data; Owner: assignment
--

ALTER SEQUENCE data.users_id_seq OWNED BY data.users.id;


--
-- Name: id; Type: DEFAULT; Schema: data; Owner: assignment
--

ALTER TABLE ONLY data.posts ALTER COLUMN id SET DEFAULT nextval('data.posts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: data; Owner: assignment
--

ALTER TABLE ONLY data.users ALTER COLUMN id SET DEFAULT nextval('data.users_id_seq'::regclass);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: data; Owner: assignment
--

COPY data.posts (id, name, user_id, content, number_of_likes) FROM stdin;
\.


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: data; Owner: assignment
--

SELECT pg_catalog.setval('data.posts_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: data; Owner: assignment
--

COPY data.users (id, first_name, last_name, email, password) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: data; Owner: assignment
--

SELECT pg_catalog.setval('data.users_id_seq', 1, false);


--
-- Name: posts_pkey; Type: CONSTRAINT; Schema: data; Owner: assignment
--

ALTER TABLE ONLY data.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: data; Owner: assignment
--

ALTER TABLE ONLY data.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: posts_name_index; Type: INDEX; Schema: data; Owner: assignment
--

CREATE INDEX posts_name_index ON data.posts USING btree (name);


--
-- Name: posts_user_index; Type: INDEX; Schema: data; Owner: assignment
--

CREATE INDEX posts_user_index ON data.posts USING btree (user_id);


--
-- Name: users_email_uindex; Type: INDEX; Schema: data; Owner: assignment
--

CREATE UNIQUE INDEX users_email_uindex ON data.users USING btree (email);


--
-- Name: posts_user__fk; Type: FK CONSTRAINT; Schema: data; Owner: assignment
--

ALTER TABLE ONLY data.posts
    ADD CONSTRAINT posts_user__fk FOREIGN KEY (user_id) REFERENCES data.users(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: assignment
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM assignment;
GRANT ALL ON SCHEMA public TO assignment;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

