# k6-with-rabbit-and-dicom

This is a POC for a performance testing framework using K6, sending Rabbit messages and Dicom images.

## Prerequisites

* Node
* Javascript
* [K6](https://k6.io/docs/getting-started/installation/)

## Installation

* Clone the repo
* Run `npm install` in the terminal

## Start the server

* Run `npm start`

## Start the performance tests

### RabbitMQ

* Run `k6 run tests/rabbit.js`

### Dicom

* Run `k6 run tests/dicom.js`
