

function checkAll() {
    // 

var overview = SpreadsheetApp.openById('1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk'); 
  var sheet = overview.getSheetByName("live");  var marg = (sheet.getLastRow()-20);
  var check = sheet.getRange(20,3,marg,1).getValues();
for (var t=0;t>marg;t++){
  var ssid = check[t];  
  var results = AUTOcheckNumNTags(ssid);
}
}

function AUTOcheckNumNTags(ssid){
var numberLeft = 0;   var tagged = 0;   var notTagged = 0;   var unsure=0; var ss = SpreadsheetApp.openById(ssid); var ssnam = ss.getName();var ssurl = ss.getUrl();
 var sheet = ss.getSheetByName("Sheet1");  var rows=sheet.getRange(1,8,sheet.getMaxRows(),1).getValues(); var left = sheet.getLastRow();
  for (row in rows) { 
   Logger.log('id is '+rows[row]);
    if (!isCellEmpty(rows[row])) {    // if TAGGED has a TAG... there MUST be one there.
      tagged++;numberLeft++;
      } else {        var furtherLook = sheet.getRange(rows[row],1,1,2).getValues();
     if (((!isCellEmpty(furtherlook[0]))) && (!isCellEmpty(furtherlook[1]))){      // if no TAG, is there CONTENT?  
          numberLeft++;notTagged++;     /// CONTENT AND TITLE , NOT TAGGED BUT THERE...
        }  else if (((!isCellEmpty(furtherlook[0]))) && (isCellEmpty(furtherlook[1]))){      // if no TAG, is there CONTENT?  d
            numberLeft++;notTagged++; /// ONLY TITLE NO CONTENT
        } }}
        var secondNumCk = numberL(ssid);
        if (secondNumCk != numberLeft){
        Logger.log('conflicting lines remaining data...');
         var results = ([ssnam,ssid,ssurl,secondNumCk,tagged]);
         } else { var results = ([ssnam,ssid,ssurl,numberLeft,tagged]); }
Logger.log(results);
  return results;
 }

function sendLine() {
 var overview = SpreadsheetApp.openById('1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk');
var newSH = overview.getSheetByName("live");
  var ScriptProperties = PropertiesService.getScriptProperties();
 var line2go =ScriptProperties.getProperty('line2go');  
 if (line2go == null){
 line2go = 2;
 }
newSH.getRange(line2go,1,1,17);
var suc = ScriptProperties.getProperty('suc'); var errors =ScriptProperties.getProperty('errors'); var fail = ScriptProperties.getProperty('fail');var tot = ScriptProperties.getProperty('sent');
if (line2go>'7.0'){line2go = 2;} 
 Logger.log('l2go@' + line2go);var lineGoin = line2go;line2go++; Logger.log('was' + lineGoin + ' / next '+ line2go);
var range = newSH.getRange(lineGoin,7, 1, 9); 
var data = range.getValues();  for (var i = 0; i < data.length; i++){ 
    var rowData = data[i];  
    var ID = rowData[0];   var post_title = rowData[1]; var desc = rowData[2];  var articleUrl = rowData[3]; var category = rowData[4];  
    var source = rowData[5];  var image = rowData[6];  var tags = rowData[8];
    }    
    Logger.log('id is ' + ID);
     if ((!desc) && (!post_title)){
   tot++;errors++;  var newProperties = {tot:tot, errors:errors, line2go: line2go}; ScriptProperties.setProperties(newProperties);
   return Logger.log('error NO TITLE OR CONTENT'); 
   }
  if ((!desc) && (post_title)){
  desc = '[embedly]'+articleUrl+'[/embedly]<br>'+post_title +'<br> Posted by ' + source + ' ' + tags;
 } 
 if (tags == 'N/A'){
 tags = category + source;
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
    if( ID == 'fnr'){
  var url = 'fakenewsregistry.org';
} if (ID == 'ckww'){
    var url = 'customkitsworldwide.com';
}  if (ID == 'orgbiz'){
   var url = 'organisemybiz.com';
  }
    if( ID == 'glo'){
   var url = 'globetravelsearch.com';
    }
      if( ID == 'gov'){
     var url = 'govnews.info';
      }
        if( ID == 'vape'){
     var url = 'vapedirectory.co';
        }
 Logger.log('sending to ' + url); 
  try {
  var response = UrlFetchApp.fetch(url, options);  } catch (e) {
  Logger.log(e.message);  errors++; tot++; var newProperties = {errors:errors, tot: tot, line2go: line2go}; ScriptProperties.setProperties(newProperties);
    response = 'errorArsewipe';   }
   Logger.log('response is' + response);
var destination = overview.getSheetByName('esp');
         if(!isNaN(parseFloat(response)) && isFinite(response)){
   var suc = newSH.getRange(lineGoin,18).getValue();  suc++;newSH.getRange(lineGoin,18).setValue(suc);newSH.getRange(lineGoin,20).setValue(response);
	var formattedDate = Utilities.formatDate(new Date(), "GMT+11", "dd-MM-yyyy'@'HH:mm''");
        refill(lineGoin);
 }else{ 
 var fail = newSH.getRange(lineGoin,19).getValue(); fail++; newSH.getRange(lineGoin,19).setValue(fail);
   var formattedDate = Utilities.formatDate(new Date(), "GMT+11", "dd-MM-yyyy'@'HH:mm''");ref(lineGoin);
}
newSH.getRange(lineGoin,20).setValue(response); 
var newProperties = {tot: tot, suc: suc, fail: fail, line2go: line2go};
 ScriptProperties.setProperties(newProperties);     
      newSH.getRange(lineGoin,1,1,17).setBackground('grey'); 
      newSH.getRange(line2go,1,1,17).setBackground('yellow'); 
    ezTranslateNsave(ID, post_title, desc, category, tags);
    }
  

function refill(line){
var overview = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk/edit'); 
var newSH = overview.getSheetByName("live");
  // get next row ID to OPEN
  var li = newSH.getRange(line,3).getValue();
  var nextSht = SpreadsheetApp.openById(li);
    try { 
    var sss = nextSht.getSheetByName('Sheet1');
        } catch(e){
     start();
    }var numL = sss.getLastRow();var rngP = sss.getRange(2,1,1,8).getValues();
    var lineIn = newSH.getRange(line,8,1,8).setValues(rngP);newSH.getRange(line,5).setValue(numL);
sss.deleteRow(2);
}

function ref(line){
var overview = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk/edit'); 
var newSH = overview.getSheetByName("live");
  // get next row ID to OPEN
  var li = newSH.getRange(line,3).getValue();
  var nextSht = SpreadsheetApp.openById(li);
    try { 
    var sss = nextSht.getSheetByName('Sheet1');
        } catch(e){
     start();
    }var numL = sss.getLastRow();
  newSH.getRange(line,5).setValue(numL);
}

function getALLfiveLines(){
var t1 = startClock('L');var overview = SpreadsheetApp.openById('1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk'); 
var newSH = overview.getSheetByName("live");   // get all LINES OF IDS = rng[x, y, z...]
 var rng = newSH.getRange(2,3,7,1).getValues();  // TIME @ START OF GETTING LINES
  var LEN = timeChk(t1);  for (var zz = 0; zz<6;zz++){
     var id = rng[zz];      var ovw = SpreadsheetApp.openById(id);    try {   var sss =  ovw.getSheetByName('Sheet1');
    }catch(e){Logger.log(e.line + e.message);    }
   var nam= ovw.getName(); var urlss =ovw.getUrl(); var numm = sss.getLastRow();
   Logger.log( ['nam'+' numm rows is ' + numm]);     var rngP = sss.getRange(3,1,1,8).getValues();
    var thisss= ([nam,id,urlss,numm]);         var move = newSH.getRange(zz+2,2,1,4).setValues([thisss]);    var lineIn = newSH.getRange(zz+2,8,1,8).setValues(rngP);
        }}

function ezTranslateNsave(ID, title, content, cat, tags) {
var spanishHtml = LanguageApp.translate(content,'en', 'es', {contentType: 'html'});
var spanishTit = LanguageApp.translate(title, 'en', 'es', {contentType: 'text'});
var ss = SpreadsheetApp.openById('1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk'); 
  var destination = ss.getSheetByName('esp');
    destination.appendRow([spanishTit,spanishHtml,cat,tags,ID]);
}