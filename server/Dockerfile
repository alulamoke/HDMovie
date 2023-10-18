FROM node:15 AS Production

ARG NODE_ENV
ARG PORT

ENV NODE_ENV = ${NODE_ENV}
ENV PORT = ${PORT}

WORKDIR /usr/src/api

COPY package.json .

RUN  if [ "${NODE_ENV}" = "production" ]; \
    then npm install --only='production'; \
    else npm install; \
    fi

COPY . .

CMD ['npm' 'run' 'dev']