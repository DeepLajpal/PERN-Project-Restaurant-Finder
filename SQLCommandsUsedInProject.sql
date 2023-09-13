-- for help \?

--list database \l

--To Create database CREATE DATABASE database_name

--To Change database \c database_name

--To Quit psql Terminal \q

-- Note - All Sql statement ends with a semicolon

-- Create table 
-- CREATE TABLE products(
--     id integer,
--     name VARCHAR(50),
--     price integer,
--     on_sale boolean
-- );

--list all table \d

--list table structure \d table_name

-- add column to existing table ALTER TABLE table_name ADD COlUMN column_name data_type;

-- DELETE column from existing table ALTER TABLE table_name DROP COlUMN column_name;

-- Delete table, DROP TABLE table_name;

-- Delete database, DROP DATABASE practice;

CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range integer NOT NULL check(price_range >= 0 and price_range <= 5)
);

--INSERT INTO restaurants(id,name,location,price_range) VALUES(123,mc_donald,Mumbai,4);

--SELECT * FROM restaurants;

-- "INSERT INTO restaurants (name, location, price_range) VALUES($1,$2,$3) RETURNING *",[req.body.name, req.body.location, req.body.price_range]

-- Update row in table, UPDATE restaurants SET name = "pizza hut", location="India, Gujrat", price_range="3";

-- Delete row from table,  DELETE FROM restaurants WHERE ID = id_number; 