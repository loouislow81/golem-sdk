# Use Image
FROM node:8-stretch

LABEL description="Golem progressive apps builder"

# Get wine32, not 64, to work around binary incompatibility with rcedit.
RUN dpkg --add-architecture i386

# Update APT
RUN apt-get update

# Install dependencies
RUN apt-get --yes install \
  wine32 \
  imagemagick

# Clean up APT
RUN apt-get clean && rm -rfv /var/lib/apt/lists/*

# Add sources
COPY . /golem

# Build golem and symlink globally
WORKDIR /golem/app
RUN npm i
WORKDIR /golem
RUN npm install && npm run build && npm link

# Use 1000 as default user not root
USER 1000

# Run {linux, mac, win} build:
# (1) ...to check installation was sucessful.
# (2) ...to cache electron distributables and avoid downloads at runtime.
RUN golem https://github.com/loouislow81/golem /tmp/golem \
RUN golem -p osx https://github.com/loouislow81/golem /tmp/golem \
RUN golem -p windows https://github.com/loouislow81/golem /tmp/golem \
RUN rm -rfv /tmp/golem

ENTRYPOINT ["golem"]

CMD ["--help"]
