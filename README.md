# SB Hacks V

This is the website for SB Hacks V (Jan 2019).

Built with Node.js (Express), React.js (Redux), Postgres, and MongoDB (session store)

Needs a .env file!! (Ask me for one)

## Instructions for installation and start up
  * Install nodejs
  * git clone this repo
  * `cd sbhacksiv`
  * `npm install`
  * `npm run build`
  * In order to setup the Database
    * Install PSQL (If it isn't already installed)
    * In PSQL CLI:
      * `CREATE USER sbhacksiv WITH PASSWORD '1234'`
      * `CREATE DATABASE sbhacksiv_development`
  * Type npm start to start the server
