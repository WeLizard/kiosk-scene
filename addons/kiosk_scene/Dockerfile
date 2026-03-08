ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    jq \
    nginx \
    python3 \
    rsync \
    tzdata \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

COPY run.sh /run.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY landing.html /opt/kiosk-scene/www/index.html
COPY scene_host_service.py /scene_host_service.py
COPY scene_config_service.py /scene_config_service.py
COPY scene-runtime-seed /opt/kiosk-scene/scene-runtime-seed

RUN chmod +x /run.sh /scene_host_service.py /scene_config_service.py \
 && mkdir -p /run/nginx /opt/kiosk-scene/www

CMD ["/run.sh"]
