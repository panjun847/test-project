var app = {
    initialize: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      document.addEventListener('deviceready', this.render, false);
    },
    getData:function(key){
      var data=Store.get(key);
      var result=[];
      if(data){result.push(data)}
      return data;
    },
    getAll:function(){
      var data=Store.getAll();//("9787111255048");
      var result=[];
      for(var p in data){
        result.push(data[p])
      }
      return result; 
    },
    insertInfo:function(msg){
      var info=document.getElementById("info");
      var msgEl=document.createElement("div")
      info && info.appendChild(msgEl) && (msgEl.innerHTML=msg)
    },
    setData:function(key,data){
      Store.add(key,data);
    },
    render:function(){
      var html="";
      var main=document.getElementById("book_container");
      var countEl=document.getElementById("books_count");
      if(main && countEl){  
        var extData=app.getData();
        app.insertInfo(extData);
        BOOKS.concat(extData);
        var count=BOOKS.length;
        countEl.innerHTML=count;
        BOOKS.forEach(function(item,index){
          if(typeof item==='object'){
            var info=item.title+"("+item.publisher+"/"+item.pubdate+")";
            html+='<li class="ui-border-t">\
                    <div class="ui-list-thumb">\
                      <span style="background:#000"></span>\
                    </div>\
                    <div class="ui-list-info">\
                      <h4 class="ui-nowrap">'+info+'</h4>\
                      <div class="ui-txt-info">'+item.author+'</div>\
                    </div>\
                  </li>'
               
          }
        });
        main.innerHTML=html;
      }
      var scan=document.getElementById("scan");
      scan && scan.addEventListener('click',function(){
        app.search("9787111255048");
        //app.scanCode();
      },false)
      app.insertInfo("render");
      app.afterRender();
    },
    scanCode:function(){
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          app.search(result.text);
        }, 
        function (error) {
        }
      );
    },
    search:function(id){
      if(id){
        var url="https://api.douban.com/v2/book/search"
        cordovaHTTP.get(url, {
          q:id
        },{}, function(response) {
          var data=JSON.parse(response.data);
          var scan=document.getElementById("scan");
          scan.innerHTML=data.books[0].isbn13
          if(data.books && data.books.length){
            var data=data.books[0];
            var key=(data.isbn13||data.isbn10)+"";
            app.insertInfo("setData"+key)
            app.setData(key,{
              title:data.title,
              publisher:data.publisher,
              pubdate:data.pubdate,
              author:data.author,
              isbn10:data.isbn10,
              isbn13:data.isbn13
            });
            app.insertInfo("->>"+app.getData(key))
            //location.href=index.html
          }
        }, function(response) {
          
        });
      }
    },
    afterRender:function(){
      //footer
      var menu=document.querySelectorAll(".footer_menu li");
      Array.prototype.forEach.call(menu,function(item,index){
        item.addEventListener('click',function(){
          var href=this.getAttribute("data-href");
          if(href){
            location.href=href;
          }
        },false);
      });
    }
};

app.initialize();
