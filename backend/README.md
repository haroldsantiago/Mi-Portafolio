# Backend Django

## Requisitos
- Python 3.13
- MySQL (servidor y usuario con permisos)
- Virtualenv (opcional)

## Instalación
- Crear y activar entorno virtual
```
python -m venv .venv
. .venv/Scripts/activate
```
- Instalar dependencias
```
pip install -r requirements.txt
```

## Variables de entorno
- Crear un archivo `.env` en la carpeta `backend/` con:
```
DB_NAME=nombre_de_la_base_de_datos
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=host
DB_PORT=puerto
PORT=4000
```
- Opcionales:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=xxxx
ALLOWED_HOSTS=localhost,127.0.0.1
DEBUG=True
CORS_ALLOW_ALL_ORIGINS=True
```

## Ejecución local
- Aplicar migraciones
```
python manage.py makemigrations
python manage.py migrate
```
- Ejecutar servidor
```
python manage.py runserver 0.0.0.0:4000
```

## Archivos estáticos
- Generar estáticos para producción
```
python manage.py collectstatic
```

## Despliegue (Ubuntu + Gunicorn + Nginx)
- Instalar paquetes del sistema
```
sudo apt update
sudo apt install python3-venv python3-pip mysql-server nginx
```
- Crear entorno y desplegar dependencias
```
python3 -m venv /opt/app/venv
source /opt/app/venv/bin/activate
pip install -r requirements.txt
```
- Probar Gunicorn
```
cd backend
gunicorn backend.wsgi:application --bind 0.0.0.0:4000
```
- Servicio systemd `/etc/systemd/system/backend.service`
```
[Unit]
Description=Backend Django
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/a/portafolio-react/backend
Environment="PATH=/opt/app/venv/bin"
ExecStart=/opt/app/venv/bin/gunicorn backend.wsgi:application --bind 0.0.0.0:4000
Restart=always

[Install]
WantedBy=multi-user.target
```
- Habilitar servicio
```
sudo systemctl daemon-reload
sudo systemctl enable backend
sudo systemctl start backend
```
- Configuración Nginx `/etc/nginx/sites-available/backend`
```
server {
    listen 80;
    server_name ejemplo.com;

    location /static/ {
        alias /path/a/portafolio-react/backend/staticfiles/;
    }

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
- Activar Nginx
```
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Notas
- Asegúrate de que `ALLOWED_HOSTS` y `CSRF_TRUSTED_ORIGINS` estén configurados para tu dominio.
- El archivo `.env` está ignorado por Git.