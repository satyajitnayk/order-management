# order-management
A queue service to manage order using Fastify framework

## Update .env file 

## setup kafka locally using docker
```shell
cd setup-kafka
docker-compose build #do this first time only
docker-compose up
```

## connnect with kafka container (to check if it's runnig)
```shell
# to find containers with name
docker ps --format '{{.Names}}'

docker exec -it setup-kafka-kafka-1 bin/bash #setup-kafka-kafka-1 is my kafka container name

# find kafka ip
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_id_or_name>

# to check if kafka working in machine
node config/check_kafka.js
```

## run test
```shell
npm test
```

## run server
```shell
npm start
```
