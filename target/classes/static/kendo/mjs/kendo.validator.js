/**
 * Kendo UI v2024.1.130 (http://www.telerik.com/kendo-ui)
 * Copyright 2024 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.core.js";var __meta__={id:"validator",name:"Validator",category:"web",description:"The Validator offers an easy way to do a client-side form validation.",depends:["core"]};!function(t,e){var a=window.kendo,i=a.ui.Widget,r=".kendoValidator",n="k-invalid-msg",s=new RegExp(n,"i"),l="k-invalid",o="k-valid",d="k-validation-summary",u="k-text-error",m="k-messagebox k-messagebox-error",c="aria-invalid",h=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,p=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,f=":input:not(:button,[type=submit],[type=reset],[disabled],[readonly])",g=":checkbox:not([disabled],[readonly])",F="[type=number],[type=range]",v="blur",_="name",y="form",k="novalidate",b="validate",C="change",D="validateInput",x=function(t,e){return"string"==typeof e&&(e=new RegExp("^(?:"+e+")$")),e.test(t)},A=function(t,e,a){var i=t.val();return!t.filter(e).length||""===i||x(i,a)},w=function(t,e){return!!t.length&&null!=t[0].attributes[e]};function E(e){return t.parseHTML?t(t.parseHTML(e)):t(e)}function S(e,i){for(var r,n=t(),l=0,o=e.length;l<o;l++)r=e[l],s.test(r.className)&&r.getAttribute(a.attr("for"))===i&&(n=n.add(r));return n}function I(t,e){return!!t&&("string"==typeof t.nodeName&&"LABEL"===t.nodeName&&("string"==typeof t.getAttribute("for")&&"string"==typeof e.getAttribute("id")&&t.getAttribute("for")===e.getAttribute("id")))}a.ui.validator||(a.ui.validator={rules:{},messages:{},allowSubmit:t.noop,validateOnInit:t.noop});var z=({errors:t})=>{let e="<ul>";for(var a=0;a<t.length;a+=1)e+=`<li><a data-field="${t[a].field}" href="#">${t[a].message}</a></li>`;return e+="</ul>",e},M=i.extend({init:function(e,r){var n=this,s=function(e){var i,r=a.ui.validator.ruleResolvers||{},n={};for(i in r)t.extend(!0,n,r[i].resolve(e));return n}(e),l="["+a.attr("validate")+"!=false]";(r=r||{}).rules=t.extend({},a.ui.validator.rules,s.rules,r.rules),r.messages=t.extend({},a.ui.validator.messages,s.messages,r.messages),i.fn.init.call(n,e,r),n._errorTemplate=a.template(n.options.errorTemplate),n._summaryTemplate=a.template(n.options.validationSummary.template||z),n.element.is(y)&&n.element.attr(k,k),n._inputSelector=f+l,n._checkboxSelector=g+l,n._errors={},n._attachEvents(),n._isValidated=!1,n._validateOnInit()&&n.validate()},events:[b,C,D],options:{name:"Validator",errorTemplate:({message:t})=>`<span class="k-form-error">${t}</span>`,messages:{required:"{0} is required",pattern:"{0} is not valid",min:"{0} should be greater than or equal to {1}",max:"{0} should be smaller than or equal to {1}",step:"{0} is not valid",email:"{0} is not valid email",url:"{0} is not valid URL",date:"{0} is not valid date",dateCompare:"End date should be greater than or equal to the start date",captcha:"The text you entered doesn't match the image."},rules:{required:function(t){var e=!t.attr("name")&&!t.is(":checked"),a=t.attr("name"),i=a&&a.indexOf("'")>-1?'"':"'",r=t.attr("name")&&!this.element.find("input[name="+i+t.attr("name")+i+"]:checked").length,n=t.filter("[type=checkbox]").length&&(e||r),s=t.filter("[type=radio]").length&&!this.element.find("input[name="+i+t.attr("name")+i+"]:checked").length,l=t.val();return!(w(t,"required")&&(!l||""===l||0===l.length||n||s))},pattern:function(t){return!t.filter("[type=text],[type=email],[type=url],[type=tel],[type=search],[type=password]").filter("[pattern]").length||""===t.val()||x(t.val(),t.attr("pattern"))},min:function(t){return!t.filter(F+",["+a.attr("type")+"=number]").filter("[min]").length||""===t.val()||(parseFloat(t.attr("min"))||0)<=a.parseFloat(t.val())},max:function(t){return!t.filter(F+",["+a.attr("type")+"=number]").filter("[max]").length||""===t.val()||(parseFloat(t.attr("max"))||0)>=a.parseFloat(t.val())},step:function(t){if(t.filter(F+",["+a.attr("type")+"=number]").filter("[step]").length&&""!==t.val()){var e,i=parseFloat(t.attr("min"))||0,r=parseFloat(t.attr("step"))||1,n=parseFloat(t.val()),s=(l=((l=r)+"").split(".")).length>1?l[1].length:0;return s?(e=Math.pow(10,s),Math.floor((n-i)*e)%(r*e)/Math.pow(100,s)==0):(n-i)%r==0}var l;return!0},email:function(t){return A(t,"[type=email],["+a.attr("type")+"=email]",h)},url:function(t){return A(t,"[type=url],["+a.attr("type")+"=url]",p)},date:function(t){return!t.filter("[type^=date],["+a.attr("type")+"=date]").length||""===t.val()||null!==a.parseDate(t.val(),t.attr(a.attr("format")))},captcha:function(t){if(t.filter("["+a.attr("role")+"=captcha]").length){var e=this,i=a.widgetInstance(t),r=function(t){return null!=t};if(t.data("captcha_validating")||r(i.isValid())||!i.getCaptchaId()||(t.data("captcha_validating",!0),e._validating=!0,i.validate().done((function(){e._validating=!1,e._checkElement(t)})).fail((function(t){e._validating=!1,t.error&&"handler_not_defined"===t.error&&window.console.warn("Captcha's validationHandler is not defined! You should either define a proper validation endpoint or declare a callback function to ensure the required behavior.")}))),r(i.isValid()))return t.removeData("captcha_validating"),i.isValid()}return!0}},validateOnBlur:!0,validationSummary:!1},_allowSubmit:function(){return a.ui.validator.allowSubmit(this.element,this.errors())},_validateOnInit:function(){return a.ui.validator.validateOnInit(this.element)},destroy:function(){i.fn.destroy.call(this),this.element.off(r),this.validationSummary&&(this.validationSummary.off(r),this.validationSummary=null)},value:function(){return!!this._isValidated&&0===this.errors().length},_submit:function(t){return!(!this.validate()&&!this._allowSubmit()||this._validating)||(t.stopPropagation(),t.stopImmediatePropagation(),t.preventDefault(),!1)},_checkElement:function(t){var e=this.value();this.validateInput(t),this.value()!==e&&this.trigger(C)},_attachEvents:function(){var e=this;e.element.is(y)&&e.element.on("submit"+r,e._submit.bind(e)),e.options.validateOnBlur&&(e.element.is(f)?(e.element.on(v+r,(function(){e._checkElement(e.element)})),e.element.is(g)&&e.element.on("click"+r,(function(){e._checkElement(e.element)}))):(e.element.on(v+r,e._inputSelector,(function(){e._checkElement(t(this))})),e.element.on("click"+r,e._checkboxSelector,(function(){e._checkElement(t(this))}))))},validate:function(){var t,e,a,i=!1,r=this.value();if(this._errors={},this.element.is(f))i=this.validateInput(this.element);else{var n=!1;for(e=0,a=(t=this.element.find(this._inputSelector)).length;e<a;e++)this.validateInput(t.eq(e))||(n=!0);i=!n}return this.options.validationSummary&&!r&&this.showValidationSummary(),this.trigger(b,{valid:i,errors:this.errors()}),r!==i&&this.trigger(C),i},validateInput:function(e){e=t(e),this._isValidated=!0;var i,r,s=this,d=s._errorTemplate,m=s._checkValidity(e),h=m.valid,p="."+n,f=e.attr(_)||"",g=s._findMessageContainer(f).add(e.next(p).filter((function(){var e=t(this);return!e.filter("["+a.attr("for")+"]").length||e.attr(a.attr("for"))===f}))).addClass("k-hidden"),F=h?"":s._extractMessage(e,m.key),v=h?"":E(d({message:(r=F,r.replace(/&amp/g,"&amp;").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">")),field:f})),y=!e.attr(c),k=e.is(".k-input-inner"),b=e.parent(".k-input");if(e.removeAttr(c),e.hasClass("k-hidden")&&(i=a.widgetInstance(e.closest(".k-signature"))),e.is("[type=radio]")&&(i=a.widgetInstance(e.closest(".k-radio-list"))),e.is("[type=checkbox]")&&(i=a.widgetInstance(e.closest(".k-checkbox-list"))),h||e.data("captcha_validating"))delete s._errors[f];else{s._errors[f]=F;var C=g.attr("id");if(s._decorateMessageContainer(v,f),C&&v.attr("id",C),0!==g.length)g.replaceWith(v);else{i=i||a.widgetInstance(e);var x=e.parent().get(0),A=e.next().get(0),w=e.prev().get(0);!i&&e.is("[type=radio]")&&(i=a.widgetInstance(e.closest(".k-radio-list"))),!i&&e.is("[type=checkbox]")&&(i=a.widgetInstance(e.closest(".k-checkbox-list"))),i&&i.wrapper&&(i.element!==i.wrapper||["Signature","RadioGroup","CheckBoxGroup"].indexOf(i.options.name)>-1)?v.insertAfter(i.wrapper):x&&"LABEL"===x.nodeName?v.insertAfter(x):A&&I(A,e[0])?v.insertAfter(A):w&&I(w,e[0])?v.insertAfter(e):k&&b.length?v.insertAfter(b):v.insertAfter(e)}v.removeClass("k-hidden"),e.attr(c,!0)}if(y!==h&&this.trigger(D,{valid:h,input:e,error:F,field:f}),(i=i&&"Signature"==i.options.name?i:a.widgetInstance(e))&&(i._inputWrapper||i.wrapper)||(e.toggleClass(l,!h),e.toggleClass(o,h)),i){var S=i._inputWrapper||i.wrapper,z=i._inputLabel;S&&(S.toggleClass(l,!h),S.toggleClass(o,h)),z&&z.toggleClass(u,!h)}if(y!==h){var M=v?v.attr("id"):g.attr("id");s._associateMessageContainer(e,M),this.options.validationSummary&&this.options.validateOnBlur&&this.showValidationSummary()}return h},hideMessages:function(){var t="."+n,e=this.element;this._disassociateMessageContainers(),e.is(f)?e.next(t).addClass("k-hidden"):e.find(t).addClass("k-hidden")},reset:function(){var t=this,e=t.element.find("."+l),a=t.element.find("."+u);t._errors=[],t.hideMessages(),t.hideValidationSummary(),e.removeAttr(c),e.removeClass(l),a.removeClass(u)},_findMessageContainer:function(e){for(var i,r=a.ui.validator.messageLocators,n=t(),s=0,l=this.element.length;s<l;s++)n=n.add(S(this.element[s].getElementsByTagName("*"),e));for(i in r)n=n.add(r[i].locate(this.element,e));return n},_decorateMessageContainer:function(t,e){var i,r=a.ui.validator.messageLocators;for(i in t.addClass(n).attr(a.attr("for"),e||""),t.attr("id")||t.attr("id",e+"-error"),r)r[i].decorate(t,e)},_extractMessage:function(t,e){var i,r=this.options.messages[e],n=t.attr(_);return a.ui.Validator.prototype.options.messages[e]||(i=a.isFunction(r)?r(t):r),r=a.isFunction(r)?r(t):r,a.format(t.attr(a.attr(e+"-msg"))||t.attr("validationMessage")||i||r||t.attr("title")||"",n,t.attr(e)||t.attr(a.attr(e)))},_checkValidity:function(t){var e,a=this.options.rules;for(e in a)if(!a[e].call(this,t))return{valid:!1,key:e};return{valid:!0}},errors:function(){var t,e=[],a=this._errors;for(t in a)e.push(a[t]);return e},setOptions:function(t){t.validationSummary&&this.hideValidationSummary(),a.deepExtend(this.options,t),this.destroy(),this.init(this.element,this.options),this._setEvents(this.options)},_getInputNames:function(){for(var e=this.element.find(this._inputSelector),a=[],i=0,r=e.length;i<r;i++){var n=t(e[i]);w(n,_)&&(-1===a.indexOf(n.attr(_))||0===n.closest(".k-checkbox-list").length&&0===n.closest(".k-radio-list").length)&&a.push(n.attr(_))}return a},_associateMessageContainer:function(t,e){var i=a.getWidgetFocusableElement(t);i&&e&&a.toggleAttribute(i,"aria-describedby",e)},_disassociateMessageContainers:function(){for(var e,a,i=this,r=i.element.find("."+l).addBack(),s=0;s<r.length;s+=1)(e=t(r[s])).is("input")&&(a=i._findMessageContainer(e.attr(_)).add(e.next("."+n)).attr("id"),i._associateMessageContainer(e,a))},_errorsByName:function(){for(var t=this,e=t._getInputNames(),a=[],i=0;i<e.length;i+=1){var r=e[i];t._errors[r]&&a.push({field:r,message:t._errors[r]})}return a},_renderSummary:function(){var e,a=this,i=this.options.validationSummary,n=this.element.prev();return(e=i.container?t(i.container):n&&n.hasClass(d)?n:t("<div />").insertBefore(a.element)).addClass([d,m].join(" ")),e.attr("role","alert"),e.on("click"+r,a._summaryClick.bind(a)),e},_summaryClick:function(e){e.preventDefault();var i,r=t(e.target),n=this.element.find("[name='"+r.data("field")+"']");n.length&&(i=a.getWidgetFocusableElement(n))&&i.trigger("focus")},showValidationSummary:function(){var t,e=this,a=e.validationSummary,i=e._errorsByName();a||(a=e.validationSummary=e._renderSummary()),t=E(e._summaryTemplate({errors:i})),a.html(t),a.toggleClass("k-hidden",!i.length)},hideValidationSummary:function(){var t=this.validationSummary;t&&t.addClass("k-hidden")}});a.ui.plugin(M)}(window.kendo.jQuery);var kendo$1=kendo;export{kendo$1 as default};
//# sourceMappingURL=kendo.validator.js.map
