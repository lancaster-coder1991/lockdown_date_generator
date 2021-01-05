DROP DATABASE IF EXISTS lockdown_dates_test;

CREATE DATABASE lockdown_dates_test;

\c lockdown_dates;

CREATE TABLE timings(
    timing_id SERIAL PRIMARY KEY,
    timing_name VARCHAR NOT NULL,
    timing_description VARCHAR not null,
    UNIQUE(timing_name)
);

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR not null,
    category_description VARCHAR not null,
    UNIQUE(category_name)
);

CREATE TABLE dates(
    date_id SERIAL PRIMARY KEY,
    date_name VARCHAR not null,
    date_description VARCHAR not null,
    UNIQUE(date_name)
);

CREATE TABLE date_timings(
    timing_id INT not null,
    date_id INT not null,
    CONSTRAINT PK_date_timings PRIMARY KEY(timing_id, date_id),
    FOREIGN KEY (timing_id) REFERENCES timings(timing_id),
    FOREIGN KEY (date_id) REFERENCES dates(date_id)
);

CREATE TABLE date_categories(
    category_id INT not null,
    date_id INT not null,
    CONSTRAINT PK_date_categories PRIMARY KEY(category_id, date_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (date_id) REFERENCES dates(date_id)
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
('Social', 'Group up with other households in socially-distanced or online settings for that much-needed social time!');

INSERT INTO dates(date_name, date_description)
VALUES
('Breakfast in Bed', 'Why not treat yourself to some smoked salmon and bagels, or a cheeky fry up?'), -- Morning / Food and Drink
('Afternoon Tea', 'Bake up some scones, make some sarnies and get the cake trays out - time to sip tea and nibble baked goods! Add a glass of fizz for a cheeky extra!'), -- Afternoon / Food and Drink
('Make pizzas together', 'Get your dough out and chose your toppings - making pizzas is a fun activity that leaves you with a tasty meal at the end of it!'), -- Evening / Food and Drink
('Go for a walk with a picnic', 'If you live near the countryside of a park, pack up your sarnies, get your boots on and stretch your legs! Just make sure you check the weather first ;) and depending on your tier, you can get a gorup of up to 6 together to join you!'), -- Morning + Afternoon / Food and Drink + Outdoors + Social
('Go for a bike ride', 'If you have access to some bike trails and have bikes, get your bikes out! And if you live in a lower-tier area, you can get a group of 6 to join you!'), -- Morning + Afternoon / Outdoors + Social
('Go for a moonlit walk', 'Why not stretch your legs after your evening meal or before you go to bed, and have a stroll around the block?'), -- Evening / Outdoors
('Play some Jackbox with friends!', 'Jackbox games are fun and lightweight games sure to get the crew laughing in no time. Download from Steam and let the chaos commence!'), -- Afternoon + Evening / Games + Social
('Online pub quiz', 'Surely we''ve all done a couple of quizzes by now - but there''s a reason for that - they''re an easy way to get people online for a chat for a few hours with some entertainment!'), -- Afternoon + Evening / Games + Social
('Easy console gaming', 'If you have a console in the house, why not lok up some games that are lightweight and easy to get into for both of you? We suggest trying out something like Overcooked or Worms!'), -- Morning, Afternoon, Evening / Games
('Film night with popcorn', 'Pick a movie genre, pick a popcorn flavour, and snuggle up on the sofa for the evening to enjoy a couple of films!'), -- Evening / Streaming, Food and Drink
('Netflix binge', 'There''s so many Netflix exclusives out there it''s hard to keep track! Lockdown is the perfect time to catch up on any you''ve missed - stick on a season and engross yourself for a few hours!'); --Morning, Afternoon, Evening / Streaming

INSERT INTO date_timings(timing_id, date_id)
VALUES
(1, 1),
(3, 2),
(1, 3),
(2, 3),
(1, 4),
(1, 5),
(2, 5),
(3, 6),
(2, 7),
(3, 7),
(2, 8),
(3, 8),
(1, 9),
(2, 9),
(3, 9),
(3, 10),
(1, 11),
(2, 11),
(3, 11);

INSERT INTO date_categories(category_id, date_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 4),
(5, 4),
(2, 5),
(5, 5),
(2, 6),
(3, 7),
(5, 7),
(3, 8),
(5, 8),
(3, 9),
(1, 10),
(4, 10),
(4, 11);

