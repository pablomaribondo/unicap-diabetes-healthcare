import cron from 'node-cron';

import { Transmitter } from './Transmitter';

(() => {
  const transmitter = new Transmitter();

  const connectionOptions = {
    port: process.env.MQTT_PORT,
    broker: process.env.MQTT_BROKER,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  };

  console.log('Start reading sensor data');

  transmitter.connect(connectionOptions, () => {
    cron.schedule(process.env.READ_INTERVAL, () => {
      const [min, max] = [80, 200];
      const sensorValue = Math.floor(Math.random() * (max - min + 1) + min);

      transmitter.send(sensorValue, process.env.MQTT_TOPIC, error => {
        if (error) {
          console.log(
            `An error occurred while publishing the measurement. Err: ${error}`
          );
        } else {
          console.log('Successfully send message to mqtt broker');
        }
      });
    });
  });
})();
