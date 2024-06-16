# responsetimer

A simple script that tracks the time an endpoint takes to respond and posts the results to statuspage.io

### Configuration

All configuration is done via environment variables.

```properties
# Your API key for statuspage.io
API_KEY=
# The id of the page the metric is on
PAGE_ID=
# The id of the metric to post the timings results to
METRIC_ID=
# The URL to monitor
TARGET_URL=https://frumentum.nl
# The interval in seconds to check the URL, defaults to 60
# Set to 0 to only check once
INTERVAL=60
# responsetimer uses the median response time of X requests
REQ_COUNT=5
```
