Developed a robust Airline Ticket Booking System integrating essential
functionalities like Authentication, Authorization, Seat Booking, Payment
module, and a Notification Service to ensure a seamless and efficient
booking experience.
• Employed a comprehensive technology stack, including Node.js with various
npm libraries, RabbitMQ for efficient queue management, MySQL as the
database, and Sequelize as the ORM. Implemented a Microservices
Architecture to enhance scalability and maintainability, utilizing Winston
Logger for streamlined monitoring and debugging. Additionally, Dockerized
the API server for improved consistency, portability, and scalability by
packaging the application and its dependencies into a container.

This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project managment recommendations. Feel free to change anything.

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests.(You might want to make seperate tests folder)

Lets take a look inside the `src` folder

- `Config` -> In this folder anything and everything regarding any configuration o:
setup of a library or module will be done for example : setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library should also be done here. 

- `routes`-> In the routes folder, we register a route and the corresponding middleware and controller to it.

-`middlewares` -> they are just going to intercept the incoming request where we can write our validators, authenticators etc.

-`controllers` -> they are kind of the last middlewares as post them you call your buisness layer to execute the bussiness logic. In Controllers we just 
we just receive the incoming requests and data and then pass it to the bussiness layer, and once bussiness layer, and once bussiness layer returns an 
output, we structure the api response in conttollers and send the output.

-`repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

-`sevices` -> this folder contains the bussiness logic and interacts with repositories for data from the database.

-`utils` -> contains helper methods, error classes etc.

### Setup the project

-Download this template from github and open it in your favourite text editor.
-In the root directory create a `.env` file and add the following env variables
    ```
        PORT=<port number of your choice>
    ```
    ex:
    ```
        PORT=3000
    ```

- Inside the `src/config` folder create a file named `config.json` and write the following code:
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
-If you are setting up your development environment, then write the username of your db,password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb, etc.
-If you are setting up test or prod environment, make sure you also replace the host with the hosted db url.
