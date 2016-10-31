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
    var cities=Object.keys(aqiSourceData);
    var city=cities[pageState["nowSelectCity"]];
    var showWay=pageState["nowGraTime"];
    var chart=document.getElementById("chart");
    var divNum=Object.keys(chartData[city][showWay]).length;
    var divWidth=(chart.clientWidth-100)/divNum;
    for(var ele in chartData[city][showWay]){
        var div=document.createElement("div");
        div.style.height=chartData[city][showWay][ele]+"px";
        div.style.float="left";
        div.style.border="1px solid black";
        div.style.width=divWidth+"px";
        chart.appendChild(div);
    }

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
        renderChart();
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
    var charDataKeys=Object.keys(aqiSourceData);
    charDataKeys.forEach(function (e) {
        chartData[e]={};
        chartData[e]["day"]=aqiSourceData[e];
        chartData[e]["week"]=calculateByWeek(aqiSourceData[e]);
        chartData[e]["month"]=calculateByMonth(aqiSourceData[e]);
    });


//按月份计算数据
    function calculateByMonth(cityData) {
        var monthData={};
        var cityDataKeys=Object.keys(cityData);
        var dayByMonth=groupMonths(cityDataKeys);
        for(var m in dayByMonth){
            var sum=0;
            var aver=0;
            dayByMonth[m].forEach(function (e) {
                sum+=cityData[e];
            });
            aver=sum/dayByMonth[m].length;
            monthData["2016年"+m+"月"]=aver;
        }
        return monthData

    }

    //按周计算数据
    function calculateByWeek(cityData) {
        var weekData={};
        var cityDataKeys=Object.keys(cityData);
        var dayByWeek=groupWeeks(cityDataKeys);
        for(var n in dayByWeek){
            var sum=0;
            var aver=0;
            dayByWeek[n].forEach(function (e) {
                sum+=cityData[e];
            });
            aver=sum/dayByWeek[n].length;
            weekData[n]=aver;
        }
        return weekData
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
        var weeks = {};
        var firstDay = new Date(fullDateStrArr[0]);
        var beginWeekDay = firstDay.getDay();
        var weekCount = 1;
        var firstWeekDays = 6 - beginWeekDay;
        weeks["2016年第" + weekCount + "周"] = fullDateStrArr.slice(0, firstWeekDays);
        for (var i = firstWeekDays; i < fullDateStrArr.length; i += 7) {
            weekCount++;
            weeks["2016年第" + weekCount + "周"] = fullDateStrArr.slice(i, i + 7);
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
    renderChart();
}

init();