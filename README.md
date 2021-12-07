<h1 align="center">
  <img src=".github/logo.png" width="300px" alt="Health Care Diabetes" />
</h1>


<h4 align="center">
  HCD - Health Care Diabetes
</h4>

<br />


O Projeto foi concebido a partir dos dados da *IDF* que demonstram o aumento das diabetes tipo 1 e tipo 2
no mundo, devido a isto houve o aumento da necessidade de produtos baratos com diagnostico preciso, rápido e eficaz para auxiliar os profissionais de saúde e usuários comuns no diagnostico metabólico. Foram com tais necessidades em mente que o *HCD - Health Care Diabetes* foi desenvolvido, sendo um software de analise continua da glicose em tempo real, local e remota.

Tendo em vista a necessidade de democratizar o acesso ao equipamento, o *HCD - Health Care Diabetes* foi projetado sobre uma arquitetura *IOT* onde há um sensor para leitura das taxas do usuário, um *gateway* para coleta dos dados com processamento prévio e um servidor para armazenamento dos dados.

Todo o aparato ferramental para o desenvolvimento do *HCD* foi escolhido visando atender a maior diversidade de
aparelhos possíveis e evitando a sobrecarga dos dispositivos.
Tais prioridades resultaram no *Node.JS* com *TypeScript* para reger o sensor, o *MQTT - Message Queuing Telemetry Transport* como protocolo de comunicação entre os serviços, *Aedes MQTT* como *broker*, a segurança fica a cargo do *TLS - Transport Layer Security* e futuramente o InfluxDB para armazenamento dos dados.
