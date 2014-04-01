JUNGLEGYM
=============
> An Exploration of Interactive Interfaces for the Web.


INSTALLATION
---------------
> Instructions maybe incomplete and/or incorrect. Will be updated soon

1. [Install](https://github.com/joyent/node/wiki/installation) [NodeJS](http://nodejs.org)
2. [Install](http://nodered.org/docs/getting-started/) [NodeRED](http://nodered.org/)
3. Install Dependencies
```sh
$ cd /path/to/working/directory
$ git clone https://github.com/debanjum/Junglegym.git  # Cloning Repository
$ cd Junglegym/nodejs
$ npm install	 # Installing Application Dependencies
```
5. ```node path/to/junglegym/serve.js``` # Starting NodeJS Server
6. ```node path/to/node-red/red.js``` # Start NodeRED Server
7. Open ```localhost:1880``` in browser & deploy desired flow in Node-Red.
8. Open ```localhost:7000``` in browser & run application.


CONTRIBUTING
---------------
1. Fork [repository](https://github.com/debanjum/Junglegym). Develop. Merge. Submit Pull Request.
2. Edit ```nodejs/serve.coffee```, ```spectra/index.html``` etc as required
3. Convert Coffee to JS ```$ coffee -o ./ -c serve.coffee``` & Start Server ```$ node serve.js```
4. Open ```localhost:7000``` in browser & start testing


DEBUGGING
---------------
1. Make sure permission on files and ports are set correctly
2. Ensure all applications dependencies installed


BUGS
---------------
Please file bug reports in [issues](https://github.com/debanjum/Junglegym/issues)


LICENSE
---------------
This program is free software; it is distributed under the GNU General Public License v3.

[GPLv3](./COPYING) © [JUNGLEGYM](./AUTHORS)
