#  Dockerfile for Node Express Backend

FROM node:16

#ENV HTTP_PROXY=http://proxy.univ-lemans.fr:3128
#ENV HTTPS_PROXY=http://proxy.univ-lemans.fr:3128
#ENV NO_PROXY=localhost,127.0.0.1

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]