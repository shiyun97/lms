# learning-management-system
This is a learning management platform for administration, tracking, reporting, and delivery of educational programs or classes.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), supported with Java EE Backend using NetBeans to supply the RESTful APIs.

## Overview
### Folder Structure

        learning-management-system
        |     
        |__ dist - library design formats
        |     |
        |     |__ css - libary css files
        |     |__ font - roboto fonts
        |     |__ img - basic icons/ pngs
        |     |__ scss - libary scss files
        |     |__ types
        |     
        |__ docs - main project built
        |     |
        |     |__ assets - additional library modules
        |     |__ components - base app design
        |     |__ dev - main project pages and components
        |     |     |
        |     |     |__ Admin - components for admin users
        |     |     |__ json - mock json for frontend api testing
        |     |     |__ Public - components for public users
        |     |     |__ Student - components for student users
        |     |     |__ Teacher - components for teacher users
        |     |     |__ utils - additional functions
        |     |     
        |     |__ pages - library components
        |     |__ stores - MobX store
        |     
        |__ node_modules - node package modules installation
        |__ public - main project built
        |__ src - library project built
              |
              |__ components - library base components design
              |__ tests - library tests

### Component Layout

        Index
        |     
        |__ App 
              |
              |__ Routes

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
npx json-server -p 3001 ./docs/dev/json/consultation.json
```
