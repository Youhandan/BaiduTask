# BaiduTask笔记
##第一阶段
###Task2
####1.设计横向导航栏时，针对`<li>`元素横向排列有两种方法：<br>
（1）设置`display:inline`或`inline-block`，此方法列表标志消失<br>
（2）设置`float`属性，`float:left`，可保留display的`block`属性，此方法保留列表标志<br>
####2.`box-shadow`:h-shadow,v-shadow,blur,spread,color,inset<br>
（1）blur:模糊距离<br>
（2）spread:阴影尺寸<br>
（3）inset:将外部阴影改为内部阴影<br>
####3.文本编辑常用<br>
（1）`text-indent:2em` 首行缩进两个字符<br>
（2）`line-height`:行距<br>
####4.HTML5新增标签元素<br>
`````
<header>
<article>
<aside>
<footer>
<nav> /*标签定义横向导航链接的部分*/
`````
###Task3
####1.父元素中包含多个浮动元素，清除浮动方法：<br>
（1）`overflow:hidden`<br>
优点：父元素高度会随着内部元素的最高高度调整，无冗余标签<br>
缺点：当你添加样式，或者将嵌套在里面的“span”元素移动到父容器的外面，或者你想给元素添加一个盒子阴影和制作一个下拉菜单，元素的样式会被切断在父元素之内<br>
（2）clearfix技巧<br>
使用方法：在父容器上加一个类group
``````````
.group:before,.group:after{
  content:"";
  display:table
}
.group:after{
  clear:both;
}
.group{
  *zoom:1;/*在IE6和7的浏览器中，加上“*zoom”属性来触发父元素的hasLayout的机制。决定了元素怎样渲染内容，以及元素与元素之间的相互影响。*/
}
``````````
优点：父容器清除浮动，内部元素也可以移到父容器外面<br>
###Task4
####1.`position:absolute`<br>
注意：绝对定位元素的位置直接和父容器是否设置了**相对定位（绝对定位）**有直接关系。绝对定位元素需要至少一个祖先元素设置了**相对定位（绝对定位）**，不然元素定位会相对于**页面的主体**进行定位。<br>
####2.CSS中的居中技巧
参考  <https://css-tricks.com/centering-css-complete-guide/><br>
（1）判断需要居中的元素是行级元素还是块级元素(行级元素是单行还是多行,行级元素是单行还是多行)<br>
（2）父元素with和height是否已知<br>
（3）首先判断居中类型（水平，垂直，水平垂直）<br>
（4）IE support类型<br>
####3.Box sizing and Flexbox in CSS3
（1）`box-sizing:border-box`：定义的with和height包括padding和border，不用的时候定义的with和height不包括padding和border<br>
（2）Flexbox用于页面布局

| Property             | Syntax            | Description |
| -------------------- | ----------------- | ----------- |
| display | display:flex | 在container上使用 |
| flex-direction | flex-direction: row/row-reverse/column/column-reverse/initial/inherit; | Specifies the direction of the **flexible items** inside a flex container |
| justify-content | justify-content: flex-start/flex-end/center/space-between/space-around/initial/inherit; | **Horizontally aligns** the flex items when the items do not use all available space on the main-axis |
| align-item | align-item:stretch/center/flex-start/flex-end/baseline/initial/inherit; | **Vertically aligns** the flex items when the items do not use all available space on the cross-axis |
| flex-wrap | flex-wrap: nowrap/wrap/wrap-reverse/initial/inherit; | 用于窗口缩小后内部item的布局,是否排列到下一行，如何排列 |
| align-content | align-content: stretch/center/flex-start/flex-end/space-between/space-around/initial/inherit; | 设置flex-wrap后内部item的对齐方式 |
| flex-flow | flex-flow: *flex-direction* *flex-wrap*/initial/inherit; | 同时设置flex-direction和flex-wrap |
| order | order: *number*|initial|inherit; | 设置**内部item**的顺序 |
| align-self | align-self: stretch/center/flex-start/flex-end/baseline/initial/inherit; | 设置**内部item**的对齐方式，覆盖父级元素的设置 |
| flex | flex: *flex-grow*增加多少倍 *flex-shrink*缩小多少倍 *flex-basis*增加‘px’/auto/initial/inherit; | 设置**内部item**的宽度，按照比例分配剩余空间，设置flex-basis，相当于设置宽度，分配的剩余空间要减去这部分 |
###Task7
####Select标签实现placeholder功能
````
<select>
    <option value="" disabled selected style="display: none;">Please Choose</option>
    <option value="0">Open when powered (most valves do this)</option>
    <option value="1">Closed when powered, auto-opens when power is cut</option>
</select>
````