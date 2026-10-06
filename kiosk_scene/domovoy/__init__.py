"""Domovoy – local-first household assistant backend.

Standard library only (SQLite, http.server, urllib) so it runs inside the Home Assistant add-on
image without extra packages. It has no dependency on the KioskScene code: KioskScene reaches it
only through the generic extension model.
"""

__version__ = "0.1.0"
