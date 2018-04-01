#!/bin/bash
iw phy phy0 interface add mon0 type monitor
iw dev wlan0 del
ifconfig mon0 up
iw phy0 set channel 6
