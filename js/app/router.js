define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),

        slider = new PageSlider($('body')),
        news,
        staff,
        parents,
        sports,
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
        },
        
        initialize: function() {   
            that = this;
            that.body = $('body');
            
            this.bind( "route", this.routeChange);

            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {         

                if(options.api==true){
                    //172.16.22.68
                    //options.url = "http://localhost/schoolspace/device_api" + options.url;
                    
                    if(options.update_notification==true){
                       options.url = "http://push.schoolspace.ie/device_api/update_notification" + options.url+"";                        
                    }
                    else{
                        options.url = "http://push.schoolspace.ie/device_api" + options.url;                        
                    }
                    
                    
                }
                else{
                    if(options.full_url==true){
   
                    }
                    else{
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
                            slider.slidePage(new NewsList({collection: collection}).$el);
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
                 slider.slidePage(new NewsItem({model: news.get(id)}).$el);
                           
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
                            slider.slidePage(new StaffList({collection: collection}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new StaffList({collection: staff}).$el);
                }
                            
            });
        },
        
        getStaffItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/StaffItem"], function (StaffItem) {
                 slider.slidePage(new StaffItem({model: staff.get(id)}).$el);
                                 
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
                            slider.slidePage(new ParentsList({collection: collection}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new ParentsList({collection: parents}).$el);
                }
                            
            });
        },
        
        getParentsItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/ParentsItem"], function (ParentsItem) {
                 that.body.removeClass('left-nav');   
                 slider.slidePage(new ParentsItem({model: parents.get(id)}).$el);
                                 
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
                            slider.slidePage(new SportsList({collection: collection}).$el);
                           // $("html").animate({ scrollTop: 0 }, 'slow');
                        } 
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new SportsList({collection: sports}).$el);
                }
                            
            });
        },
        
        getSportsItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/SportsItem"], function (SportsItem) {
                 that.body.removeClass('left-nav');
                 slider.slidePage(new SportsItem({model: sports.get(id)}).$el);
                                 
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
                            slider.slidePage(new CurriculumList({collection: collection}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new CurriculumList({collection: curriculum}).$el);
                }
                            
            });
        },
        
        getCurriculumItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/CurriculumItem"], function (CurriculumItem) {
                 that.body.removeClass('left-nav');   
                 slider.slidePage(new CurriculumItem({model: curriculum.get(id)}).$el);
                                 
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
                            slider.slidePage(new ExtraCurricularList({collection: collection}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new ExtraCurricularList({collection: extracurricular}).$el);
                }
                            
            });
        },
        
        getExtraCurricularItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/ExtraCurricularItem"], function (ExtraCurricularItem) {
                 that.body.removeClass('left-nav');
                 slider.slidePage(new ExtraCurricularItem({model: extracurricular.get(id)}).$el);
                                 
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
                            slider.slidePage(new StudentList({collection: collection}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new StudentList({collection: student}).$el);
                }
                            
            });
        },
        
        getStudentItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/StudentItem"], function (StudentItem) {
                 that.body.removeClass('left-nav');
                 slider.slidePage(new StudentItem({model: student.get(id)}).$el);
                                 
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
                            slider.slidePage(new TweetList({collection: collection}).$el);
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new TweetList({collection: tweets}).$el);
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
                            slider.slidePage(new CalendarList({collection: collection}).$el);                          
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new CalendarList({collection: calendar}).$el);
                }
                            
            });
        },
       
                
        getCalendarItem: function (id) {
            require(["app/views/CalendarItem"], function (CalendarItem) {
                    that.body.removeClass('left-nav');
                    slider.slidePage(new CalendarItem({model: calendar.get(id)}).$el);
                                 
            });
        },  
                
        getContact: function () {
            
            require(["app/views/Contact"], function (Contact) { 
                that.body.removeClass('left-nav');
                slider.slidePage(new Contact().$el);               
             });
        },
                
        getMap: function () {
            
            require(["app/views/Map"], function (Map) {    
                var mapView = new Map();
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
                            slider.slidePage(new AlbumList({collection: collection}).$el);
                        }
                    });
                }
                else{ 
                    slider.slidePage(new AlbumList({collection: albums}).$el);
                }
                            
            });
        },
        
         getPhotos: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/photo", "app/views/PhotoList"], function (model, PhotoList) {
       
                if(typeof(photos)==='undefined' || photos===null){
                    photos = new model.PhotoCollection([], {photoset_id:id});
                    
                    photos.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new PhotoList({collection: collection}).$el);
                        }
                    });
                }
                else{ 
                    that.body.removeClass('left-nav');
                    slider.slidePage(new PhotoList({collection: photos}).$el);
                }
                            
            });
        },
        
        getPhotoItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/PhotoItem"], function (PhotoItem) {
                 that.body.removeClass('left-nav');
                 slider.slidePage(new PhotoItem({model: photos.get(id)}).$el);
                           
            });
        },
                
                
        getNotification: function () {
            
            require(["app/models/device", "app/views/Notification"], function (model, Notification) {
                
                  if(typeof(deviceModel)==='undefined' || deviceModel===null){

                        var storage = window.localStorage;
                        var device_id = storage.getItem('athlonecc_device_id');
                        var api_key = storage.getItem('athlonecc_api_key');

                        deviceModel = new model.Device({id:device_id});

                        if(typeof(device_id)==='undefined' || device_id===null || typeof(api_key)==='undefined' || api_key===null){
                            that.body.removeClass('left-nav');
                            alert('There was a problem with notifications, please contact the developer');
                            window.location.hash = "news";
                        }
                        else{
                            deviceModel.fetch({
                                api: true,
                                headers: {device_id:device_id,api_key:api_key},        
                                success: function (data) {
                                    that.body.removeClass('left-nav');
                                    slider.slidePage(new Notification({model: data, storage:storage}).$el);                          
                                }
                            });
                        }
                    
                  }else{    
                        console.log('in the else');
                        that.body.removeClass('left-nav');
                        slider.slidePage(new Notification({model: deviceModel, storage:storage}).$el);    
                  }

       
             });
        },
        
        getArticle: function (id) {
             
            require(["app/models/article", "app/views/Article"], function (models, Article) {
                
                var storage = window.localStorage;
                var device_id = storage.getItem('athlonecc_device_id');
                var api_key = storage.getItem('athlonecc_api_key');
             
                var article = new models.Article({id: id});
                
                article.fetch({
                    api: true,
                    headers: {device_id:device_id,api_key:api_key},
                    success: function (data) {
                        console.log('in the success, going to the Article view');
                        slider.slidePage(new Article({model: data}).$el);
                    },
                    error: function(model, xhr, options){
                        console.log('failed to fecth artcie, response is ');
                        console.log(xhr.responseText);
                    }
                });
            });
        },

    });

});