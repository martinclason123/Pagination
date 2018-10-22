/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//variables that store DOM elements you will need to reference and/or manipulate
//Creating a div for the pagination links with a class of "pagination"
const div = document.createElement('DIV');
div.className = "pagination";

//Creating elements to dynamically add a search function to the page
const searchBar = document.getElementsByClassName("page-header cf")[0];

const searchDiv = document.createElement('DIV');
searchDiv.className = "student-search";

const input = document.createElement('INPUT');
input.placeholder = "Search for students...";

const button = document.createElement('BUTTON');
button.innerHTML = 'Search';

const H2 = document.getElementsByTagName('h2')[0];

//Message to be displayed if no results were found
const noResultsMessage = document.createElement('DIV');
noResultsMessage.innerHTML = "0 search results.";
noResultsMessage.classList.add("page");
noResultsMessage.classList.add("hide");

//Appending the elements to the page
searchDiv.append(input);
searchDiv.append(button);
searchBar.appendChild(searchDiv);
H2.appendChild(noResultsMessage);


//Creates an object of all the students
let studentsObject = document.getElementsByClassName("student-item");

//Creates an array out of the object so that items can be removed as needed
let students = [];
for(var x = 0; x < studentsObject.length; x++)	{
	students.push(studentsObject[x]);
}

//Creates an array to hold search results
var searchResults = [];

//Selects all the names so that they can be used in the search function
const studentNames = document.getElementsByTagName('h3');

//Selects all the email address so that they can be used in the search function
const studentEmails = document.getElementsByClassName('email');

//Selects the existing page DIV
const page = document.getElementsByClassName('page')[0];


//Gets the amount of links to be displayed initially
let links;
getLinks();

//passes the links variable to the function that creates the pagination
paginate(links);

//Sets the initial range of students displayed to the first 10
let range1 = 0;
let range2 = 9;

//A boolean to determine if the pagination needs to be created or replaced
var replacePagination = false;

//A boolean to help determine which students are shown by the pagination links
var displaySearchResults = false;

//boolean that determines if the searchResults array should be cleared out or not
var clearSearch = true;

//Passes the initial range to be displayed to the function that sets what will be displayed/hidden
hide(range1, range2);

//Stores the last selected pagination button so that the 'active' class can be removed when a new one is clicked
var lastTargeted;







//function to hide all of the items in the list except for the ten you want to show
function hide(range1, range2)	{
	
//Checks to see if the search button is what triggered the function
	if (displaySearchResults)	{
		for (var i = 0; i < searchResults.length; i++)	{
			if(i < range1 || i > range2)	{
				searchResults[i].classList.add('hide');
			} else{
				searchResults[i].classList.remove('hide');
			}
			
		}	
			
		if(searchResults.length < 1)	{
			noResultsMessage.classList.remove("hide");
		}

		
	}	else {
	
		for(i = 0; i < students.length; i++)	{
//Adds to .hide class to all students that are not in the range passed into the function		
			if(i < range1 || i > range2)
				students[i].classList.add('hide');			
		}
	}
		
/*A boolean value to help determine if the pagination needs to be created or replaced. Set to true after
initial page load*/
replacePagination = true;	
	
}












// Create and append the pagination links - Creating a function that can do this is a good approach
function paginate(links)	{
	


//Checks to see if this is the first time a pagination list has been created
		if(replacePagination)	{
			div.removeChild(div.firstChild);		
		}	


//Creating an unordered list for the pagination links
	const ul = document.createElement('UL');
	
	
	for(var i = 0; i < links; i++)	{
		var li = document.createElement('LI');
		var a = document.createElement('A');	
		a.href = "#";
//1 is added so that the first pagination link is 1 rather than 0		
		a.innerHTML = `${i + 1}`;
		li.append(a);
		ul.append(li);		
	}	
	
		div.append(ul);
		page.append(div);
				
}


function refreshResults()	{
		searchResults = [];
}



//removes all DOM manipulation for when new ranges are selected
function refresh()	{
	if(displaySearchResults)	{
//prevents pagination link clicks from clearing out search results
				if(clearSearch)	{
					searchResults = [];
				}

	} else{
	
		for(var i = 0; i < students.length; i++)	{
			students[i].classList.remove('hide');
		}
	}
	
	clearSearch = true;
}






//Calculates the amount of links to be generated
function getLinks()	{
	
	var add = 0;
	var subtract = 0;
	
	if(displaySearchResults)	{
		for(var i = 0; i < searchResults.length; i++)	{
			
			add++;		
			
		}
	} else {
		for(i = 0; i < students.length; i++)	{	
//Only adds students if they are not hidden
				if(students[i].className !== 'student-item cf hide')	{
					
					add++;
				}
			}
		}
	links = Math.ceil(add / 10);
}

function search()	{
	
//Hides the no results found message
	noResultsMessage.classList.add("hide");
//Removes the 'hide' class from any previous selections	
	refresh();
	
//Stores the search criteria as a variable	
	var keyWord = input.value;

//Runs through the student array, hiding any students that do not match the search criteria	
	for(var i = 0; i < students.length; i++)	{
		
		var email = studentEmails[i].innerHTML;
		var name = studentNames[i].innerHTML;
/*if the students does not match the search criteria, the hide class is added			
if it does match, the student is added to the search results array*/

			if(email.search(keyWord) == -1 && name.search(keyWord) == -1)	{
				students[i].classList.add('hide');
			}	else{
				searchResults.push(students[i]);
			}					
	}

//Changes the pagination to reflect the amount of search results	
	range1 = 0;
	range2 = 9;
	getLinks();
	paginate(links);
	
//Sets a boolean value to be true so that the pagination links show the students that were searched for	
displaySearchResults = true;
	hide(range1, range2);
}



div.addEventListener('click', (e)=>	{
//Checks to see if any pagination links have been clicked before this one	
	if(lastTargeted != null)	{
//Removes the 'active' class from the previous selection
	lastTargeted.classList.remove('active');
	};
//Adds the selected class to the clicked pagination link	
	e.target.classList.add('active');

//saves the clicked button so that the 'active' class can be removed on next click	
	lastTargeted = e.target;
	
//Gymnastics to set the ranges based on what pagination number was clicked
	range1 = parseInt(e.target.innerHTML);	
	if (range1 === 1)	{
		range2 = 9;
		range1 = 0;

	}	else {	
		range1 = parseInt((range1 - 1) + "0");
		range2 = range1 + 9;		
	}
clearSearch = false;
//Removes the 'hide' class from any previous selections	
	refresh();

//Passes the ranges to the hide function	
	hide(range1, range2);

});






button.addEventListener('click',() =>	{
	search();
});

input.addEventListener('keyup',() =>	{
	search();
});




