const https = require('https');

async function sendNewUserWebhook({ username, discordId, ipAddress }) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('DISCORD_WEBHOOK_URL não configurado. Webhook não enviada.');
    return;
  }

  const timestamp = new Date().toISOString();
  const payload = {
    embeds: [
      {
        title: 'Novo cadastro realizado',
        color: 3066993,
        fields: [
          { name: 'Username', value: username || 'N/A', inline: true },
          { name: 'Discord ID', value: String(discordId || 'N/A'), inline: true },
          { name: 'Endereco IP', value: ipAddress || 'N/A', inline: true },
          { name: 'Data e horario do cadastro', value: timestamp, inline: false },
        ],
        timestamp,
      },
    ],
  };

  const body = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const request = https.request(url, options, (response) => {
      response.resume();

      response.on('end', () => {
        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
          resolve();
          return;
        }

        reject(new Error('Webhook failed'));
      });
    });

    request.on('error', reject);
    request.setTimeout(5000, () => request.destroy(new Error('Webhook timeout')));
    request.write(body);
    request.end();
  });
}

module.exports = {
  sendNewUserWebhook,
};
