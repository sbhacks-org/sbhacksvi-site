#! /bin/bash

NODE_SASS="./node_modules/.bin/node-sass";
SCSS_PATH="./src/assets/scss";
CSS_OUTPUT_PATH="./src/static/css";

if [ "$NODE_ENV" == "production" ]
then
	$NODE_SASS --output-style=compressed $SCSS_PATH/landingpage/index.scss $CSS_OUTPUT_PATH/landingpage.css;
	$NODE_SASS --output-style=compressed $SCSS_PATH/registrant/index.scss $CSS_OUTPUT_PATH/registrant.css;
	node bin/compile_landingpage.js
	npm run react-build:production;
else
	$NODE_SASS $SCSS_PATH/landingpage/index.scss $CSS_OUTPUT_PATH/landingpage.css;
	$NODE_SASS $SCSS_PATH/registrant/index.scss $CSS_OUTPUT_PATH/registrant.css;
	npm run react-build;
fi