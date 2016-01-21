# socket-io-chat
A simple socket-IO chat application implementing group chat among computers connected to a common network.

### Getting started
1. Clone the repo or download the zip and extract it.
2. Go to the root folder of the project and install dependencies: `npm install`
3. Upon successful download of dependencies, start the server: `node server.js`
4. Open your favorite browser and go to [localhost:8080/chat](https://localhost:8080/chat).
5. To chat with your friends connected to the same network, share your machine's [Internal Network Address](https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&es_th=1&ie=UTF-8#safe=active&q=internal+network+address). This can be obtained by keying in `ipconfig` in the Windows CMD.
6. Your friend can connect by entering your machine's internal address followed by `/chat` from that machine's browser. For example, [https://192.168.x.x/chat](https://192.168.x.x/chat).
7. Enjoy!

NOTE: You need to have [node.js](https://nodejs.org/en/download/) installed on your machine.
