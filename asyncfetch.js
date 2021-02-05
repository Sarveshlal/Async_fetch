var url = "https://restcountries.eu/rest/v2/all";
async function country() {
  try {
    let a = await fetch(url);
    let data = await a.json();
    console.log(data);
    let k = 0;
    countrydata(data, k);
  } catch (error) {
    console.log(error);
  }
}
function countrydata(data, k) {
  var container = document.createElement("div");
  container.classList.add("container", "p-4");
  container.setAttribute("style", "background-color: rgb(197, 197, 248);");
  for (var i = 0; i < data.length; i++) {
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    for (var j = 0; j < 4; j++) {
      var column = document.createElement("div");
      column.setAttribute("class", "col-3");
      var card = document.createElement("div");
      card.setAttribute("class", "card");
      card.setAttribute("style", "width:15rem");
      var h5 = document.createElement("h5");
      h5.setAttribute("class", "card-title");
      h5.setAttribute("style", "text-align:center;");
      h5.setAttribute("id", "title");
      h5.innerHTML = data[k].name;
      var img = document.createElement("div");
      img.setAttribute("id", "img");
      var flag = data[k].flag;
      img.innerHTML = `<img src = ${flag} width = 230px height = 120px>`;
      var p1 = document.createElement("p");
      p1.setAttribute("style", "text-align:center;");
      var span1 = document.createElement("span");
      span1.innerHTML = "Capital: ";
      var span2 = document.createElement("span");
      span2.setAttribute("class", "badge badge-success");
      span2.innerHTML = data[k].capital;
      p1.append(span1, span2);
      var p2 = document.createElement("p");
      p2.setAttribute("style", "text-align:center;");
      var span1 = document.createElement("span");
      span1.innerHTML = "Country Code: ";
      var span2 = document.createElement("span");
      span2.innerHTML = data[k].alpha3Code;
      p2.append(span1, span2);
      var p3 = document.createElement("p");
      p3.setAttribute("style", "text-align:center;");
      var span1 = document.createElement("span");
      span1.innerHTML = "Region: ";
      var span2 = document.createElement("span");
      span2.innerHTML = data[k].region;
      p3.append(span1, span2);
      var p4 = document.createElement("p");
      p4.setAttribute("style", "text-align:center;");
      var span1 = document.createElement("span");
      span1.innerHTML = "LatLong: ";
      var span2 = document.createElement("span");
      span2.innerHTML = data[k].latlng;
      p4.append(span1, span2);
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.classList.add("btn", "btn-outline-secondary");
      button.innerHTML = "click for Weather";
      button.addEventListener("click", btnclk);
      var p = document.createElement("p");
      p.setAttribute("id", "weathervalues");
      var lat = data[k].latlng[0];
      var lon = data[k].latlng[1];
      async function btnclk() {
        try {
          let b = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f65b074e7e5f9345ad4649fe375b9294`
          );
          let weathers = await b.json();
          p.innerHTML = `<br><b>Weather</b> : ${weathers.weather[0].description}<br><b>Temperature</b> : ${weathers.main.temp} C,<br> <b>Feels like:</b> ${weathers.main.feels_like} C`;
          console.log(
            weathers.weather[0].description,
            weathers.main.temp,
            weathers.main.feels_like
          );
        } catch (e) {
          console.log(e);
        }
      }
      card.append(h5, img, p1, p2, p3, p4, button, p);
      column.append(card);
      row.append(column);
      container.append(row);
      document.body.append(container);
      k++;
    }
  }
}
country();
