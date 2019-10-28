# SB Hacks V

This is the website for SB Hacks V (Jan 2019).

Built with Node.js (Express), React.js (Redux), Postgres, and MongoDB (session store)

Needs a .env file!! (Ask me for one)

## Instructions for installation and start up
  * Install nodejs
  * git clone this repo
  * `cd SB_Hacks_VI`
  * `npm install`
  * `npm run build`
  * In order to setup the Database
    * Install PSQL (If it isn't already installed)
    * Login to PSQL CLI with user ```postgres```
      * ```psql -U postgres```
    * In PSQL CLI:
      * `CREATE DATABASE sbhacksvi_dev;`
  * Type `npm start` to start the server. Close server.
  * Type `num run seed` to load the initial schools in the database
  * Type `npm start` again to start the server.
