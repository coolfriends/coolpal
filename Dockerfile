FROM ubuntu:xenial
RUN apt-get update && apt-get install -y \
    curl \
    git \
    sudo
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y \
    nodejs \
    build-essential
RUN cd ~ && git clone https://github.com/coolfriends/discordbot.git
RUN cd ~/discordbot && npm install && npm install -g rollup gulp
RUN cd ~/discordbot && rollup --config rollup.config.dev.js && rollup --config rollup.config.prod.js && gulp