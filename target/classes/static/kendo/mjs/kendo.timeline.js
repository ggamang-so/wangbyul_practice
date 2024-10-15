/**
 * Kendo UI v2024.1.130 (http://www.telerik.com/kendo-ui)
 * Copyright 2024 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.fx.js";import"./kendo.data.js";import"./kendo.draganddrop.js";import"./kendo.icons.js";var __meta__={id:"timeline",name:"Timeline",category:"web",description:"The Kendo Timeline widget display events over time",depends:["userevents","icons"]};!function(e,t){var a=window.kendo,i=a.ui.Widget,n=a.data.DataSource,r=a.effects.Transition,s=a.keys,l=Array.isArray,d=a.htmlEncode,o="vertical",c="transitionEnd",u="k-timeline-flag-wrap",p="k-timeline-track-item",m="k-timeline-scrollable-wrap",v=".k-timeline-track-item:not(.k-timeline-flag-wrap)",f=".kendoTimeline",h="change",k=e=>{let t=e.titleField,a=e.subtitleField,i=e.descriptionField,n=e.imagesField,r=e.actionsField,s=e.altField,l=e.data;return'<div class="k-card-inner"><div class="k-card-header">'+(l[t]?`<div class="k-card-title">${d(l[t])}</div>`:"")+(l[a]?`<div class="k-card-subtitle">${d(l[a])}</div>`:"")+'</div><div class="k-card-body"><div class="k-card-description">'+(l[i]?`<p>${d(l[i])}</p>`:"")+(l[n]&&l[n].length>0?`<img src="${d(l[n][0].src)}" ${l[s]?`alt="${d(l[s])}"`:""} class="k-card-media" />`:"")+"</div></div>"+(l[r]&&l[r].length>0?'<div class="k-actions k-card-actions">'+l[r].map((e=>`<a class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary" href="${e.url?d(e.url):"#"}"><span class="k-button-text">${d(e.text)}</span></a>`)).join("")+"</div>":"")+"</div>"},_=e=>{let t=e.titleField,i=e.subtitleField,n=e.descriptionField,r=e.imagesField,s=(e.navigatable,e.collapsibleEvents),l=e.actionsField,o=e.altField,c=e.data;return'<div class="k-card-inner"><div class="k-card-header"><div class="k-card-title">'+(c[t]?`<span class="k-event-title">${d(c[t])}</span>`:"")+(s?'<span class="k-event-collapse k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button">'+a.ui.icon({icon:"chevron-right",iconClass:"k-button-icon"})+"</span>":"")+"</div>"+(c[i]?`<div class="k-card-subtitle">${d(c[i])}</div>`:"")+'</div><div class="k-card-body"><div class="k-card-description">'+(c[n]?`<p>${d(c[n])}</p>`:"")+(c[r]&&c[r].length>0?`<img src="${d(c[r][0].src)}" ${c[o]?`alt="${d(c[o])}"`:""} class="k-card-media" />`:"")+"</div></div>"+(c[l]&&c[l].length>0?'<div class="k-actions k-card-actions">'+c[l].map((e=>`<a class="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary" href="${e.url?d(e.url):"#"}"><span class="k-button-text">${d(e.text)}</span></a>`)).join("")+"</div>":"")+"</div>"},g=e=>{e.itemTemplate;let t=e.dateField,i=e.dateFormat,n=e.showDateLabels,r=e.data,s=0,l="";for(var d=0;d<r.length;d++){if(!(r[d][t]instanceof Date))continue;let e=r[d][t].getFullYear();s!=e&&(s=e,l+=`<li class="k-timeline-track-item k-timeline-flag-wrap"><span class="k-timeline-flag">${s}</span></li>`),l+='<li class="k-timeline-track-item" role="tab"><div class="k-timeline-date-wrap">'+(n?`<span class="k-timeline-date">${a.toString(r[d][t],i)}</span>`:"")+'</div><span class="k-timeline-circle"></span></li>'}return l},b=e=>{let t=e.itemTemplate,i=e.dateField,n=e.titleField,r=e.descriptionField,s=e.subtitleField,l=e.imagesField,o=e.actionsField,c=e.alterMode,u=e.collapsibleEvents,p=e.dateFormat,m=e.showDateLabels,v=e.navigatable,f=e.altField,h=e.data,k=0,_=0,g=!1,b="";for(var w=0;w<h.length;w++)if(h[w][i]instanceof Date){var x=h[w][i].getFullYear();x!=_&&(_=x,b+=`<li class="k-timeline-flag-wrap"><span class="k-timeline-flag">${_}</span></li>`),g=k%2==0&&c,b+=`<li class="${g?"k-timeline-event k-reverse":"k-timeline-event"}" data-uid="${d(h[w].uid)}"><div class="k-timeline-date-wrap">`+(m?`<span id="${d(h[w].uid)}-date" class="k-timeline-date">${a.toString(h[w][i],p)}</span>`:"")+'</div><span class="k-timeline-circle"></span>'+`<div class="${u?"k-timeline-card k-collapsed":"k-timeline-card"}">`+`<div aria-expanded="false" class="k-card k-card-vertical k-card-with-callout" ${v?`aria-describedby="${d(h[w].uid)}-date" tabindex="0" role="button" aria-live="polite" aria-atomic="true"`:""} >`+`<span class="${g?"k-timeline-card-callout k-card-callout k-callout-e":"k-timeline-card-callout k-card-callout k-callout-w"}"></span>`+`${t({titleField:n,subtitleField:s,descriptionField:r,imagesField:l,actionsField:o,data:h[w],altField:f,navigatable:v,collapsibleEvents:u})}</div></div></li>`,k++}return b},w='<button disabled tabindex="-1" aria-hidden="true" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button k-timeline-arrow k-timeline-arrow-left k-disabled" title="previous">'+a.ui.icon({icon:"caret-alt-left",iconClass:"k-button-icon"})+'</button><button disabled tabindex="-1" aria-hidden="true" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button k-timeline-arrow k-timeline-arrow-right k-disabled" title="next">'+a.ui.icon({icon:"caret-alt-right",iconClass:"k-button-icon"})+"</button>";function x(e){var t=e.css("transform");return"none"!=t?t.match(/-?[\d\.]+/g)[4]/e.width()*100:0}function F(e,t){return e.offset().left-t.offset().left+e.width()/2}function I(e,t,a){e.css(t,a)}var T=a.Class.extend({init:function(t){this.cardContainer=e("<div class='k-card k-card-vertical k-card-with-callout' role='tabpanel'/>");var a,i=e("<div class='k-timeline-card'></div>").append(this.cardContainer);this.element=e("<li class='"+(a="timeline-event","k-"+a+"'></li>")).append(i),t.append(this.element)},content:function(t,a,i){var n=e("<span class='k-timeline-card-callout k-card-callout k-callout-n'></span>");this.cardContainer.html(t),this.cardContainer.prepend(n),this.element.attr("data-uid",a),this.element.find(".k-card").attr({role:"tabpanel","aria-label":i})},position:function(e){this.element.css("transform","translate3d("+this.element.width()*e+"px, 0, 0)"),0===e?this.element.find(".k-card").attr("tabindex",0):this.element.find(".k-card").removeAttr("tabindex")},setPageCallout:function(e,t){this.element.find(".k-timeline-card-callout").css(e,t)},destroy:function(){var e=this;e.cardContainer=null,e.element.remove(),e.element=null}}),C=a.Observable.extend({init:function(t,i){var n,s,l,d=this;a.Observable.fn.init.call(this),this.element=t,n=new a.ui.Movable(d.element),s=new r({axis:"x",movable:n,onEnd:function(){d.trigger(c)}}),l=[],e.extend(d,{duration:i&&i.duration||1,movable:n,transition:s,pages:l,eventTemplate:i.eventTemplate,eventHeight:i.eventHeight,dataFieldMappings:i.dataFieldMappings,dateFormat:i.dateFormat}),this.bind([c],i)},initPages:function(){for(var e,t=this.pages,a=this.element,i=0;i<3;i++)e=new T(a),t.push(e)},repositionPages:function(){var e=this.pages;e[0].position(-1),e[1].position(0),e[2].position(1)},setPageContent:function(e,t){var i,n=typeof this.eventTemplate===Function?this.eventTemplate:a.template(this.eventTemplate),r=this.dataFieldMappings,s=a.toString(t.date,this.dateFormat);i=n({data:t,titleField:r.title,subtitleField:r.subtitle,descriptionField:r.description,imagesField:r.images,actionsField:r.actions,altField:r.altField}),e.content(i,t.uid,s)},updatePage:function(e,t,a){var i=this.pages,n=null===e?i[1]:e?i[i.length-1]:i[0];this.setPageContent(n,t),n.setPageCallout("left",a/n.element.width()*100+"%")},moveTo:function(e){this.movable.moveAxis("x",-e)},transitionTo:function(e,t){this.transition.moveTo({location:e,duration:this.duration,ease:t})},destroy:function(){for(var e=this,t=0;t<e.pages.length;t++)e.pages[t].destroy();e.unbind(),e.movable=e.transition=e.dataFieldMappings=e.eventTemplate=e.duration=e.pages=null}}),E=a.ui.Widget.extend({init:function(t,a){var n=this,r=a.orientation||n.options.orientation;i.fn.init.call(this,t,a),this.element.addClass(r===o?"k-timeline k-timeline-vertical":"k-timeline k-timeline-horizontal"),r!=o?n._horizontal():n._vertical(),this.element.on("click",".k-card-actions",(function(t){var a=e(t.target),i=e(t.target).closest(".k-timeline-event").data("uid"),r=n.dataSource.getByUid(i);n.trigger("actionClick",{sender:n,element:a,dataItem:r})})),n.currentEventIndex=0,n._forward=null,n._eventPage=1,n._currentIndex=0,n._firstIndexInView=0,n._initDataFieldMappings(),n.setDataSource(a.dataSource)},_horizontal:function(){var t=this,a=this.element,i=this.options,n=e("<div />"),r=e("<div />"),s=e("<ul role='tablist' tabindex='0' />"),l=e("<div />"),d=e("<ul />");t._trackWrap=n,t._trackEl=r,t._scrollableWrap=s,t._eventsWrap=l,t._eventsList=d,n.addClass("k-timeline-track-wrap"),r.addClass("k-timeline-track"),s.addClass(m),l.addClass("k-timeline-events-list"),d.addClass(m),i.eventHeight&&d.height(i.eventHeight),r.append(s),n.append(w),n.append(r),l.append(d),n.appendTo(a),l.appendTo(a)},_vertical:function(){var t=this,a=this.options,i=this.element,n=t._eventsList=e("<ul />"),r=a.navigatable,l=a.collapsibleEvents;t.element.append(n),a.alternatingMode&&i.addClass("k-timeline-alternating"),l&&(i.addClass("k-timeline-collapsible"),this.element.on("click",".k-card-header",(function(){var a=e(this).closest(".k-timeline-card"),i=a.parent(),n=t.dataSource.getByUid(i.data("uid"));a.hasClass("k-collapsed")?t.trigger("expand",{sender:t,dataItem:n})||t.expand(i):t.trigger("collapse",{sender:t,dataItem:n})||t.collapse(i)}))),r&&l&&this.element.on("keydown"+f,t,(function(t){if(t.keyCode==s.SPACEBAR||t.keyCode==s.ENTER){var a=e(t.target).find(".k-card-header");a.length&&(t.preventDefault(),a.trigger("click"))}}))},_renderContentVertical:function(e){var t,i,n=this.options;i=typeof n.eventTemplate===Function?n.eventTemplate:n.eventTemplate?a.template(n.eventTemplate):a.template(_,{useWithBlock:!1}),t=a.template(b,{useWithBlock:!1})({data:e,dateField:n.dataDateField,titleField:n.dataTitleField,subtitleField:n.dataSubtitleField,descriptionField:n.dataDescriptionField,imagesField:n.dataImagesField,actionsField:n.dataActionsField,itemTemplate:i,alterMode:n.alternatingMode,collapsibleEvents:n.collapsibleEvents,dateFormat:n.dateFormat,showDateLabels:n.showDateLabels,altField:n.dataImagesAltField,navigatable:n.navigatable}),this._eventsList.html(t),n.eventWidth&&this.element.find(".k-card").width(n.eventWidth)},_renderContentHorizontal:function(t){var i,n,r=this,s=r.options,l=r._dataFieldMappings;n=typeof s.eventTemplate===Function?s.eventTemplate:s.eventTemplate?a.template(s.eventTemplate):a.template(k,{useWithBlock:!1}),i=a.template(g,{useWithBlock:!1})({data:t,itemTemplate:n,dateFormat:s.dateFormat,dateField:s.dataDateField,showDateLabels:s.showDateLabels}),s.initialEventIndex?r._trackWrap.append(e(i).find("."+m).css("transform","translateX(-100%)").parent()):r._scrollableWrap.html(i),r.pane&&r.pane.destroy(),r.pane=new C(r._eventsList,{transitionEnd:this._transitionEnd.bind(this),eventTemplate:n,dataFieldMappings:l,eventHeight:s.eventHeight,dateFormat:s.dateFormat})},_initDataFieldMappings:function(){var e=this.options;this._dataFieldMappings={title:e.dataTitleField,subtitle:e.dataSubtitleField,date:e.dataDateField,description:e.dataDescriptionField,images:e.dataImagesField,actions:e.dataActionsField,altField:e.dataImagesAltField}},_transitionEnd:function(){this._forward?this.pane.pages.push(this.pane.pages.shift()):this.pane.pages.unshift(this.pane.pages.pop()),this._forward=null,this.pane.repositionPages(),this.pane.movable.moveAxis("x",0),this.options.navigatable&&(this._transition=null,this._eventsList.find(".k-card").removeAttr("id"),this.pane.pages[1].cardContainer.attr("id",this._cardId),this._setCurrent(this._currentBullet)),this._animationInProgress=!1},_setCurrentEvent:function(t){var a,i=this,n=e(t.currentTarget),r=i.dataSource.view()[n.parent().children(":not(.k-timeline-flag-wrap)").index(n)];a=i._forward?i.pane.pages[2].element:i.pane.pages[0].element,i.trigger("change",{eventContainer:a,dataItem:r})||i.open(n)},open:function(t){var a,i=this,n=e(t),s=n.find(".k-timeline-circle"),l=n.parent().children(":not(.k-timeline-flag-wrap)"),d=l.index(n);this.options.navigatable&&(i._removeCurrent(),l.attr("aria-selected",!1),n.attr("aria-selected",!0),i._currentBullet=n);var o=i.dataSource.view()[d];i.currentEventIndex!==d&&(i._currentIndex=n.index(),a=i._forward=i.currentEventIndex<d,i.currentEventIndex=d,i.pane.updatePage(a,o,F(s,i._trackWrap)),i._forward?(clearTimeout(i.navigateTimeOut),i.navigateTimeOut=setTimeout((function(){i.pane.transition.moveTo({location:-i.pane.pages[2].element.width(),duration:800,ease:r.easeOutExpo})}),200)):(clearTimeout(i.navigateTimeOut),i.navigateTimeOut=setTimeout((function(){i.pane.transition.moveTo({location:i.pane.pages[0].element.width(),duration:800,ease:r.easeOutExpo})}),200)),i._repositionEvents())},_navigateToView:function(t){var a=this,i=e(t.currentTarget).hasClass("k-timeline-arrow-right")?1:-1;a.trigger("navigate",{sender:a,action:i>0?"next":"previous"})||a._animationInProgress||(a._animationInProgress=!0,i>0?a.next():a.previous(),a._updateArrows())},_enableDisableArrow:function(e,t){t?(e.removeClass("k-disabled"),e.removeAttr("disabled"),e.attr("aria-hidden",!1)):(e.addClass("k-disabled"),e.attr("disabled","disabled"),e.attr("aria-hidden",!0))},_updateArrows:function(){var e=this,t=e.element.find(".k-timeline-arrow"),a=t.filter(".k-timeline-arrow-left"),i=t.filter(".k-timeline-arrow-right");this._enableDisableArrow(a,!e._validateNavigation(!1)),this._enableDisableArrow(i,!e._validateNavigation(!0))},_validateNavigation:function(e){var t=this,a=t._end||0;return e?t._firstIndexInView+t.numOfEvents>=t.maxEvents:Math.abs(a)<=1},next:function(){var e=this,t=e.options;e._validateNavigation(!0)||t.orientation==o||(e._forward=!0,e._navigate()),e._updateArrows()},_navigate:function(){var t,a,i,n,s=this,l=s._forward,d=x(this._trackWrap.find("."+m)),o=l?-e("."+m).width():e("."+m).width(),c=s._currentIndex,h=s._firstIndexInView;if((d=l?d-100:d+100)>=0&&(d=0),s._end=d,s._tackItemWidth,n=Math.floor(c/s.numOfEvents),l?1===s.numOfEvents?(t=0===h?1:h,a=this._trackWrap.find("."+p).eq(t).nextAll(":not(."+u+")").first(),s._firstIndexInView=a.index()):(t=h+s.numOfEvents-1,a=this._trackWrap.find("."+p).eq(t).nextAll(":not(."+u+")").first(),s._firstIndexInView=h+s.numOfEvents):1===s.numOfEvents?(t=h,a=this._trackWrap.find("."+p).eq(t).prevAll(":not(."+u+")").first(),s._firstIndexInView=a.index()):(t=h,a=(a=this._trackWrap.find("."+p).eq(t).prevAll(":not(."+u+")").first()).length>0?a:this._trackWrap.find("."+p+":not(."+u+")").first(),s._firstIndexInView=h-s.numOfEvents<0?0:h-s.numOfEvents),i=s.dataSource.view()[this._trackWrap.find(v).index(a)],this._trackWrap.find("."+m).css("transform","translateX("+d+"%)"),s._currentIndex!=a.index())s.currentEventIndex=this._trackWrap.find(v).index(a),s._currentIndex=a.index(),s.pane.updatePage(s._forward,i,0!==n||l?F(a.find(".k-timeline-circle"),s._trackWrap)+o:a.find(".k-timeline-circle").offset().left+15),clearTimeout(s.navigateTimeOut),s.navigateTimeOut=setTimeout((function(){l&&s.pane&&s.pane.pages.length>0?s.pane.transition.moveTo({location:-s.pane.pages[2].element.width(),duration:800,ease:r.easeOutExpo}):s.pane.transition.moveTo({location:s.pane.pages[0].element.width(),duration:800,ease:r.easeOutExpo})}),200);else{var k=this._trackWrap.find("."+m),_=function(){if(1!=s.numOfEvents){var e=s.pane.pages[1],t=F(a.find(".k-timeline-circle"),s._trackWrap);e.setPageCallout("left",t/e.element.width()*100+"%")}this._transition=null,k.off("transitionend"+f,_)};k.on("transitionend"+f,_)}},previous:function(){var e=this,t=e.options;e._validateNavigation(!1)||t.orientation==o||(e._forward=!1,e._navigate()),e._updateArrows()},expand:function(t){var i=this.options,n=e(t).find(".k-timeline-card"),r=e(t).find(".k-card"),s=e(t).find(".k-card-body");n.hasClass("k-collapsed")&&(i.navigatable&&i.collapsibleEvents&&r.attr("aria-expanded",!0),n.removeClass("k-collapsed"),a.fx(s).expand("vertical").stop().play())},collapse:function(t){var i=this.options,n=e(t).find(".k-timeline-card"),r=e(t).find(".k-card"),s=e(t).find(".k-card-body");n.hasClass("k-collapsed")||(i.navigatable&&i.collapsibleEvents&&r.attr("aria-expanded",!1),n.addClass("k-collapsed"),a.fx(s).expand("vertical").stop().reverse())},items:function(){return this.element.find("li[data-uid]")},_resizeHandler:function(){var e=this;clearTimeout(e.resizeTimeOut),e.resizeTimeOut=setTimeout((function(){e._redrawEvents(),e.pane.repositionPages()}))},redraw:function(){this.options.orientation!=o&&(this._redrawEvents(),this.pane.repositionPages())},_redrawEvents:function(){var e,t=this,a=Math.floor(t.element.find("."+m).width()/150);t.element.width()<=480?(t.element.addClass("k-timeline-mobile"),e=100,t.numOfEvents=1,t._tackItemWidth=e,t.element.find("li."+p).css("flex","1 0 "+e+"%"),t._repositionEvents()):(t.element.removeClass("k-timeline-mobile"),a!=t.numOfEvents&&(t.numOfEvents=a,e=100/a,I(t.element.find("li."+p),"flex","1 0 "+e+"%"),t._tackItemWidth=e,t._repositionEvents())),t._updateArrows()},_repositionEvents:function(){var e,t,a,i=this,n=i._tackItemWidth,r=null===i._forward?i.pane.pages[1]:i._forward?i.pane.pages[2]:i.pane.pages[0],s=this._trackWrap.find("."+m),l=x(s);if(t=1===i.numOfEvents?i.currentEventIndex*n:i._currentIndex*n,r){if(1===i.numOfEvents)return r.setPageCallout("left","50%"),I(s,"transform","translateX(-"+(a=t)+"%)"),i._firstIndexInView=i._currentIndex,void i._updateArrows();t>=Math.abs(l)+100?(a=Math.abs(l)+(t-(Math.abs(l)+100)+n),i._end=-a,I(s,"transform","translateX(-"+a+"%)"),i._firstIndexInView=i._currentIndex-i.numOfEvents+1):t<=Math.abs(l)?(a=t,i._end=-a,I(s,"transform","translateX(-"+a+"%)"),i._firstIndexInView=i._currentIndex):(e=F(s.find("li."+p).eq(i._currentIndex).find(".k-timeline-circle"),i._trackWrap),r.setPageCallout("left",e/r.element.width()*100+"%"),i._firstIndexInView=Math.round(Math.abs(l)/n));var d=this._trackWrap.find("."+m),o=function(){if(1!=i.numOfEvents){var e=i.pane.pages[1],t=F(i._trackWrap.find("."+p).eq(i._currentIndex).find(".k-timeline-circle"),i._trackWrap);e.setPageCallout("left",t/e.element.width()*100+"%")}d.off("transitionend"+f,o)};d.on("transitionend"+f,o)}i._updateArrows()},_initHorizontal:function(){var e,t=this,i=t._trackWrap.find(".k-timeline-circle").first(),n=t.dataSource.view()[0],r=t.options.navigatable;t.maxEvents=t._trackWrap.find("."+p).length,t._currentIndex=1,t.pane.initPages(),t.pane.repositionPages(),t.pane.updatePage(t._forward,n,F(i,t._trackWrap)),t._updateArrows(),t._resizeHandlerBound=t._resizeHandler.bind(t),a.jQuery(window).on("resize"+f,t._resizeHandlerBound),t._trackWrap.on("click",v,t._setCurrentEvent.bind(t)),t._trackWrap.on("click",".k-timeline-arrow:not(.k-disabled)",t._navigateToView.bind(t)),r&&(t._trackWrap.find(".k-timeline-track-item.k-timeline-flag-wrap").attr("role","none").attr("aria-hidden",!0),t._trackWrap.find(v).attr("aria-selected",!1).first().attr("aria-selected",!0),t._cardId=a.guid(),t._scrollableWrap.on("focus"+f,(function(){t.pane.pages[1].cardContainer.attr("id",t._cardId),t._currentBullet&&t._currentBullet.addClass("k-focus")})).on("focusout"+f,(function(){t._currentBullet&&t._currentBullet.removeClass("k-focus")})).on("keydown"+f,(function(e){var a,i,n,r=t._currentBullet;t._transition||(e.keyCode==s.LEFT&&(a=!0,(n=r.prevAll(v).first()).length&&((i=F(n,t._trackWrap))<0||i>n.parent().width()?(t._transition=!0,t._removeCurrent(),t.previous(),t.open(n)):t._setCurrentEvent({currentTarget:n}))),e.keyCode==s.RIGHT&&(a=!0,(n=r.nextAll(v).first()).length&&((i=F(n,t._trackWrap))<0||i>n.parent().width()?(t._transition=!0,t._removeCurrent(),t.next(),t.open(n)):t._setCurrentEvent({currentTarget:n}))),a&&e.preventDefault())})),e=t._scrollableWrap.find("."+p).eq(t._currentIndex),t._setCurrent(e),e.removeClass("k-focus"))},_setCurrent:function(e){if(e){var t=a.guid(),i=this;i._removeCurrent(),i._scrollableWrap.attr("aria-activedescendant",t),e.attr("id",t).addClass("k-focus"),e.siblings().removeAttr("aria-describedby"),"true"===e.attr("aria-selected")&&(e.attr("aria-describedby",i._cardId),i.pane.pages[1].cardContainer.attr("id",i._cardId)),i._currentBullet=e}},_removeCurrent:function(){this._currentBullet&&this._currentBullet.removeClass("k-focus").removeAttr("id").removeAttr("aria-describedby"),this._scrollableWrap.removeAttr("aria-activedescendant")},setDataSource:function(e){var t=this,a=t.options;e=l(e)?{data:e}:e,t.dataSource&&t._refresh?t.dataSource.unbind(h,t._refresh):this._refresh=t.refresh.bind(t),this.dataSource=n.create(e),undefined===this.dataSource._sort&&(this.dataSource._sort=[{field:a.dataDateField,dir:"asc"}]),t.dataSource.bind(h,t._refresh),a.autoBind&&this.dataSource.fetch()},refresh:function(){var e=this,t=e.options,a=this.dataSource.view();t.orientation!=o&&(e._trackWrap.empty().remove(),e.element.find(".k-timeline-events-list").remove(),e._horizontal()),e.currentEventIndex=0,e._forward=null,e._eventPage=1,e._currentIndex=0,e._firstIndexInView=0,e.numOfEvents=null,e._end=0,e._initDataFieldMappings(),a.length&&("horizontal"===t.orientation?(e._renderContentHorizontal(a),e._redrawEvents(),e._initHorizontal()):e._renderContentVertical(a)),e.trigger("dataBound",{sender:e})},destroy:function(){var t=this.options;i.fn.destroy.call(this),this.resizeTimeOut&&clearTimeout(this.resizeTimeOut),this.navigateTimeOut&&clearTimeout(this.navigateTimeOut),e(window).off("resize"+f,this._resizeHandlerBound),this._resizeHandlerBound=null,this.element.off(),t.orientation!=o&&(this.pane&&this.pane.destroy(),this._trackWrap.find("."+m).off(),this.element.find(".k-timeline-arrow").off(),this._trackWrap.off(),this.currentEventIndex=this.maxEvents=this.numOfEvents=this._currentIndex=this._eventPage=this._eventsList=this._eventsWrap=this.element=this._trackWrap=this.pane=null),a.destroy(this.element),this._dataFieldMappings=this.element=null},options:{autoBind:!0,name:"Timeline",orientation:"vertical",dateFormat:"MMM d, yyyy",showDateLabels:!0,collapsibleEvents:!1,alternatingMode:!1,dataTitleField:"title",dataDateField:"date",dataSubtitleField:"subtitle",dataDescriptionField:"description",dataImagesField:"images",dataActionsField:"actions",dataImagesAltField:"altField",navigatable:!1},events:["collapse","dataBound","expand","actionClick","change","navigate"]});a.ui.plugin(E)}(window.kendo.jQuery);var kendo$1=kendo;export{kendo$1 as default};
//# sourceMappingURL=kendo.timeline.js.map
