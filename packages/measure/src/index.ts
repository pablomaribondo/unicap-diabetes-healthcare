import mqtt from 'mqtt';
import cron from 'node-cron';

const mqttConfig = 'mqtt://test.mosquitto.org';
const topic = 'hospital-12/room-431/glucose';
const client = mqtt.connect(mqttConfig);

client.on('connect', () => {
  cron.schedule('*/5 * * * * *', () => {
    const [min, max] = [80, 200];
    const sensorValue = Math.floor(Math.random() * (max - min + 1) + min);
    const data = JSON.stringify({ sensorValue });

    console.log(data);

    client.publish(topic, data, error => {
      if (!error) console.log('message published');
    });
  });
});
