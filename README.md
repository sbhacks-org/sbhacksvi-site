# SB Hacks IV

## Website

This is the website for SB Hacks IV

## Instructions for installation and start up
 - This will not run without a .env file which I will give you
 - Install nodejs
 - git clone this repo
 - cd sbhacksiv
 - npm install
 - npm run build
 * Setup Database
  * Install PSQL
  * Create user 'sbhacksiv' with password '1234'
  * Create database 'sbhacksiv_development'
 - npm start

## TODO
 * Relook at models
  * Potentially need dietary Restrictions
   * Store as array of options?
 * Reactjs implementation
  * Server side render + Client side
 * Schools list
  * Easy integration with Reactjs passing in props of school list and updating state for autocomplete
