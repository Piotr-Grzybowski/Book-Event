# Book the event

> Simple app that let's us book the event. On frontend it is a simple form with inputs and react-datepicker. Data is stored by redux and correct actions are dispatched when values changes or submit button is clicked. On backend informations from inputs are validated with Express validator and saved to MongoDb.
Front and back end are tested using jest and react-testing-library. MongoDb memory server is used to mock real MongoDb on test purpose. For end to end tests I used Cypress.

<img src="https://i.postimg.cc/fW6gZhct/Zrzut-ekranu-z-2020-09-27-13-39-53.png" alt="working app">

## Setup the project from the repo locally:
- First clone this repository
```shell
git clone https://github.com/Piotr-Grzybowski/book-event.git
```
- Install all dependencies with command yarn install:all
``` shell 
yarn install:all
```
- App requires mongoDb to work. You can either install it locally or use Atlas servers. In backend server open file .env.example. Then assign to the env variable called DB_URL your database url. After that rename file to '.env'.
``` shell 
.env.example => .env
```
- Run project with yarn start
```shell
yarn start
```

<img src="https://i.postimg.cc/xCXtDsq3/Zrzut-ekranu-z-2020-09-27-13-39-38.png" alt="working app">

## Testing

### End to end tests with cypress

- Run project with yarn start
```shell
yarn start
```
- Run cypress with yarn cypress
```shell
yarn cypress
```
Click on test called 'booking_an_event.spec.js' to start it. Cypress will start headless browser and make tests.

<img src="https://i.postimg.cc/L4ZNx0cH/Zrzut-ekranu-z-2020-09-27-13-36-06.png" alt="cypress at work">

### Tests with jest

- Run tests with yarn test
```shell
yarn test
```
This will start tests on both frontend and backend.

<img src="https://i.postimg.cc/sfp5QdFZ/Zrzut-ekranu-z-2020-09-27-15-02-47.png" alt="tests suites passed">