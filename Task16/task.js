/**
 * Created by hyou on 2016/10/27.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById("aqi-city-input").value.trim();
    var value=document.getElementById("aqi-value-input").value.trim();
    if(/[A-Za-z\u4E00-\u9FA5]+/.test(city)){
        if(/\d+/.test(value)){
            aqiData[city]=parseInt(value);
        }
        else alert("空气质量指数必须为整数")

    }
    else alert("输入的城市名必须为中英文字符")

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    clearList();
    if(Object.keys(aqiData).length!==0){
        var trTitle=document.createElement("tr");
        var tdCityTitle=document.createElement("td");
        tdCityTitle.innerText="城市";
        var tdValueTitle=document.createElement("td");
        tdValueTitle.innerText="空气质量";
        var tdOperate=document.createElement("td");
        tdOperate.innerText="操作";
        trTitle.appendChild(tdCityTitle );
        trTitle.appendChild(tdValueTitle);
        trTitle.appendChild(tdOperate);
        document.getElementById("aqi-table").appendChild(trTitle);
        for(var i in  aqiData){
            var tr=document.createElement("tr");
            var tdCity=document.createElement("td");
            tdCity.innerText=i;
            var tdValue=document.createElement("td");
            tdValue.innerText=aqiData[i];
            var tdBtn=document.createElement("td");
            var delButton=document.createElement("button");
            delButton.innerText="删除";
            tdBtn.appendChild(delButton);
            tr.appendChild(tdCity );
            tr.appendChild(tdValue);
            tr.appendChild(tdBtn);
            document.getElementById("aqi-table").appendChild(tr);

        }
    }



}

function clearList() {
    var tableNode=document.getElementById("aqi-table");
    while( tableNode.hasChildNodes()){
        tableNode.removeChild(tableNode.firstChild);
    }

}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // do sth.
    var city=e.target.parentElement.parentElement.firstElementChild.innerText;
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click",addBtnHandle);


    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click",function (e) {
        if(e.target.nodeName=="BUTTON") delBtnHandle(e)
    })


}

init();
