function kickIt(called){
var since = new Date().getTime();
var scriptProperties = PropertiesService.getScriptProperties();
Logger.log('started @ '+new Date() + 'running ' +called);  
 return since;
}

function holdUp(start){
var timer2 = new Date();
var since2 = timer2.getTime();
var finalLeg = since2-start;
Logger.log( 'lastLeg took '+ finalLeg);
return finalLeg;
 }

function split(start){
var timer = new Date().getTime();
var thisLeg = timer-start;
Logger.log('split taken ' + thisLeg+' ms');
Logger.log(' THIS LEG took :' + thisLeg);
return thisLeg;
}

function getMySheetId(){
//var url ='https://docs.google.com/spreadsheets/d/1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk/edit#gid=1147695701';
var ss = SpreadsheetApp.getActiveSpreadsheet();
Logger.log(ss.getId());
}

function isCellEmpty(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}