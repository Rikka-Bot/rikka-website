const https = require('https');

async function sendNewUserWebhook({ username, discordId, ipAddress }) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('⚠️ DISCORD_WEBHOOK_URL não configurado. Webhook não enviada.');
    return;
  }

  const timestamp = new Date().toISOString();
  const payload = {
    embeds: [
      {
        title: '✅ Novo cadastro realizado',
        color: 3066993,
        fields: [
          { name: 'Username', value: username || 'N/A', inline: true },
          { name: 'Discord ID', value: String(discordId || 'N/A'), inline: true },
          { name: 'Endereço IP', value: ipAddress || 'N/A', inline: true },
          { name: 'Data e horário do cadastro', value: timestamp, inline: false },
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
      let responseBody = '';

      response.on('data', (chunk) => {
        responseBody += chunk;
      });

      response.on('end', () => {
        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
          resolve(responseBody);
          return;
        }

        reject(new Error(`Webhook falhou com status ${response.statusCode}: ${responseBody}`));
      });
    });

    request.on('error', reject);
    request.write(body);
    request.end();
  });
}

module.exports = {
  sendNewUserWebhook,
};
