# AttainU Post Creation Backend
This repository is to maintain backend of post and user management


## Software requirements:
```
1. Node.js: 14.15.0
2. MongoDB: 5.0

## Instructions to set up:
1. Clone the repository by following command: ```git clone https://github.com/Deepank0777/attainUTask.git```
2. Run ```npm install``` to install all the dependencies.
3. Create .env file to save all the credentials example file can we found as .env.example
4. ```npm start``` to start backend server.


## Instructions to use APIs:
1. postman folder has a json file which needs to be imported in the postman app.
2. user folder has login APIs
3. post folder has post related APIs
4. pass x-access-token in the headers to consume the post apis
5. by default ```admin``` user is treated as having authorities to create post
6. few user including admin and student has been created which you can user to access this app (you can import the database dump which is placed in the database folder) 