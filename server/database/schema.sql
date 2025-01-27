create table website_user (
  id int unsigned primary key auto_increment not null,
  lastname varchar(255) null,
  firstname varchar(255) null,
  address tinytext null,
  email varchar(255) not null unique,
  phone_number char(10) null,
  hashed_password varchar(250) not null,
  is_admin boolean default false,
  constraint chk_phone_number_length check (length(phone_number) = 10),
  constraint chk_email_format check (email like '%_@_%._%')
);

create index idx_email on website_user(email);
create index idx_phone_number on website_user(phone_number);

create table engine (
  id int unsigned primary key auto_increment not null,
  horsepower int unsigned not null,
  power_type ENUM('électrique', 'essence', 'diesel') not null,
  consumption decimal(5, 2) default null,
  autonomy_km int unsigned default null,
  refill_price decimal(5, 2) unsigned not null
);

create index idx_power_type on engine(power_type);

create table vehicle (
  id int unsigned primary key auto_increment not null,
  owner_id int unsigned not null,
  brand varchar(255) not null,
  model varchar(255) not null,
  license_plate varchar(255) not null unique,
  registration_date date not null,
  price decimal(10, 2) unsigned null,
  carbon_footprint float null,
  crit_air_card int unsigned null,
  engine_id int unsigned not null,
  foreign key(owner_id) references website_user(id),
  foreign key(engine_id) references engine(id),
  constraint chk_crit_air_card check (crit_air_card between 0 and 5),
  constraint chk_license_plate check (length(license_plate) >= 7 and length(license_plate) <= 9)
);

create index idx_owner_id on vehicle(owner_id);
create index idx_engine_id on vehicle(engine_id);
create index idx_license_plate on vehicle(license_plate);

create table company (
  id int unsigned primary key auto_increment not null,
  company_name varchar(255) not null,
  owner_id int unsigned not null,
  fleet_size int unsigned not null,
  company_address tinytext not null,
  foreign key(owner_id) references website_user(id)
);

create index idx_owner_id on company(owner_id);

create table driving_habit (
  user_id int unsigned primary key auto_increment not null,
  driven_distance int unsigned not null,
  fuel_cost decimal(10, 2) not null,
  foreign key(user_id) references website_user(id)
);

create index idx_user_id on driving_habit(user_id);

create table queries (
  id int unsigned primary key auto_increment not null,
  contact_email varchar(255) not null,
  submit_date timestamp not null default current_timestamp,
  category ENUM('Renouvellement', 'Flotte', 'Besoin', 'Autre') not null,
  message text not null
);

create index idx_contact_email on queries(contact_email);
create index idx_category on queries(category);

create table history (
  id int unsigned primary key auto_increment not null,
  user_id int unsigned not null,
  email varchar(255) not null,
  vehicle_brand varchar(255) not null,
  vehicle_model varchar(255) not null,
  compared_vehicle_brand varchar(255) not null,
  compared_vehicle_model varchar(255) not null,
  yearly_savings decimal(10, 2) not null,
  distance decimal(10, 2) not null,
  insurance_cost decimal(10, 2) default null,
  trip_type varchar(255) default null,
  mixed_trip_details varchar(255) default null,
  renewal_date varchar(255) default null,
  different_brand varchar(255) default null,
  trip_modifications varchar(255) default null,
  comparison_date timestamp not null default current_timestamp
);
create index idx_user_id on history(user_id);

insert into website_user (lastname, firstname, address, email, phone_number, hashed_password, is_admin) values ('Doe', 'John', '1, rue de la Paix, 75000 Paris', 'email@example.com', '0123456789', 'password', true);
insert into website_user (lastname, firstname, address, email, phone_number, hashed_password, is_admin) values ('Doe', 'Jane', '1, rue de la Paix, 75000 Paris', 'email2@example.com', '0123456789', 'password', false);
insert into website_user (lastname, firstname, address, email, phone_number, hashed_password, is_admin) values ('Doe', 'Jack', '1, rue de la Paix, 75000 Paris', 'email3@example.com', '0123456789', 'password', false);

insert into engine (horsepower, power_type, consumption, autonomy_km, refill_price) values (100, 'électrique', 0.0, 300, 50.0);
insert into engine (horsepower, power_type, consumption, autonomy_km, refill_price) values (100, 'essence', 5.0, 300, 50.0);

insert into vehicle (owner_id, brand, model, license_plate, registration_date, price, carbon_footprint, crit_air_card, engine_id) values (1, 'Renault', 'Zoe', 'AB123CD', '2020-01-01', 20000, 0.0, 1, 1);
insert into vehicle (owner_id, brand, model, license_plate, registration_date, price, carbon_footprint, crit_air_card, engine_id) values (2, 'Renault', 'Clio', 'EF456GH', '2020-01-01', 15000, 0.0, 1, 1);
insert into vehicle (owner_id, brand, model, license_plate, registration_date, price, carbon_footprint, crit_air_card, engine_id) values (3, 'Renault', 'Twingo', 'IJ789KL', '2020-01-01', 10000, 0.0, 1, 1);

insert into vehicle (owner_id, brand, model, license_plate, registration_date, price, carbon_footprint, crit_air_card, engine_id) values (1, 'VW', 'Golf', 'AB123CE', '2020-01-01', 20000, 0.0, 1, 2);
insert into vehicle (owner_id, brand, model, license_plate, registration_date, price, carbon_footprint, crit_air_card, engine_id) values (2, 'VW', 'Golf', 'EF456GI', '2020-01-01', 15000, 0.0, 1, 2);
insert into vehicle (owner_id, brand, model, license_plate, registration_date, price, carbon_footprint, crit_air_card, engine_id) values (3, 'VW', 'Golf', 'IJ789KM', '2020-01-01', 10000, 0.0, 1, 2);

insert into driving_habit (user_id, driven_distance, fuel_cost) values (1, 1000, 100.0);
insert into driving_habit (user_id, driven_distance, fuel_cost) values (2, 2000, 200.0);
insert into driving_habit (user_id, driven_distance, fuel_cost) values (3, 3000, 300.0);

insert into company (company_name, owner_id, fleet_size, company_address) values ('Company', 1, 10, '1, rue de la Paix, 75000 Paris');
insert into company (company_name, owner_id, fleet_size, company_address) values ('Company 2', 1, 20, '1, rue de la Paix, 75000 Paris');

insert into queries (contact_email, category, submit_date, message) values ('email@example.com', 'Renouvellement', '2025-01-19', 'Bonjour, ceci est un message.');

insert into history (user_id, email, vehicle_brand, vehicle_model, compared_vehicle_brand, compared_vehicle_model, yearly_savings, distance, insurance_cost, trip_type, mixed_trip_details, renewal_date, different_brand, trip_modifications) values (1, 'email@example.com', 'Renault', 'Zoe', 'VW', 'Golf', 1000.0, 10000.0, 840.0, 'Mixte', 'Oui', '3 mois', 'Mercedes', '20km');