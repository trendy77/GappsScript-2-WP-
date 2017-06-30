function timeKeep(){
var scriptProperties = PropertiesService.getScriptProperties();
var continuationToken = scriptProperties.getProperty('ALL_FILES_ITERATE_TOKEN');
  var start = new Date();
 var maxTime = 1000*60*4.5; // Max safe time, 4.5 mins
  if (continuationToken == null) {
  
   var folder = DriveApp.getFolderById(id);         // set folder variable
   var files = folder.getFiles();
   var sheet = SpreadsheetApp.getActiveSheet();     // set open sheet as active and clear any data
  
  sheet.insertRowsBefore(1,1);
  sheet.getRange(1,1,1,8).setValues(["title","content", "articleUrl", "category", "source", "image", "date","tags"]);  // add headers
  } else {
    // not the first time, pick up where we left off
    var files = DriveApp.continueFileIterator(continuationToken);
  }
 while (files.hasNext() && end.getTime() - start.getTime() <= maxTime) {
    var file = files.next();
    var name = file.getName();                                                      // and the unique URL for each file
   var end = new Date();
  }
    // Save your place by setting the token in your  properties
  if(files.hasNext()){
    Logger.log('times UP!');
    var continuationTokenE = files.getContinuationToken();
 scriptProperties.setProperty('ALL_FILES_ITERATE_TOKEN', continuationTokenE);
   } else {
    // Delete the token
    PropertiesService.getScriptProperties().deleteProperty('ALL_FILES_ITERATE_TOKEN');
    Logger.log("Completed");
  }
  }
  
  
function test(){
var timer = new Date();
Logger.log('timer'+timer);
var since = timer.getTime();
Logger.log('since'+since);
Utilities.sleep(4000);

var timer2 = new Date();
Logger.log('timer2'+timer2);
var since2 = timer2.getTime();
Logger.log('since2'+since2);
var difference = since2-since;
Logger.log('difference is ' +difference);
var scriptProperties = PropertiesService.getScriptProperties();
var newProperties = {difference:difference, startT: since};
scriptProperties.setProperties(newProperties);

}
  
  
function kickIt(called){
var since = new Date().getTime();
var scriptProperties = PropertiesService.getScriptProperties();
var newProperties = {splits: '0', startT: since};
scriptProperties.setProperties(newProperties);
Logger.log('started @ '+new Date() + 'running ' +called);  
 return since;
}

function holdUp(sofar){
var t2 = new Date().getTime();
var finalLeg = t2-sofar;
var tot = sofar + finalLeg;
Logger.log( 'lastLeg took '+ finalLeg);
return tot;
 }

function split(sofar){
var timer = new Date().getTime();
var thisLeg = timer-sofar;
Logger.log('split taken ' + thisLeg+' ms');
var total = sofar+thisLeg;
Logger.log('SPLIT- TOTAL TIME: ' +total +' THIS LEG took :' + thisLeg);
return total;
}

function getMySheetId(){
var url ='https://docs.google.com/spreadsheets/d/1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk/edit#gid=1147695701';
var ss = SpreadsheetApp.openByUrl(url);
Logger.log(ss.getId());
}


function isCellEmpty(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}