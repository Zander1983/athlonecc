define(function (require) {

    "use strict";

    var Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        slider = new PageSlider($('body')),
        Useful              = require('app/utils/useful_func'),
        news,
        staff,
        parents,
        sports,
        articles,
        curriculum,
        extracurricular,
        student,
        calendar,
        albums,
        photos,
        tweets,
        deviceModel,
        that;

    return Backbone.Router.extend({

        routes: {
            "": "getNews",
            "news": "getNews",
            "news-item/:id": "getNewsItem",
            "staff": "getStaff",
            "staff-item/:id": "getStaffItem",
            "parents": "getParents",
            "parents-item/:id": "getParentsItem",
            "sports": "getSports",
            "sports-item/:id": "getSportsItem",
            "curriculum": "getCurriculum",
            "curriculum-item/:id": "getCurriculumItem",
            "extracurricular": "getExtraCurricular",
            "extracurricular-item/:id": "getExtraCurricularItem",
            "student": "getStudent",
            "student-item/:id": "getStudentItem",
            "twitter": "getTweets",
            "calendar": "getCalendar",
            "calendar-item/:id": "getCalendarItem",
            "contact": "getContact",
            "map": "getMap",
            "albums": "getAlbums",
            "photos/:id": "getPhotos",
            "photo-item/:id": "getPhotoItem",
            "notification": "getNotification",
            "article/:id": "getArticle",
            "articles/:project_title": "getArticles",
        },
        
        initialize: function() {   
            
            that = this;
            that.body = $('body');
            
            this.bind( "route", this.routeChange);
            
            this.storage = window.localStorage;

            this.device_id = this.storage.getItem(project_title+'_device_id');
            this.api_key = this.storage.getItem(project_title+'_api_key');
            
            if(typeof(this.device_id)!=='undefined' && this.device_id!==null){
                //only update counter if we know device_id. the first time gets installed, 
                //we wont be able to get device_id cos it can take some time to come back from registering
                //with apple/google
                this.updateMessageCounter();
            }
       

            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) { 
                
                if(options.pure_ajax==true){
                    return;
                }

                if(options.api==true){
                    //172.16.22.68
                    //options.url = "http://localhost/schoolspace/device_api" + options.url;
                    
                    if(options.update_notification==true){
                       //options.url = "http://localhost/schoolspace/device_api/update_notification" + options.url+"";   
                       options.url = server_url+"/device_api/update_notification" + options.url+"";   
                    }
                    else{
                        //options.url = "http://localhost/schoolspace/device_api" + options.url;   
                        options.url = server_url+"/device_api" + options.url;                        
                    }
                    
                }
                else{
                    if(options.full_url==true){
   
                    }
                    else{
                        console.log('in correct else and options.url is ');
                        console.log(options.url);
                        //this is when testing in a browser
                        //options.url = "http://localhost/schoolspace/cli/athlonecc/www/scripts" + options.url
                        options.url = "http://localhost/schoolspace/cli/athlonecc/www/scripts" + options.url
                    }
                }
  
           });

        },
                
        routeChange: function(){
    
            $('html,body').scrollTop(0);
    
        },
                 

      
        getNews: function (id) {

            require(["app/models/news", "app/views/NewsList"], function (model, NewsList) {
       
                if(typeof(news)==='undefined' || news===null){
                    news = new model.NewsCollection();
                    news.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            
                            console.log('got the collection');
                            
                            slider.slidePage(new NewsList({collection: collection, message_count:that.message_count}).$el);
                        },
                        error: function(){
                                console.log('there was an error');
                        }
                    });
                }
                else{ 
                    that.body.removeClass('left-nav');
                    slider.slidePage(new NewsList({collection: news}).$el);
                }
                            
            });
        },
        
        getNewsItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/NewsItem"], function (NewsItem) {
                 that.body.removeClass('left-nav');   
                 slider.slidePage(new NewsItem({model: news.get(id), message_count:that.message_count}).$el);
                           
            });
        },

        getStaff: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/staff", "app/views/StaffList"], function (model, StaffList) {
       
                if(typeof(staff)==='undefined' || staff===null){
                    staff = new model.StaffCollection();
                    
                    staff.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new StaffList({collection: collection, message_count:that.message_count}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new StaffList({collection: staff, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getStaffItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/StaffItem"], function (StaffItem) {
                 slider.slidePage(new StaffItem({model: staff.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
        getParents: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/parents", "app/views/ParentsList"], function (model, ParentsList) {
       
                if(typeof(parents)==='undefined' || parents===null){
                    parents = new model.ParentsCollection();
                    
                    parents.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new ParentsList({collection: collection, message_count:that.message_count}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new ParentsList({collection: parents, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getParentsItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/ParentsItem"], function (ParentsItem) {
                 that.body.removeClass('left-nav');   
                 slider.slidePage(new ParentsItem({model: parents.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
                
        getSports: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/sports", "app/views/SportsList"], function (model, SportsList) {
       
                if(typeof(sports)==='undefined' || sports===null){
                    sports = new model.SportsCollection();
                    
                    sports.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new SportsList({collection: collection, message_count:that.message_count}).$el);
                           // $("html").animate({ scrollTop: 0 }, 'slow');
                        } 
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new SportsList({collection: sports, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getSportsItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/SportsItem"], function (SportsItem) {
                 that.body.removeClass('left-nav');
                 slider.slidePage(new SportsItem({model: sports.get(id), message_count:that.message_count}).$el);
                                 
            });
        },

        getCurriculum: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/curriculum", "app/views/CurriculumList"], function (model, CurriculumList) {
       
                if(typeof(curriculum)==='undefined' || curriculum===null){
                    curriculum = new model.CurriculumCollection();
                    
                    curriculum.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new CurriculumList({collection: collection, message_count:that.message_count}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new CurriculumList({collection: curriculum, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getCurriculumItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/CurriculumItem"], function (CurriculumItem) {
                 that.body.removeClass('left-nav');   
                 slider.slidePage(new CurriculumItem({model: curriculum.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
        getExtraCurricular: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/extracurricular", "app/views/ExtraCurricularList"], function (model, ExtraCurricularList) {
       
                if(typeof(extracurricular)==='undefined' || extracurricular===null){
                    extracurricular = new model.ExtraCurricularCollection();
                    
                    extracurricular.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new ExtraCurricularList({collection: collection, message_count:that.message_count}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new ExtraCurricularList({collection: extracurricular, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getExtraCurricularItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/ExtraCurricularItem"], function (ExtraCurricularItem) {
                 that.body.removeClass('left-nav');
                 slider.slidePage(new ExtraCurricularItem({model: extracurricular.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
        getStudent: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/student", "app/views/StudentList"], function (model, StudentList) {
       
                if(typeof(student)==='undefined' || student===null){
                    student = new model.StudentCollection();
                    
                    student.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new StudentList({collection: collection, message_count:that.message_count}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new StudentList({collection: student, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getStudentItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/StudentItem"], function (StudentItem) {
                 that.body.removeClass('left-nav');
                 slider.slidePage(new StudentItem({model: student.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
                
        getTweets: function () {
            //body.removeClass('left-nav');
            require(["app/models/tweet", "app/views/TweetList"], function (models, TweetList) {

                if(typeof(tweets)==='undefined' || tweets===null){
                    tweets = new models.TweetCollection(); 
                    
                    tweets.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new TweetList({collection: collection, message_count:that.message_count}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new TweetList({collection: tweets, message_count:that.message_count}).$el);
                }
                                 
            });
           
        },
                
        getCalendar: function () {

            require(["app/models/calendar", "app/views/CalendarList"], function (model, CalendarList) {
       
                if(typeof(calendar)==='undefined' || calendar===null){
                    calendar = new model.CalendarCollection();
                    
                    calendar.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new CalendarList({collection: collection, message_count:that.message_count}).$el);                          
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new CalendarList({collection: calendar, message_count:that.message_count}).$el);
                }
                            
            });
        },
       
                
        getCalendarItem: function (id) {
            require(["app/views/CalendarItem"], function (CalendarItem) {
                    that.body.removeClass('left-nav');
                    slider.slidePage(new CalendarItem({model: calendar.get(id), message_count:that.message_count}).$el);
                                 
            });
        },  
                
        getContact: function () {
            
            require(["app/views/Contact"], function (Contact) { 
                that.body.removeClass('left-nav');
                slider.slidePage(new Contact({message_count:that.message_count}).$el);               
             });
        },
                
        getMap: function () {
            
            require(["app/views/Map"], function (Map) {    
                var mapView = new Map({message_count:that.message_count});
                //mapView.delegateEvents();
                that.body.removeClass('left-nav');
                slider.slidePage(mapView.$el);
                mapView.render();
                //google.maps.event.trigger(mapView.map, 'resize');
             });
        },
                
        getAlbums: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/album", "app/views/AlbumList"], function (model, AlbumList) {
       
                if(typeof(albums)==='undefined' || albums===null){
                    albums = new model.AlbumCollection();
                    
                    albums.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new AlbumList({collection: collection, message_count:that.message_count}).$el);
                        }
                    });
                }
                else{ 
                    slider.slidePage(new AlbumList({collection: albums, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
         getPhotos: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/photo", "app/views/PhotoList"], function (model, PhotoList) {
       
                if(typeof(photos)==='undefined' || photos===null){
                    photos = new model.PhotoCollection([], {photoset_id:id, message_count:that.message_count});
                    
                    photos.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new PhotoList({collection: collection, message_count:that.message_count}).$el);
                        }
                    });
                }
                else{ 
                    that.body.removeClass('left-nav');
                    slider.slidePage(new PhotoList({collection: photos, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getPhotoItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/PhotoItem"], function (PhotoItem) {
                 that.body.removeClass('left-nav');
                 slider.slidePage(new PhotoItem({model: photos.get(id), message_count:that.message_count}).$el);
                           
            });
        },
                
                
        getNotification: function () {
            
            require(["app/models/device", "app/views/Notification"], function (model, Notification) {
                
                  if(typeof(deviceModel)==='undefined' || deviceModel===null){

                        deviceModel = new model.Device({id:that.device_id});

                        if(typeof(that.device_id)==='undefined' || that.device_id===null || typeof(that.api_key)==='undefined' || that.api_key===null){
                            that.body.removeClass('left-nav');
                            alert('There was a problem with notifications, please contact the developer');
                            window.location.hash = "news";
                        }
                        else{
                            deviceModel.fetch({
                                api: true,
                                headers: {device_id:that.device_id,api_key:that.api_key},        
                                success: function (data) {
                                    that.body.removeClass('left-nav');
                                    slider.slidePage(new Notification({model: data, storage:storage, 
                                                                        message_count:that.message_count
                                                                        }).$el);                          
                                }
                            });
                        }
                    
                  }else{    
      
                        that.body.removeClass('left-nav');
                        slider.slidePage(new Notification({model: deviceModel, storage:storage, 
                                                            message_count:that.message_count
                                                            }).$el);    
                  }

       
             });
        },
        
        getArticle: function (id) {
             
            require(["app/models/article", "app/views/Article"], function (models, Article) {
                               
                if(typeof(articles)==='undefined' || articles===null){

                    var article = new models.Article({id: id});

                    article.fetch({
                        api: true,
                        headers: {device_id:that.device_id,api_key:that.api_key},
                        success: function (data) {
                            var articleView = new Article({model: data, message_count:that.message_count});

                            slider.slidePage(articleView.$el);

                            $.when(articleView.saveView()).done(function(data){
                                that.message_count = data.count;
                            });
          
                            data.set('seen', '1');

                        },
                        error: function(){
                            console.log('failed to fecth artcie'); 
                        }
                    });
                    
                }
                else{
                    var articleView = new Article({model: articles.get(id), 
                                                   device_id:that.device_id,
                                                   api_key:that.api_key,
                                                   message_count:that.message_count
                                                    });
                    that.body.removeClass('left-nav');
                    slider.slidePage(articleView.$el);

                    $.when(articleView.saveView()).done(function(data){
                        that.message_count = data.count;
                    });

                    articles.get(id).set('seen', '1');

                }

            });
        },
        
        
        getArticles: function (project_title) {
            
            require(["app/models/article", "app/views/ArticleList"], function (models, ArticleList) {
             
                if(typeof(articles)==='undefined' || articles===null){
                    
                    articles = new models.ArticleCollection({device_id: that.device_id, project_title: project_title
                                                            });

                    articles.fetch({
                        api: true,
                        headers: {device_id:that.device_id,api_key:that.api_key},
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new ArticleList({collection: collection,message_count:that.message_count}).$el);
                        }, 
                        error: function(){
                            console.log('failed to fecth artcie');
                        }
                    }); 

                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new ArticleList({collection: articles,message_count:that.message_count}).$el);
                }
  

            });
        },
        
        updateMessageCounter: function(){
       
            require(["app/models/article_view"], function (models) {
           
                var article_view_count = new models.ArticleViewCount({device_id: that.device_id, 
                                                                      project_title: project_title
                                                                        });
                
                article_view_count.fetch( 
                    {
                    api: true,
                    headers: {device_id:that.device_id,api_key:that.api_key},
                    success: function (data) {

                        that.message_count = data.get('count');
                        Useful.updateCountEl(that.message_count);
     
                    },
                    error: function(){
                        console.log('failed updateMessageCounter');
                    }
                }); 
                
            });
            
        }

    });

});