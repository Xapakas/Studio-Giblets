
function wrapper(){

  var promises = [];
  var eye_types = ["Brown","Blue","Green","Red","Black","Hazel","Grey","White"];
  eye_types.forEach(function(color,i){
    promises.push(d3.json("https://ghibliapi.herokuapp.com/people?eye_color="+color));
  });
  Promise.all(promises).then(function(dataArray){
    var big_Data = [];
    dataArray.forEach(function(colors,i){
      var list = [];
      colors.forEach(function(people){
        list.push(people.name);
      });
      list.color=eye_types[i];
      big_Data.push(list);
    });
    addToTable(big_Data);
  },
  function(err){
    console.log(err);
  })
}

function addToTable(list){
  // console.log(list.length,typeof list);
  // var list= [1,2,3,5,6];
  // console.log(list,typeof list);
  var table = d3.select("table");

  var rows = table.selectAll("tr")
              .data(list)
              .enter()
              .append("tr")
              .attr("id",function(d){
                return d.color;
              })
              .on("click",function(d){
                d.forEach(function(name){
                  d3.select("tr#"+d.color)
                    .append("td")
                    .text(name);
                })
              })

  rows.append("td")
      .text(function(d){
        return d.color;
      })
  rows.append("td")
      .text(function(d){
        return d.length;
      })
}
