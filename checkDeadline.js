var url = 'https://docs.google.com/spreadsheets/d/****id****/pubhtml';
//var book = SpreadsheetApp.openByUrl(url);
var sheet = SpreadsheetApp.getActive()
var nameSheet = sheet.getSheetByName('name_sheet');
var actionPlanSheet = sheet.getSheetByName('action_plan');
// var mailTemplateSheet = sheet.getSheetByName('mail');

function check() {

  var jsonNameData = getJsonData(nameSheet);
  
  //Logger.log(jsonNameData); 

  var jsonActionPlan = getJsonData(actionPlanSheet);
  //Logger.log(JSON.parse(jsonActionPlan));
  var paseJson = JSON.parse(jsonActionPlan);
  
  for(var i in paseJson) {
  
    Logger.log(paseJson[i].pic_name);
  
  }

  
  // var jsonMailTemplate = getJsonData(mailTemplateSheet);
  
  // Logger.log(jsonMailTemplate);
}

function getJsonData(sheet){ 
  var json = convSheet(sheet);
  return JSON.stringify(json);
}

function convSheet(sheet) {

  var colStartIndex = 1;
  var rowNum = 1;
  var firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  var firstRowValues = firstRange.getValues();
  var titleColumns = firstRowValues[0];

  var lastRow = sheet.getLastRow();
  var rowValues = [];
  for(var rowIndex=2; rowIndex<=lastRow; rowIndex++) {
    var colStartIndex = 1;
    var rowNum = 1;
    var range = sheet.getRange(rowIndex, colStartIndex, rowNum, sheet.getLastColumn());
    var values = range.getValues();
    rowValues.push(values[0]);
  }

  var jsonArray = [];
  for(var i=0; i<rowValues.length; i++) {
    var line = rowValues[i];
    var json = new Object();
    for(var j=0; j<titleColumns.length; j++) {
      json[titleColumns[j]] = line[j];
    }
    jsonArray.push(json);
  }
  return jsonArray;
}

function sendMail() {

  var sendToAddress ="";
  var mailTitle = '【アクションプラン】テスト送信';//メールのタイトルを設定
  var mailMessage = 'テスト送信です';//メールの本文を設定
  //MailApp.sendEmail(sendToAddress,mailTitle,mailMessage);
}
