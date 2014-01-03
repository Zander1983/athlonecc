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
        device,
        body,
        homeView = new HomeView();

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
        },
        
        initialize: function() {   
            
            body = $('body');

            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {         
                                  
                    if(options.full_url==true){
   
                    }
                    else{
                        options.url = "http://localhost/schoolspace/cli/athlone/platforms/android/assets/www/scripts" + options.url;
                        //options.url = "http://localhost/schoolspace/athlone/assets/www/scripts" + options.url
                    }
            
           });

        },
        

        home: function () {
            //body.removeClass('left-nav');
            slider.slidePage(homeView.$el, body);
        },
      
        getNews: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/news", "app/views/NewsList"], function (model, NewsList) {
       
                if(typeof(news)==='undefined' || news===null){
                    news = new model.NewsCollection();
                    
                    news.fetch({
                        full_url: false,
                        success: function (collection) {

                            slider.slidePage(new NewsList({collection: collection}).$el, body, body);
                        }
                    });
                }
                else{ 
                    slider.slidePage(new NewsList({collection: news}).$el, body, body);
                }
                            
            });
        },
        
        getNewsItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/NewsItem"], function (NewsItem) {
                 slider.slidePage(new NewsItem({model: news.get(id)}).$el, body, body);
                           
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

                            slider.slidePage(new StaffList({collection: collection}).$el, body, body);
                        }
                    });
                }
                else{
                    slider.slidePage(new StaffList({collection: staff}).$el, body, body);
                }
                            
            });
        },
        
        getStaffItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/StaffItem"], function (StaffItem) {
                 slider.slidePage(new StaffItem({model: staff.get(id)}).$el, body, body);
                                 
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

                            slider.slidePage(new ParentsList({collection: collection}).$el, body, body);
                        }
                    });
                }
                else{
                    slider.slidePage(new ParentsList({collection: parents}).$el, body, body);
                }
                            
            });
        },
        
        getParentsItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/ParentsItem"], function (ParentsItem) {
                 slider.slidePage(new ParentsItem({model: parents.get(id)}).$el, body, body);
                                 
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

                            slider.slidePage(new SportsList({collection: collection}).$el, body, body);
                           // $("html, body").animate({ scrollTop: 0 }, 'slow');
                        } 
                    });
                }
                else{
                    slider.slidePage(new SportsList({collection: sports}).$el, body, body);
                }
                            
            });
        },
        
        getSportsItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/SportsItem"], function (SportsItem) {
                 slider.slidePage(new SportsItem({model: sports.get(id)}).$el, body, body);
                                 
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

                            slider.slidePage(new CurriculumList({collection: collection}).$el, body, body);
                        }
                    });
                }
                else{
                    slider.slidePage(new CurriculumList({collection: curriculum}).$el, body, body);
                }
                            
            });
        },
        
        getCurriculumItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/CurriculumItem"], function (CurriculumItem) {
                 slider.slidePage(new CurriculumItem({model: curriculum.get(id)}).$el, body, body);
                                 
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

                            slider.slidePage(new ExtraCurricularList({collection: collection}).$el, body, body);
                        }
                    });
                }
                else{
                    slider.slidePage(new ExtraCurricularList({collection: extracurricular}).$el, body);
                }
                            
            });
        },
        
        getExtraCurricularItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/ExtraCurricularItem"], function (ExtraCurricularItem) {
                 slider.slidePage(new ExtraCurricularItem({model: extracurricular.get(id)}).$el, body);
                                 
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

                            slider.slidePage(new StudentList({collection: collection}).$el, body);
                        }
                    });
                }
                else{
                    slider.slidePage(new StudentList({collection: student}).$el, body);
                }
                            
            });
        },
        
        getStudentItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/StudentItem"], function (StudentItem) {
                 slider.slidePage(new StudentItem({model: student.get(id)}).$el, body);
                                 
            });
        },
                
                
        getTweets: function () {
            //body.removeClass('left-nav');
            require(["app/models/tweet", "app/views/TweetList"], function (models, TweetList) {

                var tweets = new models.TweetCollection();               
             
                tweets.fetch({
                    not_api: true,
                    success: function (collection) {
                        //$("#loading").hide();
                        slider.slidePage(new TweetList({collection: collection}).$el, body);
                    },
                    error: function(){
                        console.log('there was an error');
                    }
                });
                                 
            });
           
        },
                
        getCalendar: function () {

            require(["app/models/calendar", "app/views/CalendarList"], function (model, CalendarList) {
       
                if(typeof(calendar)==='undefined' || calendar===null){
                    calendar = new model.CalendarCollection();
                    
                    calendar.fetch({
                        full_url: true,
                        success: function (collection) {
                            //body.removeClass('left-nav');
                            slider.slidePage(new CalendarList({collection: collection}).$el, body);                          
                        }
                    });
                }
                else{
                    //body.removeClass('left-nav');
                    slider.slidePage(new CalendarList({collection: calendar}).$el, body);
                }
                            
            });
        },
       
                
        getCalendarItem: function (id) {
            require(["app/views/CalendarItem"], function (CalendarItem) {
                    //body.removeClass('left-nav');
                    slider.slidePage(new CalendarItem({model: calendar.get(id)}).$el, body);
                                 
            });
        },  
                
        getContact: function () {
            
            require(["app/views/Contact"], function (Contact) { 
                //body.removeClass('left-nav');
                slider.slidePage(new Contact().$el, body);               
             });
        },
                
        getMap: function () {
            
            require(["app/views/Map"], function (Map) {    
                var mapView = new Map();
                //mapView.delegateEvents();
                //body.removeClass('left-nav');
                slider.slidePage(mapView.$el, body);
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

                            slider.slidePage(new AlbumList({collection: collection}).$el, body, body);
                        }
                    });
                }
                else{ 
                    slider.slidePage(new AlbumList({collection: albums}).$el, body, body);
                }
                            
            });
        },
        
         getPhotos: function (id) {
            //body.removeClass('left-nav');
            require(["app/models/photo", "app/views/PhotoList"], function (model, PhotoList) {
       
                //if(typeof(photos)==='undefined' || photos===null){
                    photos = new model.PhotoCollection([], {photoset_id:id});
                    
                    photos.fetch({
                        full_url: true,
                        success: function (collection) {
                            console.log('photos are ');
                            console.log(photos);
                            slider.slidePage(new PhotoList({collection: collection}).$el, body, body);
                        }
                    });
               /* }
                else{ 
                    slider.slidePage(new PhotoList({collection: photos}).$el, body, body);
                }*/
                            
            });
        },
        
        getPhotoItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/PhotoItem"], function (PhotoItem) {
                 slider.slidePage(new PhotoItem({model: photos.get(id)}).$el, body, body);
                           
            });
        },
                
                
        getNotification: function () {
            
            require(["app/models/device", "app/views/Notification"], function (model, Notification) {
                    
                    var storage = window.localStorage;
                    var device_id = storage.getItem('cbccork_device_id');
                    
                    device = new model.Device({id:device_id});

                    if(typeof(device_id)==='undefined' || device_id===null){
                      
                        that.body.removeClass('left-nav');
                        slider.slidePage(new Notification({model: device, storage:storage}).$el);
                    }
                    else{
                        device.fetch({
                            api: true,
                            success: function (data) {
                                that.body.removeClass('left-nav');
                                slider.slidePage(new Notification({model: data, storage:storage}).$el);                          
                            }
                        });
                    }
       
             });
        },

    });

});