FROM node:12.18.4-alpine

# Set app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

ENV NODE_ENV development

EXPOSE 8000

CMD ["yarn", "dev"]
