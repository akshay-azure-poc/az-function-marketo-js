module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //blob copy
    const containerName = "demo";
    const blobName = "quickstart.txt";
    const content = "hello Blob SDK";
    const localFilePath = "./readme.md";
    let response; 
    const path = require('path');
    const storage = require('azure-storage');

    const blobService = storage.createBlobService();
 
    async function uploadString (containerName, blobName, text) {
            return new Promise((resolve, reject) => {
                context.log('before call');
                blobService.createBlockBlobFromText(containerName, blobName, text, err => {
                    if(err) {
                        context.log('err');
                        reject(err);
                    } else {
                        context.log('resolve');
                        resolve({ message: `Text "${text}" is written to blob storage` });
                    }
                });
            });
        };

    
    // includes
    const cmd = require("commander");
    const request = require("request");
    const child_process = require("child_process");
    const fs = require("fs");
    const numbro = require("numbro");
    const moment = require("moment");

    var Marketo = require('node-marketo-rest');
    
    //TODO: Fill in endpoint, identity, clientId, clientSecret the merketo instrumentation information
    var marketo = new Marketo({
    endpoint: '',
    identity: '',
    clientId: '',
    clientSecret: ''
    });

    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').load();
    }
              
    let export_id;

    marketo.lead.find('id', [2, 3])
    .then(function(data, resp) {
                    console.log(data);
    });

    //TODO: change start and end date
    marketo.bulkLeadExtract.get(
    ['firstName', 'lastName', 'id', 'email'],
    {createdAt: {
    startAt: '2019-05-01T23:59:59-00:00',
    endAt:  '2019-05-03T23:59:59-00:00'
    }})
    .then(function(data) {
                    // export is ready
                    let exportId = data.result[0].exportId;
    export_id = exportId;
                    return marketo.bulkLeadExtract.file(exportId);
    })
    .then(function(file) {
                    // do something with file
                    context.log('Do something with the file');
                    response = file;
                    uploadString(containerName, export_id, JSON.stringify(response));
                    context.log(`Blob "${export_id}" is uploaded`);
    });
    context.log('end of main');
};
