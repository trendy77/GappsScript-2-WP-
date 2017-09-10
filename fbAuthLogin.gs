function checkit(){

var username = "theCreator";
var password = "t0mzdez2!Q";

verifyWordPressUser(username,password);

}




function verifyWordPressUser(username, password) {
 // Library key: My_8O8KRa_MszCVjoC01DTlqpU7Swg-M5
      var wordpressURL = "https://organisemybiz.com/xmlrpc.php";
    /* Call the wp.getUsers API method to get User details */
      var request = new XMLRPC.XmlRpcRequest(wordpressURL, 'wp.getUsers');
    /* The first parameter is empty since there's no blog ID for WordPress */
        request.addParam("");   
          request.addParam(username);
            request.addParam(password);
               var response = request.send().parseXML();
                  if (response.faultCode) {
                        throw(response.faultString);
                        }  else {
    throw(response[0].display_name  + " is a valid user");
             }
 }