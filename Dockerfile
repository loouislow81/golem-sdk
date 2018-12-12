FROM node:8-stretch
LABEL description="Debian image to build GOLEM SDK"

# get wine32, not (x64), to work around binary incompatibility with rcedit.
# use debian rather than alpine, which doesn't do multiarch.
RUN dpkg --add-architecture i386

# install dependencies
RUN apt update
RUN apt -y install \
      wine32 \
      imagemagick

# clean up
RUN apt clean && rm -rf /var/lib/apt/lists/*

# install node runtime manager
RUN npm install -g n

# set node runtime to v10.0.0
RUN n 10.0.0

# use yarn instead of npm
# npm i -g yarn

# add sources
COPY . /golem-sdk

# build golem-sdk and link globally
WORKDIR /golem-sdk/app
RUN npm install
WORKDIR /golem-sdk
RUN npm install && npm run build && npm link

# use 1000 as default user not root
USER 1000

# Run a { linux, mac , win } build,
#   ~ to check installation was sucessful.
#   ~ to cache electron distributables and avoid downloads at runtime.
RUN golem-sdk https://github.com/loouislow81/golem-sdk /tmp/golem-sdk \
    && golem-sdk -p osx https://github.com/loouislow81/golem-sdk /tmp/golem-sdk \
    && golem-sdk -p windows https://github.com/loouislow81/golem-sdk /tmp/golem-sdk \
    && rm -rf /tmp/golem-sdk

ENTRYPOINT ["golem-sdk"]
CMD ["--help"]
