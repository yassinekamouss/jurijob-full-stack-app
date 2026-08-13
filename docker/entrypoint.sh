#!/bin/sh
set -eu

cd /var/www/html

# ---------- storage ----------
mkdir -p storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs
chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rw storage bootstrap/cache

# ---------- APP_KEY ----------
if [ -z "${APP_KEY:-}" ]; then
    echo "WARNING: APP_KEY is not set. Generating a temporary key - sessions and encrypted data will reset on every deploy. Set APP_KEY in Railway for stability." >&2
    export APP_KEY="$(php artisan key:generate --show)"
fi

# ---------- Laravel bootstrap ----------
php artisan package:discover --ansi >/dev/null 2>&1 || true
php artisan config:cache --ansi >/dev/null 2>&1 || true
php artisan route:cache --ansi >/dev/null 2>&1 || true
php artisan view:cache --ansi >/dev/null 2>&1 || true
php artisan storage:link --ansi >/dev/null 2>&1 || true

# ---------- migrations (set RUN_MIGRATIONS=false to skip) ----------
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    echo "Running migrations..."
    php artisan migrate --force --ansi
fi

# ---------- supervisor ----------
cat > /etc/supervisor/supervisord.conf <<'EOF'
[supervisord]
nodaemon=true
logfile=/dev/null
logfile_maxbytes=0
pidfile=/run/supervisord.pid

[program:nginx]
command=nginx -g 'daemon off;'
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:php-fpm]
command=php-fpm -F
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
EOF

if [ "${RUN_SSR:-true}" = "true" ]; then
    cat >> /etc/supervisor/supervisord.conf <<'EOF'

[program:ssr]
command=php artisan inertia:start-ssr
directory=/var/www/html
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
EOF
fi

if [ "${RUN_QUEUE:-true}" = "true" ]; then
    cat >> /etc/supervisor/supervisord.conf <<'EOF'

[program:queue]
command=php artisan queue:work --sleep=3 --tries=3 --max-time=3600
directory=/var/www/html
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
EOF
fi

# ---------- nginx ----------
export PORT="${PORT:-8080}"
envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec supervisord -c /etc/supervisor/supervisord.conf
