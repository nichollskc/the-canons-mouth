#!/bin/bash

PATTERN=$1
FILENAME=$2
IGNORECASEARG=$3

gawk -v PATTERN="$PATTERN" -v FILENAME="$FILENAME" -v BUFFER=2 $IGNORECASEARG\
    'function join_with_seps(array, separray, start, end,     result, j)
     {
         result = array[start]
         for (j = start + 1; j <= end; j++)
             result = result separray[j - 1] array[j]
         return result
     }

     function join(array, start, end, sep,     result, j)
     {
         result = array[start]
         for (j = start + 1; j <= end; j++)
             result = result sep array[j]
         return result
     }

     function shift_array(array, shift, end, result)
     {
         for (j = 1; j < end; j++)
         {
             result[j] = array[j+shift]
         }
     }

     function add_to_line_array(lines, line)
     {
         shift_array(lines, 1, BUFFER*2 + 1, lines);
         lines[BUFFER*2 + 1] = line;
     }

     function max(a, b) { return a > b ? a: b }
     function min(a, b) { return a < b ? a: b }

     function lines_before(lines, line_index)
     {
         return join(lines, min(1, line_index - 1), min(BUFFER, line_index - 1), "\n")
     }

     function lines_after(lines, line_index)
     {
         return join(lines, BUFFER + 2, BUFFER * 2 + 1, "\n")
     }

     BEGIN {
             OFS="===";
             ORS="\nMATCHEND\n";
           }
           {
             add_to_line_array(RAW_LINES, $0);
             SHIFT=max(0, BUFFER*2 + 1 - NR);
             shift_array(RAW_LINES, SHIFT, BUFFER*2 + 1, LINES);
#             print SHIFT;
#             print NR;
#             for (j = 1; j <= 5; j++) { print LINES[j] };
#             for (j = 1; j <= 5; j++) { print RAW_LINES[j] };
#             print MATCHINDEX;
             MATCHINDEX=min(BUFFER + 1, NR);
             LINENUMBER=max(NR - 2, MATCHINDEX) - 1;
             NUM_MATCHES=split(LINES[MATCHINDEX], line_parts, PATTERN, seps);
             for (i in seps) {
                 print FILENAME,
                       lines_before(LINES, NR) "\n" join_with_seps(line_parts, seps, 1, i, PATTERN),
                       seps[i],
                       join_with_seps(line_parts, seps, i+1, NUM_MATCHES, PATTERN) "\n" lines_after(LINES, NR),
                       LINENUMBER,
                       LINENUMBER;
             }
           }' $FILENAME
