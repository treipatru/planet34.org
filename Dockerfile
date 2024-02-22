# ---- Base
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# ---- Dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# ---- Build
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# ---- Release
FROM nginx:1.21-alpine
# copy static files to nginx server root
COPY --from=build /app/dist /usr/share/nginx/html
# open port
EXPOSE 80
# start Nginx in the foreground when the container is run
CMD ["nginx", "-g", "daemon off;"]
