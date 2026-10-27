#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
echo "⚡ Starting TrackKaro Inbound Speed-to-Lead Demo on Port 4173..."
if lsof -i :4173 >/dev/null 2>&1; then
    echo "Port 4173 is already running. Opening browser..."
    open "http://localhost:4173/#contact-form"
else
    npm run build
    (sleep 1 && open "http://localhost:4173/#contact-form" &)
    npm run preview -- --port 4173 --host 0.0.0.0
fi
