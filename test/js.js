function clickAll(){//触发全选
    $.each($('.sonIcon'),function(i,v){
      if(!$(v).hasClass('onClick')){
        $(v).click()
      }
    })
}
function removeAll(){//取消全选
     $.each($('.sonIcon'),function(i,v){
      if($(v).hasClass('onClick')){
        $(v).click()
      }
    })
    
}
function whetherClickAll(){//判断全选按钮是否需要选中
    var flag = true
    $.each($('.sonIcon'),function(i,v){
      if(!$(v).hasClass('onClick')){
        flag = false;
        return
      }
      
    })
    if(flag){
        $('.allIcon').addClass('onClick')
      }else{
        $('.allIcon').removeClass('onClick')
      }
}
function getAll(thi){//获取当前设备组所绑定的数据
  var data = $(thi).attr('sequence').split('/')
  return data
}
function itemClickAll(num){//当前设备组选中
 $.each(num,function(i,v){
  if(!$('.sonIcon').eq(v).hasClass('onClick')){
    $('.sonIcon').eq(v).click()
  }
})
}
function itemUnClick(num){//当前设备值取消
 $.each(num,function(i,v){
   if($('.sonIcon').eq(v).hasClass('onClick')){
    $('.sonIcon').eq(v).click()
  }
  
})
}
function getHaveThisItem(id){//获取拥有该设备的设备组
  var itemArr = []
  for(var i = 0; i < $('.item').length;i++){
   var arr = getAll($('.item')[i])
   for(var j = 0; j < arr.length; j++){
    if(arr[j] == id){
      itemArr[itemArr.length] = $('.item').eq(i)
      break;
    }
   }
  }
  return itemArr
}
function whetherItemClickAll(arr){//判断设备组的状态
 $.each(arr,function(i,v){
    var flag = 0;
    var amount = 0;
    var equipmentArr = getAll(v)
    $.each(equipmentArr,function(i,v){
      amount = i
      if($('.sonIcon').eq(v).hasClass('onClick') ){
        flag += 1;
        
      }
    })
    amount++
    console.log(flag+'------'+amount)
    if(flag == amount){
        $(v).attr('class','item select')
    }else if(flag > 0){
      $(v).attr('class','item portionSelect')
    }else{
      $(v).attr('class','item')
    } 
    getItemState()
 })
}
/*function ItemUnClickAll(arr){//取消当前设备的选中
  $.each(arr,function(i,v){
     $(v).removeClass('select')
  })
}*/
function clickAllItem(){//设备全选
  $('.item').attr('class','item select')
}
function removeAllItem(){//取消设备全选
  $('.item').attr('class','item')
}
function getItemAllEquipment(){//获取设备组所有的设备
  var arr = []
  $.each($('.item'),function(i,v){
    var itemArr =  getAll(v)
    for(var i = 0; i < itemArr.length;i++){
      arr[arr.length] = itemArr[i]
    }
  })
  return arr
}
function unArray (Arr) {  //去重          
       var newArr = [];        
       for (var i = 0; i < Arr.length; i++) {            
           if (newArr.indexOf(Arr[i]) == -1){    
                newArr.push(Arr[i])        
            }          
        };         
       return newArr;        
     }
function selectvarEquipmentArr(arr,flag){//选中设备
  $.each(arr,function(i,v){
    if(flag){
      $('.sonIcon').eq(v).addClass('onClick')
    }else{
       $('.sonIcon').eq(v).removeClass('onClick')
    }
  })
  whetherClickAll()//设备全选是否需要选中
}
function getItemState(){//判断设备组全选按钮的状态
   var flag = true
    $.each($('.item'),function(i,v){
      if(!$(v).hasClass('select')){
        flag = false;
        return
      }
      
    })
    if(flag){
        $('.itemAll span').addClass('onClick')
      }else{
        $('.itemAll span').removeClass('onClick')
      }
}
