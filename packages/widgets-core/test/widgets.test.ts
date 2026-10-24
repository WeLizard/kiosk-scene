import { describe, expect, it } from "vitest";
import { resolveSceneCard } from "../src/index";

describe("built-in card fallbacks", () => {
  it("uses Russian labels for an RU locale", () => {
    expect(resolveSceneCard({ type: "text", value: "42" }, null, "ru-RU")).toMatchObject({
      value: "42",
      hint: "статичная карточка",
    });
    expect(resolveSceneCard({ type: "todo", entity: "todo.shopping" }, { "todo.shopping": { state: "0" } }, "ru-RU")).toMatchObject({
      value: "Нет дел",
      hint: "ничего не осталось",
    });
    expect(resolveSceneCard({ type: "todo", entity: "todo.shopping" }, { "todo.shopping": { state: "3" } }, "ru-RU")).toMatchObject({
      value: "3 шт.",
      hint: "ожидают",
    });
    expect(resolveSceneCard({ type: "onoff", entity: "light.kitchen" }, { "light.kitchen": { state: "on" } }, "ru-RU")).toMatchObject({
      value: "Вкл",
      hint: "состояние устройства",
    });
  });

  it("keeps an explicit hint and the English default", () => {
    expect(resolveSceneCard({ type: "text", value: "42", hint: "своя подпись" }, null, "ru-RU").hint).toBe("своя подпись");
    expect(resolveSceneCard({ type: "onoff", entity: "light.kitchen" }, { "light.kitchen": { state: "off" } })).toMatchObject({
      value: "Off",
      hint: "device state",
    });
  });
});
