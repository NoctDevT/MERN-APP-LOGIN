# Login-Mern-App
An unfinished application which uses a MERN stack to login made in 2021 
Application uses JWT authentication with salt to securely store password within database.
Application has the ability to send password recovery to users and uses validation forms to protect against injection attacks.

Built using Tailwind, MaterialUI, React, MongoDB Express

Todo: User list needs finishing, data validation for submitting a message.

# Step 1

To setup project create .env file in serverjs with following details

NODE_ENV=development

PORT=3000      //Frontend

HOST=localhost //Frontend

TOKEN_SECRET=  //Secret Key for creating JWT tokens

MAILPASS= //Mail Provider password

MAILEMAIL= //Mail Provider email

MONGO_LOGIN_STRING= //MongoDB Atlas Connection String


# Step 2
Run NPM run start within frontend and serverjs directories.


Will be cleaning project up
