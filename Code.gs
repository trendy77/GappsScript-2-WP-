var ckwwLIVE = '1NhyycmyuW-EQmBK6IuvRzDYknD2ubDZxj9sDJ1qG3zs';
var vaLIVE= '1brr5Dlu1NCXkqdJgVLn5-a7aZSmO_iA2XCH9EtQ4Jqg'; 
var govLIVE = '1Ms2LnTd6N4GNRWqXkRT3JC2jjmbkqZLIHWkxAZ8LwwY';
var fnrLIVE = '1MeOzGG65z6lChkRfd5tgxIWyRaLPZsZGc868Awpf0vw';
var orgbizLIVE = '1PbbruGcceDl6M8xWsXWPom1TB5YmyzcQoKNeNm-XoaQ';
var gloLIVE = '1Tfa6h1bgQGsUkLlg97U9O6Rgm9hFkGRm-TivECEzo_g';

function setup(){
var userProperties = PropertiesService.getUserProperties();
var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var newProperties = {ckwwLIVE: ckwwLIVE, orgbizLIVE: orgbizLIVE, vaLIVE: vaLIVE, fnrLIVE:fnrLIVE, govLIVE:govLIVE, gloLIVE:gloLIVE};
 userProperties.setProperties(newProperties);
}

function update(){
   var list = (['ckwwLIVE', 'orgbizLIVE', 'vaLIVE', 'fnrLIVE', 'govLIVE', 'gloLIVE']);
  for (var t =0;t<5;t++){
    var tt = list[t];
    Logger.log(tt);
var userProperties = PropertiesService.getUserProperties();
var nr = userProperties.getProperty(tt);
var fnr = SpreadsheetApp.openById(nr);
var fnrss = fnr.getSheetByName('live');
   var ss = SpreadsheetApp.openById('1_RF1gLXInLB-INcsLuuwVCTtLrMqFvOhjdUHftbqGVk'); 
   var sheet5 = ss.getSheetByName('live');
  var rangeToCopy = fnrss.getRange(1, 1, 30, 8).getValues();
 var oCopy = sheet5.getRange(1, 1, 30, 8).setValues(rangeToCopy);
  }

}