# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
ARG BUN_VERSION=1.0.29
FROM oven/bun:1 as base

# create a directory for the app
WORKDIR /app



# [optional] tests & build
ENV NODE_ENV="production"


# copy production dependencies and source code into final image
FROM base AS build

# install dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python3

# copy source code
COPY --link bun.lockb package.json ./
RUN bun install --ci

# copy source code
COPY --link . .

# build the app
FROM base

# copy build artifacts
COPY --from=build /app /app



# run the app
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "start" ]