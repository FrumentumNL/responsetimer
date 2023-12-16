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
INTERVAL=60
# The number of times to check the URL before conducting the final measurement, defaults to 5
# see the section below for further explanation
WARMUP_COUNT=5
```

> [!NOTE]
> responsetimer sends a few requests to the URL before conducting the final measurement.
> This is done to ensure actions like DNS lookups do not affect the actual response time.
> The number of requests is determined by the `WARMUP_COUNT` environment variable, and can be set to `0` to completely
> disable the warmup feature.
