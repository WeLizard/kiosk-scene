import { button, form, h, openDialog } from "@kiosk-scene/app-shell";
import { T } from "./i18n.js";

let open = false;

/**
 * Opened once when the server says 401: only happens when the page is reached over the LAN without Home Assistant's
 * login in front of it. The token is kept in this browser only.
 */
export function askForToken(store: (token: string) => void): void {
  if (open) {
    return;
  }
  open = true;
  const dialog = openDialog("Нужен токен доступа", (close) => {
    const f = form([{ name: "token", label: "API-токен", type: "password", required: true, wide: true }], {
      submitLabel: T.save,
      extraActions: [button(T.cancel, { onClick: () => close(false) })],
      onSubmit: (values) => {
        store(String(values.token).trim());
        close(true);
        window.location.reload();
      },
    });
    return h("div", null, h("p", null, "Сервер просит подтвердить, что это вы. Введите токен из раздела «Интеграции → Доступ» (или откройте страницу из панели Home Assistant — там токен не нужен)."), f.el);
  });
  void dialog.closed.then(() => {
    open = false;
  });
}
