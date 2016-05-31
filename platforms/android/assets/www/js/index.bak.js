var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var el=document.getElementById("scan");
        el.addEventListener("click",function(){
          app.scanner();
        },false)
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var html="";
        for(var p in device){
          html+="<p>"+p+"="+device[p]+"</p>";
        }
        app.insertInfo( html );
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    },
    insertInfo:function(html){
        var parentElement = document.getElementById("deviceready");
        var info=parentElement.querySelector(".info");
        info.innerHTML=html
    },
    scanner:function(){
      var html="";
        cordova.plugins.barcodeScanner.scan(
          function (result) {
              html="We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled;
              app.insertInfo(html);
              app.search(result.text);
          }, 
          function (error) {
              html ="Scanning failed: " + error;
              app.insertInfo(html);
          }
       );
    },
    search:function(id){
      app.insertInfo("initNet")
      var url="https://api.douban.com/v2/book/search"
      cordovaHTTP.get(url, {
        q:id
      },{}, function(response) {
        app.insertInfo("succ")
        var html="";
        for(var p in response){
          html+=p+"="+response[p]
        }
        app.insertInfo(html);
      }, function(response) {
        app.insertInfo(response.error);
      });
    }
};

app.initialize();
