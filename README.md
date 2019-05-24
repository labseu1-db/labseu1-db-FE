# Discussion Board Pinely [![Build Status](https://travis-ci.org/labseu1-db/labseu1-db-FE.svg?branch=master)](https://travis-ci.org/labseu1-db/labseu1-db-FE)

Welcome to our Discussion Board.

If you want to see our trello board and tickets that we made click [here](https://trello.com/b/KnHyQcVL/mango) and if you want to see our Technical Documents, User Stories and Key Features click [here](https://www.notion.so/lambdamango/git-flow-c8154d55b6f840e98df53a637811122f).

Click [here](https://labseu1-db-test.firebaseapp.com) to visit the app, or click on the image below to view our video demo and tutorial:

[![Main Course App](https://firebasestorage.googleapis.com/v0/b/labseu1-db-test.appspot.com/o/Screenshot_23.png?alt=media&token=d4363fbb-033c-43b1-9f5c-319083f70030)](https://youtu.be/k5Zb9yh4GUQ)

## Team

|                                                                        [**Elisa Martin**](https://github.com/elisamartin)                                                                         |                                                                        [**Ivana Huckova**](https://github.com/ivanahuckova)                                                                        |                                                                          [**Novian Pun**](https://github.com/novinary)                                                                          |                                                                          [**Samar Vir**](https://github.com/samarv)                                                                          |                                                                                         [**Sean Attewell**](https://github.com/sean-attewell)                                                                                         |                                                                        [**Thorben Bender**](https://github.com/ThorbenBender)                                                                         |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://firebasestorage.googleapis.com/v0/b/labseu1-db-test.appspot.com/o/elisa.png?alt=media&token=bdaa6779-9ef0-4b01-a9b4-32a42d4ec876" width="80">](https://github.com/elisamartin) | [<img src="https://firebasestorage.googleapis.com/v0/b/labseu1-db-test.appspot.com/o/ivana.png?alt=media&token=7a380055-8230-4437-a0dd-6a9c43a4d0be" width="80">](https://github.com/ivanahuckova) | [<img src="https://firebasestorage.googleapis.com/v0/b/labseu1-db-test.appspot.com/o/novina.png?alt=media&token=84dabde2-4c63-4dd6-8b11-ca7b0e211ffa" width="80">](https://github.com/novinary) | [<img src="https://firebasestorage.googleapis.com/v0/b/labseu1-db-test.appspot.com/o/samar.png?alt=media&token=0ef650d6-e05e-45cd-b162-8880b72d4b87" width="80">](https://github.com/samarv) |                  [<img src="https://firebasestorage.googleapis.com/v0/b/labseu1-db-test.appspot.com/o/sean.png?alt=media&token=3afb7b95-1c81-4e90-a0df-1387b8b20c94" width="80">](https://github.com/sean-attewell)                   | [<img src="https://firebasestorage.googleapis.com/v0/b/labseu1-db-test.appspot.com/o/thorben.png?alt=media&token=0882b57a-f83c-4a9c-a045-cfc9c6486b75" width="80">](https://github.com/ThorbenBender) |
|                                                  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/elisamartin)                                                   |                                                  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ivanahuckova)                                                   |                                                   [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/novinary)                                                   |                                                  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/samarv)                                                   |                                                                   [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/sean-attewell)                                                                    |                                                   [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ThorbenBender)                                                    |
|                               [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/martin-elisa/)                               |                               [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/ivana-huckova/)                               |                          [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/novina-pun-7688a267/)                           |                              [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/samar-vir/)                              | [ <img src="https://firebasestorage.googleapis.com/v0/b/labseu1-db-test.appspot.com/o/bitcoin-coin.ico?alt=media&token=2a2e2d71-64a5-4857-8029-1b7f5aa6312e" width="15"> Seans Future](https://www.lopp.net/bitcoin-information.html) |                           [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/thorben-bender-05aa5617a/)                           |

# Table of Contents

- [Discussion Board](#discussion-board-pine)
- [Team](#team)
- [Table of Contents](#table-of-contents)
- [Scripts](#scripts)
  - [Running](#running)
- [Environment Variables](#environment-variables)
- [Tech-Stack](#tech-stack)
  - [Back-End Dependencies `(Production)`](#back-end-dependencies-production)
    - [Send Grid](#send-grid)
    - [Cors](#cors)
    - [ExpressJS](#ExpressJS)
    - [Firebase Admin](#firebase-admin)
    - [Firebase Functions](#firebase-functions)
    - [Stripe](#stripe)
  - [Back-End Dependencies `(Development)`](#back-end-dependencies-development)
    - [Eslint](#eslint)
    - [Firebase-Functions-Test](#firebase-functions-test)
  - [Front-End Dependencies `(Production)`](#front-end-dependencies-production)
    - [React](#react)
    - [Redux](#redux)
    - [Firebase](#firebase)
    - [Draft-JS](#draft-js)
    - [Dotenv](#dotenv)
    - [React-Giphy-Component](#react-giphy-component)
    - [React-Redux-Firebase](#react-redux-firebase)
    - [React-Router-Dom](#Connected-React-Router)
    - [React-Stripe-Elements](#react-stripe-elements)
    - [Redux-Firestore](#redux-firestore)
    - [Semantic-Ui](#semantic-ui)
    - [Styled-Components](#styled-components)
  - [Front-End Dependencies `(Development)`](#front-end-dependencies-development)
    - [Eslint](#eslint-1)
    - [Eslint-Config-Prettier](#eslint-config-prettier)
    - [React-Testing-Library](#react-testing-library)
- [API Documentation](#api-documentation)

  - [Third-Party APIs](#third-party-apis)
    - [React-Redux-Firebase](#react-redux-firebase-1)
    - [Firebase Functions](#firebase-functions-1)
    - [Stripe](#stripe-1)
  - [Front End Api](#front-end-api) - [Org Routes](#org-routes) - [Add a new Org](#add-new-org) - [Invite People to Org](#invite-people-to-org) - [Delete Org](#delete-org)

    - [Branch Route](#branch-routes) - [Add new branch](#add-new-branch) - [Invite People to Branch](#invite-people-to-branch) - [Kick People from Branch](#kick-people-from-brach) - [Delete Branch](#delete-branch)
    - [Tweak Routes](#tweak-routes) - [Add new tweak](#add-new-tweak) - [Delete tweak](#delete-tweak)
    - [Comment Routes](#comments-routes) - [Add new comment](#add-new-comment) - [Edit comment](#edit-comment) - [Like comment](#like-comment) - [Mark comment as decision](#mark-comment-as-decision) - [Delete Comment](#delete-comment)

# Scripts

## Running

`npm run start`: Runs only the front-end client.

`npm run test`: Will run the tests for front-end

`npm run build`: Will create a build file for front-end

# Environment Variables

`URL`: The url of the hosted website

# Tech-Stack

## Back-End Dependencies `(Production)`

### Send Grid

Used for user confirmation Emails (Required by employer). | [View Dependency](https://sendgrid.com/docs/)

### Firebase Admin

Firebase provides the tools and infrastructure you need to develop your app, grow your user base, and earn money. The Firebase Admin Node.js SDK enables access to Firebase services from privileged environments (such as servers or cloud) in Node.js. | [View Dependency](https://firebase.google.com/docs/admin/setup)

### Firebase Functions

Runs Code in response of Http Request or firebase Features [View Dependency](https://firebase.google.com/docs/functions)

### Cors

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers. | [View Dependency](https://github.com/expressjs/cors)

### ExpressJS

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability. Also, this means that this is a highly scalable choice when you consider the Event Loop which manages all asynchronous operations allowing the program to continue to run as expected without stops. | [View Dependency](http://expressjs.com/)

### Stripe

A powerful, simple, and seamless payment commerce solution | [View Dependency](https://stripe.com/docs/)

## Back-End Dependencies `(Development)`

### Eslint

Eslint is the dominant linting tool for NodeJS and it makes it possible to establish a clear coding convention for a team or project, as well as aiding in catching various bugs such as variables improperly scoped. | [View Dependency](https://eslint.org/)

### Firebase-functions-test

The firebase-functions-test is unit testing library for Cloud Functions for Firebase. It is a companion to firebase-functions. | [View Dependency](https://firebase.google.com/docs/functions/unit-testing)

## Front-End Dependencies `(Production)`

### React

React is the current industry standard that offers a lot of out of the box benefits. It is fast, efficient, and scalable. Due to the large community, finding solutions to potential problems and reference material is much easier, even for a potential dev without a lot of experience who would like to contribute to Main Course. | [View Dependency](https://reactjs.org/docs/getting-started.html)

### Redux

A state management tool making it possible to store the entire state of the application in a single store. This means a unidirectional data flow, and as the application scales we have predictable state updates which subsequently make things easier to test and introduce new features. Redux also has solid documentation and an active community, meaning that as new devs become introduced to the project it's likely that any problems they face would have already been encountered by someone else, thus making solutions easy to find. | [View Dependency](https://redux.js.org/)

### Firebase

The full Firebase JavaScript client includes support for Firebase Authentication, the Firebase Realtime Database, Firebase Storage, and Firebase Cloud Messaging. Including code via the above snippets will pull in all of these features. | [View Dependency](https://firebase.google.com/docs/web/setup)

### Draft-JS

Draft.js is a JavaScript rich text editor framework, built for React and backed by an immutable model. | [View Dependency](https://draftjs.org/docs/getting-started)

### dotenv

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology. | [View Dependency](https://www.npmjs.com/package/dotenv)

### React-giphy-component

A simple gif picker component for React using GIPHY API | [View Dependency](https://www.npmjs.com/package/react-giphy-component)

### React-Redux-Firebase

Redux bindings for Firebase. Includes Higher Order Component (HOC) for use with React. | [View Dependency](http://react-redux-firebase.com/docs/getting_started)

### React-Stripe-Elements

This library is a thin React wrapper around Stripe.js and Stripe Elements. It allows you to add Elements to any React app, and manages the state and lifecycle of Elements for you. | [View Dependency](https://stripe.com/docs)

### Redux-Firestore

Redux bindings for Firestore. Provides low-level API used in other libraries such as react-redux-firebase | [View Dependency](https://github.com/prescottprue/redux-firestore)

### Semantic-Ui

Let's you use prebuild and styled components for your website. | [View Dependency](https://react.semantic-ui.com)

### Styled Components

Has a thriving community and offers the ability to directly style multiple components within a file. The syntax used is familiar to JavaScript and improves code cleanliness and makes it easy to get up and going for those without a lot of css experience. Styled components are also very efficient, improving load time for users. | [View Dependency](https://www.styled-components.com/docs/)

### Connected React Router

Allows for the ability to synchronize state with redux store through uni-directional data flow, time traveling, and dispatching of history methods. This makes for an incredibly useful tool when dealing with various stages of state and subsequent routing for a seamless and intuitive UI. | [View Dependency](https://www.npmjs.com/package/connected-react-router)

## Front-End Dependencies `(Development)`

### Eslint

[See Above Explanation](#eslint)

### Eslint-Config-Prettier

Turns off all rules that are unnecessary or might conflict with Prettier.
This lets you use you favorite shareable config without letting its stylistic choices get in the way when using Prettier.
[View Dependency](https://github.com/prettier/eslint-config-prettier)

### React-Testing-Library

Lets you render and test your react-components. | [View Dependency](https://testing-library.com/docs/react-testing-library/api)

# API Documentation

## Third-Party APIs

### Send Grid 1

Used for user confirmation Emails | [View API](https://sendgrid.com/docs/)

### React-Redux-Firebase 1

Used to store data and authenticate User | [View API](https://firebase.google.com/docs/reference/js/)

### Firebase Functions 1

Used an event listener which will run code when a new org is created | [View API](https://firebase.google.com/docs/functions/database-events)

### Stripe 1

A powerful, simple, and seamless payment commerce solution | [View API](https://stripe.com/docs/)

## Front End Routes

### Org Routes

#### Add new Org

set organisations/{orgId}

```
{
	arrayOfAdminsEmails:  [
		'email@email.com'
	],
	arrayOfAdminsIds: [
		'adminId'
	],
	arrayOfUsersEmails: [
		'email@email.com', 'user@user.com'
	],
	arrayOfUsersIds: [
		'adminId', 'userId'
	],
	createdByUserId: 'adminId',
	isPremium: false (boolean),
	orgName: orgName
}
```

`arrayOfAdminsEmails`: will get set automatic
`arrayOfAdminsIds`: will get set automatic
`arrayOfAdminsEmails`: not required / contains adminsEmails
`arrayOfAdminsIds`: not required / contains adminsIds
`createdByUserId`: will get set automatic
`isPremium`: will get set to false at the beginning,
`orgName`: is required

#### Invite People to Org

update organisations/{orgId}

```
userEmails = [userEmail]
```

`userEmail`: is required

#### Delete Org

delete organisations/{orgId}

only orgId required

### Branch Route

#### Add new Branch

set branches/{branchId}

```
{
  arrayOfUserIdsInSpace: ['userId', 'userId'],
  orgId: orgId
  spaceCreatedByUserId: userId
  spaceName: 'Product'
}
```

`arrayOfUserIdsInSpace`: creator will get set automatic, not required
`orgId`: will get set automatic
`spaceCreatedByUserId`: will get set automatic
`spaceName`: is required

#### Invite People to Branch

update branches/{branchId}

```
userEmail = email@email.com
```

userEmail is required

#### Kick People from Branch

delete branches/{branchId}

```
userEmail = email@email.com
userId = userId
```

`ùserEmail`: is required
`userId`: is required

#### Delete Branch

delete branches/{branchId}

only the branch id is required

### Tweak Routes

#### Add new Tweak

set tweaks/{tweakId}

```
{
  arrayOfUserIdsWhoFollowUp: [userId],
  isFollowUp: false (boolean),
  lastCommentCreatedAt: timestamp,
  orgId: orgId,
  spaceId: spaceId,
  threadCreatedAt: timestamp,
  threadCreatedByUserId: userId,
  threadCreatedByUserName: userName,
  threadName: threadName,
  threadTopic: threadTopic
}
```

`arrayOfUserIdsWhoFollowUp`: is not required
`isFollowUp`: false by default (boolean)
`lastCommentCreatedAt`: will get set automatic
`spaceId`: created automatic
`threadCreatedAt`: timestamp
`threadCreatedByUserId`: will get set automatic
`threadCreatedByUserName`: will get set automatic
`threadName`: is required
`threadTopic`: is not required
`whenUserHasSeen`: is not required

#### Delete Tweak

delete tweaks/{tweakId}

only the tweakId is required

### Comment Routes

#### Add new Comment

set comments/{commentId}

```
{
  arrayOfUserIdsWhoLiked: [userId, userId],
  commentBody: 'Hello guys',
  commentCreatedAt: timestamp,
  commentCreatedByUserId: userId,
  commentCreatedByUserName: userName,
  commentUpdatedAt: timestamp,
  isCommentDecided: false (boolean),
  isCommentUpdated: false (boolean),
  orgId: orgId,
  threadId: threadId,
  threadName: threadName
}
```

`àrrayOfUserIdsWhoLiked`: is not required
`commentBody`: is required
`commentCreatedAt`: will get set automatic
`commentCreatedByUserId`: will get set automatic
`commentCreatedByUserName`: will get set automatic
`commentUpdatedAt`: will get set automatic
`ìsCommentDecided`: will get set automatic
`isCommentUpdated`: will get set automatic
`òrgId`: will get set automatic
`threadId`: will get set automatic
`threadName`: will get set automatic

#### Edit Comment

update comments/{commentId}

```
{
  commentBody: newComment,
  commentUpdatedAt: timestamp,
  commentUpdated: true (boolean)
}
```

`commentBody`: is required
`isCommentUpdatedAt`: will get set automatic
`isCommentUpdated`: will get set automatic

#### Like Comment

update comments/{commentId}

only userId is required

#### Mark Comment as Decision

updated comments/{commentId}

will set isCommentDecided to true

#### Delete Comment

delete comments/{commentId}

only commentId is required

### User Route

#### Create a User

set users/{userId}

```
{
  arrayOfOrgsIds: [orgId, orgId],
  arrayOfOrgsNames: [orgName, orgName],
  arrayOfSpaceIds: [spaceId, spaceId],
  arrayOfSpaceNames: [spaceName, spaceName],
  fullName: fullName,
  profileUrl: url,
  userEmail: userEmail
}
```

`arrayOfOrgsIds`: is not required
`arrayOfOrgsNames`: is not required
`arrayOfSpaceIds`: is not required
`arrayOfSpaceNames`: is not required
`fullName`: is required
`profileUrl`: will get set automatic
`userEmail`: is required

### Delete Space or Org from User

delete users/{userId}

Only the space or org id is required

### Update User

update users/{userId}

only userName is required
