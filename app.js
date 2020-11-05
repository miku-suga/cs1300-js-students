var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=sW0VHwiJxiwpcc3aylLxILqg4tCsIpW87Obn6RGGQ0s";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      // showPlant(request.response)
      var plantList = JSON.parse(request.response);
      plantData = plantList.data;

      const plantsFiltered = plantData.filter((arrayItem) => {
        return arrayItem.family_common_name=="Rose family";
      })

      plantsFiltered.map((arrayItem) => {
        const wrapper = document.createElement("div");
        const name = document.createElement("h4");
        const img = document.createElement("img");
        wrapper.setAttribute("margin", "5%");
        name.innerText = arrayItem.common_name;
        img.setAttribute("src", arrayItem.image_url);
        img.setAttribute("width", 250);
        wrapper.appendChild(name)
        wrapper.appendChild(img);
        document.getElementById("plants").appendChild(wrapper);
      });


    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////



  