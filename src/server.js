  const express = require('express');
  const app = express();
  const AWS = require('aws-sdk');
  const fs = require('fs');
  const fileType = require('file-type');
  const bluebird = require('bluebird');
  const multiparty = require('multiparty');
  const http=require('http');
  const router=require('./router.js');
  require('env2')('.env');

  // app.use(router);

  // configure the keys for accessing AWS
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  // configure AWS to work with promises
  AWS.config.setPromisesDependency(bluebird);

  // create S3 instance
  const s3 = new AWS.S3();

  // abstracts function to upload a file returning a promise
  const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: process.env.S3_BUCKET,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };

  // Define POST route
  app.post('/test-upload', (request, response) => {
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `bucketFolder/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          console.log('data',data);
          return response.status(200).send(data);
        } catch (error) {
          console.log(error);
          return response.status(400).send(error);
        }
      });
  });

  app.listen(process.env.PORT || 9000);
  console.log('PORT WWORK IN 9000');
