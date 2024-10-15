/**
 * Kendo UI v2024.1.130 (http://www.telerik.com/kendo-ui)
 * Copyright 2024 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.data.js";import"./kendo.resizable.js";import"./kendo.switch.js";import"./kendo.gantt.data.js";import"./kendo.gantt.editors.js";import"./kendo.gantt.list.js";import"./kendo.gantt.timeline.js";import"./kendo.splitter.js";import"./kendo.pdf.js";import"./kendo.toolbar.js";import"./kendo.html.button.js";var __meta__={id:"gantt",name:"Gantt",category:"web",description:"The Gantt component.",depends:["data","resizable","switch","gantt.data","gantt.editors","gantt.list","gantt.timeline","pdf","toolbar","html.button"]};!function(e,t){var i=window.kendo,n=i.keys,s="matchMedia"in window,a=i.support.mobileOS,r=i.ui.Widget,o=i.htmlEncode,d=i.data.ObservableObject,l=i.data.ObservableArray,c=i.data.Query,u=Array.isArray,h=i.isFunction,p=e.extend,f=e.isPlainObject,g=i._outerWidth,v=i._outerHeight,m=".kendoGantt",k="tabIndex",b="string",_=".",w=({label:e,styles:t,views:i})=>`<select aria-label="${e}" class="k-dropdown k-picker k-dropdown-list ${t.viewsDropdown}">${Object.keys(i).map((e=>'<option value="'+e+'">'+i[e].title+"</option>")).join("")}</select>`,y=[{data:"add",text:"addChild"},{data:"insert-before",text:"insertBefore"},{data:"insert-after",text:"insertAfter"}],T={wrapper:"k-gantt",plannedTasks:"k-gantt-planned",rowHeight:"k-gantt-rowheight",content:"k-gantt-content",listWrapper:"k-gantt-treelist",list:"k-gantt-treelist",timelineWrapper:"k-gantt-timeline-pane",timeline:"k-gantt-timeline-pane",splitBar:"k-splitbar",splitter:"k-splitter",popupWrapper:"k-list-container",popupList:"k-list k-reset",resizeHandle:"k-resize-handle",icon:"k-icon",item:"k-item",line:"k-gantt-line",buttonDelete:"k-gantt-delete",buttonCancel:"k-gantt-cancel",buttonSave:"k-gantt-update",buttonToggle:"k-gantt-toggle",buttonDefaults:"k-button-md k-rounded-md k-button-solid",primary:"k-button-solid-primary",hovered:"k-hover",selected:"k-selected",focused:"k-focus",focusedCell:"k-focus",gridHeader:"k-grid-header",gridHeaderWrap:"k-grid-header-wrap",gridContent:"k-grid-content",tasks:"k-gantt-tasks",popup:{form:"k-popup-edit-form",editForm:"k-gantt-edit-form",formContainer:"k-edit-form-container",resourcesFormContainer:"k-resources-form-container",message:"k-popup-message",buttonsContainer:"k-edit-buttons",button:"k-button",editField:"k-edit-field",editLabel:"k-edit-label",resourcesField:"k-gantt-resources"},toolbar:{headerWrapper:"k-gantt-header k-gantt-toolbar",footerWrapper:"k-gantt-footer k-gantt-toolbar",toolbar:"k-gantt-toolbar",views:"k-gantt-views",viewsWrapper:"k-gantt-views-wrapper",viewsDropdown:"k-views-dropdown",button:"k-button",buttonToggle:"k-gantt-toggle",buttonDefaults:"k-button-md k-rounded-md k-button-solid",iconPlus:"plus",iconPdf:"file-pdf",iconToggle:"layout-1-by-4",viewButton:"k-view",link:"k-link",pdfButton:"k-gantt-pdf",appendButton:"k-gantt-create"}};function S(e){return"["+i.attr("uid")+(e?"='"+e+"']":"]")}function D(t,n){var s=t.parents("["+i.attr("role")+'="gantt"]'),a=[],r=e(s).parentsUntil("body").filter((function(e,t){return"visible"!=i.getComputedStyles(t,["overflow"]).overflow})).add(window);t.attr(k,0),n&&r.each((function(t,i){a[t]=e(i).scrollTop()}));try{t[0].setActive()}catch(e){t[0].focus()}n&&r.each((function(t,i){e(i).scrollTop(a[t])}))}var C=r.extend({init:function(e,t,n){u(t)&&(t={dataSource:t}),r.fn.init.call(this,e,t),n&&(this._events=n),this._wrapper(),this._resources(),this.options.views&&this.options.views.length||(this.options.views=["day","week","month"]),this._timeline(),this._processDefaults(),this._toolbar(),this._footer(),this._splitter(),this._adjustDimensions(),this._preventRefresh=!0,this.view(this.timeline._selectedViewName),this._preventRefresh=!1,this._dataSource(),this._assignments(),this._list(),this._dependencies(),this._scrollable(),this._dataBind(),this._attachEvents(),this._createEditor(),i.notify(this),this._showWatermarkOverlay&&this._showWatermarkOverlay(this.wrapper[0])},events:["dataBinding","dataBound","add","edit","remove","cancel","save","change","navigate","moveStart","move","moveEnd","resizeStart","resize","resizeEnd","columnHide","columnReorder","columnResize","columnShow","togglePlannedTasks"],options:{name:"Gantt",autoBind:!0,navigatable:!0,selectable:!0,editable:!0,resizable:!1,columnResizeHandleWidth:3,columns:[],views:[],dataSource:{},dependencies:{},resources:{},assignments:{},taskTemplate:null,messages:{save:"Save",cancel:"Cancel",destroy:"Delete",deleteTaskConfirmation:"Are you sure you want to delete this task?",deleteDependencyConfirmation:"Are you sure you want to delete this dependency?",deleteTaskWindowTitle:"Delete task",deleteDependencyWindowTitle:"Delete dependency",selectView:"Select view",views:{day:"Day",week:"Week",month:"Month",year:"Year",start:"Start",end:"End"},actions:{append:"Add Task",addChild:"Add Child",insertBefore:"Add Above",insertAfter:"Add Below",pdf:"Export to PDF",toggle:"Toggle pane"},editor:{editorTitle:"Task",resourcesEditorTitle:"Resources",title:"Title",start:"Start",end:"End",plannedStart:"Planned Start",plannedEnd:"Planned End",percentComplete:"Complete",resources:"Resources",assignButton:"Assign",resourcesHeader:"Resources",unitsHeader:"Units",parent:"Parent",addNew:"Add",name:"Name",percentCompleteHint:"value from 0 to 1",remove:"Remove",actualStart:"Actual Start",actualEnd:"Actual End",parentOptionLabel:"-None-",general:"General",predecessors:"Predecessors",successors:"Successors",other:"Other",dependencyType:"Type"},plannedTasks:{switchText:"Planned Tasks",offsetTooltipAdvanced:"Met deadline earlier",offsetTooltipDelay:"Delay",seconds:"seconds",minutes:"minutes",hours:"hours",days:"days"}},showWorkHours:!0,showWorkDays:!0,toolbar:null,workDayStart:new Date(1980,1,1,8,0,0),workDayEnd:new Date(1980,1,1,17,0,0),workWeekStart:1,workWeekEnd:5,hourSpan:1,snap:!0,height:600,listWidth:"30%",rowHeight:null,showPlannedTasks:!1},select:function(e){var t=this.list;if(!e)return t.select();typeof e===b&&(e=t.content.find(e)),t.select(e),this._selectionUpdate()},clearSelection:function(){this.list.clearSelection(),this._selectionUpdate()},destroy:function(){r.fn.destroy.call(this),this.dataSource&&(this.dataSource.unbind("change",this._refreshHandler),this.dataSource.unbind("progress",this._progressHandler),this.dataSource.unbind("error",this._errorHandler)),this.dependencies&&(this.dependencies.unbind("change",this._dependencyRefreshHandler),this.dependencies.unbind("error",this._dependencyErrorHandler)),this.timeline&&(this.timeline.unbind(),this.timeline.destroy()),this.list&&(this.list.unbind(),this.list.destroy()),this.toolbar&&this.toolbar.getKendoToolBar()&&this.toolbar.getKendoToolBar().destroy(),this.footer&&this.footer.getKendoToolBar()&&this.footer.getKendoToolBar().destroy(),this._editor&&this._editor.destroy(),this._resourceEditorWindow&&this._resourceEditorWindow.destroy(),this._resizeDraggable&&this._resizeDraggable.destroy(),this.layout&&this.layout.getKendoSplitter()&&this.layout.getKendoSplitter().destroy(),this.toolbar.off(m),s&&(this._mediaQuery.removeListener(this._mediaQueryHandler),this._mediaQuery=null),e(window).off("resize"+m,this._resizeHandler),e(this.wrapper).off(m),this.toolbar=null,this.footer=null,i.destroy(this.element)},setOptions:function(t){var n=i.deepExtend({},this.options,t),s=this._events;if(!t.views){var a=this.view().name;n.views=e.map(this.options.views,(function(e){var t=f(e),i=t?"string"!=typeof e.type?e.title:e.type:e;return a===i?t?e.selected=!0:e={type:i,selected:!0}:t&&(e.selected=!1),e}))}t.dataSource||(n.dataSource=this.dataSource),t.dependencies||(n.dependencies=this.dependencies),t.resources||(n.resources=this.resources),t.assignments||(n.assignments=this.assignments),this.destroy(),this.element.empty(),this.options=null,this.init(this.element,n,s),r.fn._setEvents.call(this,n)},_attachEvents:function(){this._resizeHandler=this.resize.bind(this,!1),e(window).on("resize"+m,this._resizeHandler),s&&this._mediaQueryHandler({matches:this._mediaQuery.matches})},_splitter:function(){this.splitter=this.layout.kendoSplitter({navigatable:this.options.navigatable,orientation:"horizontal",panes:[{collapsible:!1,scrollable:!1,label:"Gantt List"},{collapsible:!1,scrollable:!1,label:"Gantt Timeline"}]}).getKendoSplitter(),this.options.listWidth&&this.splitter.size(".k-pane:first",this.options.listWidth)},_wrapper:function(){var t=C.styles,i=this.options,n=i.height,s=i.width;this.wrapper=this.element.addClass(t.wrapper).attr("role","application"),this.layout=e("<div class='"+t.content+"' />").appendTo(this.wrapper).append("<div class='"+t.listWrapper+"'><div></div></div>").append("<div class='"+t.timelineWrapper+"'><div></div></div>"),i.showPlannedTasks&&this.wrapper.addClass(t.plannedTasks),n&&this.wrapper.css("height",n),s&&this.wrapper.css("width",s),i.rowHeight&&this.wrapper.addClass(t.rowHeight),this.treelistWrapper=this.wrapper.find(_+t.list),this.timelineWrapper=this.wrapper.find(_+t.timeline),this.treelistWrapper.css("width",i.listWidth),this.timelineWrapper.css("width",this.wrapper.width()-this.treelistWrapper.outerWidth())},_viewClickHandler:function(e){var t=this.list,n=e.target.attr(i.attr("name"));t.editor&&!t.editor.end()||(this.trigger("navigate",{view:n})?e.preventDefault():this.view(n))},_togglePane:function(e){var t=this,i=t.treelistWrapper,n=t.timelineWrapper,s=_+T.gridContent;e.preventDefault(),i.is(":visible")?(i.addClass("k-hidden"),n.removeClass("k-hidden"),t.refresh(),n.find(s).scrollTop(t.scrollTop)):(i.removeClass("k-hidden"),n.addClass("k-hidden"),i.find(s).scrollTop(t.scrollTop)),t._resize()},_processDefaults:function(){var t=this,n=t.timeline.views,s=i.ns,a=[],r=C.styles.toolbar,o=this.options.messages.actions,d={append:{name:"append",type:"dropDownButton",menuButtons:y.map((e=>({text:o[e.text],attributes:{"data-type":e.data}}))),icon:r.iconPlus,attributes:{class:r.appendButton},click:t._addClickHandler.bind(t),open:t._openAddClickHandler.bind(t)},pdf:{name:"pdf",type:"button",attributes:{class:r.pdfButton},icon:r.iconPdf,click:t.saveAsPDF.bind(t)},toggle:{name:"toggle",type:"button",showText:"overflow",attributes:{class:"k-gantt-toggle"},icon:r.iconToggle,click:t._togglePane.bind(t)},switchLabel:{template:"<label for=planned-switch>"+t.options.messages.plannedTasks.switchText+"</label>"},plannedTasks:{type:"component",component:"Switch",element:"<input id='planned-switch' class='k-gantt-planned-switch'>",componentOptions:{checked:t.options.showPlannedTasks,change:t._togglePlannedTasks.bind(t),messages:{checked:"",unchecked:""}}},viewsDdl:{template:w({views:t.timeline.views,styles:r,label:t.options.messages.selectView})},view:{name:"view",type:"button",togglable:!0,group:"views"},viewsGroup:{type:"buttonGroup",attributes:{class:r.views}}};Object.keys(n).map((t=>{var i=e.extend(!0,{},d.view);i.text=n[t].title,i.attributes={class:"k-view-"+t.toLowerCase()},i.attributes["data"+s+"-name"]=t,d[t]=i,a.push(t)})),Object.values(d).map((e=>{"view"===e.name&&(e.click=t._viewClickHandler.bind(t))})),d.viewsGroup.buttons=a,t._viewsButtons=a,t.defaultCommands=d},_processTools:function(t){var i=this.options.editable,n=[],s=["toggle"],a=!1,r=this.defaultCommands;return Array.isArray(t)?n=t:i&&!1!==i.create&&s.push("append"),n.map((t=>{"plannedTasks"!==t&&"plannedTasks"!==t.name||(a=!0,s.push({type:"spacer"}),s.push("switchLabel")),r[t]||r[t.name]||t.template||(t=typeof t===b?{name:t,type:"button",text:t,attributes:{class:"k-gantt-"+t}}:e.extend({},{type:"button",text:t.name,attributes:{class:"k-gantt-"+t.name}},t)),s.push(t)})),a||s.push({type:"spacer"}),this._viewsButtons&&this._viewsButtons.length>0&&(this._viewsButtons.length>1&&s.push("viewsDdl"),s.push("viewsGroup")),s},_mediaQueryHandler:function(e){var t=this,i=t.layout.find(".k-splitbar"),n=t.layout.getKendoSplitter(),s=t.treelistWrapper,a=t.timelineWrapper,r=_+T.gridContent,o=t.toolbar,d=o.getKendoToolBar();e.matches?(s.addClass("k-hidden"),i.addClass("k-hidden"),n._suppressResize=!0,d.hide(o.find(".k-gantt-views")),d.show(o.find(".k-views-dropdown")),s.width("100%")):(n._suppressResize=!1,s.removeClass("k-hidden"),i.removeClass("k-hidden"),a.removeClass("k-hidden"),d.show(o.find(".k-gantt-views")),d.hide(o.find(".k-views-dropdown")),s.width(s.outerWidth()),a.find(r).scrollTop(t.scrollTop)),t._resize()},_toolbar:function(){var t,n,a=this,r=C.styles,o=_+r.toolbar.viewsDropdown,d=this.options.toolbar;typeof d===b&&(d=i.template(d).bind(this)),t=h(d)?this._processTools([{template:d({})}]):this._processTools(d),n=e("<div class='"+r.toolbar.headerWrapper+"'>"),this.wrapper.prepend(n),this.toolbar=n,n.kendoToolBar({resizable:!1,tools:t,size:"medium",defaultTools:this.defaultCommands,parentMessages:this.options.messages.actions}),s&&(this._mediaQuery=window.matchMedia("(max-width: 480px)"),this._mediaQuery.addListener(this._mediaQueryHandler.bind(this))),n.on("change"+m,o,(function(){var t=a.list,i=e(this).val();t.editable&&t.editable.trigger("validate")||a.trigger("navigate",{view:i})||a.view(i)})),this.toggleSwitch=n.find("input.k-gantt-planned-switch").data("kendoSwitch")},_footer:function(){var t=this.options.editable;if(t&&!1!==t.create){var i=C.styles.toolbar,n=this.options.messages.actions,s=e("<div class='"+i.footerWrapper+"'>");this.wrapper.append(s),this.footer=s,s.kendoToolBar({resizable:!1,size:"medium",tools:["append"],defaultTools:{append:p(!0,{},this.defaultCommands.append,{direction:"up",animation:{open:{effects:"slideIn:up"}}})},parentMessages:n})}},_adjustDimensions:function(){var e=this.element,t=v(this.toolbar),i=this.footer?v(this.footer):0,n=e.height(),s=e.width(),a=this.treelistWrapper.is(":visible"),r=this.layout.find(".k-splitbar"),o=r.is(":visible")?g(r):0,d=a?g(this.treelistWrapper):0,l=s-(d+o);this.layout.children().height(n-(t+i)),this.timelineWrapper.width(l),a||this.timelineWrapper.css("left",0),s<d+o&&this.treelistWrapper.width(s-o)},_scrollTo:function(e){var t,n,s=this.timeline.view(),a=this.list,r=i.attr("uid"),o="string"==typeof e?e:e.closest("tr"+S()).attr(r);s.content.is(":visible")?(n=s.content.find(S(o)),t=function(){s._scrollTo(n)}):(n=a.element.find(S(o)),t=function(){n.get(0).scrollIntoView()}),0!==n.length&&t()},_addTask:function(e,t,i){var n,s=this.dataSource._createNewModel({}),a=this.timeline.view()._timeSlots()[0],r=this.list.editor;r&&r.trigger("validate")||(s.set("title","New task"),t?(s.set("parentId",t.get("id")),s.set("start",t.get("start")),s.set("end",t.get("end")),s.set("plannedStart",t.get("plannedStart")),s.set("plannedEnd",t.get("plannedEnd"))):(s.set("start",a.start),s.set("end",a.end)),i&&"add"!==i&&(n=e.get("orderId"),n="insert-before"===i?n:n+1),this._createTask(s,n))},_addClickHandler:function(e){var t=e.target.data("type"),i=this.dataSource,n=this.dataItem(this.select()),s=i.taskParent(n),a="add"===t?n:s;this._addTask(n,a,t)},_openAddClickHandler:function(e){var t=this.select();t&&0!==t.length||(e.preventDefault(),this._addTask())},_getListEditable:function(){var e=!1,t=this.options;return!1!==t.editable&&(e="incell",t.editable&&!1===t.editable.update?e=!1:t.editable&&!1===t.editable.reorder||(e={mode:"incell",move:{reorderable:!0,clickMoveClick:!1!==t.editable.clickMoveClick}})),e},_getListOptions:function(){var e=this.options,t=this._getListEditable(),i=this.wrapper.find(_+T.list);return{columns:e.columns||[],dataSource:this.dataSource,navigatable:e.navigatable,selectable:e.selectable,reorderable:e.reorderable,editable:t,resizable:e.resizable,filterable:e.filterable,columnMenu:e.columnMenu,columnResizeHandleWidth:this.options.columnResizeHandleWidth,listWidth:g(i),resourcesField:this.resources.field,rowHeight:this.options.rowHeight}},_attachResourceEditor:function(e){for(var t,i=0;i<e.length;i++)(t=e[i]).field===this.resources.field&&"function"!=typeof t.editor&&(t.editor=this._resourcePopupEditor.bind(this))},_attachListEvents:function(){var i=this;i.list.bind("columnShow",(function(e){i.trigger("columnShow",{column:e.column})})).bind("columnHide",(function(e){i.trigger("columnHide",{column:e.column})})).bind("columnReorder",(function(e){i.trigger("columnReorder",{column:e.column,oldIndex:e.oldIndex,newIndex:e.newIndex})})).bind("columnResize",(function(e){i.trigger("columnResize",{column:e.column,oldWidth:e.oldWidth,newWidth:e.newWidth})})).bind("render",(function(){i._navigatable()}),!0).bind("beforeEdit",(function(e){i.trigger("edit",{task:e.model,container:e.container})&&e.preventDefault()})).bind("cancel",(function(e){i.trigger("cancel",{task:e.model,container:e.cell})?e.preventDefault():(i._preventItemChange=!0,i.list.closeCell(!0))})).bind("save",(function(e){var n,s=e.values;for(n in i.previousTask={},i._preventRefresh=!0,null!==i.updateDuration&&i.updateDuration!==t||(i.updateDuration=e.model.duration()),null!==i.updatePlannedDuration&&i.updatePlannedDuration!==t||(i.updatePlannedDuration=e.model.plannedDuration()),s.hasOwnProperty("start")&&(s.end=new Date(s.start.getTime()+i.updateDuration)),s.hasOwnProperty("plannedStart")&&s.plannedStart&&(s.plannedEnd=new Date(s.plannedStart.getTime()+i.updatePlannedDuration)),s)s.hasOwnProperty(n)&&(i.previousTask[n]=e.model.get(n));i.updatedValues=s})).bind("itemChange",(function(t){var n,s,a,r,o,d=i.updatedValues,l=t.data,c=i.resources.field,u=i.previousTask,h=i.options.navigatable;if(i._preventItemChange)i._preventItemChange=!1;else{for(o in u)u.hasOwnProperty(o)&&l.set(o,u[o]);i.previousTask={},i.trigger("save",{task:l,values:d})?i.dataSource.hasChanges()&&(i.dataSource.cancelChanges(l),i._preventRefresh=!1,i.refresh()):(d&&(i._preventRefresh=!0,i.dataSource.update(l,d),d[c]&&i._updateAssignments(l.get("id"),d[c])),h&&(n=e(i.list.current()),s=n.is("th"),r=n.closest("tr").index(),a=s?n.parent().children(":not(.k-group-cell)").index(n[0]):Math.max(i.list.cellIndex(n),0)),i._preventRefresh=!1,i._requestStart(),i.dataSource.sync().then((function(){if(i.options.navigatable&&!i._tabPressed&&!s){var e=i.list.tbody.children().eq(r).find(">td:visible").eq(a);i.list._setCurrent(e,!1,!0)}i._tabPressed=!1}))),i.updatedValues=null,i.updateDuration=null}})).bind("change",(function(){i.trigger("change"),i._selectionUpdate()})).bind("navigate",(function(e){var t,n=e.sender.current();i._scrollTo(n),i.timeline.element.find("div.k-task").attr("tabindex","-1"),t=n.closest("tr").attr("data-uid"),i.timeline.element.find("div.k-task[data-uid='"+t+"']").attr("tabindex","0")})).bind("expand",(function(e){e.preventDefault(),e.model.set("expanded",!0)})).bind("collapse",(function(e){e.preventDefault(),e.model.set("expanded",!1)})).bind("dragend",(function(e){var t,n,s=i.dataSource;"over"===e.position&&(s.cancelChanges(),n={parentId:e.source.parentId},t=s.get(e.source.id),i.trigger("save",{task:t,values:n})||s.update(t,n),s.sync())})).bind("dataBound",(function(){0===i.dataSource.sort().length&&i.dataSource.sort([{field:"orderId",dir:"asc"}])})).bind("reorder",(function(e){i._updateTask(e.task,e.updateInfo)}))},_selectionUpdate:function(){var e=this,t=e.list.select();t.length?e.timeline.select("[data-uid='"+t.attr("data-uid")+"']"):e.timeline.clearSelection()},_list:function(){var e=C.styles,t=this.wrapper.find(_+e.list).find("> div"),n=this._getListOptions();this._attachResourceEditor(n.columns),this.list=new i.ui.GanttList(t,n),this._attachListEvents()},_timeline:function(){var e=this,t=C.styles,n=function(e){return delete e.name,delete e.prefix,delete e.remove,delete e.edit,delete e.add,delete e.navigate,e}(p(!0,{resourcesField:this.resources.field},this.options)),s=this.wrapper.find(_+t.timeline+" > div");this.timeline=new i.ui.GanttTimeline(s,n),this.timeline.bind("navigate",(function(i){var n=i.view.replace(/\./g,"\\.").toLowerCase(),s=e.toolbar.find(_+t.toolbar.views),a=s.getKendoButtonGroup();a&&a.select(s.find(_+t.toolbar.viewButton+"-"+n)),e.toolbar.find(_+t.toolbar.viewsDropdown).val(i.view),e.refresh()})).bind("moveStart",(function(t){var i=e.list.editor;!i||i.end()?e.trigger("moveStart",{task:t.task})&&t.preventDefault():t.preventDefault()})).bind("move",(function(t){var i=t.task,n=t.start,s=new Date(n.getTime()+i.duration());e.trigger("move",{task:i,start:n,end:s})&&t.preventDefault()})).bind("moveEnd",(function(t){var i=t.task,n=t.start,s=new Date(n.getTime()+i.duration());e.trigger("moveEnd",{task:i,start:n,end:s})||e._updateTask(e.dataSource.getByUid(i.uid),{start:n,end:s})})).bind("resizeStart",(function(t){var i=e.list.editor;!i||i.end()?e.trigger("resizeStart",{task:t.task})&&t.preventDefault():t.preventDefault()})).bind("resize",(function(t){e.trigger("resize",{task:t.task,start:t.start,end:t.end})&&t.preventDefault()})).bind("resizeEnd",(function(t){var i=t.task,n={};t.resizeStart?n.start=t.start:n.end=t.end,e.trigger("resizeEnd",{task:i,start:t.start,end:t.end})||e._updateTask(e.dataSource.getByUid(i.uid),n)})).bind("percentResizeStart",(function(t){var i=e.list.editor;i&&!i.end()&&t.preventDefault()})).bind("percentResizeEnd",(function(t){e._updateTask(e.dataSource.getByUid(t.task.uid),{percentComplete:t.percentComplete})})).bind("dependencyDragStart",(function(t){var i=e.list.editor;i&&!i.end()&&t.preventDefault()})).bind("dependencyDragEnd",(function(t){var i=e.dependencies._createNewModel({type:t.type,predecessorId:t.predecessor.id,successorId:t.successor.id});e._createDependency(i)})).bind("select",(function(t){var i,n=e.list.editor,s=e.select();n&&n.end(),s&&s.length&&(i=s.data("uid")),i!==t.uid&&(e.select("[data-uid='"+t.uid+"']"),e.trigger("change"))})).bind("editTask",(function(t){var i=e.list.editor;i&&!i.end()||e.editTask(t.uid)})).bind("clear",(function(){e.clearSelection(),e.trigger("change")})).bind("removeTask",(function(t){var i=e.list.editor;i&&!i.end()||e.removeTask(e.dataSource.getByUid(t.uid))})).bind("expand",(function(t){var i=e.dataSource.getByUid(t.uid);i.summary&&!i.get("expanded")?i.set("expanded",!0):t.preventDefault()})).bind("collapse",(function(t){var i=e.dataSource.getByUid(t.uid);i.summary&&i.get("expanded")?i.set("expanded",!1):t.preventDefault()})).bind("removeDependency",(function(t){var i=e.list.editor;i&&!i.end()||e.removeDependency(e.dependencies.getByUid(t.uid))}))},_dataSource:function(){var e=this.options.dataSource;e=u(e)?{data:e}:e,this.dataSource&&this._refreshHandler?this.dataSource.unbind("change",this._refreshHandler).unbind("progress",this._progressHandler).unbind("error",this._errorHandler):(this._refreshHandler=this.refresh.bind(this),this._progressHandler=this._requestStart.bind(this),this._errorHandler=this._error.bind(this)),this.dataSource=i.data.GanttDataSource.create(e).bind("change",this._refreshHandler).bind("progress",this._progressHandler).bind("error",this._errorHandler)},_dependencies:function(){var e=this.options.dependencies||{},t=u(e)?{data:e}:e;this.dependencies&&this._dependencyRefreshHandler?this.dependencies.unbind("change",this._dependencyRefreshHandler).unbind("error",this._dependencyErrorHandler):(this._dependencyRefreshHandler=this.refreshDependencies.bind(this),this._dependencyErrorHandler=this._error.bind(this)),this.dependencies=i.data.GanttDependencyDataSource.create(t).bind("change",this._dependencyRefreshHandler).bind("error",this._dependencyErrorHandler)},_resources:function(){var e=this.options.resources,t=e.dataSource||{};this.resources={field:"resources",dataTextField:"name",dataColorField:"color",dataFormatField:"format"},p(this.resources,e),this.resources.dataSource=i.data.DataSource.create(t)},_assignments:function(){var e=this.options.assignments,t=e.dataSource||{};this.assignments?this.assignments.dataSource.unbind("change",this._assignmentsRefreshHandler):this._assignmentsRefreshHandler=this.refresh.bind(this),this.assignments={dataTaskIdField:"taskId",dataResourceIdField:"resourceId",dataValueField:"value"},p(this.assignments,e),this.assignments.dataSource=i.data.DataSource.create(t),this.assignments.dataSource.bind("change",this._assignmentsRefreshHandler)},_createEditor:function(){var e=this;(this._editor=new i.gantt.PopupEditor(this.wrapper,p({},this.options,{target:this,resources:{field:this.resources.field,editor:this._createResourceEditor.bind(this)}}))).bind("cancel",(function(t){var i=e.dataSource.getByUid(t.model.uid);e.trigger("cancel",{container:t.container,task:i})?t.preventDefault():(e.dependencies&&e.dependencies.filter({}),e.cancelTask(),e.options.navigatable&&e.timeline.element.find('div[data-uid="'+t.model.uid+'"]').focus())})).bind("edit",(function(t){var i=e.dataSource.getByUid(t.model.uid);e.trigger("edit",{container:t.container,task:i})&&t.preventDefault()})).bind("save",(function(t){var i=e.dataSource.getByUid(t.model.uid);e.saveTask(i,t.updateInfo,t.updateDependencies)})).bind("remove",(function(t){e.removeTask(t.model.uid)})).bind("close",(function(t){e.options.navigatable&&e.element.find('div[data-uid="'+t.window.attr("data-uid")+'"]').focus()}))},_resourcePopupEditor:function(t,n){var s,a,r=this,d=r._createResourceEditor(e("<div>"),n),l=T.popup,c=r.element,u=e(i.format('<div class="'+l.formContainer+'">')).appendTo(c),h=r.options.messages;return u.append(d.wrapper),s=e('<div class="'+l.buttonsContainer+'">'),u.append(s),s.append(e("<button class='"+T.buttonSave+"'>"+o(h.save)+"</button>").kendoButton({name:"save",themeColor:"primary",icon:"save",click:()=>{d.updateModel()&&(d.trigger("save",{model:d.model}),r._updateAssignments(d.model.get("id"),d.model.get(r.resources.field)),a.trigger("close"),a.close())}})),s.append(e("<button class='"+T.buttonCancel+"'>"+o(h.cancel)+"</button>").kendoButton({name:"cancel",icon:"cancel",click:()=>{a.trigger("close"),a.close()}})),this._resourceEditorWindow=a=u.kendoWindow({modal:!0,resizable:!1,draggable:!0,visible:!1,title:h.editor.resourcesEditorTitle,deactivate:()=>{d.destroy(),a.destroy(),a.element.closest(".k-window").remove()}}).data("kendoWindow"),a.center().open(),d},_createResourceEditor:function(e,t){var n=t instanceof d?t:t.model,s=this.options.messages,a=this.resources.field,r={step:.01,min:.01,max:1},o=this.assignments.dataSource.options.schema.model,l=this.resources.dataTextField,c=this.resources.dataSource.view();return o&&o.fields.Units&&o.fields.Units.validation&&p(!0,r,o.fields.Units.validation),this._resourceEditor=new i.gantt.ResourceEditor(e,{resourcesField:a,unitsValidation:r,resources:c.map((e=>({value:e.id,text:e[l]}))),model:n,messages:p({},s.editor)})},view:function(e){return this.timeline.view(e)},range:function(e){var t=this.dataSource,i=this.view(),n=this.timeline;return e&&(i.options.range={start:e.start,end:e.end},n._render(t.taskTree()),n._renderDependencies(this.dependencies.view())),{start:i.start,end:i.end}},date:function(e){var t=this.view();return e&&(t.options.date=e,t._scrollToDate(e)),t.options.date},dataItem:function(e){if(!e)return null;var t=this.list,i=t.element.find(e);return t._modelFromElement(i)},setDataSource:function(e){this.options.dataSource=e,this._dataSource(),this.list.setDataSource(this.dataSource),this.options.autoBind&&e.fetch()},setDependenciesDataSource:function(e){this.options.dependencies=e,this._dependencies(),this.options.autoBind&&e.fetch()},items:function(){return this.wrapper.children(".k-task")},_updateAssignments:function(e,i){for(var n,s,a,r=this.assignments.dataSource,o=this.assignments.dataTaskIdField,d=this.assignments.dataResourceIdField,l=!1,u=new c(r.view()).filter({field:o,operator:"eq",value:e}).toArray();u.length;){n=u[0];for(var h=0,p=i.length;h<p;h++)if(s=i[h],n.get(d)===s.get("id")){a=i[h].get("value"),this._updateAssignment(n,a),i.splice(h,1),l=!0;break}l||this._removeAssignment(n),l=!1,u.shift()}for(var f=0,g=i.length;f<g;f++)(s=i[f]).id!==t&&s.value&&this._createAssignment(s,e);r.sync()},cancelTask:function(){var e=this._editor;e.container&&e.close(),this.dependencies&&this.dependencies.cancelChanges()},editTask:function(e){var t="string"==typeof e?this.dataSource.getByUid(e):e;if(t){var i=this.dataSource._createNewModel(t.toJSON());i.uid=t.uid,this.cancelTask(),this._editTask(i)}},_editTask:function(e){this._editor.editTask(e,this.options.editable.plannedTasks)},saveTask:function(e,i,n){var s,a=this,r=this._editor,o=r.container,d=r.editable,l=!1,c=!1,u=(i=i||{},a.options.resources.field);Object.keys(i).map((n=>{var a=i[n],r=e.get(n);a instanceof Date&&(a=a.getTime(),r=r?r.getTime():t),a!==r&&(n===u?(s=a.filter((e=>!r.some((t=>t.id===e.id&&t.value===e.value)))).concat(r.filter((e=>!a.some((t=>t.id===e.id&&e.value===t.value))))))&&s.length>0&&(c=!0):l=!0)})),o&&d&&d.end()&&(l||c||n)?a.trigger("save",{task:e,values:i,updateDependencies:n})?(e&&e.dirty&&(a.dataSource.cancelChanges(e),a._preventRefresh=!1,a.refresh()),a.dependencies&&a.dependencies.cancelChanges()):(l&&(a._preventRefresh=!0,a.dataSource.update(e,i)),c&&this._updateAssignments(e.get("id"),i[u]),a._syncDataSource(),this.dependencies&&this._updateDependency(n),this._editor.close()):d&&d.end()&&this._editor.close()},_updateDependency:function(e){this.dependencies.filter({}),e&&(e.created.map((e=>{this._preventDependencyRefresh=!0,this.dependencies.add(e),this._preventDependencyRefresh=!1})),e.destroyed.map((e=>{this.dependencies.remove(e)}))),this.dependencies.sync()},_updateTask:function(e,t){var i=this,n=i.resources.field;i.trigger("save",{task:e,values:t})?(e&&e.dirty&&(i.dataSource.cancelChanges(e),i._preventRefresh=!1,i.refresh()),i.dependencies&&i.dependencies.cancelChanges()):(t&&(i._preventRefresh=!0,i.dataSource.update(e,t),t[n]&&i._updateAssignments(e.get("id"),t[n])),i._syncDataSource())},_updateAssignment:function(e,t){var i=this.assignments.dataValueField;e.set(i,t)},removeTask:function(e){var t=this,i="string"==typeof e?this.dataSource.getByUid(e):e;i&&this._taskConfirm((function(e){e||t._removeTask(i)}),i)},_createTask:function(e,i){if(!this.trigger("add",{task:e,dependency:null})){var n=this.dataSource;this._preventRefresh=!0,i===t?n.add(e):n.insert(i,e),this._scrollToUid=e.uid,this._syncDataSource()}},_createDependency:function(e){this.trigger("add",{task:null,dependency:e})||(this._preventDependencyRefresh=!0,this.dependencies.add(e),this._preventDependencyRefresh=!1,this.dependencies.sync())},_createAssignment:function(e,t){var i=this.assignments,n=i.dataSource,s=i.dataTaskIdField,a=i.dataResourceIdField,r=i.dataValueField,o=n._createNewModel();o[s]=t,o[a]=e.get("id"),o[r]=e.get("value"),n.add(o)},removeDependency:function(e){var t=this,i="string"==typeof e?this.dependencies.getByUid(e):e;i&&this._dependencyConfirm((function(e){e||t._removeDependency(i)}),i)},_removeTaskDependencies:function(e,t){this._preventDependencyRefresh=!0;for(var i=0,n=t.length;i<n;i++)this.dependencies.remove(t[i]);this._preventDependencyRefresh=!1,this.dependencies.sync()},_removeTaskAssignments:function(e){var t=this.assignments.dataSource,i=t.view(),n={field:this.assignments.dataTaskIdField,operator:"eq",value:e.get("id")};i=new c(i).filter(n).toArray(),this._preventRefresh=!0;for(var s=0,a=i.length;s<a;s++)t.remove(i[s]);this._preventRefresh=!1,t.sync()},_removeTask:function(e){var t=this.dependencies.dependencies(e.id);this.trigger("remove",{task:e,dependencies:t})||(this._removeTaskDependencies(e,t),this._removeTaskAssignments(e),this._preventRefresh=!0,this.dataSource.remove(e)&&this._syncDataSource(),this.dependencies&&this.dependencies.filter({}),this._preventRefresh=!1)},_removeDependency:function(e){this.trigger("remove",{task:null,dependencies:[e]})||this.dependencies.remove(e)&&this.dependencies.sync()},_removeAssignment:function(e){this.assignments.dataSource.remove(e)},_taskConfirm:function(e,t){var i=this.options.messages;this._confirm(e,{model:t,text:i.deleteTaskConfirmation,title:i.deleteTaskWindowTitle})},_dependencyConfirm:function(e,t){var i=this.options.messages;this._confirm(e,{model:t,text:i.deleteDependencyConfirmation,title:i.deleteDependencyWindowTitle})},_confirm:function(e,t){var i=this.options.editable;!0===i||!1!==i.confirmation?this.showDialog(p(!0,{},t,{callback:e})):e()},showDialog:function(e){this._editor.showDialog(e)},refresh:function(){if(!this._preventRefresh&&this.list&&!this.list.editor){this._progress(!1);var e,t,n=this.dataSource.taskTree(),s=this._scrollToUid,a=-1,r=this.select()[0]?this.select().data("uid"):this._selected;this.current&&(t=this.current.closest("tr").attr(i.attr("uid")),a=this.current.index()),this.trigger("dataBinding")||(0!==this.resources.dataSource.data().length&&this._assignResources(n),this._editor&&this._editor.close(),this.clearSelection(),this.list._renderTree(n),this.timeline._render(n),this.timeline._renderDependencies(this.dependencies.view()),s&&(this._scrollTo(s),this.select(S(s))),(s||t)&&a>=0&&(e=this.list.element.find("tr"+S(s||t)+" > td").eq(a),this._current(e)),this._scrollToUid=null,r&&(this._selected=r,this.select("[data-uid="+r+"]")),this.trigger("dataBound"))}},refreshDependencies:function(){this._preventDependencyRefresh||this.trigger("dataBinding")||(this.timeline._renderDependencies(this.dependencies.view()),this.trigger("dataBound"))},_assignResources:function(e){for(var t,n,s=this.resources,a=this.assignments,r=(t=a.dataSource.view(),n={field:a.dataTaskIdField},t=new c(t).group(n).toArray()),o=function(e,t){var n=e.get("id");i.setter(s.field)(e,new l([]));for(var a=0,o=r.length;a<o;a++)r[a].value===n&&t(e,r[a].items)},u=function(e,t){for(var n=0,r=t.length;n<r;n++){var o=t[n],l=s.dataSource.get(o.get(a.dataResourceIdField)),c=o.get(a.dataValueField),u=o.get(a.dataResourceIdField),h=l.get(s.dataFormatField)||"p0",p=i.toString(c,h);e[s.field].push(new d({id:u,name:l.get(s.dataTextField),color:l.get(s.dataColorField),value:c,formatedValue:p,format:h}))}},h=0,p=e.length;h<p;h++)o(e[h],u)},_wrapResourceData:function(e){for(var t,i=this,n=[],s=this.resources.dataSource.view(),a=this.assignments.dataSource.view(),r=new c(a).filter({field:i.assignments.dataTaskIdField,operator:"eq",value:e}).toArray(),o=function(e){var t=null;return new c(r).filter({field:i.assignments.dataResourceIdField,operator:"eq",value:e}).select((function(e){t+=e.get(i.assignments.dataValueField)})),t},d=0,l=s.length;d<l;d++)t=s[d],n.push({id:t.get("id"),name:t.get(i.resources.dataTextField),format:t.get(i.resources.dataFormatField)||"p0",value:o(t.id)});return n},_syncDataSource:function(){this._preventRefresh=!1,this._requestStart(),this.dataSource.sync()},_requestStart:function(){this._progress(!0)},_error:function(){this._progress(!1)},_progress:function(e){i.ui.progress(this.element,e)},_scrollable:function(){var t=this,n=C.styles,s=_+n.gridContent,r=_+n.gridHeaderWrap,o=this.timeline.element.find(r),d=this.timeline.element.find(s),l=this.list.element.find(r),c=this.list.element.find(s);a&&c.css("overflow-y","auto"),d.on("scroll",(function(){t.scrollTop=this.scrollTop,i.scrollLeft(o,this.scrollLeft),c.scrollTop(this.scrollTop)})),c.on("scroll",(function(){i.scrollLeft(l,this.scrollLeft)})).on("DOMMouseScroll"+m+" mousewheel"+m,(function(t){var n=d.scrollTop(),s=i.wheelDeltaY(t);s&&(t.preventDefault(),e(t.currentTarget).one("wheel"+m,!1),d.scrollTop(n+-s))}))},_navigatable:function(){var t=this,s=this.options.navigatable,a=this.options.editable,r=C.styles,o=_+r.gridContent,d=_+r.listWrapper,l=_+r.gridHeaderWrap,c=this.list.element.find(l).find("table"),u=this.list.element.find(o).find("table"),h=c.add(u),p=S();e(this.wrapper).on("mousedown"+m,d+" tr"+p,(function(i){var n=e(i.target).is(":button,a,:input,a>.k-icon,.k-svg-icon,k-svg-icon,svg,path,textarea,span.k-icon:not(.k-i-none),span.k-svg-icon:not(.k-svg-i-none),span.k-link,.k-input,.k-multiselect-wrap,.k-input-value-text,.k-input-inner");i.ctrlKey||!s&&!a||n||(t._focusTimeout=setTimeout((function(){D(t.list.content.find("table"),!0)}),2))})).on("keydown"+m,function(t){var i,s,a,o=t.keyCode,d=this,l=e(t.target),c=[d.toolbar,d.layout.find(".k-splitbar"),d.layout.find(".k-gantt-treelist"),d.layout.find(".k-gantt-timeline-pane")];d._tabPressed=!1,d.footer&&c.push(d.footer);for(var u=0;u<c.length;u++)if(e.contains(c[u][0],t.target)||c[u][0]===t.target){a=u;break}if(o===n.F10)d.toolbar.find("[tabindex=0]:visible").first().addClass(r.focused).trigger("focus"),t.preventDefault();else if(o==n.TAB)if(2==a&&(d._tabPressed=!0),t.shiftKey){for(u=a-1;u>=0;u--)if(!c[u].hasClass("k-hidden")){i=l.attr("data-uid"),2===u&&i?(s=d.list.content.find("tr[data-uid='"+i+"']").find("td").last(),d.list.current(s),D(d.list.content.find("table"),!0)):c[u].is(":kendoFocusable")?c[u].focus():c[u].find("[tabindex=0]:visible").focus(),t.preventDefault();break}}else for(u=a+1;u<c.length;u++)if(!c[u].hasClass("k-hidden")){c[u].is(":kendoFocusable")?c[u].focus():c[u].find("[tabindex=0]:visible").focus(),t.preventDefault();break}}.bind(this)),s?u.on("keydown"+m,(function(e){var s=e.keyCode;e.keyCode==n.DELETE?function(){var e=t.options.editable;if(e&&!1!==e.destroy&&!t.list.editor){var n=t.select(),s=i.attr("uid");n.length&&t.removeTask(n.attr(s))}}():s>=49&&s<=57&&"input"!==e.target.tagName.toLowerCase()&&t.view(t.timeline._viewByIndex(s-49))})):h.on("focus"+m,(function(){e(t.toolbar.find(_+r.focused)).removeClass(r.focused)})).on("blur"+m,(function(){this==c&&e(this).attr(k,-1)}))},_dataBind:function(){var t=this;if(t.options.autoBind){this._preventRefresh=!0,this._preventDependencyRefresh=!0;var i=e.map([this.dataSource,this.dependencies,this.resources.dataSource,this.assignments.dataSource],(function(e){return e.fetch()}));e.when.apply(null,i).done((function(){t._preventRefresh=!1,t._preventDependencyRefresh=!1,t.refresh()}))}},_resize:function(){this._adjustDimensions(),this.timeline.view()._adjustHeight(),this.timeline.view()._renderCurrentTime(),this.list._adjustHeight()},_togglePlannedTasks:function(e){var t=this.timeline;this.trigger("togglePlannedTasks",{showPlannedTasks:!t.options.showPlannedTasks})?e.preventDefault():(this.wrapper.toggleClass(T.plannedTasks),t._setPlanned(!t.options.showPlannedTasks),t._render(this.dataSource.taskTree()),t._renderDependencies(this.dependencies.view()))}});i.PDFMixin&&(i.PDFMixin.extend(C.fn),C.fn._drawPDF=function(){var e=C.styles,t=this.wrapper.find(_+e.list+" "+_+e.gridContent+">table").width(),i=this.wrapper.find(_+e.list+" "+_+e.gridContent+">table").height(),n=this.wrapper.find(_+e.toolbar.toolbar).outerHeight()*this.wrapper.find(_+e.toolbar.toolbar).length,s=this.wrapper.find(_+e.timeline+" "+_+e.gridContent+" table").width(),a=this.wrapper.clone();return a.find(_+e.list).css("height",i+n),a.find(_+e.splitter).css("width",s+t),a.find(_+e.splitter).css("height",i+n),this._drawPDFShadow({content:a},{avoidLinks:this.options.pdf.avoidLinks})}),i.ui.plugin(C),p(!0,C,{styles:T})}(window.kendo.jQuery);var kendo$1=kendo;export{kendo$1 as default};
//# sourceMappingURL=kendo.gantt.js.map
