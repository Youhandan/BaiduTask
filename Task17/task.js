/**
 * Created by hyou on 2016/10/28.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: 0,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var selectedTime=event.target.value;
    if(selectedTime!==pageState["nowGraTime"]){
        // 设置对应数据
        pageState["nowGraTime"]=selectedTime;
        // 调用图表渲染函数
        renderChart()
    }



}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var selectedIndex=event.target.selectedIndex;
    if(selectedIndex!=pageState["nowSelectCity"]){
        // 设置对应数据
        pageState["nowSelectCity"]=selectedIndex;
        // 调用图表渲染函数
        renderChart()
    }

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    document.getElementById("form-gra-time").addEventListener("change",graTimeChange)

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select=document.getElementById("city-select");
    var cities=Object.keys(aqiSourceData);
    cities.forEach(function (e) {
        var option=document.createElement("option");
        option.text=e;
        select.add(option,null);
    });

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener("change",citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    //获取选择的城市数据
    var cities=Object.keys(aqiSourceData);
    var selectedCity=cities[pageState["nowSelectCity"]];
    var selectedCityData=aqiSourceData[selectedCity];
    var fullDateStrArr=Object.keys(selectedCityData);
    switch (pageState["nowGraTime"]){
        case "day":{
            chartData=selectedCityData;
            break
        }
        case "month":{
            var dayByMonth=groupMonths(fullDateStrArr);
            for(var m in dayByMonth){
                var sum=0;
                var aver=0;
                var charDataKey="2016年"+m+"月";
                dayByMonth[m].forEach(function (e) {
                    sum+=selectedCityData[e];
                });
                aver=sum/dayByMonth[m].length;
                chartData[charDataKey]=aver;
            }
            break
        }
        case "week":{
            var dayByWeek=groupWeeks(fullDateStrArr);
            for(var n in dayByWeek){
                var sum=0;
                var aver=0;
                var charDataKey=n;
                dayByMonth[n].forEach(function (e) {
                    sum+=selectedCityData[e];
                });
                aver=sum/dayByMonth[n].length;
                chartData[charDataKey]=aver;
            }
        }
    }




//按月份将日期分组
    function groupMonths(fullDateStrArr) {
        var months={};
        fullDateStrArr.forEach(function (e) {
            var dat=e.split("-");
            var m=dat[1];
            if(m in months){
                months[m].push(e);
            }
            else{
                months[m]=[];
                months[m].push(e)
            }
        });
        return months
    }
    //按周将日期分组
    function groupWeeks(fullDateStrArr) {
        var weeks={};
        var firstDay=new Date(fullDateStrArr[0]);
        var beginWeekDay=firstDay.getDay();

        if(beginWeekDay==0){
            var restDays=fullDateStrArr.length%7;
            var weekCount=0;
            for(var i=0;i<fullDateStrArr.length;i+7){
                weekCount++;
                var weekStr="2016年第"+weekCount+"周";
                weeks[weekStr]=fullDateStrArr.slice(i,i+7);
            }
            if(restDays!==0){
                weekCount++;
                var weekStr="2016年第"+weekCount+"周";
                weeks[weekStr]=fullDateStrArr.slice(7*(weekCount-1));
            }
        }
        else{
            var weekCount=1;
            var firstWeekDays=6-beginWeekDay;
            var restDays=(fullDateStrArr.length-firstWeekDays)%7;
            var weekStr="2016年第"+weekCount+"周";
            weeks[weekStr]=fullDateStrArr.slice(0,firstWeekDays);
            for(var i=firstWeekDays;i<fullDateStrArr.length;i+7){
                weekCount++;
                var weekStr="2016年第"+weekCount+"周";
                weeks[weekStr]=fullDateStrArr.slice(i,i+7);
            }
            if(restDays!==0){
                weekCount++;
                var weekStr="2016年第"+weekCount+"周";
                weeks[weekStr]=fullDateStrArr.slice(7*(weekCount-1));
            }
        }
        return weeks
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();