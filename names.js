
let balena = require('balena-sdk')();
let request = require('request-promise');
let log = console.log;

module.exports = { update };

async function update(hostnames) {

  let ready = await login();
  let token = await balena.auth.getToken();

  if (ready) {
    for (uuid in hostnames) {

			// update hostname
			const name = hostnames[uuid];
      log(`Updating hostname for ${uuid} ...`);
      const oldname = await getHostname(uuid);
      log(`Current hostname ${oldname}`);
      const hostresult = await setHostname(uuid, name);
			log(hostresult);
			log(`New hostname: ${name}`);

			// update balena name
			const getnameresult = await balena.models.device.getName(uuid);
			log(`Updating balena name for ${uuid} ...`);
			const setnameresult = await balena.models.device.rename(uuid, name);
			log(setnameresult);

    }
  } else {
    log('Sorry you need to log in ...');
  }

  async function login() {
    return balena.auth.isLoggedIn();
  }

  async function getHostname(uuid) {
    const response = await request({
      method: 'POST',
      url: 'https://api.balena-cloud.com/supervisor/v1/device/host-config',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: { uuid: uuid, method: 'GET' },
      json: true
    });
    return response.network.hostname;
  }

  async function setHostname(uuid, hostname) {
    const response = await request({
      method: 'POST',
      url: 'https://api.balena-cloud.com/supervisor/v1/device/host-config',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        uuid: uuid,
        method: 'PATCH',
        data: {
          network: {
            hostname: hostname
          }
        }
      },
      json: true
    });
    return response;
  }
}
