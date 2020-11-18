# Base image for all other build stages
FROM ruby:2.7.2-slim AS base_image

# Run security updates and install apt-utils curl and locales
RUN bash -c "export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -qq && \
    echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen && \
    apt-get install -y apt-utils curl locales && \
    apt-get upgrade -y && apt-get clean && \
    rm -rf /var/lib/apt/lists/*"

# Sets an environment variable with the bundle directory
ENV LANG=en_US.UTF-8

# Generates localisation files from templates
RUN locale-gen

# Install NodeJS 12.x
RUN bash -c "export DEBIAN_FRONTEND=noninteractive && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get update && apt-get install -y nodejs"

# Install Yarn via Debian package repository
RUN bash -c "export DEBIAN_FRONTEND=noninteractive && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo 'deb https://dl.yarnpkg.com/debian/ stable main' | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -qq && apt install yarn"

# Install Bundler
RUN bash -c "gem update --system && gem install bundler -v 2.1.4"

# Base image for building dependencies
FROM base_image AS build_image

# Run security updates, install build-essential git-core
RUN bash -c "export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -qq && \
    apt-get upgrade -y && \
    apt-get install -y build-essential git-core && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*"

# Build image for ruby dependencies
FROM build_image AS gems

# Run security updates, install libpq-dev
RUN bash -c "export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -qq && \
    apt-get upgrade -y && \
    apt-get install -y libpq-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*"

# Create a directory for our application
# and set it as the working directory
WORKDIR /app

# Add our Gemfile
COPY Gemfile Gemfile.lock /app/

# Install gems
RUN bash -c "bundle install \
    --without development test \
    --deployment --no-cache && \
    bundle clean --force"

# Build image for npm dependencies
FROM gems AS packages

# Create a directory for our application
# and set it as the working directory
WORKDIR /app

# Add Javascript files
COPY package.json yarn.lock /app/

RUN bash -c "bundle exec yarn install"

# Build image for application
FROM base_image AS application

# Run security updates, install libpq5
RUN bash -c "export DEBIAN_FRONTEND=noninteractive && \
    apt-get update -qq && \
    apt-get upgrade -y && \
    apt-get install -y libpq5 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*"

# Create a directory for our application
# and set it as the working directory
RUN mkdir /app && \
    groupadd -r app && \
    useradd --no-log-init -r -g app -d /app app

# Create a directory for our application
# and set it as the working directory
WORKDIR /app/

# Create various directories
RUN mkdir /app/log && \
    mkdir /app/public && \
    mkdir /app/public/packs && \
    mkdir /app/tmp && \
    chown -R app:app /app

COPY --from=packages --chown=app:app /app/node_modules/ /app/node_modules
COPY --from=gems --chown=app:app /app/vendor/ /app/vendor

RUN mkdir /app/javascripts && \
    mkdir /app/javascripts/images && \
    mkdir /app/javascripts/stylesheets

# Copy neccessary files to app directory
COPY --chown=app:app ./app/ /app/app/
COPY --chown=app:app ./bin/ /app/bin/
COPY --chown=app:app ./config/ /app/config/
COPY --chown=app:app ./config.ru /app/config.ru
COPY --chown=app:app ./db/ /app/db/
COPY --chown=app:app ./Gemfile /app/Gemfile
COPY --chown=app:app ./Gemfile.lock /app/Gemfile.lock
COPY --chown=app:app ./lib/ /app/lib/
COPY --chown=app:app ./package.json /app/package.json
COPY --chown=app:app ./public/ /app/lib/
COPY --chown=app:app ./public/404.html /app/lib/public/404.html
COPY --chown=app:app ./public/422.html /app/lib/public/422.html
COPY --chown=app:app ./public/500.html /app/lib/public/500.html
COPY --chown=app:app ./public/apple-touch-icon-precomposed.png /app/lib/public/apple-touch-icon-precomposed.png
COPY --chown=app:app ./public/apple-touch-icon.png /app/lib/public/apple-touch-icon.png
COPY --chown=app:app ./public/favicon.ico /app/lib/public/favicon.ico
COPY --chown=app:app ./public/robots.txt /app/lib/public/robots.txt
COPY --chown=app:app ./Rakefile /app/Rakefile
COPY --chown=app:app ./yarn.lock /app/yarn.lock
COPY --chown=app:app ./babel.config.js /app/babel.config.js
COPY --chown=app:app ./postcss.config.js /app/postcss.config.js

USER app:app

# Provide placeholder environment variables during the build phase
ARG RAILS_ENV=production
ARG NODE_ENV=production
ARG RAILS_MASTER_KEY=notarailsmasterkey
ARG RACK_ENV=production
ARG DATABASE_URL=postgres://localhost:5432/repairs-api
ARG RAILS_LOG_TO_STDOUT=true
ARG RAILS_SERVE_STATIC_FILES=true
ARG PORT=80

RUN bash -c "bundle install --without development test --deployment --no-cache && bundle clean --force"
RUN bash -c "bundle exec rake assets:precompile"
