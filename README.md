# About

This project is an attempt to bring an simple, easy and obvious to use RESTful API for the TrinityCore project. 

# Installation

Frist of all you all you will need nodejs & npm. Clone the project and then run: 

```npm install```

This should install all dependencies. 

Next you need to provide a configuration to the application via environemnt variables. For the most up to date required variables you can check `app.js`, at the top, there you should see a checkEnvs call. 

You can either set them manually or create a .env file at the root of this project. An example configuration may look like this:

.env

```

TC_DB_HOST=localhost
TC_DB_USERNAME=trinity
TC_DB_PASSWORD=trinity
TC_API_SECRET=SOME_RANDOM_A$$_STRING_THAT_WILL_BE_USED_TO_ENCRYPT_YOUR_COOKIES
PORT=80
```

If you configured everything correctly you should be able to just run 


```npm run start``` 

and the app should work be running (by default on port 3000).
