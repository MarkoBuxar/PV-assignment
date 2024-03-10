# puellavone assignment

## Setup

### server

- install yarn if necessary, however, npm should work with some adjustments ( untested )
  - execute `yarn` command in CLI ( install node modules )
- create `.env` file
  - populate file with database info ( `.env_example` )
- modify port in `src/Config/Config.json` to your liking
- run server
  - execute `yarn dev` for dev mode
  - execute `yarn build` to build into js files
  - execute `yarn start` to run built js files   

 ### client

standard Vite.JS instance

- cd into client folder 
- execute `yarn` command ( install node modules )
- make sure port and url are the same between client and server
- run client
  - execute `yarn dev` for dev mode