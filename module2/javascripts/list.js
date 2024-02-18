/* sources: w3schools, google, stackoverflow  */

document.addEventListener("DOMContentLoaded", function (e) {
  // makes sure the script doesn't start running before the whole html page is loaded.
  console.log("Dit is de pagina met de dartlijst.");

  const displayDartList = () => {
    const dartSetsContainer = document.getElementById("dartSetsContainer");

    const storedDarts = JSON.parse(localStorage.getItem("dartsList")) || []; //gets the dart list from the local storage
    dartSetsContainer.innerHTML = ""; //creates an empty list

    storedDarts.forEach((dart, index) => {
      //loopt door de dartlijst heen
      const dartItem = document.createElement("li"); //creates a list item
      dartItem.className = "dart-item"; //gives the list item a class name

      const dartImage = document.createElement("img"); //creates an image element
      dartImage.src = dart.picture; //puts the picture in the image element
      dartImage.alt = dart.name; //puts the name of the dart in the alt attribute of the image
      dartItem.appendChild(dartImage); //adds the image to the list item

      const dartInfo = document.createElement("div");
      dartInfo.className = "dart-info";
      dartInfo.innerHTML = ` 
        <strong>Dart Name:</strong> ${dart.name},  
        <strong>Dart Weight:</strong> ${dart.weight}g, 
        <strong>Dart Description:</strong> ${dart.description}
      `; // creates the dart info

      dartItem.appendChild(dartInfo); //adds the dart info to the list item

      const editButton = document.createElement("button");
      editButton.textContent = "\u270E edit"; //unicode for a pencil
      editButton.className = "edit-button";
      editButton.addEventListener("click", () =>
        toggleEditForm(dartItem, dart, index)
      );

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "&#128465 delete"; //html entity for a trash can
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => deleteDart(index));

      dartItem.appendChild(deleteButton);
      dartItem.appendChild(editButton);

      dartSetsContainer.appendChild(dartItem);
    });
  };

  function deleteDart(index) {
    const storedDarts = JSON.parse(localStorage.getItem("dartsList")) || []; //gets the dart list from the local storage
    storedDarts.splice(index, 1); //deletes the dart from the dart list
    localStorage.setItem("dartsList", JSON.stringify(storedDarts)); //puts the dart list back in the local storage
    displayDartList(); //show the updated dart list
  }

  function toggleEditForm(dartItem, dart, index) {
    const editForm = dartItem.querySelector(".edit-form"); //gets the edit form from the list item

    if (editForm) {
      // if the edit form exists, remove it
      dartItem.removeChild(editForm);
    } else {
      // if the edit form doesn't exist, create it
      const newEditForm = document.createElement("form");
      newEditForm.className = "edit-form";
      newEditForm.innerHTML = `
        <label for="editDartName">Dart Name:</label>
        <input type="text" id="editDartName" value="${dart.name}" required />

        <label for="editDartWeight">Dart Weight (in grams):</label>
        <input type="text" id="editDartWeight" value="${dart.weight}" required />

        <label for="editDartDescription">Dart Description:</label>
        <textarea id="editDartDescription" required>${dart.description}</textarea>

        <button type="button" class="updateDartButton">Update Dart</button>
      `; //creates the edit form

      const updateDartButton = newEditForm.querySelector(".updateDartButton");
      updateDartButton.addEventListener("click", function () {
        // update the dart object
        dart.name = document.getElementById("editDartName").value;
        dart.weight = document.getElementById("editDartWeight").value;
        dart.description = document.getElementById("editDartDescription").value;

        // update the dart list in the local storage
        const storedDarts = JSON.parse(localStorage.getItem("dartsList")) || []; //gets the dart list from the local storage
        storedDarts[index] = dart; //updates the dart in the dart list
        localStorage.setItem("dartsList", JSON.stringify(storedDarts)); //puts the dart list back in the local storage

        // show the updated dart list
        displayDartList();
      });

      dartItem.appendChild(newEditForm); //adds the edit form to the list item
    }
  }

  displayDartList();
});
