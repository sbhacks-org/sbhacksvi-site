# SB Hacks IV

## Website

This is the website for SB Hacks IV. <br />

This will not run without a .env file which I will give you

## Instructions for installation and start up
  * Install nodejs
  * git clone this repo
  * cd sbhacksiv
  * npm install
  * npm run build
  * Setup Database
    * Install PSQL
    * Create user 'sbhacksiv' with password '1234'
    * Create database 'sbhacksiv_development'
  * Type npm start to start the server

## TODO
  * Create landing page for temporary deployment
    * Work on ejs views first
      * Convert to react when design feels fluid
  * Relook at models
    * Potentially need dietary Restrictions
      * Store as array of options?
  * Schools list
    * Easy integration with Reactjs passing in props of school list and updating state for autocomplete
