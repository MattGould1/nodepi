FROM node:8

RUN apt-get update && apt-get install -y \
    python-pip

RUN npm install -g nodemon

WORKDIR /usr/src/app

EXPOSE 3000
ENTRYPOINT ["./start.sh"]