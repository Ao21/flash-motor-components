FROM angular-cli-20-4

ENV HOME=/home/app
ENV APP_NAME=renewals-prototype

COPY package.json $HOME/$APP_NAME/
RUN chown -R app:app $HOME/*

USER app

WORKDIR $HOME/$APP_NAME

RUN npm install &&\
	npm cache clean

ADD . $HOME/$APP_NAME/

ARG environment="dev"

CMD ["ng", "serve","--host","0.0.0.0","--port","8080"]
EXPOSE 8080