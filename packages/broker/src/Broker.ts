import aedes, { Aedes } from 'aedes';
import tls from 'tls';

export class Broker {
  aedes: Aedes;
  broker: tls.Server;

  constructor() {
    this.aedes = aedes();
    this.listen = this.listen.bind(this);
    this.close = this.close.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  listen(
    options: { key: string | Buffer; cert: string | Buffer },
    port: number,
    callback: () => void
  ) {
    this.broker = tls.createServer(options, this.aedes.handle);

    console.log(`Starting MQTT broker on port:${port}`);

    this.broker.listen(port);

    callback();
  }

  close(callback: () => void) {
    this.aedes.close(() => {
      console.log('Broker is closed');

      callback();
    });
  }

  authenticate() {
    // @ts-ignore
    this.aedes.authenticate = (client, username, password, callback) => {
      console.log({ client, username, password: password.toString() });
      if (username === process.env.MQTT_USERNAME) {
        if (password?.toString() === process.env.MQTT_PASSWORD) {
          callback(null, true);
          console.log(`Client: ${client.id} authenticated successfully`);
        }
      } else {
        callback(false, false);
      }
    };
  }
}
