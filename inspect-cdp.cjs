const WebSocket = require('ws');
const http = require('http');
http.get('http://localhost:9224/json/list', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const target = JSON.parse(data).find((item) => item.type === 'page' && item.url.includes('3002'));
    const socket = new WebSocket(target.webSocketDebuggerUrl);
    socket.on('open', () => {
      socket.send(JSON.stringify({ id: 1, method: 'Emulation.setDeviceMetricsOverride', params: { width: 2458, height: 965, deviceScaleFactor: 1, mobile: false } }));
      setTimeout(() => socket.send(JSON.stringify({
        id: 2,
        method: 'Runtime.evaluate',
        params: {
          expression: `JSON.stringify({ viewport: [innerWidth, innerHeight], stage: document.querySelector('.project-stage-museum')?.getBoundingClientRect().toJSON(), items: [...document.querySelectorAll('.museum-floating-figure')].map(e => ({ cls: e.className, rect: e.getBoundingClientRect().toJSON(), left: getComputedStyle(e).left, right: getComputedStyle(e).right }))})`,
          returnByValue: true,
        },
      })), 500);
    });
    socket.on('message', (message) => { const value = JSON.parse(message.toString()); if (value.id === 2) { console.log(message.toString()); process.exit(); } });
  });
});
