# Backend Part | MERN Stack
## *for White Rabbit Project*

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Html logo" title="Html" height="25" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS logo" title="CSS" height="25"/> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JS logo" title="JS" height="25" /> 

<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDb logo" title="MongoDb" height="25" /> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" title="Express" height="25"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React logo" title="React" height="25" /> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node logo" title="Node" height="25" />

### Install

- First, create index.js.
- Then open terminal and type `npm init -y` to init empty `package.json`
- Install dependencies with command `npm install body-parser cors express mongoose nodemon`  
- And import all these in index.js

```js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
```

- In package.json, after line `"main": "index.js,"`
you can add

```json
"type": "module",
"scripts": {
  "start": "nodemon index.js"
},
```
