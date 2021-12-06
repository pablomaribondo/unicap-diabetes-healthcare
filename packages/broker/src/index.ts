import fs from 'fs';
import path from 'path';

import { Broker } from './Broker';

(() => {
  const broker = new Broker();

  const [key, cert] = [
    fs.readFileSync(
      path.resolve(__dirname, '..', 'certificates', 'broker-private.pem')
    ),
    fs.readFileSync(
      path.resolve(__dirname, '..', 'certificates', 'broker-public.pem')
    )
  ];

  const options = { key, cert };
  broker.listen(options, Number(process.env.MQTT_PORT), () => {
    broker.authenticate();

    console.log('Started mqtt broker');
  });
})();
