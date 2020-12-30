// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  const peerstack = require('peerstack')
  const connections = require('peerstack/dist/connections')
  const remoteCalls = require('peerstack/dist/remote-calls')
  const me = {
    id: "7194ee666e4c4ab18f1f7466ec525a43",
    username: "mark@ubo.us",
    type: "User",
    email: "mark@ubo.us",
    username_lowercase: "mark@ubo.us",
    publicKey: "742z1d6j6l397z7r7h6f741q114f2a5l5x415w59402d202u64367o2u311k2b1y",
    group: "users",
    displayName: "mark@ubo.us",
    owner: "7194ee666e4c4ab18f1f7466ec525a43",
    modified: 1609290125776,
    signer: "7194ee666e4c4ab18f1f7466ec525a43",
    signature: "2t5d245p5b4w834h5r3k345x4q1e6v2q7w6y6s603i2i68541d2945547f312n2n737v3e1m4e5u164u4j4j1b7n656c7e2f665q326e3w536x396a2g5l2d185f5r172d2l3u3p2h2h3r3p3u2l3t2l2j3r2g3t3s2j2c2i3p3t2f3r2d2d3r3q3p2i3u2f3u2h2e2j2f2f3p2i3r2g2j2i2g2k3q3u3p2c2l2h3p2e2d3p2i2k3u2l2l2j2h2h"
  }
  // window.localStorage.setItem('secretKey', redacted)
  require('peerstack/dist/db').getIndexedDB().then(async db => {
    // await db.update(me, true);
    // const me = await db.get("7194ee666e4c4ab18f1f7466ec525a43")    
    me.secretKey = window.localStorage.getItem('secretKey');
    const deviceId = peerstack.newid();
    connections.init(deviceId, me, "https://theque.app/");
    connections.eventHandlers.onDeviceConnected = async connection => {
      remoteCalls.syncDBs(connection);
    }
  });

})
