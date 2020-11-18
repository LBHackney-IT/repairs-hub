# Repairs Hub

A Rails / React frontend application for raising repair requests.

Depends on the [Repairs API](https://github.com/LBHackney-IT/repairs-api).

## Building production docker

### Create production docker

Replace `railsmasterkey` in the command below.

```sh
docker build -t repairs-hub-production -f Dockerfile . --build-arg RAILS_MASTER_KEY=railsmasterkey
```

### Run production docker

Replace `railsmasterkey` in the command below.

```sh
docker run --rm -it -p 3000:3000 -e DATABASE_URL=postgres://postgres@host.docker.internal:5432/repairs_hub_development -e RAILS_SERVE_STATIC_FILES=true -e RAILS_ENV=production -e RAILS_LOG_TO_STDOUT=true -e RAILS_MASTER_KEY=railsmasterkey repairs-hub-production:latest bundle exec rails s
```

### Run production docker bash

```sh
docker run --rm -it -e DATABASE_URL=postgres://postgres@host.docker.internal:5432/repairs_hub_development -e RAILS_SERVE_STATIC_FILES=true -e RAILS_ENV=production -e RAILS_LOG_TO_STDOUT=true repairs-hub-production:latest /bin/bash
```
