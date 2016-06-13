var Mondrian = {
	
	_self: "",
	maxHeight: -1,
	
	placeFirstMiddle: function(value){
		width = jQuery(value).width();
		height = jQuery(value).height();
		jQuery(value)
			.css("position", "absolute")
			.css("left", (this.jQueryObj.width()/2) - (width/2))
			.css("top", (this.jQueryObj.height()/4));
		jQuery(value)
			.addClass("mondrian");	
	},
	
	placeFirstTopLeft: function(value){
		jQuery(value)
			.css("position", "absolute")
			.css("left", "0px")
			.css("top", "0px");
		jQuery(value)
			.addClass("mondrian");
	},
	
	placeFirstTopRight: function(value){
		jQuery(value)
			.css("position", "absolute")
			.css("right", "0px")
			.css("top", "0px");
		jQuery(value)
			.addClass("mondrian");
	},
	
	placeFirstMiddleLeft: function(value){
		width = jQuery(value).width();
		height = jQuery(value).height();
		jQuery(value)
			.css("position", "absolute")
			.css("left", "0px")
			.css("top", (this.jQueryObj.height()/4));
		jQuery(value)
			.addClass("mondrian");
	},
	
	placeFirstMiddleRight: function(value){
		width = jQuery(value).width();
		height = jQuery(value).height();
		jQuery(value)
			.css("position", "absolute")
			.css("right", "0px")
			.css("top", (this.jQueryObj.height()/4));
		jQuery(value)
			.addClass("mondrian");
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
	
	getCoOrds: function(testObj, newObj){
		this.position = jQuery(testObj)
			.position();
		
		this.offset = jQuery(testObj)
			.offset();	
	},
	
	bottomCheck: function(){
		//if(this.offset_ypos > (this.jQueryObj.offset().top + this.jQueryObj.height()) ){
			return true;
		//}
		//return false;
	},
	
	topCheck: function(){
		if(this.ypos < 0){
			return false;
		}
		if(this.offset_ypos > this.jQueryObj.offset().top){
			return true;
		}
		return false;
	},
	
	rightCheck: function(newObj){
		if((this.offset_xpos + jQuery(newObj).width()) < ((this.jQueryObj.offset().left + this.jQueryObj.width()) - 10)){
			return true;
		}
		return false;
	},
	
	leftCheck: function(newObj){
		if(this.xpos < 0){
			return false;
		}
		if(this.offset_xpos > this.jQueryObj.offset().left){
			return true;
		}
		return false;
	},
	
	placeAndCheck: function(newObj, testObj){
	
		clash = true;
		
		jQuery(newObj)
			.css("position", "absolute")
			.css("left", this.xpos) 
			.css("top", this.ypos);		
		
		jQuery(".mondrian")
			.each(
				function(index,value){
					if(_self.collision(jQuery(newObj), jQuery(value))){
						clash = false;
					}
				}
			);
		return clash;
	},
	
	placeTop: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-top")){
			return false;
		}
		
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left;
		this.offset_ypos = this.offset.top - jQuery(newObj).height() - 1;	

		this.xpos = this.position.left;
		this.ypos = this.position.top - jQuery(newObj).height() - 1 ;
		
		if(this.topCheck()){
			if(this.rightCheck(newObj)){
				return this.placeAndCheck(newObj, testObj);
			}
		}
		return false;
	},
	
	placeTopRight: function(testObj, newObj){
	
		if(jQuery(testObj).hasClass("mondrian-neighbour-topRight")){
			return false;
		}
		
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left;
		this.offset_ypos = this.offset.top - jQuery(newObj).height() - 1;	

		this.xpos = this.position.left + jQuery(testObj).width() + 1;
		this.ypos = this.position.top - jQuery(newObj).height() - 1;
		
		if(this.topCheck()){
			if(this.rightCheck(newObj)){
				return this.placeAndCheck(newObj, testObj);
			}
		}
		return false;
	},
	
	placeRight: function(testObj, newObj){
		
		if(jQuery(testObj).hasClass("mondrian-neighbour-left")){
			return false;
		}
		
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left + jQuery(testObj).width() + 1;
		this.offset_ypos = this.offset.top;	

		this.xpos = this.position.left + jQuery(testObj).width() + 1;
		this.ypos = this.position.top;
		
		if(this.rightCheck(newObj)){
			return this.placeAndCheck(newObj, testObj);
		}
		
		return false;
	},
	
	placeBottomRight: function(testObj, newObj){
		
		if(jQuery(testObj).hasClass("mondrian-neighbour-top-left")){
			return false;
		}
		
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left + jQuery(testObj).width() + 1;
		this.offset_ypos = this.offset.top;	

		this.xpos = this.position.left + jQuery(testObj).width() + 1;
		this.ypos = this.position.top + jQuery(testObj).height() + 1;
		
		if(this.bottomCheck(newObj)){
			if(this.rightCheck(newObj)){
				return this.placeAndCheck(newObj, testObj);
			}
		}
		
		return false;
	},
	
	placeBottomRightLeft: function(testObj, newObj){
		
		if(jQuery(testObj).hasClass("mondrian-neighbour-top-right-left")){
			return false;
		}
		
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left + jQuery(testObj).width() + 1;
		this.offset_ypos = this.offset.top;	

		this.xpos = this.position.left + jQuery(testObj).width() - jQuery(newObj).width() - 1;
		this.ypos = this.position.top + jQuery(testObj).height() + 1;
		
		if(this.bottomCheck(newObj)){
			if(this.rightCheck(newObj)){
				return this.placeAndCheck(newObj, testObj);
			}
		}
		
		return false;
	},
	
	placeBottom: function(testObj, newObj){
		
		if(jQuery(testObj).hasClass("mondrian-neighbour-bottom")){
			return false;
		}
		
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left;
		this.offset_ypos = this.offset.top + jQuery(testObj).height() + 1;	

		this.xpos = this.position.left;
		this.ypos = this.position.top + jQuery(testObj).height() + 1;
		
		if(this.rightCheck(newObj)){
			return this.placeAndCheck(newObj, testObj);
		}
	
		return false;
		
	},
	
	placeBottomLeft: function(testObj, newObj){
		
		if(jQuery(testObj).hasClass("mondrian-neighbour-top-right")){
			return false;
		}
			
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left - jQuery(newObj).width() - 1;
		this.offset_ypos = this.offset.top;	

		this.xpos = this.position.left - jQuery(newObj).width() - 1;
		this.ypos = this.position.top + jQuery(testObj).height() + 1;
		
		if(this.leftCheck(newObj)){
			if(this.bottomCheck(newObj)){
				return this.placeAndCheck(newObj, testObj);
			}
		}
		
	},
	
	placeLeft: function(testObj, newObj){
		
		if(jQuery(testObj).hasClass("mondrian-neighbour-right")){
			return false;
		}
			
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left - jQuery(newObj).width() - 1;
		this.offset_ypos = this.offset.top;	

		this.xpos = this.position.left - jQuery(newObj).width() - 1;
		this.ypos = this.position.top;
		
		if(this.leftCheck(newObj)){
			if(this.topCheck(newObj)){
				return this.placeAndCheck(newObj, testObj);
			}
		}
		
	},
	
	
	placeTopLeft: function(testObj, newObj){
		
		if(jQuery(testObj).hasClass("mondrian-neighbour-bottom-right")){
			return false;
		}
			
		this.getCoOrds(testObj, newObj);
		
		this.offset_xpos = this.offset.left - jQuery(newObj).width() - 1;
		this.offset_ypos = this.offset.top;	

		this.xpos = this.position.left - jQuery(newObj).width() - 1;
		this.ypos = this.position.top - jQuery(newObj).height() - 1;
		
		if(this.topCheck(newObj)){
			if(this.leftCheck(newObj)){
				return this.placeAndCheck(newObj, testObj);
			}
		}
		
	},
	
	paint: function(prev,value){
	
		if(_self.placeTop(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  top -- " + jQuery(prev).html());
			jQuery(value).addClass("mondrian mondrian-bottom");
			jQuery(prev).addClass("mondrian-neighbour-top");
			return true;
		}else if(_self.placeTopRight(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  top right -- " + jQuery(prev).html());
			jQuery(value).addClass("mondrian mondrian-right-top");
			jQuery(prev).addClass("mondrian-neighbour-top-right");
			return true;
		}else if(_self.placeRight(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  right");
			jQuery(value).addClass("mondrian mondrian-right");
			jQuery(prev).addClass("mondrian-neighbour-left");
			return true;
		}else if(_self.placeBottomRight(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  bottom right");
			jQuery(value).addClass("mondrian mondrian-bottom-right");
			jQuery(prev).addClass("mondrian-neighbour-top-left");
			return true;
		}else if(_self.placeBottomRightLeft(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  bottom right left");
			jQuery(value).addClass("mondrian mondrian-bottom-right-left");
			jQuery(prev).addClass("mondrian-neighbour-top-right-left");
			return true;
		}else if(_self.placeBottom(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  bottom");
			jQuery(value).addClass("mondrian mondrian-bottom");
			jQuery(prev).addClass("mondrian-neighbour-top");
			return true;
		}else if(_self.placeBottomLeft(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  bottom left");
			jQuery(value).addClass("mondrian mondrian-bottom-left");
			jQuery(prev).addClass("mondrian-neighbour-top-right");
			return true;
		}else if(_self.placeLeft(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  left");
			jQuery(value).addClass("mondrian mondrian-left");
			jQuery(prev).addClass("mondrian-neighbour-right");
			return true;
		}else if(_self.placeTopLeft(prev, value)){
			jQuery(value).html(jQuery(value).html() + " --  top left");
			jQuery(value).addClass("mondrian mondrian-top-left");
			jQuery(prev).addClass("mondrian-neighbour-bottom-right");
			return true;
		}
		return false;
	},

	remove: function(obj){
	
		parent = jQuery(obj).parent();
		item = jQuery(obj).next();
		item_prev = jQuery(obj).prev();
		
		jQuery(obj)
			.parent()
			.children()
			.each(
				function(index,value){
					html = jQuery(value).html();
					parts = html.split("--");
					jQuery(value).html(parts[0]);
				}
			);
		
		obj.remove();
		
		while(item.length==1){
		
			this.removeClasses(item);
			item.removeClass("mondrian");
			item = jQuery(item).next();
			
		}

		jQuery(parent)
			.children()
			.each(
				function(index,value){
					if(!jQuery(value).hasClass("mondrian")){
						painted = false;
						jQuery(value).css("display", "inline-block");
						jQuery(value).css("width", jQuery(value).width());
						jQuery(value).css("height", jQuery(value).height());
						item = jQuery(value).parent().children().first();
						while(!painted){
							painted = _self.paint(item,value);
							if(jQuery(item).position().top + jQuery(item).height() > _self.maxHeight){
								_self.maxHeight = jQuery(item).position().top + jQuery(item).height();
							}
							item = jQuery(item).next();
						}
					}
				}
			);
	
	},
	
	add: function(holder, obj){
	
		parent = jQuery(holder);
		
		jQuery(obj).css("display", "inline-block");
		jQuery(obj).css("width", jQuery(obj).width());
		jQuery(obj).css("height", jQuery(obj).height());
		
		jQuery(holder)
			.append(obj);
		
		painted = false;
		
		jQuery(parent)
			.children()
			.each(
				function(index,value){
					if(jQuery(obj).position().top + jQuery(obj).height() > _self.maxHeight){
						_self.maxHeight = jQuery(obj).position().top + jQuery(obj).height();
					}
				}
			);
	
	},
	
	removeClasses: function(item){
		item.removeClass("mondrian-bottom mondrian-neighbour-top mondrian-right-top mondrian-neighbour-top-right mondrian-right mondrian-neighbour-left mondrian-bottom-right mondrian-neighbour-top-left mondrian-bottom mondrian-neighbour-top mondrian-bottom-left mondrian-neighbour-top-right mondrian-left mondrian-neighbour-right mondrian-top-left mondrian-neighbour-bottom-right");
	},
	
	layout: function(obj){
	
		jQuery(obj)
			.children()
			.each(
				function(index,value){
					if(!jQuery(value).hasClass("mondrian")){
						painted = false;
						jQuery(value).css("display", "inline-block");
						jQuery(value).css("width", jQuery(value).width());
						jQuery(value).css("height", jQuery(value).height());
						if(_self.data['appear']!=undefined){
							jQuery(value).css("opacity", "0");
						}
						item = jQuery(value).parent().children().first();
						while(!painted){
							painted = _self.paint(item,value);
							if(jQuery(item).position().top + jQuery(item).height() > _self.maxHeight){
								_self.maxHeight = jQuery(item).position().top + jQuery(item).height();
							}
							item = jQuery(item).next();
						}
					}
				}
			);
			
	},
	
	init: function(obj, data){
	
		this.data = typeof data == 'object' ? data : new Object;
		_self = this;
		this.obj = obj;
		this.jQueryObj = jQuery(obj);

		if(this.data.placefirst!==undefined){
			switch(this.data.placefirst.toLowerCase()){
				case "middle" : _self.placeFirstMiddle(jQuery(obj).children().first()); break;
				case "topleft" : _self.placeFirstTopLeft(jQuery(obj).children().first()); break;
				case "topright" : _self.placeFirstTopRight(jQuery(obj).children().first()); break;
				case "middleleft" : _self.placeFirstMiddleLeft(jQuery(obj).children().first()); break;
				case "middleright" : _self.placeFirstMiddleRight(jQuery(obj).children().first()); break;
				case "bottomleft" : _self.placeFirstBottomLeft(jQuery(obj).children().first()); break;
				case "bottomright" : _self.placeFirstBottomRight(jQuery(obj).children().first()); break;
			}
		}else{
			first = jQuery(obj)
				.children()
				.first();
				
			jQuery(first).css("display", "inline-block");
			jQuery(first).css("width", jQuery(first).width());
			jQuery(first).css("height", jQuery(first).height());
			jQuery(first).css("position", "relative");
			jQuery(first).css("left", "0px");
			jQuery(first).css("top", "0px");
			jQuery(first).addClass("mondrian");
		}
		
		if(this.data.appear!=undefined){
			jQuery(obj)
				.children()
				.first()
				.css("opacity", "0");
		}
		
		this.layout(obj);
			
		jQuery(obj)
			.css("height", this.maxHeight);
			
		jQuery(".mondrian")
			.each(
				function(index,value){
					if(_self.data.appear=="fadeIn"){
						jQuery(value)
							.animate({"opacity":"1"}, 1000);
					}
					if(_self.data.appear=="show"){
						jQuery(value)
							.css("display","none")
							.css("opacity","1");
						jQuery(value)
							.show(500);
					}
					if(_self.data.appear=="flyup"){
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
					if(_self.data.appear=="flydown"){
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
					if(_self.data.appear=="flyleft"){
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
					if(_self.data.appear=="flyright"){
						width = jQuery(value)
									.width();
						position = jQuery(value)
										.position();
						jQuery(value)
								.css("left", (this.jQueryObj.position().left - this.jQueryObj.width()  + 10));
						jQuery(value)
							.css("opacity","1");
						jQuery(value)
							.animate({ left : "-=" + ((this.jQueryObj.position().left - this.jQueryObj.width()  + 10) - position.left) }, 500);
						
					}
					if(_self.data.appear=="spin"){
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
					if(_self.data.appear=="tetris"){
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