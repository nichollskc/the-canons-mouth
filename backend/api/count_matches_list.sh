#!/bin/bash

PATTERN=$1
IGNORECASEARG=$2
FILENAMES="${@:3}"

if [ "$IGNORECASEARG" -eq "0" ]; then
    FULLIGNORECASEARG=""
else
    FULLIGNORECASEARG="-i"
fi

for fname in $FILENAMES
do
    echo $fname && grep -o $FULLIGNORECASEARG "$PATTERN" $fname | wc -l
done
