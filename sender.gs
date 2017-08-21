var LASTLIVE = 8;   // LAST line of posts to send on ov/sheet

//var OV_SHHFNR = '1cX9EMq2Kh6QJMQP65KZ1RkKms4iZiwmonVtLNltsGgw';
var URLTOSEND = 'customkitsworldwide.com';

// ckww
var ckwwSHEETID = '1NhyycmyuW-EQmBK6IuvRzDYknD2ubDZxj9sDJ1qG3zs';
// gov
var govSHEETID = '1Ms2LnTd6N4GNRWqXkRT3JC2jjmbkqZLIHWkxAZ8LwwY';
// fnr
var fnSHEETID = '1MeOzGG65z6lChkRfd5tgxIWyRaLPZsZGc868Awpf0vw';
// orgBiz sheet
var obSHEETID = '1PbbruGcceDl6M8xWsXWPom1TB5YmyzcQoKNeNm-XoaQ';
 // vape sheet
var vaSHEETID = '1brr5Dlu1NCXkqdJgVLn5-a7aZSmO_iA2XCH9EtQ4Jqg';


var ID = 'ckww';

function sendLine() {
 var overview = SpreadsheetApp.getActiveSpreadsheet(); 
var newSH = overview.getSheetByName("live");
  var ScriptProperties = PropertiesService.getScriptProperties();
 var line2go =ScriptProperties.getProperty('line2go');  
     if (line2go == null || line2go >= LASTLIVE){
     line2go = 2;
      }
newSH.getRange(line2go,1,1,17);
var suc = ScriptProperties.getProperty('suc'); var errors =ScriptProperties.getProperty('errors'); var fail = ScriptProperties.getProperty('fail');var tot = ScriptProperties.getProperty('sent');
  Logger.log('l2go@' + line2go);var lineGoin = line2go;line2go++; Logger.log('was' + lineGoin + ' / next '+ line2go);
var range = newSH.getRange(lineGoin,7, 1, 9); 
var data = range.getValues();  for (var i = 0; i < data.length; i++){ 
    var rowData = data[i];  
 
  var post_title = rowData[1]; var desc = rowData[2];  var articleUrl = rowData[3]; var category = rowData[4];  
    var source = rowData[5];  var image = rowData[6];  var tags = rowData[8];
    }    
    Logger.log('id is ' + ID);
 
  if ((!desc) && (!post_title)){
   line2go++; tot++;errors++;  var newProperties = {tot:tot, errors:errors, line2go: line2go}; ScriptProperties.setProperties(newProperties); refill(lineGoin);
   return Logger.log('error NO TITLE OR CONTENT'); 
   }
  if ((!desc) && (post_title)){
  desc = '[embedyt]'+articleUrl+'[/embedyt]<br>'+post_title +'<br> Posted by ' + source + ' ' + tags;
 } 
 if (tags == 'N/A'){
 tags = category + source;
 } else {
   tags = tags + category + source;
 }
var payload = {
 'uuidd': ID,
    'title': post_title,
  'content': desc,
   'categories': category,
   'tags': tags,
   'articleUrl': articleUrl,
   'image': image,
   'source': source 
      };  
   var options = 
      {
        "method"  : "POST",
        "payload" : payload
        };
     Logger.log('sending to ' + URLTOSEND); 
      try {
        var response = UrlFetchApp.fetch(URLTOSEND, options);  } catch (e) {
  Logger.log(e.message);  errors++; tot++; var newProperties = {errors:errors, tot: tot, line2go: line2go}; ScriptProperties.setProperties(newProperties);
    response = 'errorArsewipe';  
   }
   Logger.log('response is' + response);
var destination = overview.getSheetByName('esp');
         if(!isNaN(parseFloat(response)) && isFinite(response)){
   var suc = newSH.getRange(lineGoin,18).getValue();  suc++;newSH.getRange(lineGoin,18).setValue(suc);newSH.getRange(lineGoin,20).setValue(response);
	var formattedDate = Utilities.formatDate(new Date(), "GMT+11", "dd-MM-yyyy'@'HH:mm''");
           var newProperties = {lastSucessAt:formattedDate, suc: suc, line2go: line2go};
        refill(lineGoin);
 }else{ 
 var fail = newSH.getRange(lineGoin,19).getValue(); fail++; newSH.getRange(lineGoin,19).setValue(fail);
   var formattedDate = Utilities.formatDate(new Date(), "GMT+11", "dd-MM-yyyy'@'HH:mm''");
   ref(lineGoin);
var newProperties = { lastFailAt:formattedDate,fail: fail, line2go: line2go};
 }
newSH.getRange(lineGoin,20).setValue(response);
 newSH.getRange(lineGoin,21).setValue(formattedDate);
  ScriptProperties.setProperties(newProperties);     
      newSH.getRange(2,1,8,17).setBackground('grey'); 
      newSH.getRange(line2go,1,1,17).setBackground('yellow'); 
    ezTranslateNsave(ID, post_title, desc, category, tags, image);
  }
  
function refill(line){
// GETS TOP LINE FROM SHEET AND INPUTS TO LIVE SHEET
// CHECKS NUM REMAINING// DELETES ROW FROM SHEET
 var overview = SpreadsheetApp.getActiveSpreadsheet(); 
var newSH = overview.getSheetByName("live");
// get next row ID to OPEN
  var li = newSH.getRange(line,3).getValue();
  var nextSht = SpreadsheetApp.openById(li);
    try { 
    var sss = nextSht.getSheetByName('Sheet1');
        } catch(e){
       }
      sss.deleteRow(2);
    var numL = sss.getLastRow();
    var rngP = sss.getRange(2,1,1,8).getValues();
    var lineIn = newSH.getRange(line,8,1,8).setValues(rngP);
  var results = AUTOCheck(li);
    var lineIn = newSH.getRange(line,4,1,4).setValues([results]);
  return (li);
}

function ref(line){
// SAME AS ABOVE BUT DOESNT DELETE ROW FROM SHEET
 var overview = SpreadsheetApp.getActiveSpreadsheet(); 
var newSH = overview.getSheetByName("live");
  // get next row ID to OPEN
  var li = newSH.getRange(line,3).getValue();
  var nextSht = SpreadsheetApp.openById(li);
    try { 
    var sss = nextSht.getSheetByName('Sheet1');
        } catch(e){
       }
    var rngP = sss.getRange(2,1,1,8).getValues();
    var lineIn = newSH.getRange(line,8,1,8).setValues(rngP);
  return (li);
}

function getALLfiveLines(){
 var overview = SpreadsheetApp.getActiveSpreadsheet(); 
var newSH = overview.getSheetByName("live");   // get all LINES OF IDS = rng[x, y, z...]
 var rng = newSH.getRange(2,3,(LASTLIVE-1),1).getValues();  
  for (var zz =2; zz<(LASTLIVE-1);zz++){
    var id = rng[zz];      var ovw = SpreadsheetApp.openById(id);   
   var nam= ovw.getName(); var urlss =ovw.getUrl(); var sss = ovw.getSheetByName('Sheet1'); var numm = sss.getLastRow();
   Logger.log( ['nam'+' numm rows is ' + numm]);     var rngP = sss.getRange(3,1,1,8).getValues();
    var thisss= ([nam,urlss,id,numm]);         var move = newSH.getRange((zz+2),1,1,4).setValues([thisss]);    var lineIn = newSH.getRange(zz+2,8,1,8).setValues(rngP);
      }
   }

function ezTranslateNsave(ID, title, content, cat, tags, img) {
var spanishHtml = LanguageApp.translate(content,'en', 'es', {contentType: 'html'});
var spanishTit = LanguageApp.translate(title, 'en', 'es', {contentType: 'text'});
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var destination = ss.getSheetByName('esp');
    destination.appendRow([spanishTit,spanishHtml,cat,tags,ID,img]);
}

