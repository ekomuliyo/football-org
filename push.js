const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPSnMR4h4cXaFeELtSSpaG5fvphdcepacF082NeFVP25fywZ_rsx8UmgKxnmuqVAABVcU3NINHgWGa37AT79ysU",
    "privateKey": "Qv89MWAkyr5Z8THr1iG4q4CW0VOiEWbBlHty5gL1rSk"
}

webPush.setVapidDetails(
    'mailto:ekomuliyo@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cd07P0WkHuo:APA91bGj5dYdT3j2OhesBGQbMLPRkJqofRRvI7zoCJFBML0DCVlNxemS7JBxm2cK0hH0tAzy_O1G5GH_DBRli9xXE9Pv4IHO05tw3o43jvxIgSPzRGz6ScQ8h2DPoO-tkzgIgVA9SGtg",
    "keys": {
        "p256dh": 'BBo4fdb1Fhyxj7UXusau02sZDfJtB8iLerdRNbj8RAP3bTYcgprbKmVTuGesX01a1q8beNRAy+X9w3DvvUvF/pw=',
        "auth": '3PPuFy1J1Ba8jBjVDZWB5A=='
    }
}

const payload = 'Selamat! ini adalah isi pesan notifikasi melalui push notification api';

const options = {
    gcmAPIKey: '666294987148',
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)