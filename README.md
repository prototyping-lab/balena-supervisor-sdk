# Balena Supervisor SDK

Simple Node.js wrapper for the [balena supervisor API](https://www.balena.io/docs/reference/supervisor/supervisor-api/).

Currently only implementing as much as we need :)  
Feel free to contribute.

### Currently Implemented
- [GET /v1/device/host-config](https://www.balena.io/docs/reference/supervisor/supervisor-api/#get-v1devicehost-config)
- [PATCH /v1/device/host-config](https://www.balena.io/docs/reference/supervisor/supervisor-api/#patch-v1devicehost-config)


## Tutorial: Renaming devices and hostnames

By default balena ...

- ... creates fantasy names for the devices
- ... uses the first 7 digits of the Balena-UUID as hostname

In our setup we want to have:

- Our *OWN* Unique Device-IDs
- Use our Device-IDs as hostnames, and as balena device names.

## Usage

1. Create your own `hostnames.json`  
   Example: 
	
		{
		  '00112233445566778899aabbccddeeff': 'adas-device',
		  'ffeeddccbbaa99887766554433221100': 'bobs-device',
		  '32-digit-uuid-pasted-from-balena': 'your-hostname',
		  ...
		}

2. Login to balena

		balena login

3. Run the script

		node balena-update-names.js hostnames.json

## License

Apache License 2.0
