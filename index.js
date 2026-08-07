<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="UTF-8">
  <title>Zalivanje biljaka</title>
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
  <style>
    body { font-family: 'Segoe UI', Arial; background-color: #f5fff5; color: #1a5c30; text-align: center; margin-top: 30px; }
    button, input, select { font-size: 1.1em; padding: 10px 20px; margin: 10px; border: none; border-radius: 6px; }
    button { cursor: pointer; background-color: #4caf50; color: white; }
    button:hover { background-color: #388e3c; }
  </style>
</head>
<body>
  <h1>Zalivanje biljaka</h1>
  <p id="status">Status pumpe: Nepoznato</p>
  <hr>
  <h2>Daljinska kontrola (MQTT)</h2>
  <button onclick="mqttPublish('ON')">Uključi pumpu</button>
  <button onclick="mqttPublish('OFF')">Isključi pumpu</button>

  <script>
    // Povezivanje na HiveMQ public broker
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");

    client.on("connect", () => {
      console.log("MQTT povezan");
      client.subscribe("tatijana/pump/status"); // Pretplata na status
    });

    client.on("message", (topic, message) => {
      if (topic === "tatijana/pump/status") {
        document.getElementById("status").innerText = "Status pumpe: " + message.toString();
      }
    });

    function mqttPublish(msg) {
      client.publish("tatijana/pump/control", msg);
    }
  </script>
</body>
</html>
