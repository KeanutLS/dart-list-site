/* sources: w3schools, google, stackoverflow  */
document.addEventListener("DOMContentLoaded", function (e) {
  // makes sure the script doesn't start running before the whole html page is loaded.
  console.log("Dit is de pagina waar je de lijst kunt maken.");

  function addDartToList(pictureInput, name, weight, description) { 
    const pictureFile = pictureInput.files[0]; //get the picture file from the input element

    if (!pictureFile) {
      alert("Choose a picture first."); //ask the user to choose a picture if they haven't already
      return;
    }

    const reader = new FileReader(); //create a new FileReader object to read the picture

    reader.onload = function (e) {
      //when the picture is loaded, create a dart object and add it to the list
      const pictureDataURL = e.target.result; //get the picture data URL from the FileReader object
      const dart = { picture: pictureDataURL, name, weight, description }; //create a dart object

      const storedDarts = JSON.parse(localStorage.getItem("dartsList")) || []; //get the dart list from the local storage
      storedDarts.push(dart); //add the new dart to the dart list
      localStorage.setItem("dartsList", JSON.stringify(storedDarts)); //put the dart list back in the local storage
    };

    reader.readAsDataURL(pictureFile); //read the picture as a data URL
  }

  const dartForm = document.getElementById("dartForm"); //get the dart form
  dartForm.addEventListener("submit", function (e) {
    //when the form is submitted, add the dart to the list
    e.preventDefault(); //prevents the page from reloading

    const dartPictureInput = document.getElementById("dartPicture");
    const dartName = document.getElementById("dartName").value;
    const dartWeightInput = document.getElementById("dartWeight");
    const dartDescription = document.getElementById("dartDescription").value;

    // Check if dartWeight is a valid number
    const dartWeight = parseFloat(dartWeightInput.value); //convert dartWeight to a number
    if (isNaN(dartWeight)) {
      //check if dartWeight is not a number
      alert("Please enter a valid number for Dart Weight."); //ask the user to enter a valid number
      return;
    }

    addDartToList(dartPictureInput, dartName, dartWeight, dartDescription); //add the dart to the list

    dartForm.reset(); //reset the form after submitting
  });
});
