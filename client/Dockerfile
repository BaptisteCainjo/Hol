# Dockerfile for React client

# Build react client
FROM node:16

#ENV HTTP_PROXY=http://proxy.univ-lemans.fr:3128
#ENV HTTPS_PROXY=http://proxy.univ-lemans.fr:3128
#ENV NO_PROXY=localhost,127.0.0.1

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]