# SmartOpTestTechnique 🌐

## How to build ⚒️

### Prerequisites

- [Docker](https://www.docker.com/)  
###      or
- [NPM](https://www.npmjs.com/) <br /><br />

### installation
`git clone git@github.com:AugustinCms/SmartOpTestTechnique.git && cd SmartOpTestTechnique`<br /><br />
`rename .env.template in /api/ into .env and add the database link`

### build with docker :
`docker-compose -f docker-compose.dev.yml up`

### build with npm :
`cd api && npm i`<br />
`npm start`<br /><br />
`cd web/ && npm i`<br />
`npm start`