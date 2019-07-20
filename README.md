[![Build Status](https://travis-ci.org/TunedChaos/smm2coursemanager-server.svg?branch=master)](https://travis-ci.org/TunedChaos/smm2coursemanager-server) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# SMM2CourseManager Server

SMM2CourseManager Server is a utility meant for serving up an interface between the database that the SMM2Coursemanager uses, and any clients that wish to connect to it.

## Prerequisites
- [Node.js&reg;](https://nodejs.org)<br />
- Database Software

This readme will not instruct you on how to install any of the database softwares.

- Supported Database Software
  - MySQL
  - MariaDB
  - SQLite
  - PostgreSQL
  - MSSQL

## Installation
Clone this repository to the device you intend to use as your server.
```bash
git clone git@github.com:TunedChaos/smm2coursemanager-server.git
```

Using the Node.js&reg; Package Manager to install prerequisites.
```bash
npm install
```

Choose to install the database library you wish to use.<br />
You only need **one**!

**<u>MySQL</u>**
```bash
npm install mysql2
```
**<u>MariaDB</u>**
```bash
npm install mariadb
```
**<u>SQLite</u>**
```bash
npm install sqlite3
```
**<u>PostgreSQL</u>**
```bash
npm install pg pg-hstore
```
**<u>MSSQL</u>**
```bash
npm install tedious
```

## Configuring the Database
Rename `config/config.json.example` to `config/config.json` and edit it to look similar to one of these. Replacing information with your own valid information.<br />

**<u>MySQL</u>**
```json
{
  "development": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "DEVELOPMENT_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "TEST_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "PRODUCTION_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```
**<u>MariaDB</u>**
```json
{
  "development": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "DEVELOPMENT_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "TEST_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "PRODUCTION_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```
**<u>SQLite</u>**
```json
{
  "development": {
    "dialect": "sqlite",
    "storage": "path/to/database.sqlite"
  },
  "test": {
    "dialect": "sqlite",
    "storage": "path/to/database.sqlite"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "path/to/database.sqlite"
  }
}
```
**<u>PostgreSQL without Unix Socket</u>**
```json
{
  "development": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "DEVELOPMENT_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "TEST_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "PRODUCTION_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "postgres",
    "operatorsAliases": false
  }
```
**<u>PostgreSQL with Unix Socket</u>**
```json
{
  "development": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "DEVELOPMENT_DATABASE_NAME",
    "host": "/path/to/socket_directory",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "TEST_DATABASE_NAME",
    "host": "/path/to/socket_directory",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "PRODUCTION_DATABASE_NAME",
    "host": "/path/to/socket_directory",
    "dialect": "postgres",
    "operatorsAliases": false
  }
```
**<u>MSSQL</u>**
```json
{
  "development": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "DEVELOPMENT_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mssql",
    "operatorsAliases": false
  },
  "test": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "TEST_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mssql",
    "operatorsAliases": false
  },
  "production": {
    "username": "USERNAME",
    "password": "DATABASE_PASSWORD",
    "database": "PRODUCTION_DATABASE_NAME",
    "host": "DATABASE_ADDRESS",
    "dialect": "mssql",
    "operatorsAliases": false
  }
```
After the above is configured, you should be able to run the following command:
```bash
npx sequelize-cli db:migrate
```
**Optional Step:**<br />
I have included some sample seed data, you can use this by running this command.
```bash
npx sequelize-cli db:seed:all
```

## General configuration
Rename `.env.example` to `.env` and assign your own `AUTHCODE`, this can be almost anything you want, but I highly recommend setting it to a strong alphanumeric key.

REMEMBER THIS KEY YOU WILL NEED IT FOR ALL DATA MODIFYING CLIENTS

You can use this utility to get some generated for you https://randomkeygen.com/

Note that if you are deploying via Heroku you **must** set `AUTHCODE` in your settings panel.

## Running
At this point you can just attempt to run the server with `npm start`.

If you wish to have some more detailed monitoring you can run `npm run dev`

## Deploying through a web server
This actually takes some doing, ultimately it is recommended to follow guidance for deploying a NodeJS&reg; through your web server of choice, this should work with almost any, though has only been tested with NGINX.

## Viewing
Depending on your server configuration, you should be able to go to the address of your device in a web browser and you will see a screen that shows current course and next course status.

If you're testing on a local machine without a domain this will be `http://localhost:3000`

If you've deployed to a web server with a domain it will be at the root of that domain.

## Common Errors
```bash
Error: Please install <database package name> package manually
```
This is likely because you've configured to utilize a particular database library, but did not run the installer, please scroll up to see how to install the appropriate library.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/TunedChaos/smm2coursemanager-server/blob/master/LICENSE)
