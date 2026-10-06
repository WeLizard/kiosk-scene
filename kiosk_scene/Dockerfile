FROM ghcr.io/home-assistant/base:3.24
LABEL io.hass.version="${BUILD_VERSION}"
LABEL io.hass.type="app"
LABEL io.hass.arch="${BUILD_ARCH}"
ARG BUILD_VERSION
ARG BUILD_ARCH
ARG GIT_SHA=unknown
RUN echo "Kiosk Scene version ${BUILD_VERSION} (commit ${GIT_SHA})" > /etc/kiosk_scene_version.txt


RUN apk update && apk add --no-cache \
    bash \
    ca-certificates \
    jq \
    nginx \
    python3 \
    rsync \
    tzdata

RUN mkdir -p /run/nginx /opt/kiosk-scene/www /opt/kiosk-scene/scene-runtime-seed /opt/kiosk-scene/scene-packs-seed /opt/kiosk-scene/extensions-seed

COPY run.sh /run.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY landing.html /opt/kiosk-scene/www/index.html
COPY scene_host_service.py /scene_host_service.py
COPY scene_config_service.py /scene_config_service.py
COPY scene-runtime-seed /opt/kiosk-scene/scene-runtime-seed
COPY scene-packs-seed /opt/kiosk-scene/scene-packs-seed
COPY extensions-seed /opt/kiosk-scene/extensions-seed
COPY domovoy_service.py /opt/domovoy/domovoy_service.py
COPY domovoy /opt/domovoy/domovoy

RUN chmod +x /run.sh /scene_host_service.py /scene_config_service.py /opt/domovoy/domovoy_service.py \
 && mkdir -p /run/nginx /opt/kiosk-scene/www

CMD ["/run.sh"]
