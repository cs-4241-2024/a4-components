const http = require('http');
const fs = require('fs');
const mime = require('mime');
const { URL } = require('url');
const dir = 'public/';


const port = 3000;
let appdata = [];
const server = http.createServer(function(request, response) {
    if (request.method=== 'GET') {


        handleGet(request, response);
    } else if (request.method==='POST') {
        handlePost(request, response);
    } else {


        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end('Method Not Allowed');



    }
});
function handleGet(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname === '/highscores') {
        const playerName = url.searchParams.get('player');
        let filteredScores = appdata.filter(record => record.player=== playerName);


        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(filteredScores));
    } else {


        sendFile(response, dir + url.pathname.slice(1));
    }}


function handlePost(request, response) {
    let dataString = '';
    request.on('data', function(data) {
        dataString += data;
    });


    request.on('end', function() {
        try {
            const receivedData = JSON.parse(dataString);
            const date = new Date().toLocaleString();
            const newRecord ={
                player: receivedData.yourname,
                clicks: receivedData.clicks,
                date: date,
            };

            const existingRecordIndex = appdata.findIndex(record => record.player === newRecord.player);
            if (existingRecordIndex !== -1) {
                if (newRecord.clicks > appdata[existingRecordIndex].clicks) {
                    appdata[existingRecordIndex] = newRecord;
                }
            } else {
                appdata.push(newRecord);
            }
            appdata.sort((a, b) => b.clicks - a.clicks);

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(newRecord));
        } catch (error) {
            console.error("Error processing POST request:", error);


            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end('Bad Request');
        }
    });
}
function sendFile(response,filepath) {
    const type = mime.getType(filepath);
    fs.readFile(filepath, function(err, content) {
        if (err === null) {


            response.writeHead(200, { 'Content-Type': type });
            response.end(content);
        } else {
            response.writeHead(404);


            response.end('404 Error: File Not Found');
        }
    });
}
        server.listen(port, () => {
});