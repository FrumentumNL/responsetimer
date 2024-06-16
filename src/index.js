const API_KEY = process.env.API_KEY;
const PAGE_ID = process.env.PAGE_ID;
const METRIC_ID = process.env.METRIC_ID;
const TARGET_URL = process.env.TARGET_URL;
const INTERVAL = Number(process.env.INTERVAL ?? '60');
const REQ_COUNT = parseInt(process.env.REQ_COUNT ?? '5');

let msg = [];
if (!API_KEY) msg.push('- Missing api key. Please set the API_KEY env variable.');
if (!PAGE_ID) msg.push('- Missing page id. Please set the PAGE_ID env variable.');
if (!METRIC_ID) msg.push('- Missing metric id. Please set the METRIC_ID env variable.');
if (!TARGET_URL) msg.push('- Missing target url. Please set the TARGET_URL env variable.');
if (isNaN(INTERVAL) || INTERVAL < 0) msg.push('- Invalid interval. Please set the INTERVAL env variable to a positive integer.');
if (isNaN(REQ_COUNT) || REQ_COUNT < 1) msg.push('- Invalid request count. Please set the REQ_COUNT env variable to an integer greater than 0.');

if (msg.length !== 0) {
    console.error('Encountered one or more configuration errors:')
    console.error(msg.join('\n'));
    process.exit(0);
}

let request = async () => await fetch(TARGET_URL, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; responsetimer/1.0.0; +https://github.com/FrumentumNL/responsetimer)'
    }
});

let run = async () => {
    let times = [];
    console.log(`Sending requests to ${TARGET_URL}...`);
    for (let i = 1; i <= REQ_COUNT; i++) {
        let start = performance.now();
        await request();
        let time = performance.now() - start;
        times.push(time);
        console.log(`Request ${i}/${REQ_COUNT} took ${time}ms`);
    }
    let median = times.sort((a, b) => a - b)[Math.floor(times.length / 2)];

    console.log(`Done! Median is ${median}ms`);

    console.log('Posting times to statuspage...');
    let resp = await fetch(`https://api.statuspage.io/v1/pages/${PAGE_ID}/metrics/${METRIC_ID}/data.json`, {
        method: 'POST',
        headers: {
            Authorization: `OAuth ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: {
                timestamp: Math.floor(Date.now() / 1000),
                value: median
            }
        })
    });
    if (!resp.ok) throw new Error(`Failed to post time to statuspage: ${await resp.text()}`);
    console.log('Posted times to statuspage!');
};

await run();
if (INTERVAL > 0) setInterval(run, INTERVAL * 1000);
