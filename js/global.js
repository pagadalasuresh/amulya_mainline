//document ready started here
jQuery(document).ready(function(){
jQuery.getJSON('json/global.json', function(data){
var index;
countryListDisplay(data);
menuListDisplay(data);
tabContainer(data);
});
leftNavigationList();
rightAccordion();
toolTip();
userLogin();
descriptionContainer();
});
//location change starts
function countryListDisplay(data){
	jQuery.each(data.countries,  function(i,items){
		var content="<option>"+items.country_list+"</option>";
		jQuery('.country_list select').append(content);
	});
	jQuery('.worldwide a').click(function(){
			jQuery('.country_list').toggle();
			var list= jQuery(".country_list select option:selected").text();
			jQuery('.text_change').html(list);
		});
}
//menus dropdowns starts
function menuListDisplay(data){
		jQuery.each(data.menus, function(i, items){
				var menu="<li><a href="+items.url+">" +items.menuName+"</a><ul>";
			jQuery.each(items.submenu, function(i, itm){	
			menu+="<li><a href="+items.url+">" +itm.sub_menu+ "</a></li>";
			});		
				menu+="</ul></li>";
				jQuery('#dropdown_menus > ul').append(menu);

		});
		jQuery('.navigation li').live({'mouseover':function(){
		jQuery(this).addClass('menu_active').find("ul").show();
		},'mouseout':function(){
		jQuery(this).removeClass('menu_active').find("ul").hide();}
		});
}
//left navigation menus starts
function leftNavigationList(){
		jQuery('#left-navigation ul li').each(function(){
		jQuery(this).click(function(){
		jQuery(this).children('ul').slideToggle();
		if(jQuery(this).find('span').attr('class')=='spriteImg exp_button')
		{
		jQuery('span', this).removeClass('exp_button');
		jQuery('span', this).addClass('spriteImg collapse_button');}
		else{
		jQuery('span', this).addClass('spriteImg exp_button');
		jQuery('span', this).removeClass('collapse_button');}
		});	
});
}
//tabs container starts
function tabContainer(data){
	jQuery.each(data.tabs, function(i, items){
		index = i;
		var content="<li><a href='#' rel="+index+">" +items.tabname+ "</a></li>";
		var divTxt="<div class='tabs_cont' id=tab"+index+">"+items.txt+"</div>";
		var divImg="<div class='tabs_img' id=Img"+index+">";
		divImg+="<img src="+items.img+" /></div>";
		jQuery('.menu').append(content);
		jQuery('.tabs_content_container').append(divImg);
		jQuery('.tabs_content_container').append(divTxt);
	});
	jQuery("div.tabs_cont:first, div.tabs_img:first").show();
	jQuery(".menu li:first").addClass("active");
	jQuery(".menu").delegate('li','click',function(){
		var rel=jQuery(this).find('a').attr('rel');
		jQuery("ul.menu li").removeClass('active');
		jQuery(this).addClass('active');
		jQuery('.tabs_cont,.tabs_img').hide();
		jQuery("#tab"+rel).show();
		jQuery("#Img"+rel).show();
	});
}
//accordion right container starts
function rightAccordion(){
jQuery('h3.accordion').click(function(){
var cc=jQuery(this).next('.accordionContent').css("display");
	if(cc=="none"){
		jQuery(".accordionContent").slideUp();
		jQuery(this).next(".accordionContent").slideDown();
		jQuery(".accordion").find('span').attr("class","up_arrow spriteImg");
		jQuery(this).find('span').attr("class","down_arrow spriteImg");
		}
		});	
}
//tooltip starts
function toolTip(){
	jQuery('.device_list a').hover(function(){
	var selected=jQuery(this).attr('href');
	jQuery(selected).slideToggle();
	});
}
//login starts
function userLogin(){
	jQuery('#login').click(function(){
	jQuery('.login_form').slideDown();
	});
	jQuery('#validate').click(function(){
	jQuery('.login_form').slideUp();
	});
}
//pop-up effect for description starts
function descriptionContainer(){
	 jQuery(".description_info a").click(function(){
		jQuery(".route_des, #lightbox").fadeToggle(function(){
		jQuery("#lightbox").css("filter","alpha(opacity=60)");
		});
		var boh = jQuery(document).height()/3;
		jQuery('.route_des').css('top', boh+'px').css('left', '44%');
		jQuery("#lightbox").css("position","fixed");
	});
	jQuery('.close').click(function(){
		jQuery('.route_des, #lightbox').fadeOut();
		jQuery(".description_info a").focus();
		});
}