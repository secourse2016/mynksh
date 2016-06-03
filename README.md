# MYNKSH
###DISCLAIMER
 • Project is just a simulation for a real airline webserver and it can be ONLY used for learning purpose NO MORE
 • The project is built for an university course (Software Engineering- German University in Cairo) under the supervison of University
 • No actual companies or payments were involved, all payments are done in test mode, so no real cards are charged.</p>
### Project Description 
#####This project is done using MEAN stack (MongoDB, ExpressJS, AngularJS, NodeJS)</h5>
Our team has been hired to build an online reservation system simulation for a virtual airline company. The system will be comprised of a single page web application using mongodb, nodejs, and angular.The application is also extended to support an IOS & Android mobile platform.
<p>
The airline company has initially requested the system support a very basic workflow:
 • Allow any user to specify his/her travel location(s) and dates
 • Provide all available (from/to) flights
 • Select, confirm, and pay for flights
</p>
<p>You can also login in to our website and try it `<b>www.mynksh.com</b>`</p>
### How to run the web app:
1. Clone the repo through `$ git clone https://github.com/secourse2016/mynksh`
2. Navigate into the directory using `$ mynksh`, Then run `npm install` to get all required packages.
3. Initialize a MongoDB with any desired name
4. Create a `.env` file having the follwing variables:
  * `JWTSECRET`, the JWT secret key for authentication for the secure APIs, the JWTs can be found in the following directory public>Services so you will need to re-initialize them.
  * `PORT`, port number for application to run on.
  * `MONGODB_URL`, the MongoDB Url for the Database you previously created.
  * `STRIPE_KEY`, Stripe seceret key which you can get from Stripe website for testing prupose.
5. Make sure your MongoDB connection is alive if not start a MongoDB connection `$ sudo service mongod start`.
6. Finally now you ready to start your server, So just type `npm start`.

### How to run the Ionic app:
1.  Install Ionic and Cordova on your machine `$ npm install -g cordova ionic`, and run `ionic serve --lab`
  * The Ionic is ready to be used on web machine as it is a simulation for a mobile application
  
###Team:
 - [Hazem Ayman](https://github.com/hazem279)
 - [Mohamed Ashraf](https://github.com/Kefa7y)
 - [Mostafa Ibrahim](https://github.com/xXGenomXx)
 - [Narihan Ellithy](https://github.com/narihane)
 - [Safa Ads](https://github.com/safa-ads)
 - [Yara Sobhy](https://github.com/YaraA)
 - [Youssuf Radi](https://github.com/YoussufRadi)
