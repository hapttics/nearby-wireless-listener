#! /usr/bin/env bash
nohup stdbuf -oL node /var/lib/hapta/listen.js > /var/log/hapta/listen.log &
