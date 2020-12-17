//function that gets called when page loads
//it retrives the users form the database
//and makes a list with the lit-elements in it
function getAllUsers() {
    fetch(`api/fetchUsers.php`, {
    }).then(res=>res.json())
    .then(data=>{  
        var userContainer = document.getElementById("users"); 

        data.forEach(x=> {
            
        //makes the new elements and appends it to userContainer elements
         var newUserElement = document.createElement('div');
        newUserElement.setAttribute("id", x.uid)
        newUserElement.innerText = x.uname + "\n" + x.firstName + " " + x.lastName + "\n";
        userContainer.appendChild(newUserElement);
            
        //does so the DIV is clickable
        newUserElement.onclick = function() {getUser(newUserElement.id)};
        });
    });
}

//function that is called when a user is clicked
//it fetches all info about one specific user
//and puts the info in a HTML form
//Param e is the user ID
function getUser(e){
    var user = document.getElementById("user");
    user.style.display = "block";
    fetch("api/fetchUser.php?id=" + e.toString(), {
  
    }).then(res=>res.json())
    .then(data=>{

        //puts info about user inside the HTML form
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("uid").value = e;
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("uname").value = data.uname;

    });
}


//eventlistener on the "Edit User" Button
//updates the information about a user
//if user was updated, then getAllUsers is called to update list
document.getElementById("submitForm").addEventListener('click', e=>{
    const dataForm = new FormData(e.target.form);
    fetch('api/updateUser.php', {
     method: 'POST',
     body: dataForm
    }).then(res=>res.json())
      .then(data=>{
        if (data.status=='success') {
            console.log("The user was updated");
            getAllUsers();
        } else {
            console.log("The user was not updated");
        }
      })
  })