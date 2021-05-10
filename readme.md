## XENDIT CODING CHALLENGE

### HOW TO REDUCE LATENCY? WHAT WAS MY STRATEGY FOR THIS TASK ?
- https://gateway.marvel.com:443/v1/public/characters this is a public api and after observation I've found that - Its reponse data doesn't change frequently. It provide consistant data. To reduce the latency of same subsequent api request, I'm keeping the first hit response data  into Redis. You can set the time from .env file that - for how long you want to keep the record in Redis. For now, I've set the time to 60 seconds to expire. If a user hit this same api within 60 seconds, backend will serve data from redis and thats how it will reduce latency.
We could use AWS elastic chache or Memcache. But those will work only in VPC.  


#### PROJECT INSTALLATION
- ###### git clone https://github.com/asadpstu/xendit_code_challenge.git xendit
- ###### cd xendit
- ###### npm install

#### ENVIRONMENT VARIABLE
- copy and paste .env file in the root directory
- If you dont see the .env file, please "turn on" show hidden files options in you computer.

#### REDIS INSTALLATION
-- if you are in MAC install redis and start redis.

-- if you are using ubuntu, then follow this reference [How to install redis in ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04)

-- if you are in Window, the go to Redis directory. Depending upon your OS (64bit/32bit) choose directory and double click [* redis-server.exe* ]

-- You are all set. :)

-- Make sure your redis server is up and running

#### UNIT AND INTEGRATION TEST
- npm run test 

#### RUN PROJECT

- Cluster mode :   ##### npm start     
- Dev Environment:  ##### npm run dev   
- Local Environment: ##### npm run local 

#### END-TO-END Testing
- Open your browser and go to http://localhost:8080
- For Swagger Documentation http://localhost:8080/api-docs




