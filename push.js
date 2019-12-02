var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDCnLyL_7lRUISQ0B2flxZuMJ2T_51MHV1dsq5sL6ysO13RfTYKV5kJTPYYfruYqkAXCjWjqxAU-GZoObGtirnE",
   "privateKey": "zMdYAmrqkcXx5g5lIVdzFbGcOflCSjfLoWvBg7KgOfw"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cJOYoPU59OY:APA91bHjzPnk7L0hobd1vQ3S4NPNS_yFP6wlLVK3jVChRX-L1PvjYmRisF-L4rq8J_ErMcHwmKRJIIRv8nA_buKJ8LTrKsnR19XaUjOBQjuQkNDMuGpGRd5ZlgWhqlyyvOKeFMk-R8gK",
   "keys": {
       "p256dh": "BJ0f4HV/gx4HoGN1mx3x6mal79FPnTBCxeWUtbz/Dz17TBUGxF3ADfRmGKkG1YOhoX2lg48DvSCyzF0QbSfrNbE=",
       "auth": "gL1xEXeIvHd9DXsigTJdLA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '958504010516',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);