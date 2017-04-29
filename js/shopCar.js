
window.onload = function () {
   	
	//活动过期
	$('tr[flg="activeEnd"]').removeClass('on').css({'background':'#f4f4f4'});
	$('tr[flg="activeEnd"]>.checkbox').html('<span style="color:#c0c0c0">活动已过期</span>');
	

	//购物车
    var table = document.getElementById('cartTable'); // 购物车表格
    var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
    var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
    var tr = table.children[1].rows; //行
    var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
    var top_selectedTotal = document.getElementById("top_selectedTotal"); //已选商品数目容器
    var priceTotal = document.getElementById('priceTotal'); //总计
    var top_priceTotal = document.getElementById("top_priceTotal");//总计
    var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
    var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
    var selected = document.getElementById('selected'); //已选商品
    var foot = document.getElementById('foot');
	getTotal();
    // 更新总数和总价格，已选浮层
    function getTotal() {
		var seleted = 0;
		var price = 0;
		var HTMLstr = '';
		for (var i = 0, len = tr.length; i < len; i++) {
			if(tr[i].getElementsByTagName('input')[1] && tr[i].cells[6]){
				if (tr[i].getElementsByTagName('input')[0].checked) {
					tr[i].className = 'on';
					seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
					price += parseFloat(tr[i].cells[6].innerHTML);
					HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
				}
				else {
					tr[i].className = '';
				}
			}
		}
		selectedTotal.innerHTML = seleted;
		top_selectedTotal.innerHTML = seleted;
		priceTotal.innerHTML = price.toFixed(2);
		top_priceTotal.innerHTML = price.toFixed(2);
		//selectedViewList.innerHTML = HTMLstr;
		if (seleted == 0) {
			foot.className = 'foot';
		}
	}

    // 计算单行价格
    function getSubtotal(tr) {
        var cells = tr.cells;
        var price = cells[4]; //单价
        var subtotal = cells[6]; //小计td
        var countInput = tr.getElementsByTagName('input')[1]; //数目input
        var span = tr.getElementsByTagName('span')[1]; //-号
        //写入HTML
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
    }

    // 点击选择框
    for(var i = 0; i < selectInputs.length; i++ ){
        selectInputs[i].onclick = function () {
            if (this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                for (var j = 0; j < selectInputs.length; j++) {
                    selectInputs[j].checked = this.checked;
                }
            }
            if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                for (var i = 0; i < checkAllInputs.length; i++) {
                    checkAllInputs[i].checked = false;
                }
            }
            getTotal();//选完更新总计
        }
    }

    //为每行元素添加事件
    for (var i = 0; i < tr.length; i++) {
        //将点击事件绑定到tr元素
        tr[i].onclick = function (e) {
        	if(this.getElementsByTagName('input')[1]){
	            var e = e || window.event;
	            var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
	            var cls = el.className; //触发元素的class
	            var countInout = this.getElementsByTagName('input')[1]; // 数目input
	            var value = parseInt(countInout.value); //数目
	            //通过判断触发元素的class确定用户点击了哪个元素
	            switch (cls) {
	                case 'add': //点击了加号
	                    countInout.value = value + 1;
	                    getSubtotal(this);
	                    break;
	                case 'reduce': //点击了减号
	                    if (value > 1) {
	                        countInout.value = value - 1;
	                        getSubtotal(this);
	                    }
	                    break;
	                case 'delete': //点击了删除
	                    var conf = confirm('确定删除此商品吗？');
	                    if (conf) {
	                       // this.parentNode.removeChild(this);
	                        if( $(this).prevUntil('tr[flg="store_tr"]').size() == 0 && $(this).nextUntil('tr[flg="store_tr"]').size() == 0 ){
	                        	$(this).prev('tr[flg="store_tr"]').remove();
	                        }
	                       $(this).remove();
	                    }
	                    break;
	            }
	        }
            getTotal();
        }
        // 给数目输入框绑定keyup事件
        if(tr[i].getElementsByTagName('input')[1]){
        	tr[i].getElementsByTagName('input')[1].onkeyup = function () {
	            var val = parseInt(this.value);
	            if (isNaN(val) || val <= 0) {
	                val = 1;
	            }
	            if (this.value != val) {
	                this.value = val;
	            }
	            getSubtotal(this.parentNode.parentNode); //更新小计
	            getTotal(); //更新总数
	        }
        }
        
    }

    // 点击全部删除
    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            var con = confirm('确定删除所选商品吗？'); //弹出确认框
            if (con) {
                for (var i = 0; i < tr.length; i++) {
                    // 如果被选中，就删除相应的行
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
                        i--; //回退下标位置
                    }
                }
            }
        } else {
            alert('请选择商品！');
        }
        getTotal(); //更新总数
    }

    // 默认全选
    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();

    //分店复选框
    var checkStore = document.getElementsByName('check-two');
    var checkGoods = document.getElementsByClassName('check-one');
    for(var i = 0; i < checkStore.length; i++){
    	checkStore[i].onclick = function(){
	    	if(this.checked){
	    		$(this).parents('tr').nextUntil('tr[flg="store_tr"]').find('input.check-one').attr('checked','checked');
	    	}else{
				$(this).parents('tr').nextUntil('tr[flg="store_tr"]').find('input.check-one').removeAttr('checked');
	    	}
	    }
    };
    
	//点击结算
	$(".closing").click(function( ev ){
		if($("#selectedTotal").html() == '0'){
			ev.preventDefault();
		}
	});

}
