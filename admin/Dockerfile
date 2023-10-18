FROM node:15 AS Production

ARG NODE_ENV
ENV NODE_ENV = ${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json .

RUN  if [ "${NODE_ENV}" = "production" ]; \
    then npm install --only='production'; \
    else npm install; \
    fi

COPY . .

RUN npm run build

CMD ['npm' 'start']