 /**
	*WEB颜色比较
	*/
	function quite()
	{
		var background_color_element = document.getElementById("bgcolor");	 
		var master_color_element = document.getElementById("master-color");
		var sign = document.getElementById("sign");
		sign.style.display = "none";//隐藏提示

		//提示 .innerHTML无法获取到input标签的值,只能通过value 或JQ 的.val()方法获取
		var background_color = background_color_element.value;
		var master_color = master_color_element.value;
		
		//去除左右空格
		background_color = reg_trim(background_color);
		master_color = reg_trim(master_color);
		//验证是否为合格颜色编号
		var background_color_validate = reg_test_color(background_color);
		var master_color_validate = reg_test_color(master_color);
		/*<![CDATA[*/
		if (background_color_validate && master_color_validate) {
			/* 只有"<" 字符和"&"字符 对于XML来说是严格禁止使用的，XML 解析只会忽略 CDATA内的信息.
			XHTML 开发网页的话尽量不要把js写在页面中，容易出现解析不正确的问题
			*/
			var master_color_demo = document.getElementById("master-color-demo");
			var background_color_demo = document.getElementById("background-color-demo");
			master_color_demo.style.backgroundColor = master_color;
			background_color_demo.style.backgroundColor = background_color;
		}else{
			/*3中默认消息框，
			警告型：alert("警告内容")
			确认框：confirm("需要用户确认的信息")
			输入框：prompt("标题"，"默认内容")*/
			
			sign.innerHTML = "请输入正确的色码";
			sign.style.display = "inline";
		}
		/*]]>*/
	}
 
 
 /**
     * 封装了一个获取标签之间的文本信息兼容版本函数
     * @param element 标签对象
     * @returns {*}
     */
    function getText(element) 
    {
        if(element.innerText) {
            return element.innerText;   //IE8及之前的浏览器支持，现在两者都支持
        }else {
            return element.textContent; //低版本的火狐支持
        }
    }

    /**
    *封装了一个判断是否为合法颜色的函数
    */

    function reg_test_color(str)
    {
    	var reg=/^#[0-9A-Fa-f]{6}$/;   /*定义验证表达式*/
    	return reg.test(str);     /*进行验证*/
    }

    //循环检查替换
    /**
	*封装去字符方法，两端去除
    */
    function trim(str, chr="")
    {
    	return rtrim(ltrim(str, chr), chr);
    }

     /**
	*封装去字符方法，左端去除
    */
    function ltrim(str, chr="")
    {
    	if (str == null) {
    		return "";
    	}
    	var strobj =new String(str);
    	var i = strobj.length;
    	if (chr=="" || chr == null){
    		var whitespace = new String(" \t\n\r");
    		if (whitespace.indexOf(strobj.charAt(0)) != -1) {
    			var j = 0;
    			while (j<i && whitespace.indexOf(strobj.charAt(j)) != -1) {
    				j++;
    			}	
    			strobj = strobj.substring(j, i);
    		}
    	} else {
    		var j = strobj.indexOf(chr);
    		if (j != -1) {
				while (j<i && strobj.charAt(j+1) == chr) {
					j++;
				}
    			strobj = strobj.substring(j+1, i);
    		}
    	}
    	return strobj;
    }

     /**
	*封装去字符方法，右端去除
    */
    function rtrim(str, chr="")
    {
    	if (str == null) {
    		return "";
    	}
    	var strobj =new String(str);
    	var i = strobj.length;
    	if (chr=="" || chr == null){
    		var whitespace = new String(" \t\n\r");
    		if (whitespace.indexOf(strobj.charAt(i-1)) != -1) {
    			var j = i-1;
    			while (j>0 && whitespace.indexOf(strobj.charAt(j-1)) != -1) {
    				j--;
    			}	
    			strobj = strobj.substring(0, j);
    		}
    	} else {
    		var j = strobj.lastIndexOf(chr);
    		if (j != -1) {
				while (j>0 && strobj.charAt(j-1) == chr) {
					j--;
				}
    			strobj = strobj.substring(0,j);
    		}
    	}
    	
    	return strobj;
    }


    //正则替换
    function reg_trim(str, chr="")
    {
    	var strobj =new String(str);
		if (chr=="" || chr == null){
    		return strobj.replace(/(^\s*)|(\s*$)/g, "");  
    	} else {
    		var pattern = "(^" + chr + "*)|(" + chr +"*$)";
			//把字符串转为正则对象
    		var reg = new RegExp(pattern,'g');
    		return strobj.replace(reg, "");
    	}
    	
    }

    function reg_ltrim(str, chr="")
    {
    	var strobj =new String(str);
    	if (chr=="" || chr == null){
    		return strobj.replace(/(^\s*)/g, "");
    	} else {
    		var pattern = "^" + chr + "*";
    		var reg = new RegExp(pattern,'g');
    		return strobj.replace(reg, "");
    	}
    }

    function reg_rtrim(str, chr="")
    {
    	var strobj =new String(str);
    	if (chr=="" || chr == null){
    		return strobj.replace(/(\s*$)/g, "");
    	} else {
    		var pattern = chr + "*$";
    		var reg = new RegExp(pattern,'g');
    		return strobj.replace(reg, "");
    	}

    }
