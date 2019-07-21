[![Build Status](https://travis-ci.org/TunedChaos/smm2coursemanager-server.svg?branch=master)](https://travis-ci.org/TunedChaos/smm2coursemanager-server) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# SMM2CourseManager Server

SMM2CourseManager Server is a utility meant for serving up an interface between the database that the SMM2Coursemanager uses, and any clients that wish to connect to it.

## Installation, Configuration, and Usage
Available in the [Wiki](https://github.com/TunedChaos/smm2coursemanager-server/wiki)

## Deploying through a web server
This actually takes some doing, ultimately it is recommended to follow guidance for deploying a NodeJS&reg; through your web server of choice, this should work with almost any, though has only been tested with NGINX.

## Viewing
Depending on your server configuration, you should be able to go to the address of your device in a web browser and you will see a screen that shows current course and next course status.

If you're testing on a local machine without a domain this will be `http://localhost:3000`

If you've deployed to a web server with a domain it will be at the root of that domain.

## Common Errors
```bash
Error: Please install <database package name> package manually
```
This is likely because you've configured to utilize a particular database library, but did not run the installer, please scroll up to see how to install the appropriate library.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
