# syntax=docker/dockerfile:1

# ============================================================================
#  Multi-stage production image for Laravel 12 + Inertia (React) + SSR.
#
#  Stages:
#   1. vendor  - Composer deps (fast, cached unless composer.lock changes)
#   2. build   - PHP + Node side by side (wayfinder's Vite plugin shells out
#                to `php artisan wayfinder:generate` at build time) -> builds
#                the Vite bundle, the Inertia SSR bundle and the autoloader
#   3. app     - minimal runtime: nginx + php-fpm + queue worker + SSR server,
#                managed by supervisord
# ============================================================================

# --- Stage 1: PHP dependencies -----------------------------------------
FROM composer:2.8 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
        --no-dev \
        --no-scripts \
        --no-autoloader \
        --no-interaction \
        --no-progress \
        --prefer-dist

# --- Stage 2: Frontend + asset build ------------------------------------
FROM php:8.3-cli-alpine AS build

# Node.js (musl build, compatible with Alpine) + Composer phar
COPY --from=node:22-alpine /usr/local/bin/ /usr/local/bin/
COPY --from=node:22-alpine /usr/local/lib/node_modules/ /usr/local/lib/node_modules/
COPY --from=node:22-alpine /usr/local/include/node/ /usr/local/include/node/
COPY --from=vendor /usr/bin/composer /usr/local/bin/composer

WORKDIR /app

# npm dependencies (cached unless the lockfile changes)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# PHP dependencies from stage 1
COPY --from=vendor /app/vendor ./vendor

# Application source
COPY . .

# Generate the optimized autoloader. post-autoload-dump scripts
# (package:discover, etc.) run here and don't require a .env file.
RUN composer dump-autoload --no-dev --optimize --no-interaction

# Build the Vite frontend assets and the Inertia SSR bundle.
# The wayfinder Vite plugin calls `php artisan wayfinder:generate`,
# which is why this stage ships PHP alongside Node.
RUN npm run build

# --- Stage 3: Runtime ----------------------------------------------------
FROM php:8.3-fpm-alpine AS app

# Node.js for the Inertia SSR server (musl build)
COPY --from=node:22-alpine /usr/local/bin/ /usr/local/bin/
COPY --from=node:22-alpine /usr/local/lib/node_modules/ /usr/local/lib/node_modules/
COPY --from=node:22-alpine /usr/local/include/node/ /usr/local/include/node/

# PHP extensions + system packages.
# .build-deps (the C toolchain) is removed after compiling; the -dev packages
# stay so their runtime libraries (libicu, libpq, ...) remain available.
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && apk add --no-cache \
        nginx \
        supervisor \
        curl \
        gettext \
        tzdata \
        icu-dev \
        libzip-dev \
        postgresql-dev \
        freetype-dev \
        libpng-dev \
        libjpeg-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        exif \
        gd \
        intl \
        pcntl \
        pdo_mysql \
        pdo_pgsql \
        zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps \
    && rm -rf /tmp/pear

WORKDIR /var/www/html

# Production npm dependencies (required by the SSR bundle at runtime)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Application source — build artifacts, vendor and generated files come from
# the `build` stage. node_modules is intentionally excluded (installed above).
COPY --from=build /app/app ./app
COPY --from=build /app/artisan ./artisan
COPY --from=build /app/bootstrap ./bootstrap
COPY --from=build /app/composer.json ./composer.json
COPY --from=build /app/composer.lock ./composer.lock
COPY --from=build /app/config ./config
COPY --from=build /app/database ./database
COPY --from=build /app/lang ./lang
COPY --from=build /app/public ./public
COPY --from=build /app/resources ./resources
COPY --from=build /app/routes ./routes
COPY --from=build /app/vendor ./vendor

# Process management & web server configuration
COPY docker/nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker/entrypoint.sh /usr/local/bin/entrypoint

RUN chmod +x /usr/local/bin/entrypoint \
    && mkdir -p /run/nginx \
    && rm -f /etc/nginx/conf.d/default.conf /etc/nginx/http.d/default.conf

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/entrypoint"]
