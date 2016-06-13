var Mondrian = {
	
	_self: "",
	zBuffer: "",
	children: "",
	direction: "",
	
	placeFirst: function(value){
		width = jQuery(value).width();
		height = jQuery(value).height();
		jQuery(value)
			.css("position", "absolute")
			.css("left", parseInt(((screen.availWidth - 10) / 2) - (width / 2)))
			.css("top", parseInt((screen.availHeight / 2) - (height)));
		jQuery(value)
			.addClass("mondrian");
		position = jQuery(value)
			.position();
		this.children++;
		console.log("placed first");
	},
	
	space_pos: function(){
		jQuery(this.obj)
			.children()
			.each(
				function(index,value){
					if(jQuery(value).hasClass("mondrian")){
						width = jQuery(value)
							.width();
						height = jQuery(value)
							.height();
						position = jQuery(value)
							.position();	
						_self.zBuffer.push(Array(position.left, position.left + width, position.top, position.top + height));
					}
				}
			);
	},
	
	collision: function(obj1, obj2){
		var x1 = obj1.offset().left;
		var y1 = obj1.offset().top;
		var h1 = obj1.outerHeight(true);
		var w1 = obj1.outerWidth(true);
		var b1 = y1 + h1;
		var r1 = x1 + w1;
		var x2 = obj2.offset().left;
		var y2 = obj2.offset().top;
		var h2 = obj2.outerHeight(true);
		var w2 = obj2.outerWidth(true);
		var b2 = y2 + h2;
		var r2 = x2 + w2;
        
		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2){
			return false;
		}

		return true;
	},
	
	placeTop: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-top")){
			return false;
		}
	
		position = jQuery(testObj)
			.offset();
		xpos = position.left;
		ypos = position.top - jQuery(newObj).height() - 1;
		
		if(xpos > 0 && ypos > 0){
			if((xpos + jQuery(newObj).width()) < (screen.availWidth - 10)){
				clash = true;
				jQuery(newObj)
					.css("position", "absolute")
					.css("left", xpos) 
					.css("top", ypos);			
				jQuery(".mondrian")
					.each(
						function(index,value){
							if(_self.collision(jQuery(newObj), jQuery(value))){
								clash = false;
							}
						}
					);
				return clash;	
			}
		}
		return false;
	},
	
	placeTopRight: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-bottom-left")){
			return false;
		}
	
		position = jQuery(testObj)
			.offset();
		xpos = position.left + jQuery(testObj).width() + 1;
		ypos = position.top - jQuery(newObj).height() - 1;
		
		if(xpos > 0 && ypos > 0){
			if((xpos + jQuery(newObj).width()) < (screen.availWidth - 10)){
				clash = true;
				jQuery(newObj)
					.css("position", "absolute")
					.css("left", xpos) 
					.css("top", ypos);			
				jQuery(".mondrian")
					.each(
						function(index,value){
							if(_self.collision(jQuery(newObj), jQuery(value))){
								clash = false;
							}
						}
					);
				return clash;	
			}
		}
		return false;
	},
	
	placeRight: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-left")){
			return false;
		}
	
		position = jQuery(testObj)
			.offset();
		xpos = position.left + jQuery(testObj).width() + 1;
		ypos = position.top;
		
		if(xpos > 0 && ypos > 0){
			if((xpos + jQuery(newObj).width()) < (screen.availWidth - 10)){
				clash = true;
				jQuery(newObj)
					.css("position", "absolute")
					.css("left", xpos) 
					.css("top", ypos);			
				jQuery(".mondrian")
					.each(
						function(index,value){
							if(_self.collision(jQuery(newObj), jQuery(value))){
								clash = false;
							}
						}
					);
				return clash;
			}
		}
		return false;
	},
	
	placeRightBottom: function(testObj, newObj){
		
		if(jQuery(testObj).hasClass("mondrian-neighbour-top-left")){
			return false;
		}
	
		position = jQuery(testObj)
			.offset();
		xpos = position.left + jQuery(testObj).width() + 1;
		ypos = position.top + jQuery(testObj).height() + 1;
		
		if(xpos > 0 && ypos > 0){
			if((xpos + jQuery(newObj).width()) < (screen.availWidth - 10)){
				clash = true;
				jQuery(newObj)
					.css("position", "absolute")
					.css("left", xpos) 
					.css("top", ypos);			
				jQuery(".mondrian")
					.each(
						function(index,value){
							if(_self.collision(jQuery(newObj), jQuery(value))){
								clash = false;
							}
						}
					);
				return clash;			
			}
		}
		return false;
	},
	
	placeBottom: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-top")){
			return false;
		}
			
		position = jQuery(testObj)
			.offset();
		xpos = position.left;
		ypos = position.top + jQuery(testObj).height() + 1;
		
		if(xpos > 0 && ypos > 0){
			if((xpos + jQuery(newObj).width()) < (screen.availWidth - 10)){
				clash = true;
				jQuery(newObj)
					.css("position", "absolute")
					.css("left", xpos) 
					.css("top", ypos);			
				jQuery(".mondrian")
					.each(
						function(index,value){
							if(_self.collision(jQuery(newObj), jQuery(value))){
								clash = false;
							}
						}
					);
				return clash;	
			}
		}
		return false;
	},
	
	placeBottomLeft: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-top-right")){
			return false;
		}
	
		position = jQuery(testObj)
			.offset();
		xpos = position.left - jQuery(newObj).width() - 1;
		ypos = position.top + jQuery(testObj).height() + 1;
		
		if(xpos > 0 && ypos > 0){
			if((xpos + jQuery(newObj).width()) < (screen.availWidth - 10)){
				clash = true;
				jQuery(newObj)
					.css("position", "absolute")
					.css("left", xpos) 
					.css("top", ypos);			
				jQuery(".mondrian")
					.each(
						function(index,value){
							if(_self.collision(jQuery(newObj), jQuery(value))){
								clash = false;
							}
						}
					);
				return clash;			
			}
		}
		return false;
	},
	
	placeLeft: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-right")){
			return false;
		}
			
		position = jQuery(testObj)
			.offset();
		xpos = position.left - jQuery(newObj).width() - 1;
		ypos = position.top;
		
		if(xpos > 0 && ypos > 0){
			if((xpos + jQuery(newObj).width()) < (screen.availWidth - 10)){
				clash = true;
				jQuery(newObj)
					.css("position", "absolute")
					.css("left", xpos) 
					.css("top", ypos);			
				jQuery(".mondrian")
					.each(
						function(index,value){
							if(_self.collision(jQuery(newObj), jQuery(value))){
								clash = false;
							}
						}
					);
				return clash;
			}
		}
		return false;
	},
	
	placeTopLeft: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-bottom-right")){
			return false;
		}
	
		position = jQuery(testObj)
			.offset();
		xpos = position.left - jQuery(newObj).width() - 1;
		ypos = position.top - jQuery(newObj).height() - 1;
		
		if(xpos > 0 && ypos > 0){
			if((xpos + jQuery(newObj).width()) < (screen.availWidth - 10)){
				clash = true;
				jQuery(newObj)
					.css("position", "absolute")
					.css("left", xpos) 
					.css("top", ypos);			
				jQuery(".mondrian")
					.each(
						function(index,value){
							if(_self.collision(jQuery(newObj), jQuery(value))){
								clash = false;
							}
						}
					);
				return clash;
			}			
		}
		return false;
	},
	
	paint: function(prev,value){
		if(_self.placeTop(prev, value)){
			jQuery(value).addClass("mondrian mondrian-bottom");
			jQuery(prev).addClass("mondrian-neighbour-top");
			return true;
		}else if(_self.placeTopRight(prev, value)){
			jQuery(value).addClass("mondrian mondrian-top-right");
			jQuery(prev).addClass("mondrian-neighbour-bottom-left");
			return true;
		}else if(_self.placeRight(prev, value)){
			jQuery(value).addClass("mondrian mondrian-right-top");
			jQuery(prev).addClass("mondrian-neighbour-left");
			return true;
		}else if(_self.placeRightBottom(prev, value)){
			jQuery(value).addClass("mondrian mondrian-right-bottom");
			jQuery(prev).addClass("mondrian-neighbour-top-left");
			return true;
		}else if(_self.placeBottom(prev, value)){
			jQuery(value).addClass("mondrian mondrian-bottom");
			jQuery(prev).addClass("mondrian-neighbour-top");
			return true;
		}else if(_self.placeBottomLeft(prev, value)){
			jQuery(value).addClass("mondrian mondrian-bottom-left");
			jQuery(value).addClass("mondrian-neighbour-top-right");
			return true;
		}else if(_self.placeLeft(prev, value)){
			jQuery(value).addClass("mondrian mondrian-left");
			jQuery(prev).addClass("mondrian-neighbour-right");
			return true;
		}else if(_self.placeTopLeft(prev, value)){
			jQuery(value).addClass("mondrian mondrian-top-left");
			jQuery(prev).addClass("mondrian-neighbour-bottom-right");
			return true;
		}
		return false;
	},
	
	init: function(obj, data){
	
		data = typeof data == 'object' ? data : new Object;
		console.log(data);
		this.zBuffer = Array();
		this.children = 0;
		this.direction = 1;
		_self = this;
		this.obj = obj;
		this.jQueryObj = jQuery(obj);

		if(data.placefirst=="middle"){
			_self.placeFirst(jQuery(obj)
				.children()
				.first());	
		}else if(data.placefirst!==undefined){
			first = jQuery(obj)
				.children()
				.first();
				
			jQuery(first).css("display", "inline-block");
			jQuery(first).css("width", jQuery(first).width());
			jQuery(first).css("height", jQuery(first).height());
			jQuery(first).css("position", "absolute");
			jQuery(first).css("left", "0px");
			jQuery(first).css("top", "0px");
			jQuery(first).addClass("mondrian");
		}
			
		jQuery(obj)
			.children()
			.each(
				function(index,value){
					if(!jQuery(value).hasClass("mondrian")){
						painted = false;
						jQuery(value).css("display", "inline-block");
						jQuery(value).css("width", jQuery(value).width());
						jQuery(value).css("height", jQuery(value).height());
						if(data.appear!=undefined){
							jQuery(value).css("opacity", "0");
						}
						item = jQuery(value).parent().children().first();
						while(!painted){
							painted = _self.paint(item,value);
							if(!painted){
							}else{
							}
							item = jQuery(item).next();
						}
					}
				}
			);
			
		jQuery(".mondrian")
			.each(
				function(index,value){
					if(data.appear=="fadeIn"){
						jQuery(value)
							.animate({"opacity":"1"}, 500);
					}
					if(data.appear=="show"){
						jQuery(value)
							.css("display","none")
							.css("opacity","1");
						jQuery(value)
							.show(500);
					}
					if(data.appear=="flyup"){
						height = jQuery(value)
									.height();
						position = jQuery(value)
										.position();
						jQuery(value)
								.css("top", (screen.availHeight + 10));
						jQuery(value)
							.css("opacity","1");
						jQuery(value)
							.animate({ top : "-=" + ((screen.availHeight + 10) - position.top) }, 500);
						
					}
					if(data.appear=="flydown"){
						height = jQuery(value)
									.height();
						position = jQuery(value)
										.position();
						jQuery(value)
								.css("top", (0-height));
						jQuery(value)
							.css("opacity","1");
						jQuery(value)
							.animate({ top : "+=" + (height + position.top) }, 500);
						
					}
					if(data.appear=="flyleft"){
						width = jQuery(value)
									.width();
						position = jQuery(value)
										.position();
						jQuery(value)
								.css("left", (0-width));
						jQuery(value)
							.css("opacity","1");
						jQuery(value)
							.animate({ left : "+=" + (width + position.left) }, 500);
						
					}
					if(data.appear=="flyright"){
						width = jQuery(value)
									.width();
						position = jQuery(value)
										.position();
						jQuery(value)
								.css("left", (screen.availWidth + 10));
						jQuery(value)
							.css("opacity","1");
						jQuery(value)
							.animate({ left : "-=" + ((screen.availWidth + 10) - position.left) }, 500);
						
					}
					if(data.appear=="spin"){
						jQuery(value)
							.css("opacity","1");
						jQuery(value).animate({  borderSpacing: -360 }, {
							step: function(now,fx) {
								$(this).css('-webkit-transform','rotate('+now+'deg)'); 
								$(this).css('-moz-transform','rotate('+now+'deg)');
								$(this).css('transform','rotate('+now+'deg)');
							},
							duration: 2000
						},'linear');
					}
					if(data.appear=="tetris"){
						width = jQuery(value)
									.width();
						position = jQuery(value)
										.position();
						jQuery(value)
								.css("top", (0-width));
						jQuery(value)
							.css("opacity","1");
						jQuery(this).css('-webkit-transform','rotate(-90deg)'); 
						jQuery(this).css('-moz-transform','rotate(-90deg)');
						jQuery(this).css('transform','rotate(-90deg)');
						jQuery(value)
							.animate({ top : "+=" + (width + position.top) }
								,750
								,function(){
									jQuery(value).animate({  borderSpacing: +90}, {
										step: function(now,fx) {
											deg = -90 + now;
											jQuery(this).css('-webkit-transform','rotate('+deg+'deg)'); 
											jQuery(this).css('-moz-transform','rotate('+deg+'deg)');
											jQuery(this).css('transform','rotate('+deg+'deg)');
										},
										duration: 750
									},'linear');
								}
							);
					}						
				}
			);
	}
	
}

var mondrian;

jQuery(window).load( 
	function(){
		mondrian = Object.create(Mondrian);
		mondrian.init(".mondrian2", {placefirst: "middle", appear: "tetris"});
	}
);