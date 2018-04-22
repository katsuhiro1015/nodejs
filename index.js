'use strict';

//
// pollyを並列実行して、そのあとクライアントでごにょごにょする
//

var http = require('http');
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const aws = require('aws-sdk');
const {promisify} = require('util');

let polly = new aws.Polly({apiVersion: '2016-06-10',region:'ap-northeast-1'});

// describeVoices
let descParams = {
    LanguageCode: 'ja-JP'
};


// Webサーバーの作成
var server = http.createServer();

// イベントハンドラを登録する
server.on('request',function(req,res) {
    res.writeHead(200,{'Content-Type': 'text/plain'});
    speech().then(data => {
        console.log("polly end");
        return execSh();
    }).then(data => {
        console.log("exec end");
    });
    res.end();
})

// イベントの待機
server.listen(3000);


function execSh() {
    console.log("exec start");
    const execSync = promisify(exec);
    return execSync('./test.sh');
}

async function speech() {
    let speechParams = {
        OutputFormat: 'pcm',
        VoiceId: 'Mizuki',
        Text: '今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気',
        SampleRate: '16000',
        TextType: 'text'
    };

    console.log("create speech");
    return await polly.synthesizeSpeech(speechParams).promise();
}