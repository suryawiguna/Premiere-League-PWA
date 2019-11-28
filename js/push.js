var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJ3ezRIOJXLVJIwmxH_aBopWZdtx-0be4UWmFsOyS5RTkR8I6iHkJZEK2WkH_oWaH9Mw8Va6KhfnT20FwdE-J_U",
   "privateKey": "d3efq-awPhcPbX8B4PZ5P_B_dCAT2U0Vk9LgHoCfWyI"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "<Endpoint URL>",
   "keys": {
       "p256dh": "<p256dh Key>",
       "auth": "<Auth key>"
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '561005267678',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);