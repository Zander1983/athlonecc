require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {

    var router = new Router();

    /*
    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });*/
    
    var body = $('body');
    
    body.on("click", "#slide-menu-button", function (e) {

        if (body.hasClass('left-nav')) {
            
            body.removeClass('left-nav');
            console.log('in slide menu button and hiding....');
            $('.side-nav').hide('slow');
        } else {
            console.log('in slide menu button and showing....');
            $('.side-nav').show();
            body.addClass('left-nav');           
        }
    });
    
    body.on("click", ".main-content", function (e) {
        
            body.removeClass('left-nav');
            $('.side-nav').hide('slow');
   
    });
    

    body.on('click', '.list a', function(event) {
        $(this).parent('li').addClass('tappable-active');
    });
    
    body.on('click', '.side-nav__list__item a', function(event) {
        $(this).parent('li').addClass('side-nav-active');
    });


    Backbone.history.start();
    
    /*
    Backbone.history.bind("route", function (route, router) {
            body.removeClass('left-nav');
            $('.side-nav').hide('slow');
    });*/

});