# SeeFood

## Hosted on Heroku at https: https://rocky-crag-60191.herokuapp.com/

SeeFood is a simple photo sharing website that allows users to save images of food for specific menu items at local restaurants. 
It is built with Node.js, Express.js, and MongoDB.

User's must be authenticated before POSTing images to the database.  SeeFood uses Passport and the passport local strategy for user authentication.

I used the NPM Multer package to save files locally and then used Mutler-Storage-S3 to save the images to AWS S3. 

## Wireframes
![alt tag](/public/images/wireframe.jpg?raw=true)
