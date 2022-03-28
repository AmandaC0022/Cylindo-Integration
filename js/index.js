const features = document.querySelectorAll(".feature"); 

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

//declares an empty array to push the features into 
const featureArr = []; 

// gets a displays the fabric using a click event
features.forEach(function (feature) {
  feature.addEventListener("click", function(event) {
    event.preventDefault(); 

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
      //prevents user error of clicking on the wrong space 
      if (type === null) {
        console.log("Type is null"); 
        return featureArr; 
      }

      console.log("first values added"); 
      featureArr.push(type, value);
    }

    console.log(featureArr); 

    //sends the features array in the API call to Cylindo 
    if(viewerInstance) {
      viewerInstance.setFeatures(featureArr); 
    }
  }) 
}); 

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