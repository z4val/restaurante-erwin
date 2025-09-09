#!/usr/bin/env bash
set -e

echo "=== Iniciando Entrypoint Laravel ==="

# 1. Permisos
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R ug+rwx /var/www/html/storage /var/www/html/bootstrap/cache

# 2. Limpiar caches previos
php artisan config:clear || true
php artisan route:clear || true
php artisan view:clear || true
php artisan event:clear || true

# 2.1. Generar tipos de Wayfinder (ya con DB y .env cargados)
php artisan wayfinder:generate || true

# 3. Storage link
php artisan storage:link || true

# 4. Migraciones (si quieres automáticas en cada deploy, descomenta la línea)
# php artisan migrate --force || true

# 5. Cachear con variables de entorno reales
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 6. Levantar servidor
echo "Servidor Laravel corriendo en puerto $PORT"
exec php artisan serve --host 0.0.0.0 --port $PORT