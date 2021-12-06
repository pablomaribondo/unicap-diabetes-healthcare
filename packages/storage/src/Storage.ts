export class Storage {
  constructor() {
    this.connect = this.connect.bind(this);
    this.save = this.save.bind(this);
  }

  async connect(options: any, callback: () => void) {
    console.log('Connecting to database');

    callback();
  }

  async save(message: { sensorValue: string; timestamp: string }, callback) {
    console.log(`Storing message: ${message.sensorValue} ${message.timestamp}`);

    callback();
  }
}
