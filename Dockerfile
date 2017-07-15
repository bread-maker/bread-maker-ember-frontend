FROM node:6

EXPOSE 4200

ADD . /opt/bread-maker-ember-frontend

WORKDIR /opt/bread-maker-ember-frontend

# Xvfb
RUN apt-get update -qqy \
  && apt-get -qqy install xvfb \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# Google Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install google-chrome-stable \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
  && sed -i 's/"$HERE\/chrome"/xvfb-run "$HERE\/chrome" --no-sandbox/g' /opt/google/chrome/google-chrome

RUN npm install -g ember-cli bower yarn
RUN yarn
RUN bower --allow-root install

RUN echo 'BM_BACKEND_URL=http://localhost:8000/api' > .env-localhost-4200

CMD ["/usr/local/bin/ember", "s"]
