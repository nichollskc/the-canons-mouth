#!/bin/bash

PATTERN=$1
IGNORECASEARG=$2
MAX_MATCH_INDEX=$3
OUTFILE=$4
FILENAMES="${@:5}"

NUM_MATCHES=0

for fname in $FILENAMES
do
    MATCHES_LEFT=`expr $MAX_MATCH_INDEX - $NUM_MATCHES`
#    echo "Matches left"
#    echo $MATCHES_LEFT

    if [ "$MATCHES_LEFT" -gt "0" ];
    then
#        echo "Checking file $fname"
        NUM_LINES=$(bash backend/api/exact_match.sh $PATTERN $fname $MATCHES_LEFT $IGNORECASEARG | tee $OUTFILE | wc -l)
#        echo "Num matches"
        NUM_MATCHES=`expr $NUM_LINES / 6`
#        echo $NUM_MATCHES
    else
#        echo "Finished!"
        exit 0;
    fi
done

