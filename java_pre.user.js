// ==UserScript==
// @name        java_pre
// @namespace   chdg61
// @author      chdg61
// @description Сворачивался pre
// @include     *
// @version     1/0
// @grant       none
// ==/UserScript==

(function(window){

    var options = {
        "time_reload" : 100,
        "class_div_toogle": "array_pre",
        "class_show_array": "show_array",
        "class_hide_array": "hide_array",
        "class_span_plus": "button_plus",
        "class_span_minus": "button_minus",
        "content_plus": "+",
        "content_minus": "-",
        "style_span": "color: blue;cursor:pointer;font-weight:bold;",
        "style_span_string_block": "color:green;cursor:pointer;font-weight:bold;",
        "style_pre": "background:white;z-index:1000px;position:relative;border: 2px dotted red;padding 5px;"
    };

    function action_pre(){
        var all_pre = window.document.getElementsByTagName("PRE");
        for(var i =0; i < all_pre.length; i++){
            if(!all_pre[i].action_pre){
                all_pre[i].innerHTML = all_pre[i].innerHTML.replace(/^(.*)$/img,action_line);
            }
            all_pre[i].style.background = "white";
            all_pre[i].style.zIndex = 1000;
            all_pre[i].style.position = "relative";
            all_pre[i].style.border = "2px dotted red";
            all_pre[i].style.padding = "5px";

            all_pre[i].action_pre = true;
        }

        setTimeout(action_pre,options.time_reload);
    }

    function action_line(str, line, offset, s){
        var _regExArrayBlockReplace = /^(\s*?)([\(\)])(\s*?)$/i,
            _regExArrayBlockTest = /^\s*?[\(\)]\s*?$/i,
            _regExStringBlockReplace = /^(\s*?)\[(.*?)\]\s=&gt;(.*?)$/i,
            _regExStringBlockTest = /^\s*?\[.*?\]\s=&gt;.*?$/i;

        if(_regExArrayBlockTest.test(line)){
            return line.replace(_regExArrayBlockReplace,function(str, p1, p2, p3, offset, s){
                var _new_str = "";

                if(p1){
                    _new_str+= p1;
                }

                if(p2 === "("){
                    _new_str+= "(";
                    _new_str+= "<span data-offset='" + offset + "' class='" + options.class_span_minus + "' onclick='_preSpanToogle(this);' style='" + options.style_span + "'>" + options.content_minus + "</span>";
                    _new_str+= "<span data-offset='" + offset + "' class='" + options.class_show_array + "'>";
                }else if(p2 === ")"){
                    _new_str+= "</span>";
                    _new_str+= ")";
                }

                if(p3){
                    _new_str+= p3;
                }

                return _new_str;
            });
        }else if(_regExStringBlockTest.test(line)){
            return line.replace(_regExStringBlockReplace,function(str, p1, p2, p3, offset, s){
                var _new_str = "";

                if(p1){
                    _new_str+= p1;
                }

                _new_str+= "[";
                _new_str+= "<span onclick='' style='" + options.style_span_string_block + "'>" + p2 + "</span>";
                _new_str+= "] =&gt; ";

                if(p3){
                    _new_str+= _htmlspecialchars(p3);
                }

                return _new_str;
            });
        }else{
            return _htmlspecialchars(line);
        }
    }

    function _toggleDivArray(element){
        if(element.className === options.class_show_array){
            element.style.display = "none";
            element.className = options.class_hide_array;
        }else{
            element.style.display = "";
            element.className = options.class_show_array;
        }
    }

    function _toggleSpan(element){
        if(element.className === options.class_span_minus){
            element.className = options.class_span_plus;
            element.innerHTML = options.content_plus;
        }else{
            element.className = options.class_span_minus;
            element.innerHTML = options.content_minus;
        }
    }

    function _htmlspecialchars(str){
        if(!str.replace){
            return str;
        }

        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function _htmlspecialcharsback(str){
        if(!str.replace){
            return str;
        }

        return str.replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');
    }

    window._preSpanToogle = function(element){
        var offset = element.getAttribute("data-offset");
        if(offset && element.nextElementSibling && element.nextElementSibling.getAttribute("data-offset") === offset){
            _toggleDivArray(element.nextElementSibling);
            _toggleSpan(element);
        }
    }

    setTimeout(action_pre,options.time_reload);

})(unsafeWindow);
