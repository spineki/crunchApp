# CrunchApp, an app for Cruncho

## ASSIGNMENT
"Using any places API, a view framework and a state management framework of choice - create an SPA which will show a list of 10 nearby restaurants and the distance in kilometres from your current location.  

Recommended stuff:  TypeScript, create-react-app, google places api / HERE api.  
Any creative addition to the application is welcome. Adding a “killer feature” VERY welcome :)"


## Library Used
Axios: for better REST requests management (error handling, etc)
Material-ui: for fast prototyping and good looking UI

## Installation

- `yarn install`
- `yarn start`

then 
- `cp credentials-example.ts credentials.ts`
and change the API Key by the one I sent to you in the email (or your own if you already have one ! ^^)


## Features

- You can specify your own latitude and longitude
- You can also automatically get your location by pressing the "auto localize me" button
- 10 restaurants will appear, displayed from the nearest to the farthest away
- On click, you can graph more info one the selected restaurant
- You can see the related tags
- You can see the place of the restaurant
- You can __Click on the location__ and you will be automatically redirected to google maps.

## Possible Issues
On mac, the system can deny geolocalisation silently... You need to change your system preference to make auto geolocalisation work 


