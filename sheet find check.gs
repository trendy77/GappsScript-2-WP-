var LASTLIVE = 3;   // LAST line of posts to send on ov/sheet
var FOLDER = 'IFTTT';
var SHEETNAME = "ckwwALL";
var MAX_ROWS =5;
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

function fileFindr(){
  // GETS ALL SHEETS WITHIN 'POSTS' FOLDER ---> LISTS ON 'ALL' SHEET
var sofar = kickIt('filefind'); var splits=1; 
var scriptProperties = PropertiesService.getScriptProperties(); var lastExecution = ScriptProperties.getProperty('lastEx');
 Logger.log('lastEx is :'+lastExecution); 
   if( lastExecution === null ){
   lastExecution = 2;   Logger.log('lastEx was null, is now :'+ lastExecution); ScriptProperties.setProperty('lastEx',lastExecution);
    }
    Logger.log('lastEx is :'+lastExecution); 
var overview = SpreadsheetApp.getActiveSpreadsheet();       
    // REMOVES DUPES FROM ALL SHEET //var theRes = AUTOCheck(OV_SHEETID);
  var newSH = overview.getSheetByName(SHEETNAME);
    var postFold = DriveApp.getFoldersByName(FOLDER);
  while (postFold.hasNext()) { 
   var fold = postFold.next();
   var files = fold.getFilesByType(MimeType.GOOGLE_SHEETS);              
         while (files.hasNext()) { 
         var file = files.next();
   var chnam = file.getName();   Logger.log('now processing postsheet: ' + chnam); var idfile=file.getId(); var url = file.getUrl();
 hideContentCol(idfile);
 var thrtow = ([[lastExecution,chnam,idfile,url]]);
 var thrtow6= newSH.getRange(lastExecution,1,1,4).setValues(thrtow);
sofar = split(sofar);  splits++;lastExecution++;
           scriptProperties.setProperty('lastEx',lastExecution);
        }
 }
 var total = holdUp(sofar);
 var aver = (total/splits);
 Logger.log('time total ' +total + ' Average split '+ aver);
if (lastExecution>=newSH.getLastRow()){
lastExecution=2;
}
scriptProperties.setProperty('lastEx',lastExecution);
}

function dupLIVEcheck(){
    // Duplicate Check
    // of LIVE SHEETS
var sofar = kickIt('dupCheck');var splits=0;
   var overview = SpreadsheetApp.getActiveSpreadsheet();
   var newSH = overview.getSheetByName("live");
   var daa = newSH.getRange(2,3,6,1).getValues();
       for (var cc in daa){
         var idtochk = daa[cc]; Logger.log('daa[cc] is:');Logger.log(daa[cc]);
            var theRes = AUTOCheck(idtochk);
         sofar = split(sofar); 
          splits++;
          if (theRes[4]){
        Logger.log('found DUPES!'+ theRes[4]);   
       }
       var dfaa = newSH.getRange((cc+1),4,1,4).setValues( theRes[1], theRes[2], theRes[3], theRes[4]);
      }
  var total = holdUp(sofar);
  var aver = (total/splits);

}

function duprCheck(){
    // runs for MAX_ROWS
      // Duplicate Check of sheet PARAM
var sofar = kickIt('dupCheck');
var splits=0;
var scriptProperties = PropertiesService.getScriptProperties(); var lastDExecution = ScriptProperties.getProperty('lastDEx');
 Logger.log('lastDEx is :'+lastDExecution);
   if( lastDExecution === null || lastDExecution > 13 ){
   lastDExecution = '2';   Logger.log('lastDEx was null or 2, is now :'+ lastDExecution); ScriptProperties.setProperty('lastDEx',lastDExecution);
  }
 var overview = SpreadsheetApp.getActiveSpreadsheet(); var newSH = overview.getSheetByName(SHEETNAME);
var daa = newSH.getRange(lastDExecution,3,MAX_ROWS,1).getValues();
 for (var cc in daa){
 var idtochk = daa[cc];
 Logger.log('daa[cc] is:');Logger.log(daa[cc]);
 var thisone = SpreadsheetApp.openById(idtochk);
   var chnam = thisone.getName();   Logger.log('now processing postsheet: ' + chnam); var idfile=thisone.getId(); var url = thisone.getUrl();
 var theRes = AUTOCheck(idtochk);
var diffar = split(sofar); 
var dupes = newSH.getRange(lastDExecution,10).getValue(); dupes=dupes+theRes[4];
var preDiff = newSH.getRange(lastDExecution,5,1,7).setValues([[diffar, theRes[0],theRes[1],theRes[2],theRes[3],dupes,theRes[5]]]);
var lastC = newSH.getRange(lastDExecution,5,1,7).setBackground('grey');
var nextC = newSH.getRange((lastDExecution+1),5,1,7).setBackground('yellow');
splits++;
lastDExecution++;
}
 if( lastDExecution === null || lastDExecution >= 19 ){
   lastDExecution = '2';   Logger.log('lastDEx was null or 2, is now :'+ lastDExecution); ScriptProperties.setProperty('lastDEx',lastDExecution);
  }splits++;
  var total = holdUp(sofar);
    var aver = (total/splits);
  Logger.log('time total ' +total + ' Average split '+ aver+'splits:' +splits);
ScriptProperties.setProperty('lastDEx',lastDExecution);
}


function hideContentCol(id){
    var spreadsheet = SpreadsheetApp.openById(id);
  try {
  var sheet = spreadsheet.getSheetByName("Sheet1");
// This hides the second column
   var range = sheet.getRange("B1"); sheet.hideColumn(range);
} catch(e){
SpreadsheetApp.flush();
 }
}

function AUTOCheck(ssid){
    // PROVIDE A SHEET ID, THIS WILL RUN DUPLICATE CHECK
        // --> RETURNS:  LINES, tagged, NOTTAGGED, n/a-tagged, dupe or 0
var spreadsheet = SpreadsheetApp.openById(ssid);
        try { 
          var sheet = spreadsheet.getSheetByName("Sheet1");
          var data = sheet.getDataRange().getValues();
        } catch(e) { 
        var sheet = spreadsheet.insertSheet("Sheet1"); var sheet = spreadsheet.getSheetByName("Sheet1"); var somet = sheet.getRange(1,1,1,8).setValues('tit','cont','url','cat','source','img','date','tags');
         }
  var lines = 0; var tagged = 0; var notTagged=0;var dupe=0; var newData = new Array(); var naTag = 0;
    for(i in data){
    var row = data[i];
   var duplicate = false;
    for(j in newData){
  if(row[0] == newData[j][0] && row[1] == newData[j][1]){
  duplicate = true;dupe++;
   }    }
    if(!duplicate){
   newData.push(row);lines++;
 }
 for(j in newData){
 if(isCellEmpty(newData[j][7])){
      notTagged++;
      } 
      if (!isCellEmpty(newData[j][7])){
        if (newData[j][7] == 'N/A'){
      naTag++
      } else { 
      tagged++;
      }
     }
     }     
     }
    sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
  var timer = new Date();
var since = timer.getTime();
  var res2 = (['linesRem','tagged', 'notTagged','naTags','dupesFound']);
  var res11 = ([lines,tagged,notTagged,naTag]);
  var res1i1 = ([lines,tagged,notTagged,naTag, dupe,timer]);
  //   var titlez = sheet.getRange(1,9,1,5).setValues([res2]);
    // var preDiff = sheet.getRange(2,9,1,6).setValues([res1i1]);
  return (res11);
}




function fileChecker(){
  // 
 var postFold = DriveApp.getFoldersByName('IFTTT');
   var newData = new Array();   var lastEx=1;
  while (postFold.hasNext()) { 
    var fold = postFold.next();
     var files = fold.searchFiles('mimeType = "' + MimeType.GOOGLE_SHEETS + '"');
     while (files.hasNext()) {
       var thisone = files.next();
       var spreadsheet = SpreadsheetApp.open(thisone);
       var uuu = spreadsheet.getId();
       Logger.log(uuu);
        var nam = spreadsheet.getName();    
       var url = spreadsheet.getUrl();
           var thrtow = ([lastEx,nam,uuu,url]);
  var overview = SpreadsheetApp.openById(ckwwSHEETID);    
var newSH = overview.getSheetByName(SHEETNAME);
  var newSHc = newSH.getRange(lastEx, 1, 1, 4).setValues([thrtow]);
           lastEx++;
          }
   }
   }

function AUTOJUNEfiledupCheck(ssid){
    // PROVIDE A SHEET ID, THIS WILL RUN DUPLICATE CHECK
        // --> RETURNS:  LINES, tagged, NOTTAGGED, n/a-tagged, dupe or 0
var spreadsheet = SpreadsheetApp.openById(ssid);
        try { 
          var sheet = spreadsheet.getSheetByName("Sheet1");
          var data = sheet.getDataRange().getValues();
        } catch(e) { 
               }
  var lines = 0; var tagged = 0; var notTagged=0;var dupe=0; var newData = new Array(); var naTag = 0;
    for(i in data){
    var row = data[i];
   var duplicate = false;
    if(isCellEmpty(row[7])){
      notTagged++;
      } 
      if (!isCellEmpty(row[7])){
        if (row[7] == 'N/A'){
      naTag++;
      } else { 
      tagged++;
      }
     }
   for(j in newData){
  if(row[0] == newData[j][0] && row[1] == newData[j][1]){
  duplicate = true;dupe++;
   }    }
    if(!duplicate){
   newData.push(row);lines++;
   }  }
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
  var res2 = (['linesRem','tagged', 'notTagged','naTags','dupesFound']);
  var res11 = ([lines,tagged,notTagged,naTag,dupe]);
     var titlez = sheet.getRange(1,9,1,5).setValues([res2]);
     var preDiff = sheet.getRange(2,9,1,5).setValues([res11]);
  return (res11);
} 

function checkLive() {
    // checks LIVE sheets for tagged
    // numleft and n/a tagged
 Logger.log('checking live sheets');
   var overview = SpreadsheetApp.getActiveSpreadsheet(); 
    var sheet = overview.getSheetByName("live"); 
    var check = sheet.getRange(2,3,(LASTLIVE-1),1).getValues();
      for (var t in check){
         var number = 2;
         var ssid = check[t];  
        var open = SpreadsheetApp.openById(ssid);
        var nam = open.getName();         var urll = open.getUrl();    
        var results = AUTOCheck(ssid);
              if (results[4]){
           //    SpreadsheetApp.getUi().alert('sheet ' +ssid +'found dupes: ' + results[4]);
                Logger.log('found DUPES -- ' + results[4]); 
               }
      
          Logger.log(results); 
        var fffr = ([nam,urll]); var numss = ([results[0],results[1],results[2],results[3],results[4]]);
    var lineIn = sheet.getRange(number,1,1,2).setValues([fffr]);
      var linedIn = sheet.getRange(number,4,1,5).setValues([numss]);
      number++;
      }
}
 


function checkAllAUTOcheckNumNTags() {
// READS IDs from SHEETNAME and RUNS AUTOcheckNumNTags
var overview = SpreadsheetApp.openById(ckwwSHEETID); 
 var sheet = overview.getSheetByName(SHEETNAME);
  var check = sheet.getRange(2,3,5,1).getValues();
for (var t=1;t<5;t++){
  var ssid = check[t];  
  var results = AUTOcheckNumNTags(ssid);
var thiss = sheet.getRange((t+1),4,1,1).setValue(results);
}
}

function AUTOcheckNumNTags(ssid){
var numberLeft = 0;  var naTag = 0; var tagged = 0;   var notTagged = 0;   var unsure=0; var ss = SpreadsheetApp.openById(ssid); var ssnam = ss.getName();var ssurl = ss.getUrl();
 var sheet = ss.getSheetByName("Sheet1");  var rows=sheet.getRange(1,8,sheet.getMaxRows(),1).getValues(); var left = sheet.getLastRow();
     var data = sheet.getDataRange().getValues(); for(i in data){
       var row = data[i];
    if(isCellEmpty(row[7])){
      notTagged++;
      } 
      if (!isCellEmpty(row[7])){
        if (row[7] == 'N/A'){
      naTag++;
      } else { 
      tagged++;
      }
     }
     }
     var res2 = (['linesRem','tagged', 'notTagged','naTags']);
  var res11 = (data.length,tagged,notTagged,naTag);
    // var titlez = sheet.getRange(1,4,1,4).setValues([res2]);
   // var preDiff = sheet.getRange(2,9,1,4).setValues([res11]);
Logger.log(res11);
return (res11);
}


