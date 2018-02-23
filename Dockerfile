FROM ubuntu:xenial
RUN apt-get update && apt-get install -y \
    curl \
    git \
    sudo
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y \
    nodejs \
    build-essential
RUN git clone https://github.com/coolfriends/coolpal.git
RUN cd coolpal && npm install && npm install -g rollup gulp
RUN cd coolpal && rollup --config rollup.config.dev.js && rollup --config rollup.config.prod.js && gulp
CMD cd coolpal && npm start