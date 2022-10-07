const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');
const {google} = require('googleapis');
const keys = require('./keys.json');

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true}));

app.get('/hey', (req, res) => {
  res.send('Hello World!')
})

app.use(history());

app.use(serveStatic(__dirname + '/dist'));



/*const client = new google.auth.JWT(
keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){

  if(err){
    console.log(err);
    return;
  } else {
    console.log("success");
    gsrun(client);
  }

});

async function gsrun(cl){

  const gsapi = google.sheets({version:'v4', auth: cl})

  const opt = {

    spreadsheetId: '1_ub20f9r3PBEUFc8mTQjZ4zCQ0RX7tdsHN3nW-zZqD8',
    range: 'inventorycard',

  };

  let results = await gsapi.spreadsheets.values.get(opt);
  //scope = results.data.values[0][0];
  scope = results.data.values;
  
  return scope;

} */



app.listen(process.env.PORT || 5000);






