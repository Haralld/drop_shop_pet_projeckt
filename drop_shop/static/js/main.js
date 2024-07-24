/* =================== Load Function =================== */
$(window).load(function() {
	"use strict";
	/* ----------- Page Loader ----------- */
	$(".loader-item").delay(700).fadeOut();
	$("#pageloader").delay(1000).fadeOut("slow");
	/* ----------- Partners Section ----------- */
	PartnersSlider_Init();
	/* ----------- fractional slider ----------- */
	if( $('.fra-slider').length !== 0 ) {
		$('.fra-slider').fractionSlider({
			'fullWidth': 			true,
			'controls': 			true, 
			'pager': 				true,
			'responsive': 			true,
			'dimensions': 			"1230,470",
			'increase': 			false,
			'slideEndAnimation': 	true
		});
	}
	/* ----------- Pretty Photo ----------- */
	$("a[data-rel^='prettyPhoto']").prettyPhoto({
 		deeplinking: false,
		hook: 'data-rel'
 	});
	
	/* ----------- Blog Flexslider ----------- */
	$('.flexslider').flexslider({
		animation: "fade",
		prevText: "", 
		nextText: "", 
		directionNav: false
  	});
	
	
});
/* =================== Load Function Ends =================== */

/* =================== Resize Function =================== */
$(window).resize(function() {  
	"use strict";
	/* ----------- Partners Section ----------- */
	PartnersSlider_Init();
	
});
/* =================== Resize Function Ends =================== */

/* =================== Ready Function =================== */
/*  Menu Toggle Script */
$(document).ready(function() {
	$("#search-toggle").click(function(e) {
		e.preventDefault();
		$(".navbar-form").toggleClass("toggled");
	});
 /*  Top-slider */    
    var time = 7; // time in seconds
     
    var $progressBar,
    $bar,
    $elem,
    isPause,
    tick,
    percentTime;
     
    //Init the carousel
    $("#top-slider").owlCarousel({
    slideSpeed : 500,
    paginationSpeed : 500,
    singleItem : true,
	navigation : true,
	navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    afterInit : progressBar,
    afterMove : moved,
    startDragging : pauseOnDragging
    });
     
    //Init progressBar where elem is $("#owl-demo")
    function progressBar(elem){
    $elem = elem;
    //build progress bar elements
    buildProgressBar();
    //start counting
    start();
    }
     
    //create div#progressBar and div#bar then prepend to $("#owl-demo")
    function buildProgressBar(){
    $progressBar = $("<div>",{
    id:"progressBar"
    });
    $bar = $("<div>",{
    id:"bar"
    });
    $progressBar.append($bar).prependTo($elem);
    }
     
    function start() {
    //reset timer
    percentTime = 0;
    isPause = false;
    //run interval every 0.01 second
    tick = setInterval(interval, 10);
    };
     
    function interval() {
    if(isPause === false){
    percentTime += 1 / time;
    $bar.css({
    width: percentTime+"%"
    });
    //if percentTime is equal or greater than 100
    if(percentTime >= 100){
    //slide to next item
    $elem.trigger('owl.next')
    }
    }
    }
     
    //pause while dragging
    function pauseOnDragging(){
    isPause = true;
    }
     
    //moved callback
    function moved(){
    //clear interval
    clearTimeout(tick);
    //start again
    start();
    }
     
    //uncomment this to make pause on mouseover
    // $elem.on('mouseover',function(){
    // isPause = true;
    // })
    // $elem.on('mouseout',function(){
    // isPause = false;
    // })
     
    });


$(document).ready(function() {
	
	initPortfolioGrid();
	
	/* ----------- Scroll Navigation ----------- */
	$(function() {
		"use strict";
		$('.scroll').bind('click', function(event) {
			var $anchor = $(this);
			var headerH = $('#navigation').outerHeight();
				$('html, body').stop().animate({					
					scrollTop : $($anchor.attr('href')).offset().top  + 1 + "px"
				}, 1200, 'easeInOutExpo');		
			event.preventDefault();
		});
	});
	
	/* --------------------------------------------
	Home Background Super Slider 
	-------------------------------------------- */
	$(function() {
		"use strict";
		if ( $( "#slides" ).length ) {
			$('#slides').superslides({
				animation: 'fade',
			});
		}
	});
	
	/* --------------------------------------------
	Text Slider
	-------------------------------------------- */		
	$(function() {
		"use strict";
		if ( $( ".text-slider" ).length ) {
			$('.text-slider').easyTicker({
				direction: 'up',  
				speed: 'slow',
				interval: 4000,
				height: 'auto',
				visible: 1,
				mousePause: 0,
			});
		}
	});
	/* ----------- Menus hide after click -- mobile devices ----------- */	
	$(function() {
		"use strict";
		$('.nav li a').click(function () {
			$('.navbar-collapse').removeClass('in');
		});
	});
	
	/* ----------- Active Navigation ----------- */		
	$(function() {
		"use strict";
		$('body').scrollspy({ 
			target: '#topnav',
			offset: 95
		});
	});
	
	/* ----------- Fixed Menu on Scroll	----------- */
	$(function() {
		"use strict";
		$("#sticky-section").sticky({topSpacing:0});
	});
	
	/* ----------- Animation ----------- */
	$(function() {
		"use strict";
		$('.animated').appear(function() {
			var elem = $(this);
			var animation = elem.data('animation');
			if ( !elem.hasClass('visible') ) {
				var animationDelay = elem.data('animation-delay');
				if ( animationDelay ) {			
					setTimeout(function(){
					 elem.addClass( animation + " visible" );
					}, animationDelay);				
				} else {
					elem.addClass( animation + " visible" );
				}
			}
		});
	});
	
	/* ----------- Progress Bar ----------- */ 
	$(function() {
		"use strict";
		$('.progress-bar').each(function() {
			$(this).appear(function(){
			 var datavl = $(this).attr('data-percentage');
			 $(this).animate({ "width" : datavl + "%"}, '1200');
			});
		});
	});
	
	/* --------------------------------------------
	Load More
	-------------------------------------------- */	
	$(function() {
		"use strict";
		var loadtext = $('.load-more');
		$(".load-posts").click(function() {
			if($(this).hasClass('disable')) return false;
			
				$(this).html('<i class="fa fa-spinner"></i> Loading');
				
			   var $hidden = loadtext.filter(':hidden:first').delay(600);  
		
			   if (!$hidden.next('.load-more').length) {
				   $hidden.fadeIn(500);
					$(this).addClass('disable');
					$(this).fadeTo("slow", 0.23).queue(function(n) {
						$(this).html('All Items Loaded <i class="fa fa-check"></i>');
						n();
					}).fadeTo("slow", 1);
				
			   } else {
					$hidden.fadeIn(500);
					$(this).fadeTo("slow", 0.23).queue(function(g) {
						$(this).html('Load More Items <i class="fa fa-angle-right"></i>');
						g();
					}).fadeTo("slow", 1);			
			   }
		});	
	});
	/* --------------------------------------------
	Product-detail page slider
	-------------------------------------------- */	
	var sync1 = $("#big-detail");
	var sync2 = $("#small-detail");
	 
	sync1.owlCarousel({
	singleItem : true,
	slideSpeed : 1000,
	navigation: true,
	pagination:false,
	afterAction : syncPosition,
	responsiveRefreshRate : 200,
	});
	 
	sync2.owlCarousel({
	items : 3,
	pagination:false,
	responsiveRefreshRate : 100,
	afterInit : function(el){
	el.find(".owl-item").eq(0).addClass("synced");
	}
	});
	 
	function syncPosition(el){
	var current = this.currentItem;
	$("#small-detail")
	.find(".owl-item")
	.removeClass("synced")
	.eq(current)
	.addClass("synced")
	if($("#small-detail").data("owlCarousel") !== undefined){
	center(current)
	}
	}
	 
	$("#small-detail").on("click", ".owl-item", function(e){
	e.preventDefault();
	var number = $(this).data("owlItem");
	sync1.trigger("owl.goTo",number);
	});
	 
	function center(number){
	var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
	var num = number;
	var found = false;
	for(var i in sync2visible){
	if(num === sync2visible[i]){
	var found = true;
	}
	}
	 
	if(found===false){
	if(num>sync2visible[sync2visible.length-1]){
	sync2.trigger("owl.goTo", num - sync2visible.length+2)
	}else{
	if(num - 1 === -1){
	num = 0;
	}
	sync2.trigger("owl.goTo", num);
	}
	} else if(num === sync2visible[sync2visible.length-1]){
	sync2.trigger("owl.goTo", sync2visible[1])
	} else if(num === sync2visible[0]){
	sync2.trigger("owl.goTo", num-1)
	}
	}
	
	/* ----------- Google Map ----------- */	
	$(function() {
		"use strict";		
		function initialize() {
			var myLatlng = new google.maps.LatLng(55.7458819, 37.6335739);
			var mapOptions = {
				zoom: 13,  
				disableDefaultUI: true,
				scrollwheel: false,
				draggable: false,
				center: myLatlng
			};
			var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
			var contentString = '<div id="map-content">'+
			'<p>Ваша компания</p>'+
			'<div> ул. Пушкина 23,</div>'+
			'<div> +7 123 456 78 90,</div>'+
			'<div>mail@mail.com </div>'
			'</div>';
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			var marker = new google.maps.Marker({
				position: map.getCenter(),
				icon: {
					path: google.maps.SymbolPath.MARKER,
					scale: 10
				},
				map: map
			});
		
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		}
		$('.map').each(function() {
     		google.maps.event.addDomListener(window, 'load', initialize);
		});
    });
	
	  /* --------------------------------------------
		Top-sales-slider
	-------------------------------------------- */	
	$("#top-sales").owlCarousel({
		items : 4,
		autoPlay: false,
		navigation : true,
		navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],  
		pagination: false,
		itemsDesktop : [1199,4],
		itemsDesktopSmall : [991,3],
		itemsMobile : [480, 1]
	});
	
	/* ----------- Team Section ----------- */
		$("#team-slider").owlCarousel({
			items : 3,
			lazyLoad : true,
			autoPlay: false,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],		
			pagination: false,
			itemsCustom : false,
			itemsDesktop : [1199, 3],
			itemsDesktopSmall : [980, 3],
			itemsTablet : [768, 2],
			itemsTabletSmall : [480, 1],
			itemsMobile : [479, 1]
		});
	
		/* ----------- Project Section ----------- */	
		$("#single-project-carousel").owlCarousel({
			items : 1,
			lazyLoad : true,
			autoPlay:  true,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],		
			pagination: true,
			itemsCustom : false,
			itemsDesktop : [1199, 1],
			itemsDesktopSmall : [980, 1],
			itemsTablet : [768, 1],
			itemsTabletSmall : [480, 1],
			itemsMobile : [479, 1]
		});
	/* -----------  Side Bar Testimonials Section ----------- */
	$("#testimonial").owlCarousel({
		items : 1,
		lazyLoad : false,
		autoPlay: true,
		navigation : true,
		navigationText: false,
		pagination: false,
		itemsCustom : false,
		itemsDesktop : [1199, 1],
		itemsDesktopSmall : [980, 1],
		itemsTablet : [768, 1],
		itemsTabletSmall : [640, 1],
		itemsMobile : [480, 1]
	});
	/* -----------  Side Bar Related-products Section ----------- */
	$("#related-products").owlCarousel({
		items : 1,
		lazyLoad : false,
		autoPlay: true,
		navigation : true,
		navigationText: false,
		pagination: false,
		itemsCustom : false,
		itemsDesktop : [1199, 1],
		itemsDesktopSmall : [980, 1],
		itemsTablet : [768, 1],
		itemsTabletSmall : [640, 1],
		itemsMobile : [480, 1]
	});
	
	/* ----------- Your Work Section ----------- */
		$("#your-work-carousel").owlCarousel({
			items : 3,
			lazyLoad : true,
			autoPlay: false,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],		
			pagination: true,
			itemsCustom : false,
			itemsDesktop : [1199, 3],
			itemsDesktopSmall : [980, 3],
			itemsTablet : [768, 2],
			itemsTabletSmall : [480, 1],
			itemsMobile : [479, 1]
		});
	
	/* ----------- Pricing Section ----------- */
		$("#pricing-slider").owlCarousel({
			items : 4,
			lazyLoad : true,
			autoPlay: true,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],		
			pagination: false,
			itemsCustom : false,
			itemsDesktop : [1199, 3],
			itemsDesktopSmall : [980, 3],
			itemsTablet : [768, 2],
			itemsTabletSmall : [480, 1],
			itemsMobile : [479, 1]
		});
	
	/* ----------- Testimonials Section ----------- */
		$("#testimonials-slider").owlCarousel({
			items : 2,
			lazyLoad : true,
			autoPlay: false,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],		
			pagination: false,
			itemsCustom : false,
			itemsDesktop : [1199, 2],
			itemsDesktopSmall : [980, 2],
			itemsTablet : [768, 1],
			itemsTabletSmall : [480, 1],
			itemsMobile : [479, 1]
		});
	
	/* ----------- Skill Section ----------- */	
		$("#skill-slider").owlCarousel({
			items : 4,
			lazyLoad : true,
			autoPlay: true,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],		
			pagination: false,
			itemsCustom : false,
			itemsDesktop : [1199, 3],
			itemsDesktopSmall : [980, 3],
			itemsTablet : [768, 3],
			itemsTabletSmall : [640, 2],
			itemsMobile : [479, 1]
		});
		
	/* ----------- Review Section ----------- */	
	$("#reviewslider").owlCarousel({
		items :1,
		lazyLoad : false,
		autoPlay: true,
		navigation : true,
		navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],  
		pagination: false,
		itemsCustom : false,
		itemsDesktop : [1199, 1],
		itemsDesktopSmall : [980, 1],
		itemsTablet : [768, 1],
		itemsTabletSmall : [480, 1],
		itemsMobile : [479, 1]
	});
	
	/* ----------- Comment Form ----------- */	
	$(function() {
		"use strict";
		$('#commentform').bootstrapValidator({
				container: 'tooltip',
				feedbackIcons: {
					valid: 'fa fa-check',
					warning: 'fa fa-user',
					invalid: 'fa fa-times',
					validating: 'fa fa-refresh'
				},
				fields: {            
					contact_name: {
						validators: {
							notEmpty: {
								message: 'Поле имя обязательно.'
							}
						}
					},
					contact_email: {
						validators: {
							notEmpty: {
								message: 'Email обязателен.'
							},
							emailAddress: {
								message: 'Поле не корректно.'
							}
						}
					},	
					contact_number: {
						validators: {
							notEmpty: {
								message: 'Поле телефон обязательно.'
							},
							emailAddress: {
								message: 'Поле не корректно.'
							}							
						}
					},	
					contact_message: {
						validators: {
							notEmpty: {
								message: 'Поле сообщение обязательно.'
							}                    
						}
					}
				}
			})	
				
			.on('success.form.bv', function(e) {
						
			var data = $('#contactform').serialize();
			var contact_email=document.getElementById("contact_email").value;
			var contact_number =document.getElementById("contact_number").value;
			var contact_name =document.getElementById("contact_name").value;
			var contact_message =document.getElementById("contact_message").value;
			$.ajax({
					type: "POST",
					url: "contact.php",					
					data: {'contact_email': contact_email , 'contact_number': contact_number,'contact_name':contact_name,'contact_message':contact_message },
					success: function(msg){						
						$('.comment-message').html(msg);
						$('.comment-message').show();
						contact_name="";
						contact_number="";
						contact_name="";
						contact_message="";
						
						
						//submitButton.removeAttr("disabled");
						resetForm($('#commentform'));						
					},
					error: function(msg){						
						$('.comment-message').html(msg);
						$('.comment-message').show();
						submitButton.removeAttr("disabled");
						resetForm($('#commentform'));
					}
			 });
			 
			return false;
		});
		
		function resetForm($form) {
			$form.find('input:text, input:password, input, input:file, select, textarea').val('');
			$form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
			$form.find('.form-control-feedback').css('display', 'none');
		}
	});
	
	
	/* ----------- Video ----------- */	
	$(function() {
		"use strict";
		if ( $( ".player" ).length ) {
		$(".player").mb_YTPlayer();	
		}
	});
	
});


/* ============================= Carousel Slider ============================= */	
/* ----------- Partners Section ----------- */
function PartnersSlider_Init() {
	var width = $(window).width();
	if( width > 480 ) {  
		$("#partners-slider").owlCarousel({
			items : 5,
			lazyLoad : true,
			autoPlay: false,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],  
			pagination: false,
			itemsCustom : false,
			itemsDesktop : [1199, 5],
			itemsDesktopSmall : [980, 5],
			itemsTablet : [768, 3],
			itemsTabletSmall : [640, 2],
			itemsMobile : [480, 1]
		});
	}
}

/* -------------------------------
Carousel Slider : New Additions Slider
------------------------------------ */	
jQuery( document ).ready(function($) {
	var width = $(window).width();
	if( width > 480 ) {  							  
		$("#new-additions-carousel").owlCarousel({
			items : 6,
			lazyLoad : true,
			autoPlay: false,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left color-grey"></i>','<i class="fa fa-angle-right color-grey"></i>'],		
			pagination: true,
			itemsCustom : false,
			itemsDesktop : [1199, 6],
			itemsDesktopSmall : [980, 4],
			itemsDesktopSmall : [800, 3],
			itemsTablet : [768, 2],
			itemsTabletSmall : [480, 1],
			itemsMobile : [479, 1]
		});
	}
});
/* -------------------------------
Carousel Slider : Brands
------------------------------------ */	
jQuery( document ).ready(function($) {
	var width = $(window).width();
	if( width > 480 ) {  							  
		$("#brands-slider").owlCarousel({
			items : 5,
			lazyLoad : true,
			autoPlay: false,
			navigation : true,
			navigationText: ['<i class="fa fa-angle-left color-grey"></i>','<i class="fa fa-angle-right color-grey"></i>'],		
			pagination: true,
			itemsCustom : false,
			itemsDesktop : [1199, 6],
			itemsDesktopSmall : [980, 4],
			itemsDesktopSmall : [800, 3],
			itemsTablet : [768, 2],
			itemsTabletSmall : [480, 1],
			itemsMobile : [479, 1]
		});
	}
});

/* ----------- Reviews Section ----------- */
function ReviewSlider_Init() {
	
}
/*swipe slider*/
if ( $( ".swiper-container" ).length ) {
 var mySwiper = new Swiper('.swiper-container',{
      progress:true,
	  autoplay:3000,
      onProgressChange: function(swiper){
        for (var i = 0; i < swiper.slides.length; i++){
          var slide = swiper.slides[i];
          var progress = slide.progress;
          var rotate = -180*progress;
          if (rotate<-180) rotate=-180;
          if (rotate>180) rotate=180;
          var translate = progress*swiper.width;  
          swiper.setTransform(slide,'translate3d('+translate+'px,0,'+-Math.abs(progress)*500+'px)');
          swiper.setTransform(slide.querySelector('.flip-container'),'rotateY('+rotate+'deg)');
        }
      },
      onTouchStart:function(swiper){
        for (var i = 0; i < swiper.slides.length; i++){
          swiper.setTransition(swiper.slides[i], 0);
          swiper.setTransition(swiper.slides[i].querySelector('.flip-container'),0);
        }
      },
      onSetWrapperTransition: function(swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++){
          swiper.setTransition(swiper.slides[i], speed);
          swiper.setTransition(swiper.slides[i].querySelector('.flip-container'), speed);
        }
      }
    });
 }

/*----------- Range Slider ---------------*/
$('.range').nstSlider({
    "left_grip_selector": ".leftGrip",
    "right_grip_selector": ".rightGrip",
    "value_bar_selector": ".bar",
    "value_changed_callback": function(cause, leftValue, rightValue) {
        var $container = $(this).parent();
        $container.find('.leftLabel').text(leftValue);
        $container.find('.rightLabel').text(rightValue);
    },
    "highlight": {
        "grip_class": "gripHighlighted",
        "panel_selector": ".highlightPanel"
    }
});
$('#highlightRangeButton').click(function() {
    var highlightMin = Math.random() * 20,
        highlightMax = highlightMin + Math.random() * 80;
    $('.nstSlider').nstSlider('highlight_range', highlightMin, highlightMax);
});


// Portfolio Filter Js 
function initPortfolioGrid(){
  $('.project-grid').each(function(){  
	   var $port_container = $('.project-grid');  
	   $containerProxy = $port_container.clone().empty().css({ visibility: 'hidden' });
	   $port_container.after( $containerProxy ); 
	   var $item = $port_container.find('.project-items').eq(0);
	   
	   $port_container.imagesLoaded(function(){
			if( $port_container.hasClass('grid-column-2') ) {
				var columns = 2;
				var masonryGutter = 15;
			} else if( $port_container.hasClass('grid-column-3') ) {
				var columns = 3;
				var masonryGutter = 20;
			} else if( $port_container.hasClass('grid-column-4') ) {
				var columns = 4;
				var masonryGutter = 23;
			}
			
			var gutterSize = 30;
		
			// calculate columnWidth
			var colWidth = Math.floor( $containerProxy.width() / columns );  
			var masonryWidth = Math.floor( colWidth - masonryGutter );
			
			$port_container.find('.project-items').css('width', masonryWidth);
			$port_container.find('.project-items').css('margin-bottom', gutterSize);
			
			var filter_selector = $port_container.parent().find('.project-filters a.active').data('filter');  
			
			$port_container.isotope({
				resizable: false,
				filter: filter_selector,
				masonry: {
					columnWidth: masonryWidth,
					gutter: gutterSize
				}
			});
	   });
  
   // Portfolio Filter Items
   $('.project-filters a').click(function(){
    
		$(this).parent().parent().find('a.active').removeClass('active');    
		$(this).addClass('active');
		var selector = $(this).parent().parent().find('a.active').attr('data-filter');  
		$(this).parents().find('.project-grid').isotope({ filter: selector, animationEngine : "css" });
    
    	return false; 
   });
  });
 }