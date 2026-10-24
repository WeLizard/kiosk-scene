FROM ghcr.io/home-assistant/base:3.24@sha256:992dc6a5727b97a30da8dd259b489739299c324407557df540165e2f0dbb7763
ARG BUILD_VERSION=unknown
ARG BUILD_ARCH=unknown
ARG GIT_SHA=unknown
LABEL io.hass.version="${BUILD_VERSION}"
LABEL io.hass.type="app"
LABEL io.hass.arch="${BUILD_ARCH}"
RUN echo "Kiosk Scene version ${BUILD_VERSION} (commit ${GIT_SHA})" > /etc/kiosk_scene_version.txt

RUN apk update && apk add --no-cache \
    bash \
    ca-certificates \
    jq \
    nginx \
    python3 \
    rsync \
    tzdata

RUN mkdir -p /run/nginx /opt/kiosk-scene/www /opt/kiosk-scene/scene-runtime /opt/kiosk-scene/scene-packs-seed /opt/kiosk-scene/extensions-seed

COPY run.sh /run.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY landing.html /opt/kiosk-scene/www/index.html
COPY scene_host_service.py /scene_host_service.py
COPY scene_config_service.py /scene_config_service.py
COPY scene-runtime-seed /opt/kiosk-scene/scene-runtime
COPY scene-packs-seed /opt/kiosk-scene/scene-packs-seed
COPY extensions-seed /opt/kiosk-scene/extensions-seed
COPY domovoy_service.py /opt/domovoy/domovoy_service.py
COPY domovoy /opt/domovoy/domovoy

RUN chmod +x /run.sh /scene_host_service.py /scene_config_service.py /opt/domovoy/domovoy_service.py \
 && mkdir -p /run/nginx /opt/kiosk-scene/www

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:48123/health', timeout=4).read()"

CMD ["/run.sh"]
