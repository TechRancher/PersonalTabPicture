/*
  Personal Tab Pictures with information overlaid. 
  We call function to check for username in cookie
  If no info is attached to username in cookie, we call
  the function to add personal username greeting.
  Next we set date and time to be updated and displayed.
  Then there is an option for the user to select Picture interest.
  Once this is set the user's picture will be rotated every 12 hours.
  The photo selected will also display the author of the photograph. 
  We added the option to change the picture interest a anytime with the
  change piture button.
*/

// Global Variables
const setName = document.querySelector(".user-name");
const photoInterest = document.querySelector(".interest");
const greeting = document.querySelector(".greeting");
const time = document.querySelector(".time");
const picInterest = document.querySelector(".interest-text");
const photoBy = document.querySelector(".photo-by");
const pictureOption = document.querySelector(".photo-option");
  

// Load Event Listeners
loadEventListeners()
function loadEventListeners(){
  // DOM Load event
  document.addEventListener("DOMContentLoaded", checkCookie());
  // Current time
  // Update every 10 seconds
  setCurrentTime();
  setInterval(function() {
    setCurrentTime();
  }, 10*1000)
  pictureOption.addEventListener("click", photoOption());
  
};

// Check to see if the username has been saved in cookie
function checkCookie(){
  let username = getCookie("username");
  // Check cookie
  if(username) {
    greeting.innerHTML = `Hello, ${username}`;
    greeting.style.display = "inline-block";
    photoInterest.style.display = "none";
    setName.style.display = "none";
    let interest = getCookie("interest");
    if(interest){
      photoInterest.style.display = "none";
      picInterest.innerHTML = `${interest}`;
      greeting.innerHTML = `Hello, ${username}`;
      let pictureUrl = getCookie("picture");
      let pictureBy = getCookie("pictureBy");
      let photoByUrl = getCookie("photoByUrl");
      if(!pictureUrl) {
        newImage(interest);
        pictureUrl = getCookie("picture");
      }
      photoBy.innerHTML = `${pictureBy}`;
      photoBy.setAttribute("href", photoByUrl);
      document.querySelector("body").style.backgroundImage = `url(${pictureUrl})`;
    // } else {
    //   greeting.innerHTML = `What's your interest?`;
    //   photoInterest.style.display = "inline-block";
    //   setName.style.display = "none";
    //   photoOption();
    }
  }
  else {
    photoInterest.style.display = "none";
    setName.style.display = "inline-block";
    greeting.innerHTML = `What's your name?`;
    greeting.style.display = "inline-block";
    setUser();
  }
};

/*
  Functions
*/
// Call on the Cookie to check for the username
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for(let i = 0; i< ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if(c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// Set Cookie
function setCookie(cname, cvalue, exdays){
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

// Set Name using setUser()
function setUser(){
  setName.addEventListener("keyup", function(e){
    if(e.which == 13) {
      let username = e.target.value;
      if(!username)return;
      setName.style.display = "none";
      greeting.innerHTML = `What's your interest?`;
      photoInterest.style.display = "inline-block";
      greeting.style.display = "inline-block";
      setCookie("username", username, 365);
    }
  });
};

// Set Current Time 
function setCurrentTime(){
  let now = new Date();
  let hours = [
    "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "10", "11"
  ];
  document.querySelector(".time").innerHTML = `${hours[now.getHours()]}:${now.getMinutes()<10?"0":""}${now.getMinutes()}`;
  document.querySelector(".date").innerHTML = `${now.toLocaleDateString("en-us", {weekday: "short", year: "numeric", month: "short", day: "numeric"})}`
};

// Photo Option 
function photoOption() {
  // greeting.innerHTML = `What's your interest?`;
  // photoInterest.style.display = "inline-block";
  // setName.style.display = "none";
  photoInterest.addEventListener("keyup", function(e){
    console.log(e.target.value);
    if(e.which == 13){
      let interest = e.target.value;
      if(!interest) return;
      newImage(interest);
      let username = getCookie("username");
      photoInterest.style.display = "none";
      greeting.innerHTML = `Hello ${username}`;
      greeting.style.display = "inline-block";
      setCookie("interest", interest, 365);
    }
  });
};

// New Image
// function newImage(keyword) {
//   if(!ACCESS_KEY) {
//     alert("please update your access key");
//     return;
//   }
//   let url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=20&orientation=landscape&client_id=${ACCESS_KEY}`;
// }