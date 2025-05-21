function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}
function addSlice(sliceSize, pieElement, offset, sliceID, color) {
  $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
  
  offset -= 1; // don't shadow with var
  var sizeRotation = sliceSize;

  $("." + sliceID).css({
    "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
  });

  $("." + sliceID + " span").css({
    "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
    "background-color": color
  });
}

function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var sliceID = "s"+dataCount+"-"+sliceCount;
  var maxSize = 179;
  if(sliceSize<=maxSize) {
    addSlice(sliceSize, pieElement, offset, sliceID, color);
  } else {
    addSlice(maxSize, pieElement, offset, sliceID, color);
    iterateSlices(sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
  }
}
function createPie(dataElement, pieElement) {
  var listData = [];
  $(dataElement + " span").each(function() {
    const val = Number($(this).html());
    if (!isNaN(val)) {
      listData.push(val);
    }
  });

  var listTotal = listData.reduce((a, b) => a + b, 0);
  var offset = 0;
  var color = [
    "cornflowerblue", 
    "olivedrab", 
    "orange", 
    "tomato", 
    "crimson", 
    "purple", 
    "turquoise", 
    "forestgreen", 
    "navy", 
    "gray"
  ];

  $(pieElement).empty(); // Clear previous pie slices

  for (var i = 0; i < listData.length; i++) {
    var size = sliceSize(listData[i], listTotal);
    var sliceColor = color[i % color.length];

    iterateSlices(size, pieElement, offset, i, 0, sliceColor);
    $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", sliceColor);

    offset += size;
  }
}

