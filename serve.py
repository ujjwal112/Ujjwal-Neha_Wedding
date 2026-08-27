#!/usr/bin/env python3
"""Invite-gated static server. Only /wedding and /ujjwal&nehawedding load the site."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit
import os

ROOT = "/workspace/ujjwal-neha-wedding"
HOST, PORT = "0.0.0.0", 8080

INVITES = {"wedding", "ujjwal&nehawedding"}

GATE = (
    b"<!DOCTYPE html><html lang='en'><head><meta charset='utf-8'>"
    b"<meta name='viewport' content='width=device-width, initial-scale=1'>"
    b"<title></title><style>html,body{margin:0;height:100%;background:#f4f1ea}</style>"
    b"</head><body></body></html>"
)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def _clean(self):
        parsed = urlsplit(self.path)
        raw = unquote(parsed.path)
        clean = raw.rstrip("/") or "/"
        name = "" if clean == "/" else clean.split("/")[-1].lower()
        return parsed, clean, name

    def _gate(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(GATE)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(GATE)

    def do_GET(self):
        parsed, clean, name = self._clean()
        rel = clean.lstrip("/")

        if name in INVITES:
            self.path = "/index.html"
            return super().do_GET()

        # Never serve the invite at / or /index.html
        if clean in ("/", "/index.html") or rel.lower() == "index.html":
            return self._gate()

        fs = os.path.normpath(os.path.join(ROOT, rel))
        if fs.startswith(ROOT) and os.path.isfile(fs):
            self.path = "/" + rel + (("?" + parsed.query) if parsed.query else "")
            return super().do_GET()

        return self._gate()

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
