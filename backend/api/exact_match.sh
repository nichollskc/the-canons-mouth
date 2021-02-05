#!/bin/bash

PATTERN=$1
FILENAME=$2

awk -v PATTERN="$PATTERN" -v FILENAME="$FILENAME" \
    'function join_with_seps(array, separray, start, end,     result, j)
     {
         result = array[start]
         for (j = start + 1; j <= end; j++)
             result = result separray[j - 1] array[j]
         return result
     }

     BEGIN { OFS="===";
             ORS="\nMATCHEND\n"}
           { NS=split($0, line_parts, PATTERN, seps);
             for (i in seps) {
                 print FILENAME,
                       join_with_seps(line_parts, seps, 1, i, PATTERN),
                       seps[i],
                       join_with_seps(line_parts, seps, i+1, NS, PATTERN),
                       NR - 1,
                       NR - 1;
             }
           }' $FILENAME
