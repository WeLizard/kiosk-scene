"""Shared vocabulary for presence/time-of-day windows (used by the rules and the trigger engine)."""

DAY_WINDOWS = {"morning": ("05:00", "11:59"), "day": ("11:00", "17:59"), "evening": ("18:00", "23:59"), "night": ("22:00", "05:59")}
