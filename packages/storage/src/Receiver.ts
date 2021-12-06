import { connect as mqttConnect, MqttClient } from 'mqtt';

export class Receiver {
  private client: MqttClient;

  constructor() {
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  connect(
    options: {
      port: string;
      broker: string;
      username: string;
      password: string;
    },
    mqttTopic: string,
    connectCallback: () => void,
    messageCallback: (message: any) => void
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

      this.client.subscribe(mqttTopic);

      this.client.on('message', (topic, message) => {
        if (topic === mqttTopic) {
          const parsedMessage = JSON.parse(message.toString());
          messageCallback(parsedMessage);
        }
      });

      connectCallback();
    });

    this.client.on('error', error => {
      console.log(error);
    });
  }

  disconnect(callback: () => void) {
    this.client.end();
    callback();
  }
}
