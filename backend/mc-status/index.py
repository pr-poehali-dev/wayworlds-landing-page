import json
import socket
import struct
import os

def handler(event: dict, context) -> dict:
    """Получает онлайн игроков с Minecraft-сервера по адресу 185.9.145.86:30016"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": "",
        }

    host = "185.9.145.86"
    port = 30016

    try:
        online, max_players = ping_minecraft(host, port)
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"online": online, "max": max_players, "status": "ok"}),
        }
    except Exception as e:
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"online": 0, "max": 0, "status": "offline", "error": str(e)}),
        }


def ping_minecraft(host: str, port: int) -> tuple[int, int]:
    """Minecraft Server List Ping protocol (1.7+)"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(5)
    sock.connect((host, port))

    # Handshake packet
    host_bytes = host.encode("utf-8")
    data = b""
    data += b"\x00"                          # packet id
    data += b"\x2f"                          # protocol version (47 = 1.8)
    data += _pack_varint(len(host_bytes))
    data += host_bytes
    data += struct.pack(">H", port)
    data += b"\x01"                          # next state: status

    packet = _pack_varint(len(data)) + data
    sock.sendall(packet)

    # Status request
    sock.sendall(b"\x01\x00")

    # Read response
    _read_varint(sock)   # length
    _read_varint(sock)   # packet id

    strlen = _read_varint(sock)
    raw = b""
    while len(raw) < strlen:
        chunk = sock.recv(strlen - len(raw))
        if not chunk:
            break
        raw += chunk

    sock.close()

    status = json.loads(raw.decode("utf-8"))
    players = status.get("players", {})
    return players.get("online", 0), players.get("max", 0)


def _pack_varint(val: int) -> bytes:
    out = b""
    for _ in range(5):
        b = val & 0x7F
        val >>= 7
        if val:
            b |= 0x80
        out += bytes([b])
        if not val:
            break
    return out


def _read_varint(sock: socket.socket) -> int:
    result = 0
    shift = 0
    while True:
        b = sock.recv(1)
        if not b:
            break
        val = b[0]
        result |= (val & 0x7F) << shift
        if not (val & 0x80):
            break
        shift += 7
    return result
