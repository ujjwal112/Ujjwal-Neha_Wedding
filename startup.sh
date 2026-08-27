#!/bin/bash
if curl -sf --max-time 1 http://127.0.0.1:8080/wedding 2>/dev/null | grep -q "Ujjwal"; then
  exit 0
fi
python3 - <<'PY'
import os, pathlib, signal
want = hex(8080)[2:].upper().zfill(4)
seen = set()
for line in open("/proc/net/tcp"):
    parts = line.split()
    if len(parts) < 10:
        continue
    if not parts[1].endswith(":" + want):
        continue
    inode = parts[9]
    for fd in pathlib.Path("/proc").glob("*/fd/*"):
        try:
            if os.readlink(fd) != f"socket:[{inode}]":
                continue
            pid = int(fd.parts[2])
            if pid not in seen:
                seen.add(pid)
                os.kill(pid, signal.SIGTERM)
        except Exception:
            pass
PY
sleep 0.4
python3 /workspace/serve.py &
exit 0
