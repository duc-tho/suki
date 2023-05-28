FROM alpine:latest

# Install basic dependencies and libraries
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        zip \
        unzip \
        vim \
        sudo \
        curl \
        tar \
        wget \
        git \
        bzip2 \
        && apt-get clean && \
        rm -rf /var/lib/apt/lists/*

# Install NodeJS
ENV NODE_VERSION=16
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.37.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}

EXPOSE 3005
