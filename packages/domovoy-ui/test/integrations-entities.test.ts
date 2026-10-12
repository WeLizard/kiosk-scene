import { describe, expect, it } from "vitest";
import { entityFields, entityValue } from "../src/pages/integrations.js";

describe("Home Assistant entity picker", () => {
  const entities = [
    { id: "media_player.kitchen", name: "Кухня", domain: "media_player", state: "idle" },
    { id: "tts.cloud", name: "Cloud TTS", domain: "tts", state: "unknown" },
  ];

  it("filters choices and keeps a saved entity missing from discovery", () => {
    const fields = entityFields("entity_id", "Колонка", "media_player.old", entities, ["media_player"], true);
    expect(fields[0].options).toEqual([
      { value: "", label: "Выбрать из Home Assistant" },
      { value: "media_player.kitchen", label: "Кухня (media_player.kitchen)" },
      { value: "media_player.old", label: "media_player.old (сейчас не найдено)" },
    ]);
    expect(fields[0].value).toBe("media_player.old");
    expect(fields[1].value).toBe("media_player.old");
  });

  it("uses the selected entity or a changed manual ID without losing the existing ID", () => {
    expect(entityValue({ entity_id: "media_player.old", entity_id_pick: "media_player.kitchen" }, "entity_id", "media_player.old"))
      .toBe("media_player.kitchen");
    expect(entityValue({ entity_id: "media_player.custom", entity_id_pick: "media_player.kitchen" }, "entity_id", "media_player.old"))
      .toBe("media_player.custom");
    expect(entityValue({ entity_id: "media_player.old", entity_id_pick: "media_player.old" }, "entity_id", "media_player.old"))
      .toBe("media_player.old");
  });
});
