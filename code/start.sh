#!/bin/sh
/bin/sh -ec 'cd code/backend && python app.py &'
/bin/sh -ec 'cd code/2b-a-frontend-dev && npm run start'