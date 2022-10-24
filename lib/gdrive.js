const {google} = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {getRandomInt} = require('../lib/utility.js')

module.exports = function(folder, sort) {
  this.filelist = new Array();
  this.id_folder = folder
  this.to_sort = sort
  const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
  const TOKEN_PATH = path.join(process.cwd(), 'token.json');
  const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

  this.init = async function(){
    this.authorize().then(this.saveFiles).catch(console.error);
  }

  this.authorize = async () => {
    let client = await this.loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await this.saveCredentials(client);
    }
    return client;
  }

  this.loadSavedCredentialsIfExist = async () => {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  this.saveCredentials = async (client) => {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  this.saveFiles = async (auth) => {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
      pageSize: 1000,
      includeRemoved: false,
      spaces: 'drive',
      fileId: this.id_folder,
      fields: 'nextPageToken, files(id, name, parents, mimeType, modifiedTime)',
      q: `'${this.id_folder}' in parents`
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            this.filelist.push(file)
          });
          if(this.to_sort)
            sortList(this.filelist)
        } else {
          console.log('No files found.');
        }
        console.log('Added '+this.filelist.length+' files');
      });
  }

  sortList = async (file_list) => {
    file_list.sort((a, b)=>{
      var nameA = a.name
      var nameB = b.name
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  this.getRandomLink = () => {
    return 'https://drive.google.com/uc?export=download&id='+this.filelist[getRandomInt(0,this.filelist.length-1)].id
  }

  this.getLinkWithIndex = (index) => {
    if(index < this.filelist.length)
      return 'https://drive.google.com/uc?export=download&id='+this.filelist[index].id
    else
      return 'Pokemon not yet hattified :tophat:'
  }
}