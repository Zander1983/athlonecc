define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "", 
        description = "", 
        pubDate = "", 
        href = "",
        text = "",
        pdf = "",
        src = "img/crest.png",
        
        Parents = Backbone.Model.extend({  

        }),

        
        ParentsCollection = Backbone.Collection.extend({

            model: Parents,
            url: 'http://www.athlonecc.ie/index.php?option=com_ninjarsssyndicator&feed_id=7&format=raw',
            
            //This is used so I can test on a browser. On a device, use the direct link
          
            /*
            url: function(){
                    return "/school-proxy.php?type=parents";
                 },*/
            
        
            parse: function (data) {
                xml = data;

              
                $(xml).find('item').each(function (index) {
           
                    title = $(this).find('title').text();
                    
                    description = $(this).find('description').text();
                            
                    pubDate = $(this).find('pubDate').text();
                    
                    pubDate = pubDate.substring(0, pubDate.length-12);
                    
                    if($(description).find('a').length>0){
                        $(description).find('a').each(function(i, obj){
                            href = "";
                            text = "";
                            pdf = false;
                            href = $(obj).attr('href');
                            if(href.substr(href.length - 4)===".pdf"){
                                //so its a pdf
                                pdf = true;
                                text =  'To see the enrolment policy please ';
                                text += '<div id="pdf-link" rel="'+href+'" >Click Here</div>';
                            }
                        });
                    }
                    else{
                        href = "";
                        text = "";
                        pdf = false;
                    }
             
     
                    parsed.push({id:id, title: title, description:description, pubDate:pubDate,
                                pdf:pdf, href:href, text:text, src:src});
                    title, description, pubDate, pdf, href, text = "";
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
        Parents: Parents,
        ParentsCollection: ParentsCollection
    };

});