define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "", 
        description = "", 
        author = "", 
        pubDate = "", 
        src="",
        other_src="",
        img="",
        
        Staff = Backbone.Model.extend({  

        }),

        
        StaffCollection = Backbone.Collection.extend({

            model: Staff,
            url: 'http://athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=1&format=raw',
            
            //This is used so I can test on a browser. On a device, use the direct link
          
            /*
            url: function(){
                    return "/school-proxy.php?type=staff";
                 },*/
            
        
            parse: function (data) {
                xml = data;

              
                $(xml).find('item').each(function (index) {
           
                    title = $(this).find('title').text();
                    
                    description = $(this).find('description').text();
                            
                    author = $(this).find('author').text();
                    
                    pubDate = $(this).find('pubDate').text();
                    
                    pubDate = pubDate.substring(0, pubDate.length-12);


                    var x=0;
                    $(description).find('img').each(function(i, obj){
     
                       if(x==0){
                            src = $(obj).attr('src');
                            if(src.indexOf('http') === -1){
                               //therefore its a relative path
                               description = description.replace(src,"http://athlonecc.ie"+src);
                               src = "http://athlonecc.ie" + src;
                            }
                       }
                       else{
                            other_src = $(obj).attr('src');
                            if(other_src.indexOf('http') === -1){
                                //therefore its a relative path
                                description = description.replace(other_src,"http://athlonecc.ie"+other_src);                         
                            }
                       }
                       x++;
                    });
       
                    parsed.push({id:id, title: title, author:author, 
                                description:description, pubDate:pubDate, src:src});
                   id++;
                });

                return parsed;
            },
                    

            fetch: function (options) {
                options = options || {};
                options.dataType = "xml";
                return Backbone.Collection.prototype.fetch.call(this, options);
            }

        });


    return {
        Staff: Staff,
        StaffCollection: StaffCollection
    };

});