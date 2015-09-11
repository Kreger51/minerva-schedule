(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','moment'],factory);}
else if(typeof exports==='object'){ module.exports=factory(require('jquery'),require('moment'));}
else{factory(jQuery,moment);}})(function($,moment){;;var fc=$.fullCalendar={version:"2.4.0"};var fcViews=fc.views={};$.fn.fullCalendar=function(options){var args=Array.prototype.slice.call(arguments,1); var res=this;this.each(function(i,_element){ var element=$(_element);var calendar=element.data('fullCalendar');var singleRes;
 if(typeof options==='string'){if(calendar&&$.isFunction(calendar[options])){singleRes=calendar[options].apply(calendar,args);if(!i){res=singleRes;}
if(options==='destroy'){ element.removeData('fullCalendar');}}} 
else if(!calendar){ calendar=new Calendar(element,options);element.data('fullCalendar',calendar);calendar.render();}});return res;};var complexOptions=['header','buttonText','buttonIcons','themeButtonIcons'];function mergeOptions(optionObjs){return mergeProps(optionObjs,complexOptions);}
function massageOverrides(input){var overrides={views:input.views||{}}; var subObj;$.each(input,function(name,val){if(name!='views'){if($.isPlainObject(val)&&!/(time|duration|interval)$/i.test(name)&& $.inArray(name,complexOptions)==-1
){subObj=null; $.each(val,function(subName,subVal){if(/^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(subName)){if(!overrides.views[subName]){ overrides.views[subName]={};}
overrides.views[subName][name]=subVal;}
else{ if(!subObj){subObj={};}
subObj[subName]=subVal;}});if(subObj){ overrides[name]=subObj;}}
else{overrides[name]=val;}}});return overrides;};;fc.intersectionToSeg=intersectionToSeg;fc.applyAll=applyAll;fc.debounce=debounce;fc.isInt=isInt;fc.htmlEscape=htmlEscape;fc.cssToStr=cssToStr;fc.proxy=proxy;fc.capitaliseFirstLetter=capitaliseFirstLetter;
function compensateScroll(rowEls,scrollbarWidths){if(scrollbarWidths.left){rowEls.css({'border-left-width':1,'margin-left':scrollbarWidths.left-1});}
if(scrollbarWidths.right){rowEls.css({'border-right-width':1,'margin-right':scrollbarWidths.right-1});}}
function uncompensateScroll(rowEls){rowEls.css({'margin-left':'','margin-right':'','border-left-width':'','border-right-width':''});}
function disableCursor(){$('body').addClass('fc-not-allowed');}
function enableCursor(){$('body').removeClass('fc-not-allowed');}


function distributeHeight(els,availableHeight,shouldRedistribute){var minOffset1=Math.floor(availableHeight/els.length); var minOffset2=Math.floor(availableHeight-minOffset1*(els.length-1));var flexEls=[]; var flexOffsets=[]; var flexHeights=[]; var usedHeight=0;undistributeHeight(els);
els.each(function(i,el){var minOffset=i===els.length-1?minOffset2:minOffset1;var naturalOffset=$(el).outerHeight(true);if(naturalOffset<minOffset){flexEls.push(el);flexOffsets.push(naturalOffset);flexHeights.push($(el).height());}
else{usedHeight+=naturalOffset;}});if(shouldRedistribute){availableHeight-=usedHeight;minOffset1=Math.floor(availableHeight/flexEls.length);minOffset2=Math.floor(availableHeight-minOffset1*(flexEls.length-1));} 
$(flexEls).each(function(i,el){var minOffset=i===flexEls.length-1?minOffset2:minOffset1;var naturalOffset=flexOffsets[i];var naturalHeight=flexHeights[i];var newHeight=minOffset-(naturalOffset-naturalHeight); if(naturalOffset<minOffset){ $(el).height(newHeight);}});}
function undistributeHeight(els){els.height('');}

function matchCellWidths(els){var maxInnerWidth=0;els.find('> *').each(function(i,innerEl){var innerWidth=$(innerEl).outerWidth();if(innerWidth>maxInnerWidth){maxInnerWidth=innerWidth;}});maxInnerWidth++; els.width(maxInnerWidth);return maxInnerWidth;}
function setPotentialScroller(containerEl,height){containerEl.height(height).addClass('fc-scroller');if(containerEl[0].scrollHeight-1>containerEl[0].clientHeight){return true;}
unsetScroller(containerEl); return false;}
function unsetScroller(containerEl){containerEl.height('').removeClass('fc-scroller');}
fc.getClientRect=getClientRect;fc.getContentRect=getContentRect;fc.getScrollbarWidths=getScrollbarWidths;function getScrollParent(el){var position=el.css('position'),scrollParent=el.parents().filter(function(){var parent=$(this);return(/(auto|scroll)/).test(parent.css('overflow')+parent.css('overflow-y')+parent.css('overflow-x'));}).eq(0);return position==='fixed'||!scrollParent.length?$(el[0].ownerDocument||document):scrollParent;}
function getOuterRect(el){var offset=el.offset();return{left:offset.left,right:offset.left+el.outerWidth(),top:offset.top,bottom:offset.top+el.outerHeight()};}
function getClientRect(el){var offset=el.offset();var scrollbarWidths=getScrollbarWidths(el);var left=offset.left+getCssFloat(el,'border-left-width')+scrollbarWidths.left;var top=offset.top+getCssFloat(el,'border-top-width')+scrollbarWidths.top;return{left:left,right:left+el[0].clientWidth, top:top,bottom:top+el[0].clientHeight
};}
function getContentRect(el){var offset=el.offset(); var left=offset.left+getCssFloat(el,'border-left-width')+getCssFloat(el,'padding-left');var top=offset.top+getCssFloat(el,'border-top-width')+getCssFloat(el,'padding-top');return{left:left,right:left+el.width(),top:top,bottom:top+el.height()};}
function getScrollbarWidths(el){var leftRightWidth=el.innerWidth()-el[0].clientWidth; var widths={left:0,right:0,top:0,bottom:el.innerHeight()-el[0].clientHeight
};if(getIsLeftRtlScrollbars()&&el.css('direction')=='rtl'){widths.left=leftRightWidth;}
else{widths.right=leftRightWidth;}
return widths;}
var _isLeftRtlScrollbars=null;function getIsLeftRtlScrollbars(){ if(_isLeftRtlScrollbars===null){_isLeftRtlScrollbars=computeIsLeftRtlScrollbars();}
return _isLeftRtlScrollbars;}
function computeIsLeftRtlScrollbars(){ var el=$('<div><div/></div>').css({position:'absolute',top:-1000,left:0,border:0,padding:0,overflow:'scroll',direction:'rtl'}).appendTo('body');var innerEl=el.children();var res=innerEl.offset().left>el.offset().left;el.remove();return res;}
function getCssFloat(el,prop){return parseFloat(el.css(prop))||0;}
function isPrimaryMouseButton(ev){return ev.which==1&&!ev.ctrlKey;}
fc.intersectRects=intersectRects;function intersectRects(rect1,rect2){var res={left:Math.max(rect1.left,rect2.left),right:Math.min(rect1.right,rect2.right),top:Math.max(rect1.top,rect2.top),bottom:Math.min(rect1.bottom,rect2.bottom)};if(res.left<res.right&&res.top<res.bottom){return res;}
return false;}
function constrainPoint(point,rect){return{left:Math.min(Math.max(point.left,rect.left),rect.right),top:Math.min(Math.max(point.top,rect.top),rect.bottom)};}
function getRectCenter(rect){return{left:(rect.left+rect.right)/2,top:(rect.top+rect.bottom)/2};}
function diffPoints(point1,point2){return{left:point1.left-point2.left,top:point1.top-point2.top};}
fc.parseFieldSpecs=parseFieldSpecs;fc.compareByFieldSpecs=compareByFieldSpecs;fc.compareByFieldSpec=compareByFieldSpec;fc.flexibleCompare=flexibleCompare;function parseFieldSpecs(input){var specs=[];var tokens=[];var i,token;if(typeof input==='string'){tokens=input.split(/\s*,\s*/);}
else if(typeof input==='function'){tokens=[input];}
else if($.isArray(input)){tokens=input;}
for(i=0;i<tokens.length;i++){token=tokens[i];if(typeof token==='string'){specs.push(token.charAt(0)=='-'?{field:token.substring(1),order:-1}:{field:token,order:1});}
else if(typeof token==='function'){specs.push({func:token});}}
return specs;}
function compareByFieldSpecs(obj1,obj2,fieldSpecs){var i;var cmp;for(i=0;i<fieldSpecs.length;i++){cmp=compareByFieldSpec(obj1,obj2,fieldSpecs[i]);if(cmp){return cmp;}}
return 0;}
function compareByFieldSpec(obj1,obj2,fieldSpec){if(fieldSpec.func){return fieldSpec.func(obj1,obj2);}
return flexibleCompare(obj1[fieldSpec.field],obj2[fieldSpec.field])*(fieldSpec.order||1);}
function flexibleCompare(a,b){if(!a&&!b){return 0;}
if(b==null){return-1;}
if(a==null){return 1;}
if($.type(a)==='string'||$.type(b)==='string'){return String(a).localeCompare(String(b));}
return a-b;}
function intersectionToSeg(subjectRange,constraintRange){var subjectStart=subjectRange.start;var subjectEnd=subjectRange.end;var constraintStart=constraintRange.start;var constraintEnd=constraintRange.end;var segStart,segEnd;var isStart,isEnd;if(subjectEnd>constraintStart&&subjectStart<constraintEnd){if(subjectStart>=constraintStart){segStart=subjectStart.clone();isStart=true;}
else{segStart=constraintStart.clone();isStart=false;}
if(subjectEnd<=constraintEnd){segEnd=subjectEnd.clone();isEnd=true;}
else{segEnd=constraintEnd.clone();isEnd=false;}
return{start:segStart,end:segEnd,isStart:isStart,isEnd:isEnd};}}
fc.computeIntervalUnit=computeIntervalUnit;fc.divideRangeByDuration=divideRangeByDuration;fc.divideDurationByDuration=divideDurationByDuration;fc.multiplyDuration=multiplyDuration;fc.durationHasTime=durationHasTime;var dayIDs=['sun','mon','tue','wed','thu','fri','sat'];var intervalUnits=['year','month','week','day','hour','minute','second','millisecond'];function diffDayTime(a,b){return moment.duration({days:a.clone().stripTime().diff(b.clone().stripTime(),'days'),ms:a.time()-b.time()
});}
function diffDay(a,b){return moment.duration({days:a.clone().stripTime().diff(b.clone().stripTime(),'days')});}
function diffByUnit(a,b,unit){return moment.duration(Math.round(a.diff(b,unit,true)), unit);}
function computeIntervalUnit(start,end){var i,unit;var val;for(i=0;i<intervalUnits.length;i++){unit=intervalUnits[i];val=computeRangeAs(unit,start,end);if(val>=1&&isInt(val)){break;}}
return unit;}

function computeRangeAs(unit,start,end){if(end!=null){ return end.diff(start,unit,true);}
else if(moment.isDuration(start)){ return start.as(unit);}
else{ return start.end.diff(start.start,unit,true);}}
function divideRangeByDuration(start,end,dur){var months;if(durationHasTime(dur)){return(end-start)/dur;}
months=dur.asMonths();if(Math.abs(months)>=1&&isInt(months)){return end.diff(start,'months',true)/months;}
return end.diff(start,'days',true)/dur.asDays();}
function divideDurationByDuration(dur1,dur2){var months1,months2;if(durationHasTime(dur1)||durationHasTime(dur2)){return dur1/dur2;}
months1=dur1.asMonths();months2=dur2.asMonths();if(Math.abs(months1)>=1&&isInt(months1)&&Math.abs(months2)>=1&&isInt(months2)){return months1/months2;}
return dur1.asDays()/dur2.asDays();}
function multiplyDuration(dur,n){var months;if(durationHasTime(dur)){return moment.duration(dur*n);}
months=dur.asMonths();if(Math.abs(months)>=1&&isInt(months)){return moment.duration({months:months*n});}
return moment.duration({days:dur.asDays()*n});}
function durationHasTime(dur){return Boolean(dur.hours()||dur.minutes()||dur.seconds()||dur.milliseconds());}
function isNativeDate(input){return Object.prototype.toString.call(input)==='[object Date]'||input instanceof Date;}
function isTimeString(str){return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(str);}
fc.log=function(){var console=window.console;if(console&&console.log){return console.log.apply(console,arguments);}};fc.warn=function(){var console=window.console;if(console&&console.warn){return console.warn.apply(console,arguments);}
else{return fc.log.apply(fc,arguments);}};var hasOwnPropMethod={}.hasOwnProperty;function mergeProps(propObjs,complexProps){var dest={};var i,name;var complexObjs;var j,val;var props;if(complexProps){for(i=0;i<complexProps.length;i++){name=complexProps[i];complexObjs=[]; for(j=propObjs.length-1;j>=0;j--){val=propObjs[j][name];if(typeof val==='object'){complexObjs.unshift(val);}
else if(val!==undefined){dest[name]=val; break;}} 
if(complexObjs.length){dest[name]=mergeProps(complexObjs);}}} 
for(i=propObjs.length-1;i>=0;i--){props=propObjs[i];for(name in props){if(!(name in dest)){ dest[name]=props[name];}}}
return dest;}
function createObject(proto){var f=function(){};f.prototype=proto;return new f();}
function copyOwnProps(src,dest){for(var name in src){if(hasOwnProp(src,name)){dest[name]=src[name];}}}
function copyNativeMethods(src,dest){var names=['constructor','toString','valueOf'];var i,name;for(i=0;i<names.length;i++){name=names[i];if(src[name]!==Object.prototype[name]){dest[name]=src[name];}}}
function hasOwnProp(obj,name){return hasOwnPropMethod.call(obj,name);}
function isAtomic(val){return /undefined|null|boolean|number|string/.test($.type(val));}
function applyAll(functions,thisObj,args){if($.isFunction(functions)){functions=[functions];}
if(functions){var i;var ret;for(i=0;i<functions.length;i++){ret=functions[i].apply(thisObj,args)||ret;}
return ret;}}
function firstDefined(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined){return arguments[i];}}}
function htmlEscape(s){return(s+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#039;').replace(/"/g,'&quot;').replace(/\n/g,'<br />');}
function stripHtmlEntities(text){return text.replace(/&.*?;/g,'');}
function cssToStr(cssProps){var statements=[];$.each(cssProps,function(name,val){if(val!=null){statements.push(name+':'+val);}});return statements.join(';');}
function capitaliseFirstLetter(str){return str.charAt(0).toUpperCase()+str.slice(1);}
function compareNumbers(a,b){return a-b;}
function isInt(n){return n%1===0;}

function proxy(obj,methodName){var method=obj[methodName];return function(){return method.apply(obj,arguments);};}


function debounce(func,wait){var timeoutId;var args;var context;var timestamp; var later=function(){var last=+new Date()-timestamp;if(last<wait&&last>0){timeoutId=setTimeout(later,wait-last);}
else{timeoutId=null;func.apply(context,args);if(!timeoutId){context=args=null;}}};return function(){context=this;args=arguments;timestamp=+new Date();if(!timeoutId){timeoutId=setTimeout(later,wait);}};};;var ambigDateOfMonthRegex=/^\s*\d{4}-\d\d$/;var ambigTimeOrZoneRegex=/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/;var newMomentProto=moment.fn;var oldMomentProto=$.extend({},newMomentProto);var allowValueOptimization;var setUTCValues;var setLocalValues;



fc.moment=function(){return makeMoment(arguments);};fc.moment.utc=function(){var mom=makeMoment(arguments,true);
if(mom.hasTime()){ mom.utc();}
return mom;};fc.moment.parseZone=function(){return makeMoment(arguments,true,true);};
function makeMoment(args,parseAsUTC,parseZone){var input=args[0];var isSingleString=args.length==1&&typeof input==='string';var isAmbigTime;var isAmbigZone;var ambigMatch;var mom;if(moment.isMoment(input)){mom=moment.apply(null,args); transferAmbigs(input,mom);}
else if(isNativeDate(input)||input===undefined){mom=moment.apply(null,args);}
else{ isAmbigTime=false;isAmbigZone=false;if(isSingleString){if(ambigDateOfMonthRegex.test(input)){ input+='-01';args=[input]; isAmbigTime=true;isAmbigZone=true;}
else if((ambigMatch=ambigTimeOrZoneRegex.exec(input))){isAmbigTime=!ambigMatch[5];isAmbigZone=true;}}
else if($.isArray(input)){ isAmbigZone=true;} 
if(parseAsUTC||isAmbigTime){mom=moment.utc.apply(moment,args);}
else{mom=moment.apply(null,args);}
if(isAmbigTime){mom._ambigTime=true;mom._ambigZone=true;}
else if(parseZone){ if(isAmbigZone){mom._ambigZone=true;}
else if(isSingleString){if(mom.utcOffset){mom.utcOffset(input);}
else{mom.zone(input);}}}}
mom._fullCalendar=true; return mom;}
newMomentProto.clone=function(){var mom=oldMomentProto.clone.apply(this,arguments); transferAmbigs(this,mom);if(this._fullCalendar){mom._fullCalendar=true;}
return mom;};

newMomentProto.week=newMomentProto.weeks=function(input){var weekCalc=(this._locale||this._lang)
._fullCalendar_weekCalc;if(input==null&&typeof weekCalc==='function'){ return weekCalc(this);}
else if(weekCalc==='ISO'){return oldMomentProto.isoWeek.apply(this,arguments);}
return oldMomentProto.week.apply(this,arguments);};


newMomentProto.time=function(time){if(!this._fullCalendar){return oldMomentProto.time.apply(this,arguments);}
if(time==null){ return moment.duration({hours:this.hours(),minutes:this.minutes(),seconds:this.seconds(),milliseconds:this.milliseconds()});}
else{ this._ambigTime=false; if(!moment.isDuration(time)&&!moment.isMoment(time)){time=moment.duration(time);}
var dayHours=0;if(moment.isDuration(time)){dayHours=Math.floor(time.asDays())*24;}
return this.hours(dayHours+time.hours()).minutes(time.minutes()).seconds(time.seconds()).milliseconds(time.milliseconds());}};
newMomentProto.stripTime=function(){var a;if(!this._ambigTime){ a=this.toArray();
 this.utc();setUTCValues(this,a.slice(0,3));
this._ambigTime=true;this._ambigZone=true;}
return this;};newMomentProto.hasTime=function(){return!this._ambigTime;};


newMomentProto.stripZone=function(){var a,wasAmbigTime;if(!this._ambigZone){ a=this.toArray(); wasAmbigTime=this._ambigTime;this.utc();setUTCValues(this,a);
 this._ambigTime=wasAmbigTime||false;this._ambigZone=true;}
return this;};newMomentProto.hasZone=function(){return!this._ambigZone;};newMomentProto.local=function(){var a=this.toArray(); var wasAmbigZone=this._ambigZone;oldMomentProto.local.apply(this,arguments);
 this._ambigTime=false;this._ambigZone=false;if(wasAmbigZone){ setLocalValues(this,a);}
return this;};newMomentProto.utc=function(){oldMomentProto.utc.apply(this,arguments);
 this._ambigTime=false;this._ambigZone=false;return this;};$.each(['zone','utcOffset'],function(i,name){if(oldMomentProto[name]){newMomentProto[name]=function(tzo){if(tzo!=null){
this._ambigTime=false;this._ambigZone=false;}
return oldMomentProto[name].apply(this,arguments);};}});
newMomentProto.format=function(){if(this._fullCalendar&&arguments[0]){return formatDate(this,arguments[0]);}
if(this._ambigTime){return oldMomentFormat(this,'YYYY-MM-DD');}
if(this._ambigZone){return oldMomentFormat(this,'YYYY-MM-DD[T]HH:mm:ss');}
return oldMomentProto.format.apply(this,arguments);};newMomentProto.toISOString=function(){if(this._ambigTime){return oldMomentFormat(this,'YYYY-MM-DD');}
if(this._ambigZone){return oldMomentFormat(this,'YYYY-MM-DD[T]HH:mm:ss');}
return oldMomentProto.toISOString.apply(this,arguments);};
newMomentProto.isWithin=function(start,end){var a=commonlyAmbiguate([this,start,end]);return a[0]>=a[1]&&a[0]<a[2];};newMomentProto.isSame=function(input,units){var a; if(!this._fullCalendar){return oldMomentProto.isSame.apply(this,arguments);}
if(units){a=commonlyAmbiguate([this,input],true); return oldMomentProto.isSame.call(a[0],a[1],units);}
else{input=fc.moment.parseZone(input); return oldMomentProto.isSame.call(this,input)&&Boolean(this._ambigTime)===Boolean(input._ambigTime)&&Boolean(this._ambigZone)===Boolean(input._ambigZone);}};$.each(['isBefore','isAfter'],function(i,methodName){newMomentProto[methodName]=function(input,units){var a; if(!this._fullCalendar){return oldMomentProto[methodName].apply(this,arguments);}
a=commonlyAmbiguate([this,input]);return oldMomentProto[methodName].call(a[0],a[1],units);};});
function commonlyAmbiguate(inputs,preserveTime){var anyAmbigTime=false;var anyAmbigZone=false;var len=inputs.length;var moms=[];var i,mom; for(i=0;i<len;i++){mom=inputs[i];if(!moment.isMoment(mom)){mom=fc.moment.parseZone(mom);}
anyAmbigTime=anyAmbigTime||mom._ambigTime;anyAmbigZone=anyAmbigZone||mom._ambigZone;moms.push(mom);}
 
for(i=0;i<len;i++){mom=moms[i];if(!preserveTime&&anyAmbigTime&&!mom._ambigTime){moms[i]=mom.clone().stripTime();}
else if(anyAmbigZone&&!mom._ambigZone){moms[i]=mom.clone().stripZone();}}
return moms;}

function transferAmbigs(src,dest){if(src._ambigTime){dest._ambigTime=true;}
else if(dest._ambigTime){dest._ambigTime=false;}
if(src._ambigZone){dest._ambigZone=true;}
else if(dest._ambigZone){dest._ambigZone=false;}}
function setMomentValues(mom,a){mom.year(a[0]||0).month(a[1]||0).date(a[2]||0).hours(a[3]||0).minutes(a[4]||0).seconds(a[5]||0).milliseconds(a[6]||0);}
allowValueOptimization='_d'in moment()&&'updateOffset'in moment;setUTCValues=allowValueOptimization?function(mom,a){ mom._d.setTime(Date.UTC.apply(Date,a));moment.updateOffset(mom,false);}:setMomentValues;setLocalValues=allowValueOptimization?function(mom,a){ mom._d.setTime(+new Date( a[0]||0,a[1]||0,a[2]||0,a[3]||0,a[4]||0,a[5]||0,a[6]||0));moment.updateOffset(mom,false);}:setMomentValues;;;
function oldMomentFormat(mom,formatStr){return oldMomentProto.format.call(mom,formatStr);}

function formatDate(date,formatStr){return formatDateWithChunks(date,getFormatStringChunks(formatStr));}
function formatDateWithChunks(date,chunks){var s='';var i;for(i=0;i<chunks.length;i++){s+=formatDateWithChunk(date,chunks[i]);}
return s;}
var tokenOverrides={t:function(date){return oldMomentFormat(date,'a').charAt(0);},T:function(date){return oldMomentFormat(date,'A').charAt(0);}};function formatDateWithChunk(date,chunk){var token;var maybeStr;if(typeof chunk==='string'){ return chunk;}
else if((token=chunk.token)){if(tokenOverrides[token]){return tokenOverrides[token](date);}
return oldMomentFormat(date,token);}
else if(chunk.maybe){ maybeStr=formatDateWithChunks(date,chunk.maybe);if(maybeStr.match(/[1-9]/)){return maybeStr;}}
return'';}




function formatRange(date1,date2,formatStr,separator,isRTL){var localeData;date1=fc.moment.parseZone(date1);date2=fc.moment.parseZone(date2);localeData=(date1.localeData||date1.lang).call(date1);
formatStr=localeData.longDateFormat(formatStr)||formatStr;
separator=separator||' - ';return formatRangeWithChunks(date1,date2,getFormatStringChunks(formatStr),separator,isRTL);}
fc.formatRange=formatRange;function formatRangeWithChunks(date1,date2,chunks,separator,isRTL){var chunkStr; var leftI;var leftStr='';var rightI;var rightStr='';var middleI;var middleStr1='';var middleStr2='';var middleStr='';
for(leftI=0;leftI<chunks.length;leftI++){chunkStr=formatSimilarChunk(date1,date2,chunks[leftI]);if(chunkStr===false){break;}
leftStr+=chunkStr;} 
for(rightI=chunks.length-1;rightI>leftI;rightI--){chunkStr=formatSimilarChunk(date1,date2,chunks[rightI]);if(chunkStr===false){break;}
rightStr=chunkStr+rightStr;}
for(middleI=leftI;middleI<=rightI;middleI++){middleStr1+=formatDateWithChunk(date1,chunks[middleI]);middleStr2+=formatDateWithChunk(date2,chunks[middleI]);}
if(middleStr1||middleStr2){if(isRTL){middleStr=middleStr2+separator+middleStr1;}
else{middleStr=middleStr1+separator+middleStr2;}}
return leftStr+middleStr+rightStr;}
var similarUnitMap={Y:'year',M:'month',D:'day', d:'day',
A:'second', a:'second', T:'second', t:'second', H:'second',h:'second',m:'second', s:'second'};
function formatSimilarChunk(date1,date2,chunk){var token;var unit;if(typeof chunk==='string'){ return chunk;}
else if((token=chunk.token)){unit=similarUnitMap[token.charAt(0)];if(unit&&date1.isSame(date2,unit)){return oldMomentFormat(date1,token);}}
return false;
}

var formatStringChunkCache={};function getFormatStringChunks(formatStr){if(formatStr in formatStringChunkCache){return formatStringChunkCache[formatStr];}
return(formatStringChunkCache[formatStr]=chunkFormatString(formatStr));}
function chunkFormatString(formatStr){var chunks=[];var chunker=/\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; var match;while((match=chunker.exec(formatStr))){if(match[1]){chunks.push(match[1]);}
else if(match[2]){chunks.push({maybe:chunkFormatString(match[2])});}
else if(match[3]){ chunks.push({token:match[3]});}
else if(match[5]){ chunks.push(match[5]);}}
return chunks;};;fc.Class=Class;
function Class(){}
Class.extend=function(members){var superClass=this;var subClass;members=members||{}; if(hasOwnProp(members,'constructor')){subClass=members.constructor;}
if(typeof subClass!=='function'){subClass=members.constructor=function(){superClass.apply(this,arguments);};} 
subClass.prototype=createObject(superClass.prototype); copyOwnProps(members,subClass.prototype);copyNativeMethods(members,subClass.prototype);
copyOwnProps(superClass,subClass);return subClass;};Class.mixin=function(members){copyOwnProps(members.prototype||members,this.prototype);};;;var Emitter=fc.Emitter=Class.extend({callbackHash:null,on:function(name,callback){this.getCallbacks(name).add(callback);return this;},off:function(name,callback){this.getCallbacks(name).remove(callback);return this;},trigger:function(name){var args=Array.prototype.slice.call(arguments,1);this.triggerWith(name,this,args);return this;},triggerWith:function(name,context,args){var callbacks=this.getCallbacks(name);callbacks.fireWith(context,args);return this;},getCallbacks:function(name){var callbacks;if(!this.callbackHash){this.callbackHash={};}
callbacks=this.callbackHash[name];if(!callbacks){callbacks=this.callbackHash[name]=$.Callbacks();}
return callbacks;}});;;var Popover=Class.extend({isHidden:true,options:null,el:null, documentMousedownProxy:null,margin:10, constructor:function(options){this.options=options||{};}, show:function(){if(this.isHidden){if(!this.el){this.render();}
this.el.show();this.position();this.isHidden=false;this.trigger('show');}}, hide:function(){if(!this.isHidden){this.el.hide();this.isHidden=true;this.trigger('hide');}}, render:function(){var _this=this;var options=this.options;this.el=$('<div class="fc-popover"/>').addClass(options.className||'').css({ top:0,left:0}).append(options.content).appendTo(options.parentEl); this.el.on('click','.fc-close',function(){_this.hide();});if(options.autoHide){$(document).on('mousedown',this.documentMousedownProxy=proxy(this,'documentMousedown'));}}, documentMousedown:function(ev){ if(this.el&&!$(ev.target).closest(this.el).length){this.hide();}}, removeElement:function(){this.hide();if(this.el){this.el.remove();this.el=null;}
$(document).off('mousedown',this.documentMousedownProxy);}, position:function(){var options=this.options;var origin=this.el.offsetParent().offset();var width=this.el.outerWidth();var height=this.el.outerHeight();var windowEl=$(window);var viewportEl=getScrollParent(this.el);var viewportTop;var viewportLeft;var viewportOffset;var top; var left; top=options.top||0;if(options.left!==undefined){left=options.left;}
else if(options.right!==undefined){left=options.right-width;}
else{left=0;}
if(viewportEl.is(window)||viewportEl.is(document)){ viewportEl=windowEl;viewportTop=0; viewportLeft=0;}
else{viewportOffset=viewportEl.offset();viewportTop=viewportOffset.top;viewportLeft=viewportOffset.left;} 
viewportTop+=windowEl.scrollTop();viewportLeft+=windowEl.scrollLeft(); if(options.viewportConstrain!==false){top=Math.min(top,viewportTop+viewportEl.outerHeight()-height-this.margin);top=Math.max(top,viewportTop+this.margin);left=Math.min(left,viewportLeft+viewportEl.outerWidth()-width-this.margin);left=Math.max(left,viewportLeft+this.margin);}
this.el.css({top:top-origin.top,left:left-origin.left});}, trigger:function(name){if(this.options[name]){this.options[name].apply(this,Array.prototype.slice.call(arguments,1));}}});;;var GridCoordMap=Class.extend({grid:null, rowCoords:null, colCoords:null, containerEl:null, bounds:null,constructor:function(grid){this.grid=grid;}, build:function(){this.grid.build();this.rowCoords=this.grid.computeRowCoords();this.colCoords=this.grid.computeColCoords();this.computeBounds();}, clear:function(){this.grid.clear();this.rowCoords=null;this.colCoords=null;}, getCell:function(x,y){var rowCoords=this.rowCoords;var rowCnt=rowCoords.length;var colCoords=this.colCoords;var colCnt=colCoords.length;var hitRow=null;var hitCol=null;var i,coords;var cell;if(this.inBounds(x,y)){for(i=0;i<rowCnt;i++){coords=rowCoords[i];if(y>=coords.top&&y<coords.bottom){hitRow=i;break;}}
for(i=0;i<colCnt;i++){coords=colCoords[i];if(x>=coords.left&&x<coords.right){hitCol=i;break;}}
if(hitRow!==null&&hitCol!==null){cell=this.grid.getCell(hitRow,hitCol); cell.grid=this.grid;
 $.extend(cell,rowCoords[hitRow],colCoords[hitCol]);return cell;}}
return null;}, computeBounds:function(){this.bounds=this.containerEl?getClientRect(this.containerEl): null;}, inBounds:function(x,y){var bounds=this.bounds;if(bounds){return x>=bounds.left&&x<bounds.right&&y>=bounds.top&&y<bounds.bottom;}
return true;}});var ComboCoordMap=Class.extend({coordMaps:null, constructor:function(coordMaps){this.coordMaps=coordMaps;}, build:function(){var coordMaps=this.coordMaps;var i;for(i=0;i<coordMaps.length;i++){coordMaps[i].build();}}, getCell:function(x,y){var coordMaps=this.coordMaps;var cell=null;var i;for(i=0;i<coordMaps.length&&!cell;i++){cell=coordMaps[i].getCell(x,y);}
return cell;}, clear:function(){var coordMaps=this.coordMaps;var i;for(i=0;i<coordMaps.length;i++){coordMaps[i].clear();}}});;;var DragListener=fc.DragListener=Class.extend({options:null,isListening:false,isDragging:false, originX:null,originY:null,mousemoveProxy:null,mouseupProxy:null, subjectEl:null, subjectHref:null,scrollEl:null,scrollBounds:null,scrollTopVel:null, scrollLeftVel:null, scrollIntervalId:null, scrollHandlerProxy:null, scrollSensitivity:30, scrollSpeed:200, scrollIntervalMs:50, constructor:function(options){options=options||{};this.options=options;this.subjectEl=options.subjectEl;}, mousedown:function(ev){if(isPrimaryMouseButton(ev)){ev.preventDefault(); this.startListening(ev); if(!this.options.distance){this.startDrag(ev);}}}, startListening:function(ev){var scrollParent;if(!this.isListening){ if(ev&&this.options.scroll){scrollParent=getScrollParent($(ev.target));if(!scrollParent.is(window)&&!scrollParent.is(document)){this.scrollEl=scrollParent; this.scrollHandlerProxy=debounce(proxy(this,'scrollHandler'),100);this.scrollEl.on('scroll',this.scrollHandlerProxy);}}
$(document).on('mousemove',this.mousemoveProxy=proxy(this,'mousemove')).on('mouseup',this.mouseupProxy=proxy(this,'mouseup')).on('selectstart',this.preventDefault); if(ev){this.originX=ev.pageX;this.originY=ev.pageY;}
else{this.originX=0;this.originY=0;}
this.isListening=true;this.listenStart(ev);}},listenStart:function(ev){this.trigger('listenStart',ev);}, mousemove:function(ev){var dx=ev.pageX-this.originX;var dy=ev.pageY-this.originY;var minDistance;var distanceSq; if(!this.isDragging){ minDistance=this.options.distance||1;distanceSq=dx*dx+dy*dy;if(distanceSq>=minDistance*minDistance){ this.startDrag(ev);}}
if(this.isDragging){this.drag(dx,dy,ev);}}, startDrag:function(ev){if(!this.isListening){ this.startListening();}
if(!this.isDragging){this.isDragging=true;this.dragStart(ev);}},dragStart:function(ev){var subjectEl=this.subjectEl;this.trigger('dragStart',ev);if((this.subjectHref=subjectEl?subjectEl.attr('href'):null)){subjectEl.removeAttr('href');}}, drag:function(dx,dy,ev){this.trigger('drag',dx,dy,ev);this.updateScroll(ev);}, mouseup:function(ev){this.stopListening(ev);},stopDrag:function(ev){if(this.isDragging){this.stopScrolling();this.dragStop(ev);this.isDragging=false;}}, dragStop:function(ev){var _this=this;this.trigger('dragStop',ev);setTimeout(function(){ if(_this.subjectHref){_this.subjectEl.attr('href',_this.subjectHref);}},0);}, stopListening:function(ev){this.stopDrag(ev); if(this.isListening){ if(this.scrollEl){this.scrollEl.off('scroll',this.scrollHandlerProxy);this.scrollHandlerProxy=null;}
$(document).off('mousemove',this.mousemoveProxy).off('mouseup',this.mouseupProxy).off('selectstart',this.preventDefault);this.mousemoveProxy=null;this.mouseupProxy=null;this.isListening=false;this.listenStop(ev);}}, listenStop:function(ev){this.trigger('listenStop',ev);},trigger:function(name){if(this.options[name]){this.options[name].apply(this,Array.prototype.slice.call(arguments,1));}},preventDefault:function(ev){ev.preventDefault();}, computeScrollBounds:function(){var el=this.scrollEl;this.scrollBounds=el?getOuterRect(el):null;}, updateScroll:function(ev){var sensitivity=this.scrollSensitivity;var bounds=this.scrollBounds;var topCloseness,bottomCloseness;var leftCloseness,rightCloseness;var topVel=0;var leftVel=0;if(bounds){
 topCloseness=(sensitivity-(ev.pageY-bounds.top))/sensitivity;bottomCloseness=(sensitivity-(bounds.bottom-ev.pageY))/sensitivity;leftCloseness=(sensitivity-(ev.pageX-bounds.left))/sensitivity;rightCloseness=(sensitivity-(bounds.right-ev.pageX))/sensitivity;if(topCloseness>=0&&topCloseness<=1){topVel=topCloseness*this.scrollSpeed*-1;}
else if(bottomCloseness>=0&&bottomCloseness<=1){topVel=bottomCloseness*this.scrollSpeed;} 
if(leftCloseness>=0&&leftCloseness<=1){leftVel=leftCloseness*this.scrollSpeed*-1;}
else if(rightCloseness>=0&&rightCloseness<=1){leftVel=rightCloseness*this.scrollSpeed;}}
this.setScrollVel(topVel,leftVel);}, setScrollVel:function(topVel,leftVel){this.scrollTopVel=topVel;this.scrollLeftVel=leftVel;this.constrainScrollVel();
 if((this.scrollTopVel||this.scrollLeftVel)&&!this.scrollIntervalId){this.scrollIntervalId=setInterval(proxy(this,'scrollIntervalFunc'),this.scrollIntervalMs);}}, constrainScrollVel:function(){var el=this.scrollEl;if(this.scrollTopVel<0){if(el.scrollTop()<=0){this.scrollTopVel=0;}}
else if(this.scrollTopVel>0){if(el.scrollTop()+el[0].clientHeight>=el[0].scrollHeight){this.scrollTopVel=0;}}
if(this.scrollLeftVel<0){if(el.scrollLeft()<=0){this.scrollLeftVel=0;}}
else if(this.scrollLeftVel>0){if(el.scrollLeft()+el[0].clientWidth>=el[0].scrollWidth){this.scrollLeftVel=0;}}}, scrollIntervalFunc:function(){var el=this.scrollEl;var frac=this.scrollIntervalMs/1000;
 if(this.scrollTopVel){el.scrollTop(el.scrollTop()+this.scrollTopVel*frac);}
if(this.scrollLeftVel){el.scrollLeft(el.scrollLeft()+this.scrollLeftVel*frac);}
this.constrainScrollVel();
 if(!this.scrollTopVel&&!this.scrollLeftVel){this.stopScrolling();}}, stopScrolling:function(){if(this.scrollIntervalId){clearInterval(this.scrollIntervalId);this.scrollIntervalId=null; this.scrollStop();}},scrollHandler:function(){ if(!this.scrollIntervalId){this.scrollStop();}}, scrollStop:function(){}});;;var CellDragListener=DragListener.extend({coordMap:null, origCell:null, cell:null, coordAdjust:null, constructor:function(coordMap,options){DragListener.prototype.constructor.call(this,options); this.coordMap=coordMap;},listenStart:function(ev){var subjectEl=this.subjectEl;var subjectRect;var origPoint;var point;DragListener.prototype.listenStart.apply(this,arguments); this.computeCoords();if(ev){origPoint={left:ev.pageX,top:ev.pageY};point=origPoint; if(subjectEl){subjectRect=getOuterRect(subjectEl); point=constrainPoint(point,subjectRect);}
this.origCell=this.getCell(point.left,point.top);if(subjectEl&&this.options.subjectCenter){ if(this.origCell){subjectRect=intersectRects(this.origCell,subjectRect)||subjectRect;}
point=getRectCenter(subjectRect);}
this.coordAdjust=diffPoints(point,origPoint);}
else{this.origCell=null;this.coordAdjust=null;}}, computeCoords:function(){this.coordMap.build();this.computeScrollBounds();}, dragStart:function(ev){var cell;DragListener.prototype.dragStart.apply(this,arguments); cell=this.getCell(ev.pageX,ev.pageY);

 if(cell){this.cellOver(cell);}}, drag:function(dx,dy,ev){var cell;DragListener.prototype.drag.apply(this,arguments); cell=this.getCell(ev.pageX,ev.pageY);if(!isCellsEqual(cell,this.cell)){if(this.cell){this.cellOut();}
if(cell){this.cellOver(cell);}}}, dragStop:function(){this.cellDone();DragListener.prototype.dragStop.apply(this,arguments);}, cellOver:function(cell){this.cell=cell;this.trigger('cellOver',cell,isCellsEqual(cell,this.origCell),this.origCell);}, cellOut:function(){if(this.cell){this.trigger('cellOut',this.cell);this.cellDone();this.cell=null;}}, cellDone:function(){if(this.cell){this.trigger('cellDone',this.cell);}}, listenStop:function(){DragListener.prototype.listenStop.apply(this,arguments); this.origCell=this.cell=null;this.coordMap.clear();}, scrollStop:function(){DragListener.prototype.scrollStop.apply(this,arguments); this.computeCoords();}, getCell:function(left,top){if(this.coordAdjust){left+=this.coordAdjust.left;top+=this.coordAdjust.top;}
return this.coordMap.getCell(left,top);}});function isCellsEqual(cell1,cell2){if(!cell1&&!cell2){return true;}
if(cell1&&cell2){return cell1.grid===cell2.grid&&cell1.row===cell2.row&&cell1.col===cell2.col;}
return false;};;var MouseFollower=Class.extend({options:null,sourceEl:null, el:null, parentEl:null,
 top0:null,left0:null, mouseY0:null,mouseX0:null, topDelta:null,leftDelta:null,mousemoveProxy:null,isFollowing:false,isHidden:false,isAnimating:false,constructor:function(sourceEl,options){this.options=options=options||{};this.sourceEl=sourceEl;this.parentEl=options.parentEl?$(options.parentEl):sourceEl.parent();}, start:function(ev){if(!this.isFollowing){this.isFollowing=true;this.mouseY0=ev.pageY;this.mouseX0=ev.pageX;this.topDelta=0;this.leftDelta=0;if(!this.isHidden){this.updatePosition();}
$(document).on('mousemove',this.mousemoveProxy=proxy(this,'mousemove'));}},stop:function(shouldRevert,callback){var _this=this;var revertDuration=this.options.revertDuration;function complete(){this.isAnimating=false;_this.removeElement();this.top0=this.left0=null; if(callback){callback();}}
if(this.isFollowing&&!this.isAnimating){ this.isFollowing=false;$(document).off('mousemove',this.mousemoveProxy);if(shouldRevert&&revertDuration&&!this.isHidden){this.isAnimating=true;this.el.animate({top:this.top0,left:this.left0},{duration:revertDuration,complete:complete});}
else{complete();}}}, getEl:function(){var el=this.el;if(!el){this.sourceEl.width(); el=this.el=this.sourceEl.clone().css({position:'absolute',visibility:'',display:this.isHidden?'none':'', margin:0,right:'auto', bottom:'auto', width:this.sourceEl.width(), height:this.sourceEl.height(), opacity:this.options.opacity||'',zIndex:this.options.zIndex}).appendTo(this.parentEl);}
return el;}, removeElement:function(){if(this.el){this.el.remove();this.el=null;}}, updatePosition:function(){var sourceOffset;var origin;this.getEl();
 if(this.top0===null){this.sourceEl.width(); sourceOffset=this.sourceEl.offset();origin=this.el.offsetParent().offset();this.top0=sourceOffset.top-origin.top;this.left0=sourceOffset.left-origin.left;}
this.el.css({top:this.top0+this.topDelta,left:this.left0+this.leftDelta});}, mousemove:function(ev){this.topDelta=ev.pageY-this.mouseY0;this.leftDelta=ev.pageX-this.mouseX0;if(!this.isHidden){this.updatePosition();}}, hide:function(){if(!this.isHidden){this.isHidden=true;if(this.el){this.el.hide();}}}, show:function(){if(this.isHidden){this.isHidden=false;this.updatePosition();this.getEl().show();}}});;;var RowRenderer=Class.extend({view:null, isRTL:null, cellHtml:'<td/>', constructor:function(view){this.view=view;this.isRTL=view.opt('isRTL');},rowHtml:function(rowType,row){var renderCell=this.getHtmlRenderer('cell',rowType);var rowCellHtml='';var col;var cell;row=row||0;for(col=0;col<this.colCnt;col++){cell=this.getCell(row,col);rowCellHtml+=renderCell(cell);}
rowCellHtml=this.bookendCells(rowCellHtml,rowType,row); return'<tr>'+rowCellHtml+'</tr>';},
bookendCells:function(cells,rowType,row){var intro=this.getHtmlRenderer('intro',rowType)(row||0);var outro=this.getHtmlRenderer('outro',rowType)(row||0);var prependHtml=this.isRTL?outro:intro;var appendHtml=this.isRTL?intro:outro;if(typeof cells==='string'){return prependHtml+cells+appendHtml;}
else{ return cells.prepend(prependHtml).append(appendHtml);}},
getHtmlRenderer:function(rendererName,rowType){var view=this.view;var generalName;var specificName; var provider; var renderer;generalName=rendererName+'Html';if(rowType){specificName=rowType+capitaliseFirstLetter(rendererName)+'Html';}
if(specificName&&(renderer=view[specificName])){provider=view;}
else if(specificName&&(renderer=this[specificName])){provider=this;}
else if((renderer=view[generalName])){provider=view;}
else if((renderer=this[generalName])){provider=this;}
if(typeof renderer==='function'){return function(){return renderer.apply(provider,arguments)||'';};}
return function(){return renderer||'';};}});;;var Grid=fc.Grid=RowRenderer.extend({start:null, end:null, rowCnt:0, colCnt:0, el:null, coordMap:null, elsByFill:null,externalDragStartProxy:null, 
colHeadFormat:null, eventTimeFormat:null,displayEventTime:null,displayEventEnd:null,cellDuration:null,
largeUnit:null,constructor:function(){RowRenderer.apply(this,arguments); this.coordMap=new GridCoordMap(this);this.elsByFill={};this.externalDragStartProxy=proxy(this,'externalDragStart');}, computeColHeadFormat:function(){},computeEventTimeFormat:function(){return this.view.opt('smallTimeFormat');},computeDisplayEventTime:function(){return true;},computeDisplayEventEnd:function(){return true;},setRange:function(range){this.start=range.start.clone();this.end=range.end.clone();this.rangeUpdated();this.processRangeOptions();}, rangeUpdated:function(){}, processRangeOptions:function(){var view=this.view;var displayEventTime;var displayEventEnd;this.colHeadFormat=view.opt('columnFormat')||this.computeColHeadFormat();this.eventTimeFormat=view.opt('eventTimeFormat')||view.opt('timeFormat')|| this.computeEventTimeFormat();displayEventTime=view.opt('displayEventTime');if(displayEventTime==null){displayEventTime=this.computeDisplayEventTime();}
displayEventEnd=view.opt('displayEventEnd');if(displayEventEnd==null){displayEventEnd=this.computeDisplayEventEnd();}
this.displayEventTime=displayEventTime;this.displayEventEnd=displayEventEnd;},build:function(){},clear:function(){}, rangeToSegs:function(range){}, diffDates:function(a,b){if(this.largeUnit){return diffByUnit(a,b,this.largeUnit);}
else{return diffDayTime(a,b);}},
getCell:function(row,col){var cell;if(col==null){if(typeof row==='number'){ col=row%this.colCnt;row=Math.floor(row/this.colCnt);}
else{ col=row.col;row=row.row;}}
cell={row:row,col:col};$.extend(cell,this.getRowData(row),this.getColData(col));$.extend(cell,this.computeCellRange(cell));return cell;},
computeCellRange:function(cell){var date=this.computeCellDate(cell);return{start:date,end:date.clone().add(this.cellDuration)};},computeCellDate:function(cell){}, getRowData:function(row){return{};},  getColData:function(col){return{};},  getRowEl:function(row){}, getColEl:function(col){}, getCellDayEl:function(cell){return this.getColEl(cell.col)||this.getRowEl(cell.row);},computeRowCoords:function(){var items=[];var i,el;var top;for(i=0;i<this.rowCnt;i++){el=this.getRowEl(i);top=el.offset().top;items.push({top:top,bottom:top+el.outerHeight()});}
return items;},computeColCoords:function(){var items=[];var i,el;var left;for(i=0;i<this.colCnt;i++){el=this.getColEl(i);left=el.offset().left;items.push({left:left,right:left+el.outerWidth()});}
return items;},setElement:function(el){var _this=this;this.el=el;el.on('mousedown',function(ev){if(!$(ev.target).is('.fc-event-container *, .fc-more')&&!$(ev.target).closest('.fc-popover').length
){_this.dayMousedown(ev);}});
this.bindSegHandlers();this.bindGlobalHandlers();}, removeElement:function(){this.unbindGlobalHandlers();this.el.remove();}, renderSkeleton:function(){},renderDates:function(){}, unrenderDates:function(){}, bindGlobalHandlers:function(){$(document).on('dragstart sortstart',this.externalDragStartProxy);}, unbindGlobalHandlers:function(){$(document).off('dragstart sortstart',this.externalDragStartProxy);},dayMousedown:function(ev){var _this=this;var view=this.view;var isSelectable=view.opt('selectable');var dayClickCell; var selectionRange;
var dragListener=new CellDragListener(this.coordMap,{ scroll:view.opt('dragScroll'),dragStart:function(){view.unselect();},cellOver:function(cell,isOrig,origCell){if(origCell){ dayClickCell=isOrig?cell:null; if(isSelectable){selectionRange=_this.computeSelection(origCell,cell);if(selectionRange){_this.renderSelection(selectionRange);}
else{disableCursor();}}}},cellOut:function(cell){dayClickCell=null;selectionRange=null;_this.unrenderSelection();enableCursor();},listenStop:function(ev){if(dayClickCell){view.triggerDayClick(dayClickCell,_this.getCellDayEl(dayClickCell),ev);}
if(selectionRange){ view.reportSelection(selectionRange,ev);}
enableCursor();}});dragListener.mousedown(ev);},
 renderRangeHelper:function(range,sourceSeg){var fakeEvent=this.fabricateHelperEvent(range,sourceSeg);this.renderHelper(fakeEvent,sourceSeg);},fabricateHelperEvent:function(range,sourceSeg){var fakeEvent=sourceSeg?createObject(sourceSeg.event):{}; fakeEvent.start=range.start.clone();fakeEvent.end=range.end?range.end.clone():null;fakeEvent.allDay=null; this.view.calendar.normalizeEventRange(fakeEvent); fakeEvent.className=(fakeEvent.className||[]).concat('fc-helper'); if(!sourceSeg){fakeEvent.editable=false;}
return fakeEvent;}, renderHelper:function(event,sourceSeg){}, unrenderHelper:function(){},renderSelection:function(range){this.renderHighlight(this.selectionRangeToSegs(range));},unrenderSelection:function(){this.unrenderHighlight();},computeSelection:function(firstCell,lastCell){var dates=[firstCell.start,firstCell.end,lastCell.start,lastCell.end];var range;dates.sort(compareNumbers); range={start:dates[0].clone(),end:dates[3].clone()};if(!this.view.calendar.isSelectionRangeAllowed(range)){return null;}
return range;},selectionRangeToSegs:function(range){return this.rangeToSegs(range);},renderHighlight:function(segs){this.renderFill('highlight',segs);}, unrenderHighlight:function(){this.unrenderFill('highlight');},highlightSegClasses:function(){return['fc-highlight'];},     renderFill:function(type,segs){}, unrenderFill:function(type){var el=this.elsByFill[type];if(el){el.remove();delete this.elsByFill[type];}},renderFillSegEls:function(type,segs){var _this=this;var segElMethod=this[type+'SegEl'];var html='';var renderedSegs=[];var i;if(segs.length){ for(i=0;i<segs.length;i++){html+=this.fillSegHtml(type,segs[i]);}
$(html).each(function(i,node){var seg=segs[i];var el=$(node); if(segElMethod){el=segElMethod.call(_this,seg,el);}
if(el){ el=$(el);
if(el.is(_this.fillSegTag)){seg.el=el;renderedSegs.push(seg);}}});}
return renderedSegs;},fillSegTag:'div',
fillSegHtml:function(type,seg){ var classesMethod=this[type+'SegClasses'];var cssMethod=this[type+'SegCss'];var classes=classesMethod?classesMethod.call(this,seg):[];var css=cssToStr(cssMethod?cssMethod.call(this,seg):{});return'<'+this.fillSegTag+
(classes.length?' class="'+classes.join(' ')+'"':'')+
(css?' style="'+css+'"':'')+' />';}, headHtml:function(){return''+'<div class="fc-row '+this.view.widgetHeaderClass+'">'+'<table>'+'<thead>'+
this.rowHtml('head')+'</thead>'+'</table>'+'</div>';},
 headCellHtml:function(cell){var view=this.view;var date=cell.start;return''+'<th class="fc-day-header '+view.widgetHeaderClass+' fc-'+dayIDs[date.day()]+'">'+
htmlEscape(date.format(this.colHeadFormat))+'</th>';}, bgCellHtml:function(cell){var view=this.view;var date=cell.start;var classes=this.getDayClasses(date);classes.unshift('fc-day',view.widgetContentClass);return'<td class="'+classes.join(' ')+'"'+' data-date="'+date.format('YYYY-MM-DD')+'"'+'></td>';}, getDayClasses:function(date){var view=this.view;var today=view.calendar.getNow().stripTime();var classes=['fc-'+dayIDs[date.day()]];if(view.intervalDuration.as('months')==1&&date.month()!=view.intervalStart.month()){classes.push('fc-other-month');}
if(date.isSame(today,'day')){classes.push('fc-today',view.highlightStateClass);}
else if(date<today){classes.push('fc-past');}
else{classes.push('fc-future');}
return classes;}});;;Grid.mixin({mousedOverSeg:null, isDraggingSeg:false, isResizingSeg:false, isDraggingExternal:false, segs:null,
 renderEvents:function(events){var segs=this.eventsToSegs(events);var bgSegs=[];var fgSegs=[];var i,seg;for(i=0;i<segs.length;i++){seg=segs[i];if(isBgEvent(seg.event)){bgSegs.push(seg);}
else{fgSegs.push(seg);}}
bgSegs=this.renderBgSegs(bgSegs)||bgSegs;fgSegs=this.renderFgSegs(fgSegs)||fgSegs;this.segs=bgSegs.concat(fgSegs);}, unrenderEvents:function(){this.triggerSegMouseout(); this.unrenderFgSegs();this.unrenderBgSegs();this.segs=null;}, getEventSegs:function(){return this.segs||[];},renderFgSegs:function(segs){}, unrenderFgSegs:function(){},renderFgSegEls:function(segs,disableResizing){var view=this.view;var html='';var renderedSegs=[];var i;if(segs.length){
 for(i=0;i<segs.length;i++){html+=this.fgSegHtml(segs[i],disableResizing);}
$(html).each(function(i,node){var seg=segs[i];var el=view.resolveEventEl(seg.event,$(node));if(el){el.data('fc-seg',seg); seg.el=el;renderedSegs.push(seg);}});}
return renderedSegs;},fgSegHtml:function(seg,disableResizing){},renderBgSegs:function(segs){return this.renderFill('bgEvent',segs);}, unrenderBgSegs:function(){this.unrenderFill('bgEvent');},bgEventSegEl:function(seg,el){return this.view.resolveEventEl(seg.event,el);},bgEventSegClasses:function(seg){var event=seg.event;var source=event.source||{};return['fc-bgevent'].concat(event.className,source.className||[]);},bgEventSegCss:function(seg){var view=this.view;var event=seg.event;var source=event.source||{};return{'background-color':event.backgroundColor||event.color||source.backgroundColor||source.color||view.opt('eventBackgroundColor')||view.opt('eventColor')};},businessHoursSegClasses:function(seg){return['fc-nonbusiness','fc-bgevent'];},   bindSegHandlers:function(){var _this=this;var view=this.view;$.each({mouseenter:function(seg,ev){_this.triggerSegMouseover(seg,ev);},mouseleave:function(seg,ev){_this.triggerSegMouseout(seg,ev);},click:function(seg,ev){return view.trigger('eventClick',this,seg.event,ev);},mousedown:function(seg,ev){if($(ev.target).is('.fc-resizer')&&view.isEventResizable(seg.event)){_this.segResizeMousedown(seg,ev,$(ev.target).is('.fc-start-resizer'));}
else if(view.isEventDraggable(seg.event)){_this.segDragMousedown(seg,ev);}}},function(name,func){ _this.el.on(name,'.fc-event-container > *',function(ev){var seg=$(this).data('fc-seg');
 if(seg&&!_this.isDraggingSeg&&!_this.isResizingSeg){return func.call(this,seg,ev);}});});}, triggerSegMouseover:function(seg,ev){if(!this.mousedOverSeg){this.mousedOverSeg=seg;this.view.trigger('eventMouseover',seg.el[0],seg.event,ev);}},triggerSegMouseout:function(seg,ev){ev=ev||{}; if(this.mousedOverSeg){seg=seg||this.mousedOverSeg; this.mousedOverSeg=null;this.view.trigger('eventMouseout',seg.el[0],seg.event,ev);}},segDragMousedown:function(seg,ev){var _this=this;var view=this.view;var calendar=view.calendar;var el=seg.el;var event=seg.event;var dropLocation; var mouseFollower=new MouseFollower(seg.el,{parentEl:view.el,opacity:view.opt('dragOpacity'),revertDuration:view.opt('dragRevertDuration'),zIndex:2
});
var dragListener=new CellDragListener(view.coordMap,{distance:5,scroll:view.opt('dragScroll'),subjectEl:el,subjectCenter:true,listenStart:function(ev){mouseFollower.hide(); mouseFollower.start(ev);},dragStart:function(ev){_this.triggerSegMouseout(seg,ev); _this.segDragStart(seg,ev);view.hideEvent(event);},cellOver:function(cell,isOrig,origCell){if(seg.cell){origCell=seg.cell;}
dropLocation=_this.computeEventDrop(origCell,cell,event);if(dropLocation&&!calendar.isEventRangeAllowed(dropLocation,event)){disableCursor();dropLocation=null;} 
if(dropLocation&&view.renderDrag(dropLocation,seg)){mouseFollower.hide();}
else{mouseFollower.show();}
if(isOrig){dropLocation=null;}},cellOut:function(){ view.unrenderDrag(); mouseFollower.show(); dropLocation=null;},cellDone:function(){ enableCursor();},dragStop:function(ev){mouseFollower.stop(!dropLocation,function(){view.unrenderDrag();view.showEvent(event);_this.segDragStop(seg,ev);if(dropLocation){view.reportEventDrop(event,dropLocation,this.largeUnit,el,ev);}});},listenStop:function(){mouseFollower.stop();}});dragListener.mousedown(ev);}, segDragStart:function(seg,ev){this.isDraggingSeg=true;this.view.trigger('eventDragStart',seg.el[0],seg.event,ev,{});}, segDragStop:function(seg,ev){this.isDraggingSeg=false;this.view.trigger('eventDragStop',seg.el[0],seg.event,ev,{});},
computeEventDrop:function(startCell,endCell,event){var calendar=this.view.calendar;var dragStart=startCell.start;var dragEnd=endCell.start;var delta;var dropLocation;if(dragStart.hasTime()===dragEnd.hasTime()){delta=this.diffDates(dragEnd,dragStart); if(event.allDay&&durationHasTime(delta)){dropLocation={start:event.start.clone(),end:calendar.getEventEnd(event), allDay:false
};calendar.normalizeEventRangeTimes(dropLocation);} 
else{dropLocation={start:event.start.clone(),end:event.end?event.end.clone():null,allDay:event.allDay
};}
dropLocation.start.add(delta);if(dropLocation.end){dropLocation.end.add(delta);}}
else{ dropLocation={start:dragEnd.clone(),end:null, allDay:!dragEnd.hasTime()};}
return dropLocation;}, applyDragOpacity:function(els){var opacity=this.view.opt('dragOpacity');if(opacity!=null){els.each(function(i,node){node.style.opacity=opacity;});}}, externalDragStart:function(ev,ui){var view=this.view;var el;var accept;if(view.opt('droppable')){ el=$((ui?ui.item:null)||ev.target);accept=view.opt('dropAccept');if($.isFunction(accept)?accept.call(el[0],el):el.is(accept)){if(!this.isDraggingExternal){ this.listenToExternalDrag(el,ev,ui);}}}}, listenToExternalDrag:function(el,ev,ui){var _this=this;var meta=getDraggedElMeta(el); var dragListener;var dropLocation;
 dragListener=new CellDragListener(this.coordMap,{listenStart:function(){_this.isDraggingExternal=true;},cellOver:function(cell){dropLocation=_this.computeExternalDrop(cell,meta);if(dropLocation){_this.renderDrag(dropLocation);}
else{ disableCursor();}},cellOut:function(){dropLocation=null; _this.unrenderDrag();enableCursor();},dragStop:function(){_this.unrenderDrag();enableCursor();if(dropLocation){ _this.view.reportExternalDrop(meta,dropLocation,el,ev,ui);}},listenStop:function(){_this.isDraggingExternal=false;}});dragListener.startDrag(ev);},computeExternalDrop:function(cell,meta){var dropLocation={start:cell.start.clone(),end:null}; if(meta.startTime&&!dropLocation.start.hasTime()){dropLocation.start.time(meta.startTime);}
if(meta.duration){dropLocation.end=dropLocation.start.clone().add(meta.duration);}
if(!this.view.calendar.isExternalDropRangeAllowed(dropLocation,meta.eventProps)){return null;}
return dropLocation;},renderDrag:function(dropLocation,seg){}, unrenderDrag:function(){},segResizeMousedown:function(seg,ev,isStart){var _this=this;var view=this.view;var calendar=view.calendar;var el=seg.el;var event=seg.event;var eventEnd=calendar.getEventEnd(event);var dragListener;var resizeLocation;
 dragListener=new CellDragListener(this.coordMap,{distance:5,scroll:view.opt('dragScroll'),subjectEl:el,dragStart:function(ev){_this.triggerSegMouseout(seg,ev); _this.segResizeStart(seg,ev);},cellOver:function(cell,isOrig,origCell){resizeLocation=isStart?_this.computeEventStartResize(origCell,cell,event):_this.computeEventEndResize(origCell,cell,event);if(resizeLocation){if(!calendar.isEventRangeAllowed(resizeLocation,event)){disableCursor();resizeLocation=null;}
else if(resizeLocation.start.isSame(event.start)&&resizeLocation.end.isSame(eventEnd)){resizeLocation=null;}}
if(resizeLocation){view.hideEvent(event);_this.renderEventResize(resizeLocation,seg);}},cellOut:function(){ resizeLocation=null;},cellDone:function(){ _this.unrenderEventResize();view.showEvent(event);enableCursor();},dragStop:function(ev){_this.segResizeStop(seg,ev);if(resizeLocation){view.reportEventResize(event,resizeLocation,this.largeUnit,el,ev);}}});dragListener.mousedown(ev);}, segResizeStart:function(seg,ev){this.isResizingSeg=true;this.view.trigger('eventResizeStart',seg.el[0],seg.event,ev,{});}, segResizeStop:function(seg,ev){this.isResizingSeg=false;this.view.trigger('eventResizeStop',seg.el[0],seg.event,ev,{});}, computeEventStartResize:function(startCell,endCell,event){return this.computeEventResize('start',startCell,endCell,event);}, computeEventEndResize:function(startCell,endCell,event){return this.computeEventResize('end',startCell,endCell,event);},
computeEventResize:function(type,startCell,endCell,event){var calendar=this.view.calendar;var delta=this.diffDates(endCell[type],startCell[type]);var range;var defaultDuration; range={start:event.start.clone(),end:calendar.getEventEnd(event),allDay:event.allDay}; if(range.allDay&&durationHasTime(delta)){range.allDay=false;calendar.normalizeEventRangeTimes(range);}
range[type].add(delta);
 if(!range.start.isBefore(range.end)){defaultDuration=event.allDay?calendar.defaultAllDayEventDuration:calendar.defaultTimedEventDuration; if(this.cellDuration&&this.cellDuration<defaultDuration){defaultDuration=this.cellDuration;}
if(type=='start'){range.start=range.end.clone().subtract(defaultDuration);}
else{range.end=range.start.clone().add(defaultDuration);}}
return range;},renderEventResize:function(range,seg){},unrenderEventResize:function(){},getEventTimeText:function(range,formatStr,displayEnd){if(formatStr==null){formatStr=this.eventTimeFormat;}
if(displayEnd==null){displayEnd=this.displayEventEnd;}
if(this.displayEventTime&&range.start.hasTime()){if(displayEnd&&range.end){return this.view.formatRange(range,formatStr);}
else{return range.start.format(formatStr);}}
return'';},  getSegClasses:function(seg,isDraggable,isResizable){var event=seg.event;var classes=['fc-event',seg.isStart?'fc-start':'fc-not-start',seg.isEnd?'fc-end':'fc-not-end'].concat(event.className,event.source?event.source.className:[]);if(isDraggable){classes.push('fc-draggable');}
if(isResizable){classes.push('fc-resizable');}
return classes;}, getEventSkinCss:function(event){var view=this.view;var source=event.source||{};var eventColor=event.color;var sourceColor=source.color;var optionColor=view.opt('eventColor');return{'background-color':event.backgroundColor||eventColor||source.backgroundColor||sourceColor||view.opt('eventBackgroundColor')||optionColor,'border-color':event.borderColor||eventColor||source.borderColor||sourceColor||view.opt('eventBorderColor')||optionColor,color:event.textColor||source.textColor||view.opt('eventTextColor')};},eventsToSegs:function(events,rangeToSegsFunc){var eventRanges=this.eventsToRanges(events);var segs=[];var i;for(i=0;i<eventRanges.length;i++){segs.push.apply(segs,this.eventRangeToSegs(eventRanges[i],rangeToSegsFunc));}
return segs;},eventsToRanges:function(events){var _this=this;var eventsById=groupEventsById(events);var ranges=[]; $.each(eventsById,function(id,eventGroup){if(eventGroup.length){ranges.push.apply(ranges,isInverseBgEvent(eventGroup[0])?_this.eventsToInverseRanges(eventGroup):_this.eventsToNormalRanges(eventGroup));}});return ranges;}, eventsToNormalRanges:function(events){var calendar=this.view.calendar;var ranges=[];var i,event;var eventStart,eventEnd;for(i=0;i<events.length;i++){event=events[i]; eventStart=event.start.clone().stripZone();eventEnd=calendar.getEventEnd(event).stripZone();ranges.push({event:event,start:eventStart,end:eventEnd,eventStartMS:+eventStart,eventDurationMS:eventEnd-eventStart});}
return ranges;},eventsToInverseRanges:function(events){var view=this.view;var viewStart=view.start.clone().stripZone(); var viewEnd=view.end.clone().stripZone(); var normalRanges=this.eventsToNormalRanges(events); var inverseRanges=[];var event0=events[0];var start=viewStart; var i,normalRange; normalRanges.sort(compareNormalRanges);for(i=0;i<normalRanges.length;i++){normalRange=normalRanges[i];if(normalRange.start>start){inverseRanges.push({event:event0,start:start,end:normalRange.start});}
start=normalRange.end;}
if(start<viewEnd){inverseRanges.push({event:event0,start:start,end:viewEnd});}
return inverseRanges;},eventRangeToSegs:function(eventRange,rangeToSegsFunc){var segs;var i,seg;eventRange=this.view.calendar.ensureVisibleEventRange(eventRange);if(rangeToSegsFunc){segs=rangeToSegsFunc(eventRange);}
else{segs=this.rangeToSegs(eventRange);}
for(i=0;i<segs.length;i++){seg=segs[i];seg.event=eventRange.event;seg.eventStartMS=eventRange.eventStartMS;seg.eventDurationMS=eventRange.eventDurationMS;}
return segs;},sortSegs:function(segs){segs.sort(proxy(this,'compareSegs'));},
 compareSegs:function(seg1,seg2){return seg1.eventStartMS-seg2.eventStartMS|| seg2.eventDurationMS-seg1.eventDurationMS|| seg2.event.allDay-seg1.event.allDay||compareByFieldSpecs(seg1.event,seg2.event,this.view.eventOrderSpecs);}});function isBgEvent(event){ var rendering=getEventRendering(event);return rendering==='background'||rendering==='inverse-background';}
function isInverseBgEvent(event){return getEventRendering(event)==='inverse-background';}
function getEventRendering(event){return firstDefined((event.source||{}).rendering,event.rendering);}
function groupEventsById(events){var eventsById={};var i,event;for(i=0;i<events.length;i++){event=events[i];(eventsById[event._id]||(eventsById[event._id]=[])).push(event);}
return eventsById;}
function compareNormalRanges(range1,range2){return range1.eventStartMS-range2.eventStartMS;}
fc.dataAttrPrefix='';
function getDraggedElMeta(el){var prefix=fc.dataAttrPrefix;var eventProps; var startTime; var duration;var stick;if(prefix){prefix+='-';}
eventProps=el.data(prefix+'event')||null;if(eventProps){if(typeof eventProps==='object'){eventProps=$.extend({},eventProps);}
else{ eventProps={};} 
startTime=eventProps.start;if(startTime==null){startTime=eventProps.time;} 
duration=eventProps.duration;stick=eventProps.stick;delete eventProps.start;delete eventProps.time;delete eventProps.duration;delete eventProps.stick;} 
if(startTime==null){startTime=el.data(prefix+'start');}
if(startTime==null){startTime=el.data(prefix+'time');} 
if(duration==null){duration=el.data(prefix+'duration');}
if(stick==null){stick=el.data(prefix+'stick');} 
startTime=startTime!=null?moment.duration(startTime):null;duration=duration!=null?moment.duration(duration):null;stick=Boolean(stick);return{eventProps:eventProps,startTime:startTime,duration:duration,stick:stick};};;var DayGrid=Grid.extend({numbersVisible:false, bottomCoordPadding:0, breakOnWeeks:null, cellDates:null, dayToCellOffsets:null, rowEls:null, dayEls:null, helperEls:null,constructor:function(){Grid.apply(this,arguments);this.cellDuration=moment.duration(1,'day');},renderDates:function(isRigid){var view=this.view;var rowCnt=this.rowCnt;var colCnt=this.colCnt;var cellCnt=rowCnt*colCnt;var html='';var row;var i,cell;for(row=0;row<rowCnt;row++){html+=this.dayRowHtml(row,isRigid);}
this.el.html(html);this.rowEls=this.el.find('.fc-row');this.dayEls=this.el.find('.fc-day'); for(i=0;i<cellCnt;i++){cell=this.getCell(i);view.trigger('dayRender',null,cell.start,this.dayEls.eq(i));}},unrenderDates:function(){this.removeSegPopover();},renderBusinessHours:function(){var events=this.view.calendar.getBusinessHoursEvents(true); var segs=this.eventsToSegs(events);this.renderFill('businessHours',segs,'bgevent');},dayRowHtml:function(row,isRigid){var view=this.view;var classes=['fc-row','fc-week',view.widgetContentClass];if(isRigid){classes.push('fc-rigid');}
return''+'<div class="'+classes.join(' ')+'">'+'<div class="fc-bg">'+'<table>'+
this.rowHtml('day',row)+'</table>'+'</div>'+'<div class="fc-content-skeleton">'+'<table>'+
(this.numbersVisible?'<thead>'+
this.rowHtml('number',row)+'</thead>':'')+'</table>'+'</div>'+'</div>';},
dayCellHtml:function(cell){return this.bgCellHtml(cell);}, computeColHeadFormat:function(){if(this.rowCnt>1){ return'ddd'; }
else if(this.colCnt>1){ return this.view.opt('dayOfMonthFormat');}
else{ return'dddd'; }},  computeEventTimeFormat:function(){return this.view.opt('extraSmallTimeFormat');}, computeDisplayEventEnd:function(){return this.colCnt==1;},rangeUpdated:function(){var cellDates;var firstDay;var rowCnt;var colCnt;this.updateCellDates(); cellDates=this.cellDates;if(this.breakOnWeeks){ firstDay=cellDates[0].day();for(colCnt=1;colCnt<cellDates.length;colCnt++){if(cellDates[colCnt].day()==firstDay){break;}}
rowCnt=Math.ceil(cellDates.length/colCnt);}
else{rowCnt=1;colCnt=cellDates.length;}
this.rowCnt=rowCnt;this.colCnt=colCnt;}, updateCellDates:function(){var view=this.view;var date=this.start.clone();var dates=[];var offset=-1;var offsets=[];while(date.isBefore(this.end)){ if(view.isHiddenDay(date)){offsets.push(offset+0.5);}
else{offset++;offsets.push(offset);dates.push(date.clone());}
date.add(1,'days');}
this.cellDates=dates;this.dayToCellOffsets=offsets;},computeCellDate:function(cell){var colCnt=this.colCnt;var index=cell.row*colCnt+(this.isRTL?colCnt-cell.col-1:cell.col);return this.cellDates[index].clone();}, getRowEl:function(row){return this.rowEls.eq(row);}, getColEl:function(col){return this.dayEls.eq(col);}, getCellDayEl:function(cell){return this.dayEls.eq(cell.row*this.colCnt+cell.col);}, computeRowCoords:function(){var rowCoords=Grid.prototype.computeRowCoords.call(this);
rowCoords[rowCoords.length-1].bottom+=this.bottomCoordPadding;return rowCoords;}, rangeToSegs:function(range){var isRTL=this.isRTL;var rowCnt=this.rowCnt;var colCnt=this.colCnt;var segs=[];var first,last; var row;var rowFirst,rowLast; var isStart,isEnd;var segFirst,segLast; var seg;range=this.view.computeDayRange(range); first=this.dateToCellOffset(range.start);last=this.dateToCellOffset(range.end.subtract(1,'days')); for(row=0;row<rowCnt;row++){rowFirst=row*colCnt;rowLast=rowFirst+colCnt-1; segFirst=Math.max(rowFirst,first);segLast=Math.min(rowLast,last); segFirst=Math.ceil(segFirst); segLast=Math.floor(segLast); if(segFirst<=segLast){ isStart=segFirst===first;isEnd=segLast===last; segFirst-=rowFirst;segLast-=rowFirst;seg={row:row,isStart:isStart,isEnd:isEnd};if(isRTL){seg.leftCol=colCnt-segLast-1;seg.rightCol=colCnt-segFirst-1;}
else{seg.leftCol=segFirst;seg.rightCol=segLast;}
segs.push(seg);}}
return segs;},dateToCellOffset:function(date){var offsets=this.dayToCellOffsets;var day=date.diff(this.start,'days');if(day<0){return offsets[0]-1;}
else if(day>=offsets.length){return offsets[offsets.length-1]+1;}
else{return offsets[day];}},
renderDrag:function(dropLocation,seg){ this.renderHighlight(this.eventRangeToSegs(dropLocation)); if(seg&&!seg.el.closest(this.el).length){this.renderRangeHelper(dropLocation,seg);this.applyDragOpacity(this.helperEls);return true;}}, unrenderDrag:function(){this.unrenderHighlight();this.unrenderHelper();}, renderEventResize:function(range,seg){this.renderHighlight(this.eventRangeToSegs(range));this.renderRangeHelper(range,seg);}, unrenderEventResize:function(){this.unrenderHighlight();this.unrenderHelper();},renderHelper:function(event,sourceSeg){var helperNodes=[];var segs=this.eventsToSegs([event]);var rowStructs;segs=this.renderFgSegEls(segs); rowStructs=this.renderSegRows(segs); this.rowEls.each(function(row,rowNode){var rowEl=$(rowNode); var skeletonEl=$('<div class="fc-helper-skeleton"><table/></div>'); var skeletonTop; if(sourceSeg&&sourceSeg.row===row){skeletonTop=sourceSeg.el.position().top;}
else{skeletonTop=rowEl.find('.fc-content-skeleton tbody').position().top;}
skeletonEl.css('top',skeletonTop).find('table').append(rowStructs[row].tbodyEl);rowEl.append(skeletonEl);helperNodes.push(skeletonEl[0]);});this.helperEls=$(helperNodes);}, unrenderHelper:function(){if(this.helperEls){this.helperEls.remove();this.helperEls=null;}},fillSegTag:'td',
renderFill:function(type,segs,className){var nodes=[];var i,seg;var skeletonEl;segs=this.renderFillSegEls(type,segs); for(i=0;i<segs.length;i++){seg=segs[i];skeletonEl=this.renderFillRow(type,seg,className);this.rowEls.eq(seg.row).append(skeletonEl);nodes.push(skeletonEl[0]);}
this.elsByFill[type]=$(nodes);return segs;},renderFillRow:function(type,seg,className){var colCnt=this.colCnt;var startCol=seg.leftCol;var endCol=seg.rightCol+1;var skeletonEl;var trEl;className=className||type.toLowerCase();skeletonEl=$('<div class="fc-'+className+'-skeleton">'+'<table><tr/></table>'+'</div>');trEl=skeletonEl.find('tr');if(startCol>0){trEl.append('<td colspan="'+startCol+'"/>');}
trEl.append(seg.el.attr('colspan',endCol-startCol));if(endCol<colCnt){trEl.append('<td colspan="'+(colCnt-endCol)+'"/>');}
this.bookendCells(trEl,type);return skeletonEl;}});;;DayGrid.mixin({rowStructs:null,
 unrenderEvents:function(){this.removeSegPopover(); Grid.prototype.unrenderEvents.apply(this,arguments);}, getEventSegs:function(){return Grid.prototype.getEventSegs.call(this)
.concat(this.popoverSegs||[]);}, renderBgSegs:function(segs){ var allDaySegs=$.grep(segs,function(seg){return seg.event.allDay;});return Grid.prototype.renderBgSegs.call(this,allDaySegs);}, renderFgSegs:function(segs){var rowStructs;
 segs=this.renderFgSegEls(segs);rowStructs=this.rowStructs=this.renderSegRows(segs); this.rowEls.each(function(i,rowNode){$(rowNode).find('.fc-content-skeleton > table').append(rowStructs[i].tbodyEl);});return segs;}, unrenderFgSegs:function(){var rowStructs=this.rowStructs||[];var rowStruct;while((rowStruct=rowStructs.pop())){rowStruct.tbodyEl.remove();}
this.rowStructs=null;},renderSegRows:function(segs){var rowStructs=[];var segRows;var row;segRows=this.groupSegRows(segs);
 for(row=0;row<segRows.length;row++){rowStructs.push(this.renderSegRow(row,segRows[row]));}
return rowStructs;}, fgSegHtml:function(seg,disableResizing){var view=this.view;var event=seg.event;var isDraggable=view.isEventDraggable(event);var isResizableFromStart=!disableResizing&&event.allDay&&seg.isStart&&view.isEventResizableFromStart(event);var isResizableFromEnd=!disableResizing&&event.allDay&&seg.isEnd&&view.isEventResizableFromEnd(event);var classes=this.getSegClasses(seg,isDraggable,isResizableFromStart||isResizableFromEnd);var skinCss=cssToStr(this.getEventSkinCss(event));var timeHtml='';var timeText;var titleHtml;classes.unshift('fc-day-grid-event','fc-h-event'); if(seg.isStart){timeText=this.getEventTimeText(event);if(timeText){timeHtml='<span class="fc-time">'+htmlEscape(timeText)+'</span>';}}
titleHtml='<span class="fc-title">'+
(htmlEscape(event.summary||'')||'&nbsp;')+'</span>';return'<a class="'+classes.join(' ')+'"'+
(event.url?' href="'+htmlEscape(event.url)+'"':'')+
(skinCss?' style="'+skinCss+'"':'')+'>'+'<div class="fc-content">'+
(this.isRTL?titleHtml+' '+timeHtml: timeHtml+' '+titleHtml
)+'</div>'+
(isResizableFromStart?'<div class="fc-resizer fc-start-resizer" />':'')+
(isResizableFromEnd?'<div class="fc-resizer fc-end-resizer" />':'')+'</a>';},
 renderSegRow:function(row,rowSegs){var colCnt=this.colCnt;var segLevels=this.buildSegLevels(rowSegs); var levelCnt=Math.max(1,segLevels.length); var tbody=$('<tbody/>');var segMatrix=[]; var cellMatrix=[]; var loneCellMatrix=[]; var i,levelSegs;var col;var tr;var j,seg;var td;function emptyCellsUntil(endCol){while(col<endCol){ td=(loneCellMatrix[i-1]||[])[col];if(td){td.attr('rowspan',parseInt(td.attr('rowspan')||1,10)+1);}
else{td=$('<td/>');tr.append(td);}
cellMatrix[i][col]=td;loneCellMatrix[i][col]=td;col++;}}
for(i=0;i<levelCnt;i++){ levelSegs=segLevels[i];col=0;tr=$('<tr/>');segMatrix.push([]);cellMatrix.push([]);loneCellMatrix.push([]);if(levelSegs){for(j=0;j<levelSegs.length;j++){ seg=levelSegs[j];emptyCellsUntil(seg.leftCol);td=$('<td class="fc-event-container"/>').append(seg.el);if(seg.leftCol!=seg.rightCol){td.attr('colspan',seg.rightCol-seg.leftCol+1);}
else{ loneCellMatrix[i][col]=td;}
while(col<=seg.rightCol){cellMatrix[i][col]=td;segMatrix[i][col]=seg;col++;}
tr.append(td);}}
emptyCellsUntil(colCnt); this.bookendCells(tr,'eventSkeleton');tbody.append(tr);}
return{ row:row, tbodyEl:tbody,cellMatrix:cellMatrix,segMatrix:segMatrix,segLevels:segLevels,segs:rowSegs};}, buildSegLevels:function(segs){var levels=[];var i,seg;var j;
this.sortSegs(segs);for(i=0;i<segs.length;i++){seg=segs[i]; for(j=0;j<levels.length;j++){if(!isDaySegCollision(seg,levels[j])){break;}} 
seg.level=j;(levels[j]||(levels[j]=[])).push(seg);} 
for(j=0;j<levels.length;j++){levels[j].sort(compareDaySegCols);}
return levels;}, groupSegRows:function(segs){var segRows=[];var i;for(i=0;i<this.rowCnt;i++){segRows.push([]);}
for(i=0;i<segs.length;i++){segRows[segs[i].row].push(segs[i]);}
return segRows;}});function isDaySegCollision(seg,otherSegs){var i,otherSeg;for(i=0;i<otherSegs.length;i++){otherSeg=otherSegs[i];if(otherSeg.leftCol<=seg.rightCol&&otherSeg.rightCol>=seg.leftCol){return true;}}
return false;}
function compareDaySegCols(a,b){return a.leftCol-b.leftCol;};;DayGrid.mixin({segPopover:null, popoverSegs:null, removeSegPopover:function(){if(this.segPopover){this.segPopover.hide();}},limitRows:function(levelLimit){var rowStructs=this.rowStructs||[];var row;var rowLevelLimit;for(row=0;row<rowStructs.length;row++){this.unlimitRow(row);if(!levelLimit){rowLevelLimit=false;}
else if(typeof levelLimit==='number'){rowLevelLimit=levelLimit;}
else{rowLevelLimit=this.computeRowLevelLimit(row);}
if(rowLevelLimit!==false){this.limitRow(row,rowLevelLimit);}}},computeRowLevelLimit:function(row){var rowEl=this.rowEls.eq(row); var rowHeight=rowEl.height();var trEls=this.rowStructs[row].tbodyEl.children();var i,trEl;var trHeight;function iterInnerHeights(i,childNode){trHeight=Math.max(trHeight,$(childNode).outerHeight());} 
for(i=0;i<trEls.length;i++){trEl=trEls.eq(i).removeClass('fc-limited');
trHeight=0;trEl.find('> td > :first-child').each(iterInnerHeights);if(trEl.position().top+trHeight>rowHeight){return i;}}
return false;},limitRow:function(row,levelLimit){var _this=this;var rowStruct=this.rowStructs[row];var moreNodes=[]; var col=0;var cell;var levelSegs; var cellMatrix; var limitedNodes; var i,seg;var segsBelow;var totalSegsBelow; var colSegsBelow;var td,rowspan;var segMoreNodes; var j;var moreTd,moreWrap,moreLink; function emptyCellsUntil(endCol){while(col<endCol){cell=_this.getCell(row,col);segsBelow=_this.getCellSegs(cell,levelLimit);if(segsBelow.length){td=cellMatrix[levelLimit-1][col];moreLink=_this.renderMoreLink(cell,segsBelow);moreWrap=$('<div/>').append(moreLink);td.append(moreWrap);moreNodes.push(moreWrap[0]);}
col++;}}
if(levelLimit&&levelLimit<rowStruct.segLevels.length){levelSegs=rowStruct.segLevels[levelLimit-1];cellMatrix=rowStruct.cellMatrix;limitedNodes=rowStruct.tbodyEl.children().slice(levelLimit)
.addClass('fc-limited').get();
 for(i=0;i<levelSegs.length;i++){seg=levelSegs[i];emptyCellsUntil(seg.leftCol);
 colSegsBelow=[];totalSegsBelow=0;while(col<=seg.rightCol){cell=this.getCell(row,col);segsBelow=this.getCellSegs(cell,levelLimit);colSegsBelow.push(segsBelow);totalSegsBelow+=segsBelow.length;col++;}
if(totalSegsBelow){td=cellMatrix[levelLimit-1][seg.leftCol]; rowspan=td.attr('rowspan')||1;segMoreNodes=[]; for(j=0;j<colSegsBelow.length;j++){moreTd=$('<td class="fc-more-cell"/>').attr('rowspan',rowspan);segsBelow=colSegsBelow[j];cell=this.getCell(row,seg.leftCol+j);moreLink=this.renderMoreLink(cell,[seg].concat(segsBelow)); moreWrap=$('<div/>').append(moreLink);moreTd.append(moreWrap);segMoreNodes.push(moreTd[0]);moreNodes.push(moreTd[0]);}
td.addClass('fc-limited').after($(segMoreNodes)); limitedNodes.push(td[0]);}}
emptyCellsUntil(this.colCnt); rowStruct.moreEls=$(moreNodes); rowStruct.limitedEls=$(limitedNodes);}},unlimitRow:function(row){var rowStruct=this.rowStructs[row];if(rowStruct.moreEls){rowStruct.moreEls.remove();rowStruct.moreEls=null;}
if(rowStruct.limitedEls){rowStruct.limitedEls.removeClass('fc-limited');rowStruct.limitedEls=null;}},renderMoreLink:function(cell,hiddenSegs){var _this=this;var view=this.view;return $('<a class="fc-more"/>').text(this.getMoreLinkText(hiddenSegs.length)).on('click',function(ev){var clickOption=view.opt('eventLimitClick');var date=cell.start;var moreEl=$(this);var dayEl=_this.getCellDayEl(cell);var allSegs=_this.getCellSegs(cell); var reslicedAllSegs=_this.resliceDaySegs(allSegs,date);var reslicedHiddenSegs=_this.resliceDaySegs(hiddenSegs,date);if(typeof clickOption==='function'){ clickOption=view.trigger('eventLimitClick',null,{date:date,dayEl:dayEl,moreEl:moreEl,segs:reslicedAllSegs,hiddenSegs:reslicedHiddenSegs},ev);}
if(clickOption==='popover'){_this.showSegPopover(cell,moreEl,reslicedAllSegs);}
else if(typeof clickOption==='string'){ view.calendar.zoomTo(date,clickOption);}});}, showSegPopover:function(cell,moreLink,segs){var _this=this;var view=this.view;var moreWrap=moreLink.parent();var topEl; var options;if(this.rowCnt==1){topEl=view.el;}
else{topEl=this.rowEls.eq(cell.row);}
options={className:'fc-more-popover',content:this.renderSegPopoverContent(cell,segs),parentEl:this.el,top:topEl.offset().top,autoHide:true, viewportConstrain:view.opt('popoverViewportConstrain'),hide:function(){ _this.segPopover.removeElement();_this.segPopover=null;_this.popoverSegs=null;}};if(this.isRTL){options.right=moreWrap.offset().left+moreWrap.outerWidth()+1;}
else{options.left=moreWrap.offset().left-1;}
this.segPopover=new Popover(options);this.segPopover.show();}, renderSegPopoverContent:function(cell,segs){var view=this.view;var isTheme=view.opt('theme');var title=cell.start.format(view.opt('dayPopoverFormat'));var content=$('<div class="fc-header '+view.widgetHeaderClass+'">'+'<span class="fc-close '+
(isTheme?'ui-icon ui-icon-closethick':'fc-icon fc-icon-x')+'"></span>'+'<span class="fc-title">'+
htmlEscape(title)+'</span>'+'<div class="fc-clear"/>'+'</div>'+'<div class="fc-body '+view.widgetContentClass+'">'+'<div class="fc-event-container"></div>'+'</div>');var segContainer=content.find('.fc-event-container');var i; segs=this.renderFgSegEls(segs,true); this.popoverSegs=segs;for(i=0;i<segs.length;i++){
 segs[i].cell=cell;segContainer.append(segs[i].el);}
return content;}, resliceDaySegs:function(segs,dayDate){ var events=$.map(segs,function(seg){return seg.event;});var dayStart=dayDate.clone().stripTime();var dayEnd=dayStart.clone().add(1,'days');var dayRange={start:dayStart,end:dayEnd}; segs=this.eventsToSegs(events,function(range){var seg=intersectionToSeg(range,dayRange); return seg?[seg]:[];}); this.sortSegs(segs);return segs;}, getMoreLinkText:function(num){var opt=this.view.opt('eventLimitText');if(typeof opt==='function'){return opt(num);}
else{return'+'+num+' '+opt;}},getCellSegs:function(cell,startLevel){var segMatrix=this.rowStructs[cell.row].segMatrix;var level=startLevel||0;var segs=[];var seg;while(level<segMatrix.length){seg=segMatrix[level][cell.col];if(seg){segs.push(seg);}
level++;}
return segs;}});;;var TimeGrid=Grid.extend({slotDuration:null, snapDuration:null, minTime:null, maxTime:null, colDates:null, labelFormat:null, labelInterval:null, dayEls:null, slatEls:null, slatTops:null, helperEl:null,businessHourSegs:null,constructor:function(){Grid.apply(this,arguments); this.processOptions();},renderDates:function(){this.el.html(this.renderHtml());this.dayEls=this.el.find('.fc-day');this.slatEls=this.el.find('.fc-slats tr');},renderBusinessHours:function(){var events=this.view.calendar.getBusinessHoursEvents();this.businessHourSegs=this.renderFill('businessHours',this.eventsToSegs(events),'bgevent');}, renderHtml:function(){return''+'<div class="fc-bg">'+'<table>'+
this.rowHtml('slotBg')+'</table>'+'</div>'+'<div class="fc-slats">'+'<table>'+
this.slatRowHtml()+'</table>'+'</div>';},slotBgCellHtml:function(cell){return this.bgCellHtml(cell);},slatRowHtml:function(){var view=this.view;var isRTL=this.isRTL;var html='';var slotTime=moment.duration(+this.minTime); var slotDate; var isLabeled;var axisHtml; while(slotTime<this.maxTime){slotDate=this.start.clone().time(slotTime); isLabeled=isInt(divideDurationByDuration(slotTime,this.labelInterval));axisHtml='<td class="fc-axis fc-time '+view.widgetContentClass+'" '+view.axisStyleAttr()+'>'+
(isLabeled?'<span>'+ htmlEscape(slotDate.format(this.labelFormat))+'</span>':'')+'</td>';html+='<tr '+(isLabeled?'':'class="fc-minor"')+'>'+
(!isRTL?axisHtml:'')+'<td class="'+view.widgetContentClass+'"/>'+
(isRTL?axisHtml:'')+"</tr>";slotTime.add(this.slotDuration);}
return html;}, processOptions:function(){var view=this.view;var slotDuration=view.opt('slotDuration');var snapDuration=view.opt('snapDuration');var input;slotDuration=moment.duration(slotDuration);snapDuration=snapDuration?moment.duration(snapDuration):slotDuration;this.slotDuration=slotDuration;this.snapDuration=snapDuration;this.cellDuration=snapDuration; this.minTime=moment.duration(view.opt('minTime'));this.maxTime=moment.duration(view.opt('maxTime'));input=view.opt('slotLabelFormat');if($.isArray(input)){input=input[input.length-1];}
this.labelFormat=input||view.opt('axisFormat')|| view.opt('smallTimeFormat'); input=view.opt('slotLabelInterval');this.labelInterval=input?moment.duration(input):this.computeLabelInterval(slotDuration);}, computeLabelInterval:function(slotDuration){var i;var labelInterval;var slotsPerLabel; for(i=AGENDA_STOCK_SUB_DURATIONS.length-1;i>=0;i--){labelInterval=moment.duration(AGENDA_STOCK_SUB_DURATIONS[i]);slotsPerLabel=divideDurationByDuration(labelInterval,slotDuration);if(isInt(slotsPerLabel)&&slotsPerLabel>1){return labelInterval;}}
return moment.duration(slotDuration);}, computeColHeadFormat:function(){if(this.colCnt>1){ return this.view.opt('dayOfMonthFormat');}
else{ return'dddd'; }},  computeEventTimeFormat:function(){return this.view.opt('noMeridiemTimeFormat');}, computeDisplayEventEnd:function(){return true;},rangeUpdated:function(){var view=this.view;var colDates=[];var date;date=this.start.clone();while(date.isBefore(this.end)){colDates.push(date.clone());date.add(1,'day');date=view.skipHiddenDays(date);}
if(this.isRTL){colDates.reverse();}
this.colDates=colDates;this.colCnt=colDates.length;this.rowCnt=Math.ceil((this.maxTime-this.minTime)/this.snapDuration);},computeCellDate:function(cell){var date=this.colDates[cell.col];var time=this.computeSnapTime(cell.row);date=this.view.calendar.rezoneDate(date); date.time(time);return date;}, getColEl:function(col){return this.dayEls.eq(col);}, computeSnapTime:function(row){return moment.duration(this.minTime+this.snapDuration*row);}, rangeToSegs:function(range){var colCnt=this.colCnt;var segs=[];var seg;var col;var colDate;var colRange;range={start:range.start.clone().stripZone(),end:range.end.clone().stripZone()};for(col=0;col<colCnt;col++){colDate=this.colDates[col]; colRange={start:colDate.clone().time(this.minTime),end:colDate.clone().time(this.maxTime)};seg=intersectionToSeg(range,colRange); if(seg){seg.col=col;segs.push(seg);}}
return segs;},updateSize:function(isResize){ this.computeSlatTops();if(isResize){this.updateSegVerticals();}}, computeRowCoords:function(){var originTop=this.el.offset().top;var items=[];var i;var item;for(i=0;i<this.rowCnt;i++){item={top:originTop+this.computeTimeTop(this.computeSnapTime(i))};if(i>0){items[i-1].bottom=item.top;}
items.push(item);}
item.bottom=item.top+this.computeTimeTop(this.computeSnapTime(i));return items;},computeDateTop:function(date,startOfDayDate){return this.computeTimeTop(moment.duration(date.clone().stripZone()-startOfDayDate.clone().stripTime()));},computeTimeTop:function(time){var slatCoverage=(time-this.minTime)/this.slotDuration; var slatIndex;var slatRemainder;var slatTop;var slatBottom; slatCoverage=Math.max(0,slatCoverage);slatCoverage=Math.min(this.slatEls.length,slatCoverage);slatIndex=Math.floor(slatCoverage); slatRemainder=slatCoverage-slatIndex;slatTop=this.slatTops[slatIndex]; if(slatRemainder){ slatBottom=this.slatTops[slatIndex+1];return slatTop+(slatBottom-slatTop)*slatRemainder;}
else{return slatTop;}},computeSlatTops:function(){var tops=[];var top;this.slatEls.each(function(i,node){top=$(node).position().top;tops.push(top);});tops.push(top+this.slatEls.last().outerHeight()); this.slatTops=tops;},renderDrag:function(dropLocation,seg){if(seg){ this.renderRangeHelper(dropLocation,seg);this.applyDragOpacity(this.helperEl);return true;}
else{ this.renderHighlight(this.eventRangeToSegs(dropLocation));}}, unrenderDrag:function(){this.unrenderHelper();this.unrenderHighlight();}, renderEventResize:function(range,seg){this.renderRangeHelper(range,seg);}, unrenderEventResize:function(){this.unrenderHelper();},renderHelper:function(event,sourceSeg){var segs=this.eventsToSegs([event]);var tableEl;var i,seg;var sourceEl;segs=this.renderFgSegEls(segs); tableEl=this.renderSegTable(segs); for(i=0;i<segs.length;i++){seg=segs[i];if(sourceSeg&&sourceSeg.col===seg.col){sourceEl=sourceSeg.el;seg.el.css({left:sourceEl.css('left'),right:sourceEl.css('right'),'margin-left':sourceEl.css('margin-left'),'margin-right':sourceEl.css('margin-right')});}}
this.helperEl=$('<div class="fc-helper-skeleton"/>').append(tableEl).appendTo(this.el);}, unrenderHelper:function(){if(this.helperEl){this.helperEl.remove();this.helperEl=null;}},renderSelection:function(range){if(this.view.opt('selectHelper')){ this.renderRangeHelper(range);}
else{this.renderHighlight(this.selectionRangeToSegs(range));}}, unrenderSelection:function(){this.unrenderHelper();this.unrenderHighlight();},renderFill:function(type,segs,className){var segCols;var skeletonEl;var trEl;var col,colSegs;var tdEl;var containerEl;var dayDate;var i,seg;if(segs.length){segs=this.renderFillSegEls(type,segs); segCols=this.groupSegCols(segs); className=className||type.toLowerCase();skeletonEl=$('<div class="fc-'+className+'-skeleton">'+'<table><tr/></table>'+'</div>');trEl=skeletonEl.find('tr');for(col=0;col<segCols.length;col++){colSegs=segCols[col];tdEl=$('<td/>').appendTo(trEl);if(colSegs.length){containerEl=$('<div class="fc-'+className+'-container"/>').appendTo(tdEl);dayDate=this.colDates[col];for(i=0;i<colSegs.length;i++){seg=colSegs[i];containerEl.append(seg.el.css({top:this.computeDateTop(seg.start,dayDate),bottom:-this.computeDateTop(seg.end,dayDate)
}));}}}
this.bookendCells(trEl,type);this.el.append(skeletonEl);this.elsByFill[type]=skeletonEl;}
return segs;}});;;TimeGrid.mixin({eventSkeletonEl:null,
 renderFgSegs:function(segs){segs=this.renderFgSegEls(segs); this.el.append(this.eventSkeletonEl=$('<div class="fc-content-skeleton"/>').append(this.renderSegTable(segs)));return segs;}, unrenderFgSegs:function(segs){if(this.eventSkeletonEl){this.eventSkeletonEl.remove();this.eventSkeletonEl=null;}},renderSegTable:function(segs){var tableEl=$('<table><tr/></table>');var trEl=tableEl.find('tr');var segCols;var i,seg;var col,colSegs;var containerEl;segCols=this.groupSegCols(segs); this.computeSegVerticals(segs); for(col=0;col<segCols.length;col++){ colSegs=segCols[col];this.placeSlotSegs(colSegs); containerEl=$('<div class="fc-event-container"/>'); for(i=0;i<colSegs.length;i++){seg=colSegs[i];seg.el.css(this.generateSegPositionCss(seg)); if(seg.bottom-seg.top<30){seg.el.addClass('fc-short');}
containerEl.append(seg.el);}
trEl.append($('<td/>').append(containerEl));}
this.bookendCells(trEl,'eventSkeleton');return tableEl;},placeSlotSegs:function(segs){var levels;var level0;var i;this.sortSegs(segs); levels=buildSlotSegLevels(segs);computeForwardSlotSegs(levels);if((level0=levels[0])){for(i=0;i<level0.length;i++){computeSlotSegPressures(level0[i]);}
for(i=0;i<level0.length;i++){this.computeSlotSegCoords(level0[i],0,0);}}},




computeSlotSegCoords:function(seg,seriesBackwardPressure,seriesBackwardCoord){var forwardSegs=seg.forwardSegs;var i;if(seg.forwardCoord===undefined){ if(!forwardSegs.length){ seg.forwardCoord=1;}
else{ this.sortForwardSlotSegs(forwardSegs);
this.computeSlotSegCoords(forwardSegs[0],seriesBackwardPressure+1,seriesBackwardCoord);seg.forwardCoord=forwardSegs[0].backwardCoord;} 
seg.backwardCoord=seg.forwardCoord-
(seg.forwardCoord-seriesBackwardCoord)/(seriesBackwardPressure+1);

 for(i=0;i<forwardSegs.length;i++){this.computeSlotSegCoords(forwardSegs[i],0,seg.forwardCoord);}}},updateSegVerticals:function(){var allSegs=(this.segs||[]).concat(this.businessHourSegs||[]);var i;this.computeSegVerticals(allSegs);for(i=0;i<allSegs.length;i++){allSegs[i].el.css(this.generateSegVerticalCss(allSegs[i]));}}, computeSegVerticals:function(segs){var i,seg;for(i=0;i<segs.length;i++){seg=segs[i];seg.top=this.computeDateTop(seg.start,seg.start);seg.bottom=this.computeDateTop(seg.end,seg.start);}}, fgSegHtml:function(seg,disableResizing){var view=this.view;var event=seg.event;var isDraggable=view.isEventDraggable(event);var isResizableFromStart=!disableResizing&&seg.isStart&&view.isEventResizableFromStart(event);var isResizableFromEnd=!disableResizing&&seg.isEnd&&view.isEventResizableFromEnd(event);var classes=this.getSegClasses(seg,isDraggable,isResizableFromStart||isResizableFromEnd);var skinCss=cssToStr(this.getEventSkinCss(event));var timeText;var fullTimeText; var startTimeText; classes.unshift('fc-time-grid-event','fc-v-event');if(view.isMultiDayEvent(event)){if(seg.isStart||seg.isEnd){timeText=this.getEventTimeText(seg);fullTimeText=this.getEventTimeText(seg,'LT');startTimeText=this.getEventTimeText(seg,null,false);}}else{ timeText=this.getEventTimeText(event);fullTimeText=this.getEventTimeText(event,'LT');startTimeText=this.getEventTimeText(event,null,false);}
return'<a class="'+classes.join(' ')+'"'+
(event.url?' href="'+htmlEscape(event.url)+'"':'')+
(skinCss?' style="'+skinCss+'"':'')+'>'+'<div class="fc-content">'+
(timeText?'<div class="fc-time"'+' data-start="'+htmlEscape(startTimeText)+'"'+' data-full="'+htmlEscape(fullTimeText)+'"'+'>'+'<span>'+htmlEscape(timeText)+'</span>'+'</div>':'')+
(event.summary?'<div class="fc-title">'+
htmlEscape(event.summary)+'</div>':'')+'</div>'+'<div class="fc-bg"/>'+
(isResizableFromEnd?'<div class="fc-resizer fc-end-resizer" />':'')+'</a>';},generateSegPositionCss:function(seg){var shouldOverlap=this.view.opt('slotEventOverlap');var backwardCoord=seg.backwardCoord; var forwardCoord=seg.forwardCoord; var props=this.generateSegVerticalCss(seg); var left; var right; if(shouldOverlap){forwardCoord=Math.min(1,backwardCoord+(forwardCoord-backwardCoord)*2);}
if(this.isRTL){left=1-forwardCoord;right=backwardCoord;}
else{left=backwardCoord;right=1-forwardCoord;}
props.zIndex=seg.level+1; props.left=left*100+'%';props.right=right*100+'%';if(shouldOverlap&&seg.forwardPressure){ props[this.isRTL?'marginLeft':'marginRight']=10*2;}
return props;}, generateSegVerticalCss:function(seg){return{top:seg.top,bottom:-seg.bottom
};}, groupSegCols:function(segs){var segCols=[];var i;for(i=0;i<this.colCnt;i++){segCols.push([]);}
for(i=0;i<segs.length;i++){segCols[segs[i].col].push(segs[i]);}
return segCols;},sortForwardSlotSegs:function(forwardSegs){forwardSegs.sort(proxy(this,'compareForwardSlotSegs'));},compareForwardSlotSegs:function(seg1,seg2){ return seg2.forwardPressure-seg1.forwardPressure||(seg1.backwardCoord||0)-(seg2.backwardCoord||0)||this.compareSegs(seg1,seg2);}});
function buildSlotSegLevels(segs){var levels=[];var i,seg;var j;for(i=0;i<segs.length;i++){seg=segs[i]; for(j=0;j<levels.length;j++){if(!computeSlotSegCollisions(seg,levels[j]).length){break;}}
seg.level=j;(levels[j]||(levels[j]=[])).push(seg);}
return levels;}

function computeForwardSlotSegs(levels){var i,level;var j,seg;var k;for(i=0;i<levels.length;i++){level=levels[i];for(j=0;j<level.length;j++){seg=level[j];seg.forwardSegs=[];for(k=i+1;k<levels.length;k++){computeSlotSegCollisions(seg,levels[k],seg.forwardSegs);}}}}

function computeSlotSegPressures(seg){var forwardSegs=seg.forwardSegs;var forwardPressure=0;var i,forwardSeg;if(seg.forwardPressure===undefined){ for(i=0;i<forwardSegs.length;i++){forwardSeg=forwardSegs[i]; computeSlotSegPressures(forwardSeg);
forwardPressure=Math.max(forwardPressure,1+forwardSeg.forwardPressure);}
seg.forwardPressure=forwardPressure;}}
function computeSlotSegCollisions(seg,otherSegs,results){results=results||[];for(var i=0;i<otherSegs.length;i++){if(isSlotSegCollision(seg,otherSegs[i])){results.push(otherSegs[i]);}}
return results;}
function isSlotSegCollision(seg1,seg2){return seg1.bottom>seg2.top&&seg1.top<seg2.bottom;};;var View=fc.View=Class.extend({type:null,name:null, title:null, calendar:null, options:null, coordMap:null, el:null, displaying:null, isSkeletonRendered:false,isEventsRendered:false,start:null,end:null,
 
intervalStart:null,intervalEnd:null, intervalDuration:null,intervalUnit:null,isRTL:false,isSelected:false, eventOrderSpecs:null,
 scrollerEl:null, scrollTop:null,
 widgetHeaderClass:null,widgetContentClass:null,highlightStateClass:null, nextDayThreshold:null,isHiddenDayHash:null, documentMousedownProxy:null, constructor:function(calendar,type,options,intervalDuration){this.calendar=calendar;this.type=this.name=type; this.options=options;this.intervalDuration=intervalDuration||moment.duration(1,'day');this.nextDayThreshold=moment.duration(this.opt('nextDayThreshold'));this.initThemingProps();this.initHiddenDays();this.isRTL=this.opt('isRTL');this.eventOrderSpecs=parseFieldSpecs(this.opt('eventOrder'));this.documentMousedownProxy=proxy(this,'documentMousedown');this.initialize();}, initialize:function(){}, opt:function(name){return this.options[name];},trigger:function(name,thisObj){ var calendar=this.calendar;return calendar.trigger.apply(calendar,[name,thisObj||this].concat(Array.prototype.slice.call(arguments,2),[this]
));}, setDate:function(date){this.setRange(this.computeRange(date));},setRange:function(range){$.extend(this,range);this.updateTitle();},computeRange:function(date){var intervalUnit=computeIntervalUnit(this.intervalDuration);var intervalStart=date.clone().startOf(intervalUnit);var intervalEnd=intervalStart.clone().add(this.intervalDuration);var start,end; if(/year|month|week|day/.test(intervalUnit)){intervalStart.stripTime();intervalEnd.stripTime();}
else{if(!intervalStart.hasTime()){intervalStart=this.calendar.rezoneDate(intervalStart);}
if(!intervalEnd.hasTime()){intervalEnd=this.calendar.rezoneDate(intervalEnd);}}
start=intervalStart.clone();start=this.skipHiddenDays(start);end=intervalEnd.clone();end=this.skipHiddenDays(end,-1,true); return{intervalUnit:intervalUnit,intervalStart:intervalStart,intervalEnd:intervalEnd,start:start,end:end};}, computePrevDate:function(date){return this.massageCurrentDate(date.clone().startOf(this.intervalUnit).subtract(this.intervalDuration),-1);}, computeNextDate:function(date){return this.massageCurrentDate(date.clone().startOf(this.intervalUnit).add(this.intervalDuration));},

massageCurrentDate:function(date,direction){if(this.intervalDuration.as('days')<=1){ if(this.isHiddenDay(date)){date=this.skipHiddenDays(date,direction);date.startOf('day');}}
return date;}, updateTitle:function(){this.title=this.computeTitle();}, computeTitle:function(){return this.formatRange({start:this.intervalStart,end:this.intervalEnd},this.opt('titleFormat')||this.computeTitleFormat(),this.opt('titleRangeSeparator'));},computeTitleFormat:function(){if(this.intervalUnit=='year'){return'YYYY';}
else if(this.intervalUnit=='month'){return this.opt('monthYearFormat');}
else if(this.intervalDuration.as('days')>1){return'll'; }
else{return'LL'; }},  formatRange:function(range,formatStr,separator){var end=range.end;if(!end.hasTime()){end=end.clone().subtract(1);}
return formatRange(range.start,end,formatStr,separator,this.opt('isRTL'));},setElement:function(el){this.el=el;this.bindGlobalHandlers();},removeElement:function(){this.clear();
 if(this.isSkeletonRendered){this.unrenderSkeleton();this.isSkeletonRendered=false;}
this.unbindGlobalHandlers();this.el.remove();},display:function(date){var _this=this;var scrollState=null;if(this.displaying){scrollState=this.queryScroll();}
return this.clear().then(function(){return(_this.displaying=$.when(_this.displayView(date))
.then(function(){_this.forceScroll(_this.computeInitialScroll(scrollState));_this.triggerRender();}));});},clear:function(){var _this=this;var displaying=this.displaying;if(displaying){return displaying.then(function(){ _this.displaying=null;_this.clearEvents();return _this.clearView();});}
else{return $.when();}},displayView:function(date){if(!this.isSkeletonRendered){this.renderSkeleton();this.isSkeletonRendered=true;}
this.setDate(date);if(this.render){this.render();}
this.renderDates();this.updateSize();this.renderBusinessHours();},clearView:function(){this.unselect();this.triggerUnrender();this.unrenderBusinessHours();this.unrenderDates();if(this.destroy){this.destroy();}}, renderSkeleton:function(){}, unrenderSkeleton:function(){},renderDates:function(){}, unrenderDates:function(){},renderBusinessHours:function(){}, unrenderBusinessHours:function(){}, triggerRender:function(){this.trigger('viewRender',this,this,this.el);}, triggerUnrender:function(){this.trigger('viewDestroy',this,this,this.el);}, bindGlobalHandlers:function(){$(document).on('mousedown',this.documentMousedownProxy);}, unbindGlobalHandlers:function(){$(document).off('mousedown',this.documentMousedownProxy);}, initThemingProps:function(){var tm=this.opt('theme')?'ui':'fc';this.widgetHeaderClass=tm+'-widget-header';this.widgetContentClass=tm+'-widget-content';this.highlightStateClass=tm+'-state-highlight';}, updateSize:function(isResize){var scrollState;if(isResize){scrollState=this.queryScroll();}
this.updateHeight(isResize);this.updateWidth(isResize);if(isResize){this.setScroll(scrollState);}}, updateWidth:function(isResize){}, updateHeight:function(isResize){var calendar=this.calendar; this.setHeight(calendar.getSuggestedViewHeight(),calendar.isHeightAuto());},setHeight:function(height,isAuto){},computeScrollerHeight:function(totalHeight){var scrollerEl=this.scrollerEl;var both;var otherHeight;both=this.el.add(scrollerEl); both.css({position:'relative', left:-1
});otherHeight=this.el.outerHeight()-scrollerEl.height(); both.css({position:'',left:''}); return totalHeight-otherHeight;},computeInitialScroll:function(previousScrollState){return 0;}, queryScroll:function(){if(this.scrollerEl){return this.scrollerEl.scrollTop();}},setScroll:function(scrollState){if(this.scrollerEl){return this.scrollerEl.scrollTop(scrollState);}}, forceScroll:function(scrollState){var _this=this;this.setScroll(scrollState);setTimeout(function(){_this.setScroll(scrollState);},0);}, displayEvents:function(events){var scrollState=this.queryScroll();this.clearEvents();this.renderEvents(events);this.isEventsRendered=true;this.setScroll(scrollState);this.triggerEventRender();}, clearEvents:function(){if(this.isEventsRendered){this.triggerEventUnrender();if(this.destroyEvents){this.destroyEvents();}
this.unrenderEvents();this.isEventsRendered=false;}},renderEvents:function(events){},unrenderEvents:function(){}, triggerEventRender:function(){this.renderedEventSegEach(function(seg){this.trigger('eventAfterRender',seg.event,seg.event,seg.el);});this.trigger('eventAfterAllRender');}, triggerEventUnrender:function(){this.renderedEventSegEach(function(seg){this.trigger('eventDestroy',seg.event,seg.event,seg.el);});},resolveEventEl:function(event,el){var custom=this.trigger('eventRender',event,event,el);if(custom===false){ el=null;}
else if(custom&&custom!==true){el=$(custom);}
return el;}, showEvent:function(event){this.renderedEventSegEach(function(seg){seg.el.css('visibility','');},event);}, hideEvent:function(event){this.renderedEventSegEach(function(seg){seg.el.css('visibility','hidden');},event);},renderedEventSegEach:function(func,event){var segs=this.getEventSegs();var i;for(i=0;i<segs.length;i++){if(!event||segs[i].event._id===event._id){if(segs[i].el){func.call(this,segs[i]);}}}}, getEventSegs:function(){ return[];},   isEventDraggable:function(event){var source=event.source||{};return firstDefined(event.startEditable,source.startEditable,this.opt('eventStartEditable'),event.editable,source.editable,this.opt('editable'));},reportEventDrop:function(event,dropLocation,largeUnit,el,ev){var calendar=this.calendar;var mutateResult=calendar.mutateEvent(event,dropLocation,largeUnit);var undoFunc=function(){mutateResult.undo();calendar.reportEventChange();};this.triggerEventDrop(event,mutateResult.dateDelta,undoFunc,el,ev);calendar.reportEventChange();}, triggerEventDrop:function(event,dateDelta,undoFunc,el,ev){this.trigger('eventDrop',el[0],event,dateDelta,undoFunc,ev,{});},reportExternalDrop:function(meta,dropLocation,el,ev,ui){var eventProps=meta.eventProps;var eventInput;var event; if(eventProps){eventInput=$.extend({},eventProps,dropLocation);event=this.calendar.renderEvent(eventInput,meta.stick)[0];}
this.triggerExternalDrop(event,dropLocation,el,ev,ui);}, triggerExternalDrop:function(event,dropLocation,el,ev,ui){ this.trigger('drop',el[0],dropLocation.start,ev,ui);if(event){this.trigger('eventReceive',null,event);}},renderDrag:function(dropLocation,seg){},unrenderDrag:function(){}, isEventResizableFromStart:function(event){return this.opt('eventResizableFromStart')&&this.isEventResizable(event);}, isEventResizableFromEnd:function(event){return this.isEventResizable(event);}, isEventResizable:function(event){var source=event.source||{};return firstDefined(event.durationEditable,source.durationEditable,this.opt('eventDurationEditable'),event.editable,source.editable,this.opt('editable'));}, reportEventResize:function(event,resizeLocation,largeUnit,el,ev){var calendar=this.calendar;var mutateResult=calendar.mutateEvent(event,resizeLocation,largeUnit);var undoFunc=function(){mutateResult.undo();calendar.reportEventChange();};this.triggerEventResize(event,mutateResult.durationDelta,undoFunc,el,ev);calendar.reportEventChange();}, triggerEventResize:function(event,durationDelta,undoFunc,el,ev){this.trigger('eventResize',el[0],event,durationDelta,undoFunc,ev,{});},select:function(range,ev){this.unselect(ev);this.renderSelection(range);this.reportSelection(range,ev);}, renderSelection:function(range){},reportSelection:function(range,ev){this.isSelected=true;this.triggerSelect(range,ev);},triggerSelect:function(range,ev){this.trigger('select',null,range.start,range.end,ev);},unselect:function(ev){if(this.isSelected){this.isSelected=false;if(this.destroySelection){this.destroySelection();}
this.unrenderSelection();this.trigger('unselect',null,ev);}}, unrenderSelection:function(){}, documentMousedown:function(ev){var ignore;if(this.isSelected&&this.opt('unselectAuto')&&isPrimaryMouseButton(ev)){ ignore=this.opt('unselectCancel');if(!ignore||!$(ev.target).closest(ignore).length){this.unselect(ev);}}},triggerDayClick:function(cell,dayEl,ev){this.trigger('dayClick',dayEl,cell.start,ev);}, initHiddenDays:function(){var hiddenDays=this.opt('hiddenDays')||[]; var isHiddenDayHash=[];var dayCnt=0;var i;if(this.opt('weekends')===false){hiddenDays.push(0,6);}
for(i=0;i<7;i++){if(!(isHiddenDayHash[i]=$.inArray(i,hiddenDays)!==-1)){dayCnt++;}}
if(!dayCnt){throw'invalid hiddenDays';}
this.isHiddenDayHash=isHiddenDayHash;}, isHiddenDay:function(day){if(moment.isMoment(day)){day=day.day();}
return this.isHiddenDayHash[day];},skipHiddenDays:function(date,inc,isExclusive){var out=date.clone();inc=inc||1;while(this.isHiddenDayHash[(out.day()+(isExclusive?inc:0)+7)%7]){out.add(inc,'days');}
return out;},computeDayRange:function(range){var startDay=range.start.clone().stripTime(); var end=range.end;var endDay=null;var endTimeMS;if(end){endDay=end.clone().stripTime(); endTimeMS=+end.time();
if(endTimeMS&&endTimeMS>=this.nextDayThreshold){endDay.add(1,'days');}}
if(!end||endDay<=startDay){endDay=startDay.clone().add(1,'days');}
return{start:startDay,end:endDay};},isMultiDayEvent:function(event){var range=this.computeDayRange(event); return range.end.diff(range.start,'days')>1;}});;;var Calendar=fc.Calendar=Class.extend({dirDefaults:null, langDefaults:null, overrides:null, options:null, viewSpecCache:null, view:null, header:null,loadingLevel:0,
constructor:Calendar_constructor, initialize:function(){}, initOptions:function(overrides){var lang,langDefaults;var isRTL,dirDefaults;overrides=massageOverrides(overrides);lang=overrides.lang;langDefaults=langOptionHash[lang];if(!langDefaults){lang=Calendar.defaults.lang;langDefaults=langOptionHash[lang]||{};}
isRTL=firstDefined(overrides.isRTL,langDefaults.isRTL,Calendar.defaults.isRTL);dirDefaults=isRTL?Calendar.rtlDefaults:{};this.dirDefaults=dirDefaults;this.langDefaults=langDefaults;this.overrides=overrides;this.options=mergeOptions([ Calendar.defaults, dirDefaults,langDefaults,overrides]);populateInstanceComputableOptions(this.options);this.viewSpecCache={};},getViewSpec:function(viewType){var cache=this.viewSpecCache;return cache[viewType]||(cache[viewType]=this.buildViewSpec(viewType));},getUnitViewSpec:function(unit){var viewTypes;var i;var spec;if($.inArray(unit,intervalUnits)!=-1){ viewTypes=this.header.getViewsWithButtons();$.each(fc.views,function(viewType){ viewTypes.push(viewType);});for(i=0;i<viewTypes.length;i++){spec=this.getViewSpec(viewTypes[i]);if(spec){if(spec.singleUnit==unit){return spec;}}}}}, buildViewSpec:function(requestedViewType){var viewOverrides=this.overrides.views||{};var specChain=[]; var defaultsChain=[]; var overridesChain=[]; var viewType=requestedViewType;var spec; var overrides; var duration;var unit; while(viewType){spec=fcViews[viewType];overrides=viewOverrides[viewType];viewType=null; if(typeof spec==='function'){ spec={'class':spec};}
if(spec){specChain.unshift(spec);defaultsChain.unshift(spec.defaults||{});duration=duration||spec.duration;viewType=viewType||spec.type;}
if(overrides){overridesChain.unshift(overrides); duration=duration||overrides.duration;viewType=viewType||overrides.type;}}
spec=mergeProps(specChain);spec.type=requestedViewType;if(!spec['class']){return false;}
if(duration){duration=moment.duration(duration);if(duration.valueOf()){spec.duration=duration;unit=computeIntervalUnit(duration); if(duration.as(unit)===1){spec.singleUnit=unit;overridesChain.unshift(viewOverrides[unit]||{});}}}
spec.defaults=mergeOptions(defaultsChain);spec.overrides=mergeOptions(overridesChain);this.buildViewSpecOptions(spec);this.buildViewSpecButtonText(spec,requestedViewType);return spec;}, buildViewSpecOptions:function(spec){spec.options=mergeOptions([ Calendar.defaults, spec.defaults,this.dirDefaults,this.langDefaults,this.overrides,spec.overrides
]);populateInstanceComputableOptions(spec.options);}, buildViewSpecButtonText:function(spec,requestedViewType){
function queryButtonText(options){var buttonText=options.buttonText||{};return buttonText[requestedViewType]||(spec.singleUnit?buttonText[spec.singleUnit]:null);} 
spec.buttonTextOverride=queryButtonText(this.overrides)|| spec.overrides.buttonText;
 spec.buttonTextDefault=queryButtonText(this.langDefaults)||queryButtonText(this.dirDefaults)||spec.defaults.buttonText|| queryButtonText(Calendar.defaults)||(spec.duration?this.humanizeDuration(spec.duration):null)||requestedViewType;}, instantiateView:function(viewType){var spec=this.getViewSpec(viewType);return new spec['class'](this,viewType,spec.options,spec.duration);}, isValidViewType:function(viewType){return Boolean(this.getViewSpec(viewType));}, pushLoading:function(){if(!(this.loadingLevel++)){this.trigger('loading',null,true,this.view);}}, popLoading:function(){if(!(--this.loadingLevel)){this.trigger('loading',null,false,this.view);}}, buildSelectRange:function(start,end){start=this.moment(start);if(end){end=this.moment(end);}
else if(start.hasTime()){end=start.clone().add(this.defaultTimedEventDuration);}
else{end=start.clone().add(this.defaultAllDayEventDuration);}
return{start:start,end:end};}});Calendar.mixin(Emitter);function Calendar_constructor(element,overrides){var t=this;t.initOptions(overrides||{});var options=this.options;
t.render=render;t.destroy=destroy;t.refetchEvents=refetchEvents;t.reportEvents=reportEvents;t.reportEventChange=reportEventChange;t.rerenderEvents=renderEvents; t.changeView=renderView; t.select=select;t.unselect=unselect;t.prev=prev;t.next=next;t.prevYear=prevYear;t.nextYear=nextYear;t.today=today;t.gotoDate=gotoDate;t.incrementDate=incrementDate;t.zoomTo=zoomTo;t.getDate=getDate;t.getCalendar=getCalendar;t.getView=getView;t.option=option;t.trigger=trigger;
 var localeData=createObject( getMomentLocaleData(options.lang)
);if(options.monthNames){localeData._months=options.monthNames;}
if(options.monthNamesShort){localeData._monthsShort=options.monthNamesShort;}
if(options.dayNames){localeData._weekdays=options.dayNames;}
if(options.dayNamesShort){localeData._weekdaysShort=options.dayNamesShort;}
if(options.firstDay!=null){var _week=createObject(localeData._week);_week.dow=options.firstDay;localeData._week=_week;} 
localeData._fullCalendar_weekCalc=(function(weekCalc){if(typeof weekCalc==='function'){return weekCalc;}
else if(weekCalc==='local'){return weekCalc;}
else if(weekCalc==='iso'||weekCalc==='ISO'){return'ISO';}})(options.weekNumberCalculation);
t.defaultAllDayEventDuration=moment.duration(options.defaultAllDayEventDuration);t.defaultTimedEventDuration=moment.duration(options.defaultTimedEventDuration);t.moment=function(){var mom;if(options.timezone==='local'){mom=fc.moment.apply(null,arguments);if(mom.hasTime()){ mom.local();}}
else if(options.timezone==='UTC'){mom=fc.moment.utc.apply(null,arguments);}
else{mom=fc.moment.parseZone.apply(null,arguments);}
if('_locale'in mom){ mom._locale=localeData;}
else{ mom._lang=localeData;}
return mom;};  
t.getIsAmbigTimezone=function(){return options.timezone!=='local'&&options.timezone!=='UTC';};t.rezoneDate=function(date){return t.moment(date.toArray());};t.getNow=function(){var now=options.now;if(typeof now==='function'){now=now();}
return t.moment(now);};t.getEventEnd=function(event){if(event.end){return event.end.clone();}
else{return t.getDefaultEventEnd(event.allDay,event.start);}};t.getDefaultEventEnd=function(allDay,start){ var end=start.clone();if(allDay){end.stripTime().add(t.defaultAllDayEventDuration);}
else{end.add(t.defaultTimedEventDuration);}
if(t.getIsAmbigTimezone()){end.stripZone();}
return end;};t.humanizeDuration=function(duration){return(duration.locale||duration.lang).call(duration,options.lang)
.humanize();};
EventManager.call(t,options);var isFetchNeeded=t.isFetchNeeded;var fetchEvents=t.fetchEvents;
var _element=element[0];var header;var headerElement;var content;var tm; var currentView; var viewsByType={}; var suggestedViewHeight;var windowResizeProxy; var ignoreWindowResize=0;var date;var events=[];
if(options.defaultDate!=null){date=t.moment(options.defaultDate);}
else{date=t.getNow();}
function render(){if(!content){initialRender();}
else if(elementVisible()){ calcSize();renderView();}}
function initialRender(){tm=options.theme?'ui':'fc';element.addClass('fc');if(options.isRTL){element.addClass('fc-rtl');}
else{element.addClass('fc-ltr');}
if(options.theme){element.addClass('ui-widget');}
else{element.addClass('fc-unthemed');}
content=$("<div class='fc-view-container'/>").prependTo(element);header=t.header=new Header(t,options);headerElement=header.render();if(headerElement){element.prepend(headerElement);}
renderView(options.defaultView);if(options.handleWindowResize){windowResizeProxy=debounce(windowResize,options.windowResizeDelay); $(window).resize(windowResizeProxy);}}
function destroy(){if(currentView){currentView.removeElement();}
header.removeElement();content.remove();element.removeClass('fc fc-ltr fc-rtl fc-unthemed ui-widget');if(windowResizeProxy){$(window).unbind('resize',windowResizeProxy);}}
function elementVisible(){return element.is(':visible');}

function renderView(viewType){ignoreWindowResize++; if(currentView&&viewType&&currentView.type!==viewType){header.deactivateButton(currentView.type);freezeContentHeight(); currentView.removeElement();currentView=t.view=null;} 
if(!currentView&&viewType){currentView=t.view=viewsByType[viewType]||(viewsByType[viewType]=t.instantiateView(viewType));currentView.setElement($("<div class='fc-view fc-"+viewType+"-view' />").appendTo(content));header.activateButton(viewType);}
if(currentView){ date=currentView.massageCurrentDate(date); if(!currentView.displaying||!date.isWithin(currentView.intervalStart,currentView.intervalEnd)
){if(elementVisible()){freezeContentHeight();currentView.display(date);unfreezeContentHeight();
 updateHeaderTitle();updateTodayButton();getAndRenderEvents();}}}
unfreezeContentHeight(); ignoreWindowResize--;}

t.getSuggestedViewHeight=function(){if(suggestedViewHeight===undefined){calcSize();}
return suggestedViewHeight;};t.isHeightAuto=function(){return options.contentHeight==='auto'||options.height==='auto';};function updateSize(shouldRecalc){if(elementVisible()){if(shouldRecalc){_calcSize();}
ignoreWindowResize++;currentView.updateSize(true);ignoreWindowResize--;return true;}}
function calcSize(){if(elementVisible()){_calcSize();}}
function _calcSize(){ if(typeof options.contentHeight==='number'){suggestedViewHeight=options.contentHeight;}
else if(typeof options.height==='number'){suggestedViewHeight=options.height-(headerElement?headerElement.outerHeight(true):0);}
else{suggestedViewHeight=Math.round(content.width()/Math.max(options.aspectRatio,.5));}}
function windowResize(ev){if(!ignoreWindowResize&&ev.target===window&& currentView.start
){if(updateSize(true)){currentView.trigger('windowResize',_element);}}} 
function refetchEvents(){ destroyEvents(); fetchAndRenderEvents();}
function renderEvents(){ if(elementVisible()){freezeContentHeight();currentView.displayEvents(events);unfreezeContentHeight();}}
function destroyEvents(){freezeContentHeight();currentView.clearEvents();unfreezeContentHeight();}
function getAndRenderEvents(){if(!options.lazyFetching||isFetchNeeded(currentView.start,currentView.end)){fetchAndRenderEvents();}
else{renderEvents();}}
function fetchAndRenderEvents(){fetchEvents(currentView.start,currentView.end);
} 
function reportEvents(_events){events=_events;renderEvents();} 
function reportEventChange(){renderEvents();}
function updateHeaderTitle(){header.updateTitle(currentView.title);}
function updateTodayButton(){var now=t.getNow();if(now.isWithin(currentView.intervalStart,currentView.intervalEnd)){header.disableButton('today');}
else{header.enableButton('today');}}
function select(start,end){currentView.select(t.buildSelectRange.apply(t,arguments));}
function unselect(){ if(currentView){currentView.unselect();}}
function prev(){date=currentView.computePrevDate(date);renderView();}
function next(){date=currentView.computeNextDate(date);renderView();}
function prevYear(){date.add(-1,'years');renderView();}
function nextYear(){date.add(1,'years');renderView();}
function today(){date=t.getNow();renderView();}
function gotoDate(dateInput){date=t.moment(dateInput);renderView();}
function incrementDate(delta){date.add(moment.duration(delta));renderView();}
function zoomTo(newDate,viewType){var spec;viewType=viewType||'day'; spec=t.getViewSpec(viewType)||t.getUnitViewSpec(viewType);date=newDate;renderView(spec?spec.type:null);}
function getDate(){return date.clone();} 
function freezeContentHeight(){content.css({width:'100%',height:content.height(),overflow:'hidden'});}
function unfreezeContentHeight(){content.css({width:'',height:'',overflow:''});}
function getCalendar(){return t;}
function getView(){return currentView;}
function option(name,value){if(value===undefined){return options[name];}
if(name=='height'||name=='contentHeight'||name=='aspectRatio'){options[name]=value;updateSize(true);}}
function trigger(name,thisObj){var args=Array.prototype.slice.call(arguments,2);thisObj=thisObj||_element;this.triggerWith(name,thisObj,args); if(options[name]){return options[name].apply(thisObj,args);}}
t.initialize();};;Calendar.defaults={titleRangeSeparator:' \u2014 ', monthYearFormat:'MMMM YYYY', defaultTimedEventDuration:'02:00:00',defaultAllDayEventDuration:{days:1},forceEventDuration:false,nextDayThreshold:'09:00:00',
 defaultView:'month',aspectRatio:1.35,header:{left:'title',center:'',right:'today prev,next'},weekends:true,weekNumbers:false,weekNumberTitle:'W',weekNumberCalculation:'local',scrollTime:'06:00:00', lazyFetching:true,startParam:'start',endParam:'end',timezoneParam:'timezone',timezone:false, isRTL:false,buttonText:{prev:"prev",next:"next",prevYear:"prev year",nextYear:"next year",year:'year', today:'today',month:'month',week:'week',day:'day'},buttonIcons:{prev:'left-single-arrow',next:'right-single-arrow',prevYear:'left-double-arrow',nextYear:'right-double-arrow'}, theme:false,themeButtonIcons:{prev:'circle-triangle-w',next:'circle-triangle-e',prevYear:'seek-prev',nextYear:'seek-next'},dragOpacity:.75,dragRevertDuration:500,dragScroll:true,unselectAuto:true,dropAccept:'*',eventOrder:'title',eventLimit:false,eventLimitText:'more',eventLimitClick:'popover',dayPopoverFormat:'LL',handleWindowResize:true,windowResizeDelay:200
};Calendar.englishDefaults={ dayPopoverFormat:'dddd, MMMM D'};Calendar.rtlDefaults={ header:{left:'next,prev today',center:'',right:'title'},buttonIcons:{prev:'right-single-arrow',next:'left-single-arrow',prevYear:'right-double-arrow',nextYear:'left-double-arrow'},themeButtonIcons:{prev:'circle-triangle-e',next:'circle-triangle-w',nextYear:'seek-prev',prevYear:'seek-next'}};;;var langOptionHash=fc.langs={};



fc.datepickerLang=function(langCode,dpLangCode,dpOptions){ var fcOptions=langOptionHash[langCode]||(langOptionHash[langCode]={}); fcOptions.isRTL=dpOptions.isRTL;fcOptions.weekNumberTitle=dpOptions.weekHeader; $.each(dpComputableOptions,function(name,func){fcOptions[name]=func(dpOptions);});if($.datepicker){
$.datepicker.regional[dpLangCode]=$.datepicker.regional[langCode]= dpOptions;$.datepicker.regional.en=$.datepicker.regional[''];$.datepicker.setDefaults(dpOptions);}};fc.lang=function(langCode,newFcOptions){var fcOptions;var momOptions; fcOptions=langOptionHash[langCode]||(langOptionHash[langCode]={}); if(newFcOptions){fcOptions=langOptionHash[langCode]=mergeOptions([fcOptions,newFcOptions]);}
momOptions=getMomentLocaleData(langCode); $.each(momComputableOptions,function(name,func){if(fcOptions[name]==null){fcOptions[name]=func(momOptions,fcOptions);}}); Calendar.defaults.lang=langCode;};
var dpComputableOptions={buttonText:function(dpOptions){return{  prev:stripHtmlEntities(dpOptions.prevText),next:stripHtmlEntities(dpOptions.nextText),today:stripHtmlEntities(dpOptions.currentText)};},monthYearFormat:function(dpOptions){return dpOptions.showMonthAfterYear?'YYYY['+dpOptions.yearSuffix+'] MMMM':'MMMM YYYY['+dpOptions.yearSuffix+']';}};var momComputableOptions={dayOfMonthFormat:function(momOptions,fcOptions){var format=momOptions.longDateFormat('l'); format=format.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g,'');if(fcOptions.isRTL){format+=' ddd';}
else{format='ddd '+format;}
return format;},mediumTimeFormat:function(momOptions){ return momOptions.longDateFormat('LT').replace(/\s*a$/i,'a');},smallTimeFormat:function(momOptions){return momOptions.longDateFormat('LT').replace(':mm','(:mm)').replace(/(\Wmm)$/,'($1)')
.replace(/\s*a$/i,'a');},extraSmallTimeFormat:function(momOptions){return momOptions.longDateFormat('LT').replace(':mm','(:mm)').replace(/(\Wmm)$/,'($1)')
.replace(/\s*a$/i,'t');},hourFormat:function(momOptions){return momOptions.longDateFormat('LT').replace(':mm','').replace(/(\Wmm)$/,'')
.replace(/\s*a$/i,'a');},noMeridiemTimeFormat:function(momOptions){return momOptions.longDateFormat('LT').replace(/\s*a$/i,'');}};var instanceComputableOptions={smallDayDateFormat:function(options){return options.isRTL?'D dd':'dd D';},weekFormat:function(options){return options.isRTL?'w[ '+options.weekNumberTitle+']':'['+options.weekNumberTitle+' ]w';},smallWeekFormat:function(options){return options.isRTL?'w['+options.weekNumberTitle+']':'['+options.weekNumberTitle+']w';}};function populateInstanceComputableOptions(options){$.each(instanceComputableOptions,function(name,func){if(options[name]==null){options[name]=func(options);}});}
function getMomentLocaleData(langCode){var func=moment.localeData||moment.langData;return func.call(moment,langCode)||func.call(moment,'en');}
fc.lang('en',Calendar.englishDefaults);;;function Header(calendar,options){var t=this; t.render=render;t.removeElement=removeElement;t.updateTitle=updateTitle;t.activateButton=activateButton;t.deactivateButton=deactivateButton;t.disableButton=disableButton;t.enableButton=enableButton;t.getViewsWithButtons=getViewsWithButtons; var el=$();var viewsWithButtons=[];var tm;function render(){var sections=options.header;tm=options.theme?'ui':'fc';if(sections){el=$("<div class='fc-toolbar'/>").append(renderSection('left')).append(renderSection('right')).append(renderSection('center')).append('<div class="fc-clear"/>');return el;}}
function removeElement(){el.remove();el=$();}
function renderSection(position){var sectionEl=$('<div class="fc-'+position+'"/>');var buttonStr=options.header[position];if(buttonStr){$.each(buttonStr.split(' '),function(i){var groupChildren=$();var isOnlyButtons=true;var groupEl;$.each(this.split(','),function(j,buttonName){var customButtonProps;var viewSpec;var buttonClick;var overrideText; var defaultText;var themeIcon;var normalIcon;var innerHtml;var classes;var button; if(buttonName=='title'){groupChildren=groupChildren.add($('<h2>&nbsp;</h2>')); isOnlyButtons=false;}
else{if((customButtonProps=(calendar.options.customButtons||{})[buttonName])){buttonClick=function(ev){if(customButtonProps.click){customButtonProps.click.call(button[0],ev);}};overrideText=''; defaultText=customButtonProps.text;}
else if((viewSpec=calendar.getViewSpec(buttonName))){buttonClick=function(){calendar.changeView(buttonName);};viewsWithButtons.push(buttonName);overrideText=viewSpec.buttonTextOverride;defaultText=viewSpec.buttonTextDefault;}
else if(calendar[buttonName]){ buttonClick=function(){calendar[buttonName]();};overrideText=(calendar.overrides.buttonText||{})[buttonName];defaultText=options.buttonText[buttonName];}
if(buttonClick){themeIcon=customButtonProps?customButtonProps.themeIcon:options.themeButtonIcons[buttonName];normalIcon=customButtonProps?customButtonProps.icon:options.buttonIcons[buttonName];if(overrideText){innerHtml=htmlEscape(overrideText);}
else if(themeIcon&&options.theme){innerHtml="<span class='ui-icon ui-icon-"+themeIcon+"'></span>";}
else if(normalIcon&&!options.theme){innerHtml="<span class='fc-icon fc-icon-"+normalIcon+"'></span>";}
else{innerHtml=htmlEscape(defaultText);}
classes=['fc-'+buttonName+'-button',tm+'-button',tm+'-state-default'];button=$('<button type="button" class="'+classes.join(' ')+'">'+
innerHtml+'</button>').click(function(ev){ if(!button.hasClass(tm+'-state-disabled')){buttonClick(ev);if(button.hasClass(tm+'-state-active')||button.hasClass(tm+'-state-disabled')){button.removeClass(tm+'-state-hover');}}}).mousedown(function(){ button.not('.'+tm+'-state-active').not('.'+tm+'-state-disabled').addClass(tm+'-state-down');}).mouseup(function(){ button.removeClass(tm+'-state-down');}).hover(function(){ button.not('.'+tm+'-state-active').not('.'+tm+'-state-disabled').addClass(tm+'-state-hover');},function(){ button.removeClass(tm+'-state-hover').removeClass(tm+'-state-down');});groupChildren=groupChildren.add(button);}}});if(isOnlyButtons){groupChildren.first().addClass(tm+'-corner-left').end().last().addClass(tm+'-corner-right').end();}
if(groupChildren.length>1){groupEl=$('<div/>');if(isOnlyButtons){groupEl.addClass('fc-button-group');}
groupEl.append(groupChildren);sectionEl.append(groupEl);}
else{sectionEl.append(groupChildren);}});}
return sectionEl;}
function updateTitle(text){el.find('h2').text(text);}
function activateButton(buttonName){el.find('.fc-'+buttonName+'-button').addClass(tm+'-state-active');}
function deactivateButton(buttonName){el.find('.fc-'+buttonName+'-button').removeClass(tm+'-state-active');}
function disableButton(buttonName){el.find('.fc-'+buttonName+'-button').attr('disabled','disabled').addClass(tm+'-state-disabled');}
function enableButton(buttonName){el.find('.fc-'+buttonName+'-button').removeAttr('disabled').removeClass(tm+'-state-disabled');}
function getViewsWithButtons(){return viewsWithButtons;}};;fc.sourceNormalizers=[];fc.sourceFetchers=[];var ajaxDefaults={dataType:'json',cache:false};var eventGUID=1;function EventManager(options){ var t=this; t.isFetchNeeded=isFetchNeeded;t.fetchEvents=fetchEvents;t.addEventSource=addEventSource;t.removeEventSource=removeEventSource;t.updateEvent=updateEvent;t.renderEvent=renderEvent;t.removeEvents=removeEvents;t.clientEvents=clientEvents;t.mutateEvent=mutateEvent;t.normalizeEventRange=normalizeEventRange;t.normalizeEventRangeTimes=normalizeEventRangeTimes;t.ensureVisibleEventRange=ensureVisibleEventRange; var reportEvents=t.reportEvents; var stickySource={events:[]};var sources=[stickySource];var rangeStart,rangeEnd;var currentFetchID=0;var pendingSourceCnt=0;var cache=[]; $.each((options.events?[options.events]:[]).concat(options.eventSources||[]),function(i,sourceInput){var source=buildEventSource(sourceInput);if(source){sources.push(source);}});function isFetchNeeded(start,end){return!rangeStart||start.clone().stripZone()<rangeStart.clone().stripZone()||end.clone().stripZone()>rangeEnd.clone().stripZone();}
function fetchEvents(start,end){rangeStart=start;rangeEnd=end;cache=[];var fetchID=++currentFetchID;var len=sources.length;pendingSourceCnt=len;for(var i=0;i<len;i++){fetchEventSource(sources[i],fetchID);}}
function fetchEventSource(source,fetchID){_fetchEventSource(source,function(eventInputs){var isArraySource=$.isArray(source.events);var i,eventInput;var abstractEvent;if(fetchID==currentFetchID){if(eventInputs){for(i=0;i<eventInputs.length;i++){eventInput=eventInputs[i];if(isArraySource){ abstractEvent=eventInput;}
else{abstractEvent=buildEventFromInput(eventInput,source);}
if(abstractEvent){cache.push.apply(cache,expandEvent(abstractEvent)
);}}}
pendingSourceCnt--;if(!pendingSourceCnt){reportEvents(cache);}}});}
function _fetchEventSource(source,callback){var i;var fetchers=fc.sourceFetchers;var res;for(i=0;i<fetchers.length;i++){res=fetchers[i].call(t, source,rangeStart.clone(),rangeEnd.clone(),options.timezone,callback);if(res===true){ return;}
else if(typeof res=='object'){ _fetchEventSource(res,callback);return;}}
var events=source.events;if(events){if($.isFunction(events)){t.pushLoading();events.call(t, rangeStart.clone(),rangeEnd.clone(),options.timezone,function(events){callback(events);t.popLoading();});}
else if($.isArray(events)){callback(events);}
else{callback();}}else{var url=source.url;if(url){var success=source.success;var error=source.error;var complete=source.complete; var customData;if($.isFunction(source.data)){ customData=source.data();}
else{ customData=source.data;}

var data=$.extend({},customData||{});var startParam=firstDefined(source.startParam,options.startParam);var endParam=firstDefined(source.endParam,options.endParam);var timezoneParam=firstDefined(source.timezoneParam,options.timezoneParam);if(startParam){data[startParam]=rangeStart.format();}
if(endParam){data[endParam]=rangeEnd.format();}
if(options.timezone&&options.timezone!='local'){data[timezoneParam]=options.timezone;}
t.pushLoading();$.ajax($.extend({},ajaxDefaults,source,{data:data,success:function(events){events=events||[];var res=applyAll(success,this,arguments);if($.isArray(res)){events=res;}
callback(events);},error:function(){applyAll(error,this,arguments);callback();},complete:function(){applyAll(complete,this,arguments);t.popLoading();}}));}else{callback();}}}
function addEventSource(sourceInput){var source=buildEventSource(sourceInput);if(source){sources.push(source);pendingSourceCnt++;fetchEventSource(source,currentFetchID);}}
function buildEventSource(sourceInput){ var normalizers=fc.sourceNormalizers;var source;var i;if($.isFunction(sourceInput)||$.isArray(sourceInput)){source={events:sourceInput};}
else if(typeof sourceInput==='string'){source={url:sourceInput};}
else if(typeof sourceInput==='object'){source=$.extend({},sourceInput);}
if(source){ if(source.className){if(typeof source.className==='string'){source.className=source.className.split(/\s+/);}
}
else{source.className=[];} 
if($.isArray(source.events)){source.origArray=source.events; source.events=$.map(source.events,function(eventInput){return buildEventFromInput(eventInput,source);});}
for(i=0;i<normalizers.length;i++){normalizers[i].call(t,source);}
return source;}}
function removeEventSource(source){sources=$.grep(sources,function(src){return!isSourcesEqual(src,source);}); cache=$.grep(cache,function(e){return!isSourcesEqual(e.source,source);});reportEvents(cache);}
function isSourcesEqual(source1,source2){return source1&&source2&&getSourcePrimitive(source1)==getSourcePrimitive(source2);}
function getSourcePrimitive(source){return((typeof source==='object')?(source.origArray||source.googleCalendarId||source.url||source.events): null)||source;} 
function updateEvent(event){ event.start=t.moment(event.start);if(event.end){event.end=t.moment(event.end);}
else{event.end=null;}
mutateEvent(event,getMiscEventProps(event)); reportEvents(cache);}
function getMiscEventProps(event){var props={};$.each(event,function(name,val){if(isMiscEventPropName(name)){if(val!==undefined&&isAtomic(val)){ props[name]=val;}}});return props;} 
function isMiscEventPropName(name){return!/^_|^(id|allDay|start|end)$/.test(name);} 
function renderEvent(eventInput,stick){var abstractEvent=buildEventFromInput(eventInput);var events;var i,event;if(abstractEvent){events=expandEvent(abstractEvent);for(i=0;i<events.length;i++){event=events[i];if(!event.source){if(stick){stickySource.events.push(event);event.source=stickySource;}
cache.push(event);}}
reportEvents(cache);return events;}
return[];}
function removeEvents(filter){var eventID;var i;if(filter==null){ filter=function(){return true;};}
else if(!$.isFunction(filter)){ eventID=filter+'';filter=function(event){return event._id==eventID;};} 
cache=$.grep(cache,filter,true);
for(i=0;i<sources.length;i++){if($.isArray(sources[i].events)){sources[i].events=$.grep(sources[i].events,filter,true);}}
reportEvents(cache);}
function clientEvents(filter){if($.isFunction(filter)){return $.grep(cache,filter);}
else if(filter!=null){ filter+='';return $.grep(cache,function(e){return e._id==filter;});}
return cache;} 
function buildEventFromInput(input,source){var out={};var start,end;var allDay;if(options.eventDataTransform){input=options.eventDataTransform(input);}
if(source&&source.eventDataTransform){input=source.eventDataTransform(input);}
$.extend(out,input);if(source){out.source=source;}
out._id=input._id||(input.id===undefined?'_fc'+eventGUID++:input.id+'');if(input.className){if(typeof input.className=='string'){out.className=input.className.split(/\s+/);}
else{ out.className=input.className;}}
else{out.className=[];}
start=input.start||input.date;end=input.end; if(isTimeString(start)){start=moment.duration(start);}
if(isTimeString(end)){end=moment.duration(end);}
if(input.dow||moment.isDuration(start)||moment.isDuration(end)){ out.start=start?moment.duration(start):null; out.end=end?moment.duration(end):null; out._recurring=true;}
else{if(start){start=t.moment(start);if(!start.isValid()){return false;}}
if(end){end=t.moment(end);if(!end.isValid()){end=null;}}
allDay=input.allDay;if(allDay===undefined){ allDay=firstDefined(source?source.allDayDefault:undefined,options.allDayDefault);}
assignDatesToEvent(start,end,allDay,out);}
return out;}
function assignDatesToEvent(start,end,allDay,event){event.start=start;event.end=end;event.allDay=allDay;normalizeEventRange(event);backupEventDates(event);}
function normalizeEventRange(props){normalizeEventRangeTimes(props);if(props.end&&!props.end.isAfter(props.start)){props.end=null;}
if(!props.end){if(options.forceEventDuration){props.end=t.getDefaultEventEnd(props.allDay,props.start);}
else{props.end=null;}}} 
function normalizeEventRangeTimes(range){if(range.allDay==null){range.allDay=!(range.start.hasTime()||(range.end&&range.end.hasTime()));}
if(range.allDay){range.start.stripTime();if(range.end){ range.end.stripTime();}}
else{if(!range.start.hasTime()){range.start=t.rezoneDate(range.start);}
if(range.end&&!range.end.hasTime()){range.end=t.rezoneDate(range.end);}}} 
function ensureVisibleEventRange(range){var allDay;if(!range.end){allDay=range.allDay; if(allDay==null){allDay=!range.start.hasTime();}
range=$.extend({},range); range.end=t.getDefaultEventEnd(allDay,range.start);}
return range;}
function expandEvent(abstractEvent,_rangeStart,_rangeEnd){var events=[];var dowHash;var dow;var i;var date;var startTime,endTime;var start,end;var event;_rangeStart=_rangeStart||rangeStart;_rangeEnd=_rangeEnd||rangeEnd;if(abstractEvent){if(abstractEvent._recurring){ if((dow=abstractEvent.dow)){dowHash={};for(i=0;i<dow.length;i++){dowHash[dow[i]]=true;}} 
date=_rangeStart.clone().stripTime(); while(date.isBefore(_rangeEnd)){if(!dowHash||dowHash[date.day()]){ startTime=abstractEvent.start;endTime=abstractEvent.end;start=date.clone();end=null;if(startTime){start=start.time(startTime);}
if(endTime){end=date.clone().time(endTime);}
event=$.extend({},abstractEvent); assignDatesToEvent(start,end,!startTime&&!endTime,event);events.push(event);}
date.add(1,'days');}}
else{events.push(abstractEvent);}}
return events;}
function mutateEvent(event,newProps,largeUnit){var miscProps={};var oldProps;var clearEnd;var startDelta;var endDelta;var durationDelta;var undoFunc; function diffDates(date1,date0){ if(largeUnit){return diffByUnit(date1,date0,largeUnit);}
else if(newProps.allDay){return diffDay(date1,date0);}
else{return diffDayTime(date1,date0);}}
newProps=newProps||{}; if(!newProps.start){newProps.start=event.start.clone();}
if(newProps.end===undefined){newProps.end=event.end?event.end.clone():null;}
if(newProps.allDay==null){newProps.allDay=event.allDay;}
normalizeEventRange(newProps);
 oldProps={start:event._start.clone(),end:event._end?event._end.clone():t.getDefaultEventEnd(event._allDay,event._start),allDay:newProps.allDay
};normalizeEventRange(oldProps); clearEnd=event._end!==null&&newProps.end===null; startDelta=diffDates(newProps.start,oldProps.start); if(newProps.end){endDelta=diffDates(newProps.end,oldProps.end);durationDelta=endDelta.subtract(startDelta);}
else{durationDelta=null;} 
$.each(newProps,function(name,val){if(isMiscEventPropName(name)){if(val!==undefined){miscProps[name]=val;}}}); undoFunc=mutateEvents(clientEvents(event._id), clearEnd,newProps.allDay,startDelta,durationDelta,miscProps);return{dateDelta:startDelta,durationDelta:durationDelta,undo:undoFunc};}




function mutateEvents(events,clearEnd,allDay,dateDelta,durationDelta,miscProps){var isAmbigTimezone=t.getIsAmbigTimezone();var undoFunctions=[]; if(dateDelta&&!dateDelta.valueOf()){dateDelta=null;}
if(durationDelta&&!durationDelta.valueOf()){durationDelta=null;}
$.each(events,function(i,event){var oldProps;var newProps;oldProps={start:event.start.clone(),end:event.end?event.end.clone():null,allDay:event.allDay};$.each(miscProps,function(name){oldProps[name]=event[name];});newProps={start:event._start,end:event._end,allDay:allDay
};normalizeEventRange(newProps);
 if(clearEnd){newProps.end=null;}
else if(durationDelta&&!newProps.end){ newProps.end=t.getDefaultEventEnd(newProps.allDay,newProps.start);}
if(dateDelta){newProps.start.add(dateDelta);if(newProps.end){newProps.end.add(dateDelta);}}
if(durationDelta){newProps.end.add(durationDelta);}

if(isAmbigTimezone&&!newProps.allDay&&(dateDelta||durationDelta)){newProps.start.stripZone();if(newProps.end){newProps.end.stripZone();}}
$.extend(event,miscProps,newProps); backupEventDates(event); undoFunctions.push(function(){$.extend(event,oldProps);backupEventDates(event);});});return function(){for(var i=0;i<undoFunctions.length;i++){undoFunctions[i]();}};}
t.getBusinessHoursEvents=getBusinessHoursEvents;function getBusinessHoursEvents(wholeDay){var optionVal=options.businessHours;var defaultVal={className:'fc-nonbusiness',start:'09:00',end:'17:00',dow:[1,2,3,4,5], rendering:'inverse-background'};var view=t.getView();var eventInput;if(optionVal){ eventInput=$.extend({}, defaultVal,typeof optionVal==='object'?optionVal:{}
);}
if(eventInput){ if(wholeDay){eventInput.start=null;eventInput.end=null;}
return expandEvent(buildEventFromInput(eventInput),view.start,view.end);}
return[];}
t.isEventRangeAllowed=isEventRangeAllowed;t.isSelectionRangeAllowed=isSelectionRangeAllowed;t.isExternalDropRangeAllowed=isExternalDropRangeAllowed;function isEventRangeAllowed(range,event){var source=event.source||{};var constraint=firstDefined(event.constraint,source.constraint,options.eventConstraint);var overlap=firstDefined(event.overlap,source.overlap,options.eventOverlap);range=ensureVisibleEventRange(range); return isRangeAllowed(range,constraint,overlap,event);}
function isSelectionRangeAllowed(range){return isRangeAllowed(range,options.selectConstraint,options.selectOverlap);}
function isExternalDropRangeAllowed(range,eventProps){var eventInput;var event; if(eventProps){eventInput=$.extend({},eventProps,range);event=expandEvent(buildEventFromInput(eventInput))[0];}
if(event){return isEventRangeAllowed(range,event);}
else{ range=ensureVisibleEventRange(range); return isSelectionRangeAllowed(range);}}

function isRangeAllowed(range,constraint,overlap,event){var constraintEvents;var anyContainment;var peerEvents;var i,peerEvent;var peerOverlap;range=$.extend({},range); range.start=range.start.clone().stripZone();range.end=range.end.clone().stripZone(); if(constraint!=null){
 constraintEvents=constraintToEvents(constraint);anyContainment=false;for(i=0;i<constraintEvents.length;i++){if(eventContainsRange(constraintEvents[i],range)){anyContainment=true;break;}}
if(!anyContainment){return false;}}
peerEvents=t.getPeerEvents(event,range);for(i=0;i<peerEvents.length;i++){peerEvent=peerEvents[i]; if(eventIntersectsRange(peerEvent,range)){ if(overlap===false){return false;} 
else if(typeof overlap==='function'&&!overlap(peerEvent,event)){return false;}
 
if(event){peerOverlap=firstDefined(peerEvent.overlap,(peerEvent.source||{}).overlap

);if(peerOverlap===false){return false;} 
if(typeof peerOverlap==='function'&&!peerOverlap(event,peerEvent)){return false;}}}}
return true;}
function constraintToEvents(constraintInput){if(constraintInput==='businessHours'){return getBusinessHoursEvents();}
if(typeof constraintInput==='object'){return expandEvent(buildEventFromInput(constraintInput));}
return clientEvents(constraintInput);}
function eventContainsRange(event,range){var eventStart=event.start.clone().stripZone();var eventEnd=t.getEventEnd(event).stripZone();return range.start>=eventStart&&range.end<=eventEnd;}
function eventIntersectsRange(event,range){var eventStart=event.start.clone().stripZone();var eventEnd=t.getEventEnd(event).stripZone();return range.start<eventEnd&&range.end>eventStart;}
t.getEventCache=function(){return cache;};}

Calendar.prototype.getPeerEvents=function(event,range){var cache=this.getEventCache();var peerEvents=[];var i,otherEvent;for(i=0;i<cache.length;i++){otherEvent=cache[i];if(!event||event._id!==otherEvent._id
){peerEvents.push(otherEvent);}}
return peerEvents;};function backupEventDates(event){event._allDay=event.allDay;event._start=event.start.clone();event._end=event.end?event.end.clone():null;};;var BasicView=View.extend({dayGrid:null, dayNumbersVisible:false,weekNumbersVisible:false,weekNumberWidth:null, headRowEl:null, initialize:function(){this.dayGrid=new DayGrid(this);this.coordMap=this.dayGrid.coordMap;}, setRange:function(range){View.prototype.setRange.call(this,range); this.dayGrid.breakOnWeeks=/year|month|week/.test(this.intervalUnit); this.dayGrid.setRange(range);},computeRange:function(date){var range=View.prototype.computeRange.call(this,date);
 if(/year|month/.test(range.intervalUnit)){range.start.startOf('week');range.start=this.skipHiddenDays(range.start); if(range.end.weekday()){range.end.add(1,'week').startOf('week');range.end=this.skipHiddenDays(range.end,-1,true);}}
return range;}, renderDates:function(){this.dayNumbersVisible=this.dayGrid.rowCnt>1; this.weekNumbersVisible=this.opt('weekNumbers');this.dayGrid.numbersVisible=this.dayNumbersVisible||this.weekNumbersVisible;this.el.addClass('fc-basic-view').html(this.renderHtml());this.headRowEl=this.el.find('thead .fc-row');this.scrollerEl=this.el.find('.fc-day-grid-container');this.dayGrid.coordMap.containerEl=this.scrollerEl; this.dayGrid.setElement(this.el.find('.fc-day-grid'));this.dayGrid.renderDates(this.hasRigidRows());},unrenderDates:function(){this.dayGrid.unrenderDates();this.dayGrid.removeElement();},renderBusinessHours:function(){this.dayGrid.renderBusinessHours();},renderHtml:function(){return''+'<table>'+'<thead class="fc-head">'+'<tr>'+'<td class="'+this.widgetHeaderClass+'">'+
this.dayGrid.headHtml()+'</td>'+'</tr>'+'</thead>'+'<tbody class="fc-body">'+'<tr>'+'<td class="'+this.widgetContentClass+'">'+'<div class="fc-day-grid-container">'+'<div class="fc-day-grid"/>'+'</div>'+'</td>'+'</tr>'+'</tbody>'+'</table>';},headIntroHtml:function(){if(this.weekNumbersVisible){return''+'<th class="fc-week-number '+this.widgetHeaderClass+'" '+this.weekNumberStyleAttr()+'>'+'<span>'+ htmlEscape(this.opt('weekNumberTitle'))+'</span>'+'</th>';}},numberIntroHtml:function(row){if(this.weekNumbersVisible){return''+'<td class="fc-week-number" '+this.weekNumberStyleAttr()+'>'+'<span>'+ this.dayGrid.getCell(row,0).start.format('w')+'</span>'+'</td>';}},dayIntroHtml:function(){if(this.weekNumbersVisible){return'<td class="fc-week-number '+this.widgetContentClass+'" '+
this.weekNumberStyleAttr()+'></td>';}},introHtml:function(){if(this.weekNumbersVisible){return'<td class="fc-week-number" '+this.weekNumberStyleAttr()+'></td>';}},numberCellHtml:function(cell){var date=cell.start;var classes;if(!this.dayNumbersVisible){ return'<td/>'; }
classes=this.dayGrid.getDayClasses(date);classes.unshift('fc-day-number');return''+'<td class="'+classes.join(' ')+'" data-date="'+date.format()+'">'+
date.date()+'</td>';}, weekNumberStyleAttr:function(){if(this.weekNumberWidth!==null){return'style="width:'+this.weekNumberWidth+'px"';}
return'';},  hasRigidRows:function(){var eventLimit=this.opt('eventLimit');return eventLimit&&typeof eventLimit!=='number';}, updateWidth:function(){if(this.weekNumbersVisible){this.weekNumberWidth=matchCellWidths(this.el.find('.fc-week-number'));}}, setHeight:function(totalHeight,isAuto){var eventLimit=this.opt('eventLimit');var scrollerHeight; unsetScroller(this.scrollerEl);uncompensateScroll(this.headRowEl);this.dayGrid.removeSegPopover();
if(eventLimit&&typeof eventLimit==='number'){this.dayGrid.limitRows(eventLimit);}
scrollerHeight=this.computeScrollerHeight(totalHeight);this.setGridHeight(scrollerHeight,isAuto);if(eventLimit&&typeof eventLimit!=='number'){this.dayGrid.limitRows(eventLimit);}
if(!isAuto&&setPotentialScroller(this.scrollerEl,scrollerHeight)){compensateScroll(this.headRowEl,getScrollbarWidths(this.scrollerEl)); scrollerHeight=this.computeScrollerHeight(totalHeight);this.scrollerEl.height(scrollerHeight);}}, setGridHeight:function(height,isAuto){if(isAuto){undistributeHeight(this.dayGrid.rowEls);}
else{distributeHeight(this.dayGrid.rowEls,height,true);}}, renderEvents:function(events){this.dayGrid.renderEvents(events);this.updateHeight();}, getEventSegs:function(){return this.dayGrid.getEventSegs();}, unrenderEvents:function(){this.dayGrid.unrenderEvents();
},renderDrag:function(dropLocation,seg){return this.dayGrid.renderDrag(dropLocation,seg);},unrenderDrag:function(){this.dayGrid.unrenderDrag();}, renderSelection:function(range){this.dayGrid.renderSelection(range);}, unrenderSelection:function(){this.dayGrid.unrenderSelection();}});;;var MonthView=BasicView.extend({ computeRange:function(date){var range=BasicView.prototype.computeRange.call(this,date); var rowCnt; if(this.isFixedWeeks()){rowCnt=Math.ceil(range.end.diff(range.start,'weeks',true)); range.end.add(6-rowCnt,'weeks');}
return range;}, setGridHeight:function(height,isAuto){isAuto=isAuto||this.opt('weekMode')==='variable';
 if(isAuto){height*=this.rowCnt/6;}
distributeHeight(this.dayGrid.rowEls,height,!isAuto);},isFixedWeeks:function(){var weekMode=this.opt('weekMode'); if(weekMode){return weekMode==='fixed';}
return this.opt('fixedWeekCount');}});;;fcViews.basic={'class':BasicView};fcViews.basicDay={type:'basic',duration:{days:1}};fcViews.basicWeek={type:'basic',duration:{weeks:1}};fcViews.month={'class':MonthView,duration:{months:1}, defaults:{fixedWeekCount:true}};;;var AgendaView=View.extend({timeGrid:null, dayGrid:null, axisWidth:null, noScrollRowEls:null,
 bottomRuleEl:null,bottomRuleHeight:null,initialize:function(){this.timeGrid=new TimeGrid(this);if(this.opt('allDaySlot')){this.dayGrid=new DayGrid(this);
 this.coordMap=new ComboCoordMap([this.dayGrid.coordMap,this.timeGrid.coordMap]);}
else{this.coordMap=this.timeGrid.coordMap;}}, setRange:function(range){View.prototype.setRange.call(this,range); this.timeGrid.setRange(range);if(this.dayGrid){this.dayGrid.setRange(range);}}, renderDates:function(){this.el.addClass('fc-agenda-view').html(this.renderHtml()); this.scrollerEl=this.el.find('.fc-time-grid-container');this.timeGrid.coordMap.containerEl=this.scrollerEl; this.timeGrid.setElement(this.el.find('.fc-time-grid'));this.timeGrid.renderDates(); this.bottomRuleEl=$('<hr class="fc-divider '+this.widgetHeaderClass+'"/>').appendTo(this.timeGrid.el); if(this.dayGrid){this.dayGrid.setElement(this.el.find('.fc-day-grid'));this.dayGrid.renderDates(); this.dayGrid.bottomCoordPadding=this.dayGrid.el.next('hr').outerHeight();}
this.noScrollRowEls=this.el.find('.fc-row:not(.fc-scroller *)');},unrenderDates:function(){this.timeGrid.unrenderDates();this.timeGrid.removeElement();if(this.dayGrid){this.dayGrid.unrenderDates();this.dayGrid.removeElement();}},renderBusinessHours:function(){this.timeGrid.renderBusinessHours();if(this.dayGrid){this.dayGrid.renderBusinessHours();}},renderHtml:function(){return''+'<table>'+'<thead class="fc-head">'+'<tr>'+'<td class="'+this.widgetHeaderClass+'">'+
this.timeGrid.headHtml()+'</td>'+'</tr>'+'</thead>'+'<tbody class="fc-body">'+'<tr>'+'<td class="'+this.widgetContentClass+'">'+
(this.dayGrid?'<div class="fc-day-grid"/>'+'<hr class="fc-divider '+this.widgetHeaderClass+'"/>':'')+'<div class="fc-time-grid-container">'+'<div class="fc-time-grid"/>'+'</div>'+'</td>'+'</tr>'+'</tbody>'+'</table>';},headIntroHtml:function(){var date;var weekText;if(this.opt('weekNumbers')){date=this.timeGrid.getCell(0).start;weekText=date.format(this.opt('smallWeekFormat'));return''+'<th class="fc-axis fc-week-number '+this.widgetHeaderClass+'" '+this.axisStyleAttr()+'>'+'<span>'+ htmlEscape(weekText)+'</span>'+'</th>';}
else{return'<th class="fc-axis '+this.widgetHeaderClass+'" '+this.axisStyleAttr()+'></th>';}},dayIntroHtml:function(){return''+'<td class="fc-axis '+this.widgetContentClass+'" '+this.axisStyleAttr()+'>'+'<span>'+(this.opt('allDayHtml')||htmlEscape(this.opt('allDayText')))+'</span>'+'</td>';},slotBgIntroHtml:function(){return'<td class="fc-axis '+this.widgetContentClass+'" '+this.axisStyleAttr()+'></td>';},introHtml:function(){return'<td class="fc-axis" '+this.axisStyleAttr()+'></td>';}, axisStyleAttr:function(){if(this.axisWidth!==null){return'style="width:'+this.axisWidth+'px"';}
return'';}, updateSize:function(isResize){this.timeGrid.updateSize(isResize);View.prototype.updateSize.call(this,isResize);}, updateWidth:function(){ this.axisWidth=matchCellWidths(this.el.find('.fc-axis'));}, setHeight:function(totalHeight,isAuto){var eventLimit;var scrollerHeight;if(this.bottomRuleHeight===null){ this.bottomRuleHeight=this.bottomRuleEl.outerHeight();}
this.bottomRuleEl.hide();
 this.scrollerEl.css('overflow','');unsetScroller(this.scrollerEl);uncompensateScroll(this.noScrollRowEls); if(this.dayGrid){this.dayGrid.removeSegPopover(); eventLimit=this.opt('eventLimit');if(eventLimit&&typeof eventLimit!=='number'){eventLimit=AGENDA_ALL_DAY_EVENT_LIMIT;}
if(eventLimit){this.dayGrid.limitRows(eventLimit);}}
if(!isAuto){scrollerHeight=this.computeScrollerHeight(totalHeight);if(setPotentialScroller(this.scrollerEl,scrollerHeight)){ compensateScroll(this.noScrollRowEls,getScrollbarWidths(this.scrollerEl));
scrollerHeight=this.computeScrollerHeight(totalHeight);this.scrollerEl.height(scrollerHeight);}
else{
this.scrollerEl.height(scrollerHeight).css('overflow','hidden'); this.bottomRuleEl.show();}}}, computeInitialScroll:function(){var scrollTime=moment.duration(this.opt('scrollTime'));var top=this.timeGrid.computeTimeTop(scrollTime); top=Math.ceil(top);if(top){top++;}
return top;}, renderEvents:function(events){var dayEvents=[];var timedEvents=[];var daySegs=[];var timedSegs;var i; for(i=0;i<events.length;i++){if(events[i].allDay){dayEvents.push(events[i]);}
else{timedEvents.push(events[i]);}} 
timedSegs=this.timeGrid.renderEvents(timedEvents);if(this.dayGrid){daySegs=this.dayGrid.renderEvents(dayEvents);} 
this.updateHeight();}, getEventSegs:function(){return this.timeGrid.getEventSegs().concat(this.dayGrid?this.dayGrid.getEventSegs():[]);}, unrenderEvents:function(){ this.timeGrid.unrenderEvents();if(this.dayGrid){this.dayGrid.unrenderEvents();}
},renderDrag:function(dropLocation,seg){if(dropLocation.start.hasTime()){return this.timeGrid.renderDrag(dropLocation,seg);}
else if(this.dayGrid){return this.dayGrid.renderDrag(dropLocation,seg);}},unrenderDrag:function(){this.timeGrid.unrenderDrag();if(this.dayGrid){this.dayGrid.unrenderDrag();}}, renderSelection:function(range){if(range.start.hasTime()||range.end.hasTime()){this.timeGrid.renderSelection(range);}
else if(this.dayGrid){this.dayGrid.renderSelection(range);}}, unrenderSelection:function(){this.timeGrid.unrenderSelection();if(this.dayGrid){this.dayGrid.unrenderSelection();}}});;;var AGENDA_ALL_DAY_EVENT_LIMIT=5;
var AGENDA_STOCK_SUB_DURATIONS=[{hours:1},{minutes:30},{minutes:15},{seconds:30},{seconds:15}];fcViews.agenda={'class':AgendaView,defaults:{allDaySlot:true,allDayText:'all-day',slotDuration:'00:30:00',minTime:'00:00:00',maxTime:'24:00:00',slotEventOverlap:true
}};fcViews.agendaDay={type:'agenda',duration:{days:1}};fcViews.agendaWeek={type:'agenda',duration:{weeks:1}};;;return fc; });

var CLIENT_ID='1024060921596-rbc4dlpa1np62vtd8etcroppkv72pjg7.apps.googleusercontent.com';var SCOPES=['https://www.googleapis.com/auth/calendar'];function checkAuth(){gapi.auth.authorize({'client_id':CLIENT_ID,'scope':SCOPES,'immediate':true},handleAuthResult);}
function handleAuthResult(authResult){if(authResult&&!authResult.error){loadCalendarApi().then(function(val){insertEvents();});}else{woops();}}
function handleAuthClick(){gapi.auth.authorize({client_id:CLIENT_ID,scope:SCOPES,immediate:false},handleAuthResult);return false;}
function loadCalendarApi(){return gapi.client.load('calendar','v3');}
function insertEvents(){var success=false
gapi.client.calendar.calendars.insert({'summary':calName}).execute(function(response){if(response.error){console.log(response.error);woops();}
var calID=response.id;console.log("new calId:"+calID);g_events.forEach(function(e){gapi.client.calendar.events.insert({'calendarId':calID,'resource':e}).then(function(response){success=true;},function(reason){console.log(reason);woops();});});alert('Calendar created.');yay();});}
function listUpcomingEvents(){var request=gapi.client.calendar.events.list({'calendarId':'primary','timeMin':(new Date()).toISOString(),'showDeleted':false,'singleEvents':true,'maxResults':10,'orderBy':'startTime'});request.execute(function(resp){var events=resp.items;appendPre('Upcoming events:');if(events.length>0){for(i=0;i<events.length;i++){var event=events[i];var when=event.start.dateTime;if(!when){when=event.start.date;}
appendPre(event.summary+' ('+when+')')}}else{appendPre('No upcoming events found.');}});}
var abbrvs={Monday:"M",Tuesday:"T",Wednesday:"W",Thursday:"R",Friday:"F"};colors=[['#F44336','#e53935'],['#9C27B0','#8E24AA'],['#2196F3','#1E88E5'],['#8BC34A','#7CB342'],['#FFC107','#FFB300'],['#3F51B5','#3949AB'],['#607D8B','#546E7A']
]
function makeFevent(e){fevent=jQuery.extend({},e);var colrs=colors[e.group-1];fevent.backgroundColor=colrs[0];fevent.borderColor=colrs[1];return fevent;}
function makeCalendar(){$('#calendar').fullCalendar({defaultDate:'2015-09-10',eventLimit:true, defaultView:'agendaWeek',header:false,allDaySlot:false,columnFormat:'dddd',slotDuration:'01:00:00',slotLabelInterval:'01:00:00',minTime:"08:00:00",maxTime:"21:00:00",weekends:false,height:'auto',displayEventTime:false,events:fevents,eventClick:function(calEvent,jsEvent,view){$("#dialog").attr('title',calEvent.title);$("#dialog #description").html(calEvent.description.split("\n").join("<br/>"));$("#dialog #location").text(calEvent.location);console.log($("#dialog").html());$("#dialog").dialog({autoOpen:false,});$('#dialog').dialog('open');$('.ui-dialog-titlebar').css('background',calEvent.backgroundColor);$('.ui-dialog-titlebar-close').html('<i class="icon ion-close-round"></i>')},});}
function download(filename,text){var element=document.createElement('a');element.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(text));element.setAttribute('download',filename);element.style.display='none';document.body.appendChild(element);element.click();document.body.removeChild(element);}

var duration='slow'
function displayModalBody(modalBody){$('.modal-body').slideUp(duration);$('.modal-footer').slideUp(duration);if(modalBody.css('display')==='none'){$(modalBody).slideToggle(duration);}};function validate_input(el){var val=el.val();var valid=/^[A-Za-z\d\s]+$/.test(val);console.log(valid);return valid;};function woops(){displayModalBody($('.modal-body#download-error'));}
function yay(){$('.modal-body').slideUp(duration);$('.modal-footer').slideDown(duration);}
$(document).ready(function(){
$.ajax({type:'POST',contentType:'application/json',data:JSON.stringify({courses:COURSES,format:FORMATTER}),dataType:'json',url:'/events',}).done(function(data){events=data.events;fevents=events.map(makeFevent);makeCalendar();}); if(matchMedia){var mq=window.matchMedia("(max-width: 400px)");if(mq.matches){$('.fc-day-header span').text(function(i){return abbrvs[$(this).text()]});}}
$('.modal-header a').bind('click',function(){var toShow=$('.modal-body#'+$(this).attr('id')+'-instructions');displayModalBody(toShow);}); $('.modal-body button').bind('click',function(){var calNameInput=$(this).parent().find('input');if(calNameInput){if(!validate_input(calNameInput)){calNameInput.addClass('invalid');calNameInput.focus();return;}
calName=calNameInput.val();}
var format=$(this).attr('calendar');var r=$.ajax({type:'POST',contentType:'application/json',data:JSON.stringify({events:events,format:format}),dataType:'json',url:SCRIPT_ROOT+'/calendar',}).done(function(data){if(data.hasOwnProperty('calendar')){download('calendar.ics',data.calendar);yay();}else{g_events=data.events;handleAuthClick();}}).fail(woops);});});