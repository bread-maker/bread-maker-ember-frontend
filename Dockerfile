FROM node:6-alpine

EXPOSE 4200

ADD . /opt/bread-maker-ember-frontend

WORKDIR /opt/bread-maker-ember-frontend
RUN apk update && apk add git
RUN npm install -g ember-cli bower phantomjs-prebuilt && yarn && bower --allow-root install
RUN echo 'BM_BACKEND_URL=http://localhost:8000/api' > .env-localhost-4200

CMD ["/bin/sh"]
