/** All user-facing Domovoy strings live here (Russian-first: that is the household's language). */
export const T = {
  today: "Сегодня", search: "Поиск", inventory: "Вещи", locations: "Места", calendar: "Календарь", tasks: "Задачи и напоминания",
  memory: "Память", review: "Проверка", activity: "Журнал", integrations: "Интеграции", settings: "Настройки",
  commandPlaceholder: "Скажите или напишите: «запомни, девять резисторов лежат в третьей коробке»",
  send: "Отправить", cancel: "Отмена", save: "Сохранить", delete: "Удалить", edit: "Изменить", add: "Добавить", close: "Закрыть", retry: "Повторить",
  undo: "Отменить", confirm: "Подтвердить", reject: "Отклонить", yes: "Да", no: "Нет", none: "—", loading: "Загрузка…",
  empty: "Пока ничего нет", search_placeholder: "Что ищем? Например: «резистор», «программатор», «код домофона»",
  name: "Название", quantity: "Количество", unit: "Ед.", place: "Место", notes: "Заметки", when: "Когда", title: "Название",
  confirmDelete: "Удалить безвозвратно?",
  statuses: {
    applied: "выполнено", answered: "ответ", clarify: "нужно уточнение", review: "на проверке", rejected: "не понял", failed: "ошибка", partial: "частично",
    pending: "ожидает", fired: "сработало", done: "готово", cancelled: "отменено", queued: "в очереди", sending: "отправляется", sent: "отправлено",
    ok: "работает", degraded: "сбои", down: "не отвечает", unconfigured: "не настроено", unknown: "неизвестно", approved: "принято",
  } as Record<string, string>,
  kinds: { item: "вещь", location: "место", note: "заметка", task: "задача", event: "событие" } as Record<string, string>,
  channels: { ui: "на экране", speak: "голосом (колонка)", telegram: "Telegram", ha_notify: "уведомление HA" } as Record<string, string>,
  lists: { tasks: "Задачи", shopping: "Покупки", chores: "Повторяющиеся дела" } as Record<string, string>,
};

export function statusLabel(status: string): string {
  return T.statuses[status] ?? status;
}

export function statusTone(status: string): "good" | "warn" | "bad" | "info" | "neutral" {
  if (["applied", "answered", "done", "sent", "ok", "approved"].includes(status)) {
    return "good";
  }
  if (["clarify", "review", "pending", "queued", "sending", "partial", "degraded", "fired"].includes(status)) {
    return "warn";
  }
  if (["failed", "rejected", "down", "cancelled"].includes(status)) {
    return "bad";
  }
  return "neutral";
}
