#!/bin/bash

PATTERN=$1
IGNORECASEARG=$2
MAX_MATCH_INDEX=$3
FILENAMES="${@:4}"

for fname in $FILENAMES
do
    bash backend/api/exact_match.sh $PATTERN $fname $MAX_MATCH_INDEX $IGNORECASEARG
done
