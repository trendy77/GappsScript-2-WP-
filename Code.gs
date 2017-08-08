// overview of the .gs files in this project....

// SENDER SCRIPT
  //function sendLine() {
//function refill(line){
//function ref(line){   
//function ezTranslateNsave(ID, title, content, cat, tags, img) 

 
//UI SCRIPT
//function reset(){
//function onInstall
//function onOpen()
//function isCellEmpty(cellData) 
//function dupUI(){
//function IDUI(){
// and idcheck -- - checks id of active sheet 

/// SHEET CHECK FIND SCRIPT SCRIPT
     // vars --- OV_SHEETID ---- ALLSHEET
//function------fileChecker() 
//function getALLfiveLines(){
checkLive
  //function AUTOJUNEfiledupCheck(ssid)
checkAllAUTOcheckNumNTags
AUTOcheckNumNTags

// TFSORT/
//function fileFindr()
//function dupLIVEcheck(){
 //function duprCheck(){
//function hideContentCol(id){
//function AUTOCheck(ssid){
    // PROVIDE A SHEET ID, THIS WILL RUN DUPLICATE CHECK
        // --> RETURNS:  LINES, tagged, NOTTAGGED, n/a-tagged, dupe or 0




function updateRemote(ss){
var ScriptProperties = PropertiesService.getScriptProperties();
var line = ScriptProperties.getProperty('line');
Logger.log(line);
var name = ss.getName();var URL = ss.getUrl();
var sheet1 = ss.getSheetByName("Sheet1");var sheet5 = ss.getSheetByName("Sheet5");
var data = sheet5.getRange(2,1,1,16).getValues();
var id = 'https://docs.google.com/spreadsheets/d/1JIk3NlUVH300FRxUfUEXSDyYht_CyU5bZp1M8WQ9ET4/edit#gid=0';
var gov1= SpreadsheetApp.openByUrl(id);
var dest = gov1.getSheetByName("Sheet1");
  var lin2 = line++;
var send = dest.getRange(line,1,1,1);
var sendu = dest.getRange(lin2,1,1,4);
  var send1 = dest.getRange(line,2,1,16);
// puts in sheet name and data 
send.setValue(name);
sendu.setValues(URL);
send1.setValues(data);
}





function dupeIt(ssid){
    var spreadsheet = SpreadsheetApp.openById(ssid);
    var sheet = spreadsheet.getSheetByName("Sheet1");
  var data = sheet.getDataRange().getValues();
  var lines = 0;var diffCh=0;
  var newData = new Array();
  for(i in data){
    var row = data[i];
    var duplicate = false;
   for(j in newData){
     if(row[0] == newData[j][0] && row[1] == newData[j][1]){
  duplicate = true; diffCh++;
   }    }
    if(!duplicate){
   newData.push(row);lines++;
  }  }
  sheet.clearContents();
 var fffd = sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
   var res11 = ([['diffCh',diffCh, 'linesRem',lines]]);
 var fff= sheet.getRange(1, 9, 1,4).setValues(res11);
  return(res11);
 }