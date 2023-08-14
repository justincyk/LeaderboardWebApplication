--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: generate_uid(integer); Type: FUNCTION; Schema: public; Owner: j2349842
--

CREATE FUNCTION public.generate_uid(size integer) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  bytes BYTEA := gen_random_bytes(size);
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$;


ALTER FUNCTION public.generate_uid(size integer) OWNER TO j2349842;

--
-- Name: update_player_wins_losses(); Type: FUNCTION; Schema: public; Owner: j2349842
--

CREATE FUNCTION public.update_player_wins_losses() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.winner_id IS NOT NULL THEN
        UPDATE players
        SET wins = wins + 1
        WHERE id = NEW.winner_id;
    END IF;

    IF NEW.loser_id IS NOT NULL THEN
        UPDATE players
        SET loses = loses + 1
        WHERE id = NEW.loser_id;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_player_wins_losses() OWNER TO j2349842;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: matches; Type: TABLE; Schema: public; Owner: j2349842
--

CREATE TABLE public.matches (
    id integer NOT NULL,
    winner_id text NOT NULL,
    loser_id text NOT NULL,
    date timestamp without time zone DEFAULT now(),
    winner_elo_change double precision DEFAULT 0 NOT NULL,
    loser_elo_change double precision DEFAULT 0 NOT NULL,
    CONSTRAINT check_different_players CHECK ((winner_id <> loser_id))
);


ALTER TABLE public.matches OWNER TO j2349842;

--
-- Name: matches_id_seq; Type: SEQUENCE; Schema: public; Owner: j2349842
--

CREATE SEQUENCE public.matches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.matches_id_seq OWNER TO j2349842;

--
-- Name: matches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: j2349842
--

ALTER SEQUENCE public.matches_id_seq OWNED BY public.matches.id;


--
-- Name: players; Type: TABLE; Schema: public; Owner: j2349842
--

CREATE TABLE public.players (
    id text DEFAULT public.generate_uid(20) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    nickname character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    wins integer DEFAULT 0,
    loses integer DEFAULT 0,
    elo numeric(8,5) DEFAULT 400 NOT NULL
);


ALTER TABLE public.players OWNER TO j2349842;

--
-- Name: matches id; Type: DEFAULT; Schema: public; Owner: j2349842
--

ALTER TABLE ONLY public.matches ALTER COLUMN id SET DEFAULT nextval('public.matches_id_seq'::regclass);


--
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: j2349842
--

COPY public.matches (id, winner_id, loser_id, date, winner_elo_change, loser_elo_change) FROM stdin;
5	9TUzGvHsGU2ecv8rjCog	DELyAWOAwbcHCRBMdiFi	2023-08-03 13:55:46.824614	0	0
6	9TUzGvHsGU2ecv8rjCog	26eyCEfntOgiOe2KVKtc	2023-08-03 13:56:07.000028	0	0
7	26eyCEfntOgiOe2KVKtc	DELyAWOAwbcHCRBMdiFi	2023-08-03 13:56:17.687339	0	0
11	DELyAWOAwbcHCRBMdiFi	9TUzGvHsGU2ecv8rjCog	2023-08-08 10:56:37.276381	17.45904541015625	-17.45904541015625
8	DELyAWOAwbcHCRBMdiFi	9TUzGvHsGU2ecv8rjCog	2023-08-08 11:34:39.899601	0	0
9	26eyCEfntOgiOe2KVKtc	DELyAWOAwbcHCRBMdiFi	2023-08-08 11:34:39.899601	0	0
10	26eyCEfntOgiOe2KVKtc	DELyAWOAwbcHCRBMdiFi	2023-08-08 11:34:39.899601	0	0
12	DELyAWOAwbcHCRBMdiFi	9TUzGvHsGU2ecv8rjCog	2023-08-08 12:08:10.499725	25.016998291015625	2.459014892578125
13	DELyAWOAwbcHCRBMdiFi	9TUzGvHsGU2ecv8rjCog	2023-08-08 12:14:17.768282	15	-15
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: j2349842
--

COPY public.players (id, first_name, last_name, nickname, created_at, wins, loses, elo) FROM stdin;
26eyCEfntOgiOe2KVKtc	Andrew	Ver	Andrewver	2023-08-03 11:53:28.769398	3	1	427.47600
DELyAWOAwbcHCRBMdiFi	Alan	Cab	Alanc	2023-08-03 11:52:56.97616	3	4	415.00000
9TUzGvHsGU2ecv8rjCog	Justin	Kim	Jkim	2023-08-03 11:51:47.461828	2	3	385.00000
Czkb2sEJQrNH1Crt6LYj	Jason	Borne	JasonB	2023-08-08 13:55:43.20102	0	0	0.00000
rYBhkoPzBFnDi8Y0NPCt	John	Wick	JohnW	2023-08-08 13:57:31.89412	0	0	0.00000
z39Nnck0TxTUCKkq4X1V	Barney	Purple	purple	2023-08-08 14:08:16.167762	0	0	0.00000
dtR8VGXTgGv28Fx8B0m6	Shrek	Jr	ShrekJ	2023-08-08 14:08:37.134499	0	0	0.00000
lQTB8plEraAXKQqm7cKa	Ed	Jr	EdJ	2023-08-08 14:10:44.151286	0	0	0.00000
kzpF0nnezSi2RWhM2ynC	ash	pokemon	ashp	2023-08-08 14:20:02.302559	0	0	0.00000
DQzL6YFoRXfRGtrh5UUD	brock	pokemon	brockp	2023-08-08 14:22:17.586754	0	0	400.00000
6jw7OBBeMYzZ7GUG6qaI	jake	dragon	jaked	2023-08-08 15:20:01.866631	0	0	400.00000
\.


--
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: j2349842
--

SELECT pg_catalog.setval('public.matches_id_seq', 13, true);


--
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: public; Owner: j2349842
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: j2349842
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: players unique_nickname; Type: CONSTRAINT; Schema: public; Owner: j2349842
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT unique_nickname UNIQUE (nickname);


--
-- Name: matches fk_loser; Type: FK CONSTRAINT; Schema: public; Owner: j2349842
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT fk_loser FOREIGN KEY (loser_id) REFERENCES public.players(id);


--
-- Name: matches fk_winner; Type: FK CONSTRAINT; Schema: public; Owner: j2349842
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT fk_winner FOREIGN KEY (winner_id) REFERENCES public.players(id);


--
-- PostgreSQL database dump complete
--

