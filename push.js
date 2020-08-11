const webPush = require('web-push');

const vapidKeys = {
    'publicKey': 'BPSnMR4h4cXaFeELtSSpaG5fvphdcepacF082NeFVP25fywZ_rsx8UmgKxnmuqVAABVcU3NINHgWGa37AT79ysU',
    'privateKey': 'Qv89MWAkyr5Z8THr1iG4q4CW0VOiEWbBlHty5gL1rSk'
}

webPush.setVapidDetails(
    'mailto:ekomuliyo@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/deOWJNhTv10:APA91bHTd5ASMT2U7Eo79j077PC-jI_HHW1619DE-sfl54_Au5rf371UNfPvGf4t0oQ5zuF2CJ4WjFv23PqWPBHoELN0kWiudapiqjwpDcwh3CASEmRtsTsgSpFv_TDqyLmfXRcq_gJv',
    'keys': {
        'p256dh': 'BBj/ZYzKqtc7uFysgib4wXIzGQGySJrpTQBHfjc7mK8L+T8By9Nse0w8GyVMqd4HnA1JkLCUKZsrF2/9QPNSbjM=',
        'auth': 'EFJgETd6kPnQaNynoCgZWw=='
    }
}

const payload = 'Selamat! ini adalah isi pesan notifikasi melalui push notification api';

const options = {
    gcmAPIKey: '608380059204',
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)