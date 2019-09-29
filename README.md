# learning-management-system
This is a learning management paltform for administration, tracking, reporting, and delivery of educational programs or classes.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), supported with Java EE Backend using NetBeans to supply the RESTful APIs.

## Overview of Components
### Component Layout

        Index
        |     
        |__ App 
              |
              |__ Routes

## Available Scripts

In the project directory, you can run:

#### `npm run webpack`

Runs the app in the development mode.<br>
Open [http://localhost:3100](http://localhost:3100) to view it in the browser.

The page will reload if you make edits.<br>

## Special Instructions and Handlings
### Setup Guide
1. Open Git Bash/ Command Prompt/ Terminal. Clone repository.

```
git clone https://github.com/aficat/learning-management-system.git
```
2. Navigate to project folder

```
cd learning-management-system
```

3. Install dependencies and run:

```
npm install
npm run webpack
```

### Guide to Run Mock JSON Server
1. Open Git Bash/ Command Prompt/ Terminal. Install global package of json-server.

```
npm install -g json-server
```
2. Create json file, e.g. successLogin.json
3. Run json-server.

```
npx json-server -p 3001 ./docs/dev/json/successLogin.json
```