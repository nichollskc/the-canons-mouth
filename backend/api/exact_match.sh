#!/bin/bash

PATTERN=$1
FILENAME=$2

awk -v PATTERN="$PATTERN" -v FILENAME="$FILENAME" \
    'BEGIN { OFS="==="; ORS="\nEND\n"}
           { NS==split($0, line_parts, PATTERN, seps);
             for (i in seps)
                 print FILENAME,
                       line_parts[i],
                       seps[i],
                       line_parts[i+1],
                       NR-1
           }' $FILENAME
