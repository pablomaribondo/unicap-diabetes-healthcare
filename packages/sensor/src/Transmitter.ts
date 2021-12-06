import { connect as mqttConnect, MqttClient } from 'mqtt';
import { getUnixTime } from 'date-fns';

export class Transmitter {
  private client: MqttClient;

  constructor() {
    this.connect = this.connect.bind(this);
    this.send = this.send.bind(this);
  }

  connect(
    options: {
      port: string;
      broker: string;
      username: string;
      password: string;
    },
    callback: () => void
  ) {
    const connectionOptions = {
      port: Number(options.port),
      host: options.broker,
      username: options.username,
      password: options.password,
      rejectUnauthorized: false,
      protocol: 'mqtts'
    };

    console.log(
      `Trying to connect to the MQTT broker at ${connectionOptions.host} on port ${connectionOptions.port}`
    );
    this.client = mqttConnect(connectionOptions);

    this.client.on('connect', () => {
      console.log(
        `Connected successfully to the MQTT broker at ${connectionOptions.host} on port ${connectionOptions.port}`
      );
      callback();
    });

    this.client.on('error', error => {
      console.log(error);
    });
  }

  send(sensorValue: number, topic: string, callback: (error: Error) => void) {
    const data = {
      sensorValue,
      timestamp: getUnixTime(Date.now())
    };

    this.client.publish(topic, JSON.stringify(data), error => {
      if (error) {
        console.log(`Error: ${error}`);
      } else {
        console.log('Successfully published message');
      }

      callback(error);
    });
  }
}
