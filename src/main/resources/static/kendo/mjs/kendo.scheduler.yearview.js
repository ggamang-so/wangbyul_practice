/**
 * Kendo UI v2024.1.130 (http://www.telerik.com/kendo-ui)
 * Copyright 2024 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.scheduler.view.js";import"./kendo.multiviewcalendar.js";import"./kendo.tooltip.js";var __meta__={id:"scheduler.yearview",name:"Scheduler Year View",category:"web",description:"The Scheduler Year View",depends:["scheduler.view","multiviewcalendar","tooltip"],hidden:!0};!function(e,t){var n=window.kendo,a=n.ui,i=n.htmlEncode,o=a.SchedulerView,r=e.extend,l=n.template,s=n.date.firstDayOfYear,d=n.date.firstDayOfMonth,c=n.date.lastDayOfMonth,u="navigate",p="keydown",v="click",h="focus",f=".kendoYearView",y={layout:"k-scheduler-layout k-scheduler-layout-flex k-scheduler-yearview",body:"k-scheduler-body",tooltip:"k-scheduler-tooltip",indicator:"k-day-indicator",event:"k-tooltip-event",hidden:"k-hidden",calendarView:"k-calendar-view",scheduler:"k-scheduler"},m=l((({date:e,events:t,messages:a})=>`<div class='k-tooltip-title k-text-center'><div class='k-month'>${i(n.format("{0:MMM}",e))}</div><div tabindex='0' class='k-link k-day k-text-primary'>${i(n.format("{0:dd}",e))}</div></div>`+(t.length?"<div class='k-tooltip-events-container'><div class='k-tooltip-events'>"+t.map((e=>`<div class="k-tooltip-event k-event" title="${i(e.title)}" ${e.resources[0]?`${n.attr("style-background-color")}="${i(e.resources[0].color)}" ${n.attr("style-border-color")}="${i(e.resources[0].color)}"`:""}><div class='k-event-title k-text-ellipsis'>${i(e.title)}</div><span class='k-spacer'></span><span class='k-event-time'>${i(n.format("{0:t}",e.start))}</span></div>`)).join("")+"</div></div>":`<div class='k-no-data k-text-center'>${i(a.noData)}</div>`))),_=o.extend({init:function(e,t){var n=this;o.fn.init.call(n,e,t),n._yearRange(),n._templates(),n._layout(),n._initCalendar(),n._initTooltip()},options:{title:"Year",name:"year",months:12,startDate:null,messages:{noData:"No events on this date."},selectedDateFormat:"{0:yyyy}",selectedShortDateFormat:"{0:yyyy}",selectedMobileDateFormat:"{0:yyyy}",tooltipTemplate:m},name:"year",events:[u],_yearRange:function(){var e,t=this,n=t.options;t._startDate=n.startDate?d(n.startDate):s(n.date),t._startDate.setFullYear(n.date.getFullYear()),(e=new Date(t._startDate)).setMonth(e.getMonth()+n.months),t._endDate=e},_templates:function(){var e=this.options,t=r({},n.Template,e.templateSettings);this.tooltipTemplate=n.template(e.tooltipTemplate,t)},_layout:function(){var t=this,n=y;t.content=e("<div/>").addClass(n.layout),t.element.append(t.content),t.body=e("<div/>").addClass(n.body),t.content.append(t.body)},_initCalendar:function(){var t,n,i=this,o=i.options,r=e("<div/>");i.body.append(r),i.calendar=t=new a.MultiViewCalendar(r,{views:o.months,value:i.startDate(),showViewHeader:!0,footer:!1}),n=t.element,o.selectable||i._disableCalendarSelection(),t.value(null),t.header.toggleClass(y.hidden),n.on(v+f,"td[role='gridcell']",i._calendarCellClick.bind(i)),n.on(p+f,"."+y.calendarView,i._calendarKeydown.bind(i)),t.bind(u,i._calendarNavigate.bind(i))},_calendarCellClick:function(e){var t=this.calendar.selectable.value().first();e.preventDefault(),e.stopPropagation(),this._displayTooltip(t)},_calendarKeydown:function(e){var t=n.keys,a=e.keyCode;a!=t.ENTER&&a!=t.SPACEBAR||(e.preventDefault(),this._displayTooltip(this.calendar.selectable.value().first()))},_calendarNavigate:function(e){var t=this,n=e.sender._firstViewValue<t.startDate()?t.previousDate():t.nextDate();t.trigger(u,{view:"year",date:n}),t._focusCellOnNavigate()},_focusCellOnNavigate:function(){var e,t=this,n=t.calendar||t.element.find(".k-calendar").getKendoMultiViewCalendar();n&&(e=n._firstViewValue<t.startDate()?t.lastDateInRange():t.nextDate(),n._focusCell(n._cellByDate(e),!0))},_disableCalendarSelection:function(){var e=this;e.calendar&&(e.calendar.value(null),e.calendar.element.off(p,e.calendar._move))},_initTooltip:function(){var e=this,t=e.content,i=e._buildTooltipTemplate.bind(e);e.tooltip=new a.Tooltip(t,{filter:".k-calendar td[role='gridcell']",showOn:v,position:"right",content:i,width:220,show:()=>setTimeout((()=>n.applyStylesFromKendoAttributes(e.tooltip.popup.element,["background-color","border-color"])))}),e._initTooltipPopup(),e.tooltip.bind("show",e._tooltipShow.bind(e)),e.tooltip.bind("hide",e._tooltipHide.bind(e))},_initTooltipPopup:function(){var e=this,t=e.tooltip;e.tooltip&&(t._initPopup(),t.popup.element.addClass(y.tooltip),t.popup.element.on(v+f,".k-tooltip-title > .k-day",e._tooltipTitleClick.bind(e)),t.popup.element.on(p+f,e,e._tooltipKeydown.bind(e)))},_buildTooltipTemplate:function(){var e=this,t=n.parseDate(e.calendar.current()),a=e.eventsByDate||[];return(a=a.filter((function(e){return n.toString(new Date(e.value),"d")==n.toString(t,"d")})))&&a[0]&&a[0].items.map((function(t){t.resources=e.eventResources(t)||[]})),e.tooltipTemplate({date:t,events:a[0]?a[0].items:[],messages:e.options.messages})},_inverseTooltipEventsColor:function(){var t=this;e.each(t.tooltip.popup.element.find("."+y.event),(function(){t._inverseEventColor(e(this))}))},_tooltipShow:function(e){var t=e.sender;t.refresh(),this._inverseTooltipEventsColor(),t.popup.element.find(":kendoFocusable").first().trigger(h)},_tooltipHide:function(){var e=this.calendar;e&&e.focus()},_tooltipTitleClick:function(){this._navigateToDayView()},_tooltipKeydown:function(t){var a=this.tooltip.popup.element,i=e(t.target),o=n.keys,r=t.keyCode,l=t.shiftKey;if((i.is(".k-day")&&r==o.ENTER||r==o.SPACEBAR)&&(t.preventDefault(),this._navigateToDayView()),r==o.TAB){var s=a.find(":kendoFocusable").first(),d=a.find(":kendoFocusable").last();l&&i.is(s)?(d.trigger(h),t.preventDefault()):i.is(d)&&(s.trigger(h),t.preventDefault())}},_navigateToDayView:function(){e.grep(this.options.views,(function(t){return e.isPlainObject(t)&&"kendo.ui.DayView"==t.type||"day"===t})).length&&this.trigger(u,{view:"day",date:this.calendar.current()})},_displayTooltip:function(e){var t=this;e.length&&(t.options.selectable||e.removeClass("k-selected"),setTimeout((function(){t.tooltip.show(e)}),50))},_renderEventIndicators:function(){var t,n,a=this.calendar;a.element.find("."+y.indicator).remove(),this.eventsByDate.forEach((function(i){t=a._currentView.toDateString(new Date(i.value)),n=a.element[0].querySelector("[data-value='"+t+"']"),i.items.length&&e("<span/>").addClass(y.indicator).appendTo(n)}))},_groupEventsByDate:function(e){var t;return e.length?(t=e.map((function(e){return e.formattedDate=e.start.toDateString(),e})),new n.data.Query(t).sort([{field:"start",dir:"asc"},{field:"end",dir:"desc"}]).group({field:"formattedDate"}).toArray()):[]},_resourceBySlot:function(){return{}},lastDateInRange:function(){var e=new Date(this.previousDate());return e.setMonth(e.getMonth()-1+this.options.months),c(e)},nextDate:function(){return n.date.nextYear(this._startDate)},previousDate:function(){return n.date.previousYear(this._startDate)},startDate:function(){return this._startDate},endDate:function(){return this._endDate},moveToEvent:function(){return!1},constrainSelection:function(){return!1},inRange:function(){return!0},select:function(e){this.clearSelection(),e.start>=this.startDate()&&e.start<this.endDate()?this.calendar.value(e.start):(this.calendar.value(this.calendar._firstViewValue),e.start=e.end=this.calendar.value()),this.current(this.calendar.selectable.value()[0])},selectionByElement:function(t){if(t.length)return t=e(t),{index:this.calendar._index,start:n.calendar.toDateObject(t),end:n.calendar.toDateObject(t),isAllDay:!1,uid:0}},current:function(e){if(undefined===e)return this._current;this._current=e},render:function(e){var t=this;t._cachedEvents=e,t.eventsByDate=t._groupEventsByDate(e)||[],t._renderEventIndicators(),t.trigger("activate")},destroy:function(){var e=this;e.tooltip&&(e.tooltip.destroy(),e.tooltip=null),e.calendar&&(e.calendar.destroy(),e.calendar=null),e.element&&(e.content.remove(),e.element.off(f)),o.fn.destroy.call(this)}});r(!0,a,{YearView:_})}(window.kendo.jQuery);var kendo$1=kendo;export{kendo$1 as default};
//# sourceMappingURL=kendo.scheduler.yearview.js.map
