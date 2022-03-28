
// const cushions = document.querySelectorAll(".cushions"); 
// const nailheads = document.querySelectorAll(".nailheads"); 
const features = document.querySelectorAll(".feature"); 
// const upholstery = document.querySelectorAll(".upholstery"); 
// const variation = document.querySelectorAll(".variation"); 


// CYLINDO CODE 

// declare the variable that will hold the 360 HD Viewer instance
var viewerInstance = null;
// the opts object should hold the start properties of the 360 HD Viewer
var opts = { 
  'accountID': 5006,
  'productCode': 'SCH-147288',
  // features is the default
  'features': ["UPHOLSTERY", "3500", "CUSHION TYPE", "2 OVER 2", "NAILHEAD", "NO" ], 
  'containerID': '#put-viewer-here', 
  //how to add lifestyles and videos 
  'alternateContent': [{
    'provider': 'direct', 
    'description': 'Halton Sofa', 
    'poster': 'https://gabbyhome.com/wp-content/uploads/SCH-147288-1-1-760x760.jpg', 
    'thumb': 'https://gabbyhome.com/wp-content/uploads/SCH-147288-1-1-760x760.jpg', 
    'sources': [{
      'src': 'https://player.vimeo.com/video/502344696?title=0&byline=0&portrait=0&badge=0' 
    }],
  }],
}

// make sure the cylindo framework has been "installed"
if (cylindo) {
  // do not instantiate the viewer until the framework reports ready.
  cylindo.on('ready', function () {
    // create the instance
    viewerInstance = cylindo.viewer.create(opts);
  });
}

const featureArr = []; 

const filterNull = () => {
  featureArr.forEach(item => {
    if (item !== null) {
      featureArr.push(item); 
    }
  }); 
  console.log("null values were removed.", featureArr); 
  return featureArr; 
}

// gets a displays the fabric using a click event
features.forEach(function (feature) {
  feature.addEventListener("click", function(event) {
    // event.preventDefault(); 

    var value = event.target.getAttribute('data-feature-value');
    var type = event.target.parentNode.getAttribute('data-feature-type'); 
    // console.log(value, type); 

    //is there a value already assigned to the array? 
    if (featureArr.length >= 2) {

      //if the new type is UPHOLSTERY, ... 
      if (type === 'UPHOLSTERY') {
        // console.log("Type is upholstery"); 

        //if the array already contains UPHOLSTERY, then it replaces the old value
        if (featureArr.indexOf('UPHOLSTERY') >= 0) {
          console.log("fabric was replaced.")
          const upholsteryIndex = featureArr.indexOf('UPHOLSTERY');
      
          featureArr[upholsteryIndex + 1] = value; 
          featureArr[upholsteryIndex] = type;
          //otherwise, it just adds the new value to the array 
        } else {
          featureArr.push(type, value); 
        }
      }

      if (type === 'CUSHION TYPE') {
        // console.log("Type is cushions."); 

        if (featureArr.indexOf("CUSHION TYPE") >= 0) {
          console.log("cushion was replaced.")
          const cushionIndex = featureArr.indexOf('CUSHION TYPE');

          featureArr[cushionIndex + 1] = value; 
          featureArr[cushionIndex] = type;
        } 
        else {
          featureArr.push(type, value);
        }
      }

      if (type === 'NAILHEAD') {
        // console.log("Type is nailhead."); 

        if (featureArr.indexOf("NAILHEAD") >= 0) {
          console.log("nailhead was replaced.")
          const nailheadIndex = featureArr.indexOf('NAILHEAD');

          featureArr[nailheadIndex + 1] = value; 
          featureArr[nailheadIndex] = type;
        } 
        else {  
          featureArr.push(type, value);
        }
      }

    } else {
      console.log("first values added"); 
      featureArr.push(type, value);
    }
    console.log(featureArr); 
    
    if(viewerInstance) {
      viewerInstance.setFeatures(featureArr); 
    }
  }) 
})

//CYLINDO'S CODE 

//Variation selection handler 
// $(".variation").click( function() {
//   // remove the class "selected" from all li elements
//   $(this).parent().find("li").removeClass("selected");
//   // add the class "selected" to the current clicked element
//   $(this).addClass("selected");  
//   // console.log(this); 
  
//   // create array with values from the selected ones
//   var featureArray = [ 
//     // get the first feature type name
//     $(".upholstery").attr("data-feature-type"),
//     // get the feature value for the feature type above
//     $(".upholstery .selected").attr("data-feature-value"),
//     // get the second feature type name
//     $(".legs").attr("data-feature-type"),    
//     // get the feature value for the feature type above
//     $(".legs .selected").attr("data-feature-value"),
//     $(".cushions").attr("data-feature-type"), 
//     $(".cushions .selected").attr("data-feature-value")
//   ];
//   // this viewer function sends an array with the new selected features
//   viewerInstance.setFeatures(featureArray);
// });

// CYLINDO CODE ENDS 

const container = document.querySelector('#fabric_choices'); 

//GET all Fabrics & Render them to the page 
const renderFabrics = async () => {
  let uri = "http://localhost:3000/fabrics"; 
  //makes the call & stores the data as res 
  const res = await fetch(uri); 
  //converts data to json 
  const fabrics = await res.json(); 
  let template = ''; 

  fabrics.forEach(fabric => {
    template += `
    <li data-feature-value="${fabric.id}" class="variation feature upholstery" id="${fabric.name}" style="background:${fabric.color}"></li>
    `
  }); 

  container.innerHTML = template; 
} 

renderFabrics();

const legContainer = document.querySelector("#leg_choices")
//GET all leg choices & render them to the page
const renderLegs = async () => {
  let uri = "http://localhost:3000/legs"; 
  //makes the call & stores the data as res 
  const res = await fetch(uri); 
  //converts data to json 
  const legs = await res.json(); 
  
  let template = ''; 
  legs.forEach(leg => {
    template += `
    <li data-feature-value="${leg.name}" class="variation legs" style="background:${leg.color}"></li>
      `
  })

  legContainer.innerHTML = template; 
} 

renderLegs(); 

//CONFIGURATION API CALL 
const getData = async () => {
    let uri = "https://content.cylindo.com/api/v2/5006/products/SCH-147288/configuration"; 
    //makes the call & stores the data as res 
    const res = await fetch(uri); 
    const data = await res.json(); 
    console.log(data); 
  } 

  getData(); 