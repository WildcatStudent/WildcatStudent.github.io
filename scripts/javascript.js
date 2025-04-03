function default_theme() {
    document.getElementById("current_theme").innerHTML="Current Site Theme: Default";
    document.getElementById("page_body").style="background-color: darkblue";
            }

function noir_theme() {
    document.getElementById("current_theme").innerHTML="Current Site Theme: Noir";
    document.getElementById("page_body").style="background-color:#000000";
            }


 function light_theme() {
    document.getElementById("current_theme").innerHTML="Current Site Theme: Light";
    document.getElementById("page_body").style="background-color:#4274BD";
   // document.getElementsByClassName("header_style").color= "HEX #525252"; 
             }

document.getElementById('signupForm').addEventListener("submit", function(event) {
			alert('Form submitted')
			const password = document.getElementById('password').value;
			const username = document.getElementById('username').value;

			if (password.includes(username)) {
				event.preventDefault();
				alert("Your password can't contain your username.");
			}
		}

