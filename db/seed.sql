DROP DATABASE IF EXISTS lockdown_dates;

CREATE DATABASE lockdown_dates;

\c lockdown_dates;

CREATE TABLE timings(
    timing_id SERIAL PRIMARY KEY,
    timing_name VARCHAR,
    timing_description VARCHAR
);

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR,
    category_description VARCHAR
);

CREATE TABLE dates(
    date_id SERIAL PRIMARY KEY,
    date_name VARCHAR,
    date_description VARCHAR,
);



INSERT INTO timings(timing_name, timing_description)
VALUES
('Morning', 'Morning activities! Best enjoyed from the crack of dawn right up until 12 noon.'),
('Afternoon', 'Afternoon activities! Perfect for 12pm - 6pm.'),
('Evening', 'Evening Activities! From 6pm until late.');

INSERT INTO categories(category_name, category_description)
VALUES
('Food and Drink', 'Activities that''ll make you tummy rumble just reading about them!'),
('Outdoors', 'Dates for the outdoorsy types!'),
('Games', 'All types of gaming ideas, from cards, to video games, to board games!'),
('Streaming', 'What to watch on those slow mornings, rainy days or cosy evenings!'),
('Social', 'Group up with other households in socially-distanced or online settings for that much-needed social time!')