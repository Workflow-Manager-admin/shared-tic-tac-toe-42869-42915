#!/bin/bash
cd /home/kavia/workspace/code-generation/shared-tic-tac-toe-42869-42915/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

