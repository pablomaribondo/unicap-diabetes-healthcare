import { Receiver } from './Receiver';
import { Storage } from './Storage';

(() => {
  const storageOptions = {};

  const connectionOptions = {
    port: process.env.MQTT_PORT,
    broker: process.env.MQTT_BROKER,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  };

  const storage = new Storage();
  const receiver = new Receiver();

  console.log('Start reading sensor data');

  storage.connect(storageOptions, () => {});

  receiver.connect(
    connectionOptions,
    process.env.MQTT_TOPIC,
    () => {
      console.log('Successfully connected to the mqtt broker');
    },
    message => {
      storage.save(message, error => {
        if (error) {
          console.log(
            `An error occurred while trying to store the incoming message. ${error}`
          );
        }
      });
    }
  );
})();
