FROM openbreadmaker/ember

ADD . /opt/bread-maker-ember-frontend
WORKDIR /opt/bread-maker-ember-frontend

RUN yarn
RUN bower --allow-root install

RUN echo 'BM_BACKEND_URL=http://localhost:8000/api' > .env-localhost-4200

EXPOSE 4200
EXPOSE 49153

CMD ["ember", "s"]
