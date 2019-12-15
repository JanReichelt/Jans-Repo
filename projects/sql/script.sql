DROP TABLE IF EXISTS person,ferienwohnung,adresse,wohnt,mietet CASCADE;

-- Aufgabe 4 b)
CREATE TABLE person(
  vorname VARCHAR(30),
  nachname VARCHAR(30),
  telefon VARCHAR(20),
  pid INT PRIMARY KEY) WITH OIDS;

CREATE TABLE vermieter(
  website_url VARCHAR(50),
  vid INT PRIMARY KEY) INHERITS (person) WITH OIDS;

CREATE TABLE urlauber(
  uid INT PRIMARY KEY) INHERITS (person) WITH OIDS;

CREATE TABLE hausmeister(
  faehigkeiten VARCHAR(30)[],
  hid INT PRIMARY KEY) INHERITS (person) WITH OIDS;

CREATE TABLE ferienwohnung(
  personenzahl INT,
  zimmerzahl INT,
  preis NUMERIC(10,2),
  fid INT PRIMARY KEY) WITH OIDS;

CREATE TABLE adresse(
  strasse VARCHAR(50),
  hausnr VARCHAR(10),
  plz CHAR(5),
  ort VARCHAR(30),
  aid INT PRIMARY KEY) WITH OIDS;

-- Beziehungen
CREATE TABLE wohnt(
  pid INT,
  aid INT,
  -- man würde Fremdschlüssel annehmen, aber die Personen werden in
  -- vermieter, urlauber und hausmeister eingetragen!
  -- hier wäre z.B. ein Trigger geeignet
  -- FOREIGN KEY (pid) REFERENCES person(pid), 
  FOREIGN KEY (aid) REFERENCES adresse(aid)) WITH OIDS;

ALTER TABLE ferienwohnung ADD aid INT;
ALTER TABLE ferienwohnung ADD CONSTRAINT fk_adresse
  FOREIGN KEY (aid) REFERENCES adresse(aid);

ALTER TABLE ferienwohnung ADD vid INT;
ALTER TABLE ferienwohnung ADD CONSTRAINT fk_vermieter
  FOREIGN KEY (vid) REFERENCES vermieter(vid);

CREATE TABLE mietet(
  fid INT,
  uid INT,
  von DATE,
  bis DATE,
  personenzahl INT,
  FOREIGN KEY (fid) REFERENCES ferienwohnung(fid),
  FOREIGN KEY (uid) REFERENCES urlauber(uid)) WITH OIDS;

-- Aufgabe 4 c)
INSERT INTO vermieter VALUES 
  ('Max', 'Muster', '0123/456', 1, 'www.muster.test', 1);
INSERT INTO adresse VALUES
  ('Dorfplatz', '1', '12345', 'Ödland', 1);
INSERT INTO wohnt VALUES
  (1,1);

INSERT INTO urlauber VALUES 
  ('Erika', 'Mustermann', '0456/123456', 2, 1);
INSERT INTO adresse VALUES
  ('Dorfplatz', '1', '12345', 'Ödland', 2);
INSERT INTO wohnt VALUES
  (2,2);

INSERT INTO hausmeister VALUES 
  ('Paul', 'Emsig', '0123/567', 3,
   '{"Klempnerarbeiten", "Malerarbeiten", "Gartenarbeiten"}', 1);
INSERT INTO adresse VALUES
  ('Dorfplatz', '2', '12345', 'Ödland', 3);
INSERT INTO wohnt VALUES
  (3,3);

INSERT INTO adresse VALUES
  ('Am Wald', '5', '12345', 'Ödland', 4);
INSERT INTO ferienwohnung VALUES
  (4,2,58.00,1,4,1),
  (5,3,68.00,2,4,1);

-- Aufgabe 4 d)
-- Tabelle urlauber ändern
ALTER TABLE urlauber ADD datum DATE;
ALTER TABLE urlauber ADD username VARCHAR(15);

-- Triggerfunktion
CREATE OR REPLACE FUNCTION urlauber_geaendert()
  RETURNS TRIGGER AS
  $$
    BEGIN
      NEW.datum := NOW();
      NEW.username  := CURRENT_USER;
      RETURN NEW;
      END
    $$ LANGUAGE plpgsql;

-- Trigger anlegen
CREATE TRIGGER urlauber_geaendert
  BEFORE INSERT OR UPDATE ON urlauber
  FOR EACH ROW EXECUTE PROCEDURE urlauber_geaendert();