'use strict';

//
// pollyを並列実行して、そのあとクライアントでごにょごにょする
// async/awaitの例
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
    speech();
    res.end();
})

// イベントの待機
server.listen(3000);

async function speech() {
    let speechParams = {
        OutputFormat: 'pcm',
        VoiceId: 'Mizuki',
        Text: '今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気今日はいい天気',
        SampleRate: '16000',
        TextType: 'text'
    };
    const execSync = promisify(exec);
    console.log("create speech");
    
    await polly.synthesizeSpeech(speechParams).promise();
    console.log("end speech");
    await execSync('./test.sh');
    console.log("end exec");
}