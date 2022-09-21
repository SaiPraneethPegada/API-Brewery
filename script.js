document.body.innerHTML = `
<nav id="topSection" class="navbar navbar-dark bg-dark sticky-top">
  <div class="header container-fluid align-center flex-column ">
    <h1 class="text-center text-white">Brewery List</h1>
    <div class="searchfield">
      <input type="text" class="p-1 m-2 rounded-2" style="width:30vw" placeholder="Search by name or state">
      <button class="btn btn-success" onclick='search()'>Search</button>
    </div>
  </div>
</nav>
<div id='maincontainer' class='d-flex p-4 gap-3 m-0 gb-5 flex-row flex-wrap justify-content-evenly' style="margin="20px"></div>
`;

const url = "https://api.openbrewerydb.org/breweries";

const getData = async () => {
    // Fetch the data from the API
    try {
        const data = await fetch(`${url}`);
        const brewery = await data.json();
        console.log(brewery);
        maincontainer.innerHTML = "";
        brewery.map((drink, index) => {
            displayData(drink);
        });
    } catch (error) {
        console.error(error);
    }
};
getData();

// Rendering data in UI.
const displayData = (obj) => {
    maincontainer.innerHTML += `<div class="card mb-5 p-3 rounded-3" >
    <h3 class="title">Brewery:<span> ${obj.name}</span></h3>
    <p>Brewery Type: ${obj.brewery_type}</p>
    <p>Street- ${obj.street}</p>
    <p>City- ${obj.city}</p>
    <p>PostalCode- ${obj.postal_code}</p>
    <p>State- ${obj.state}</p>
    <p>Country- ${obj.country}</p>
    <p>phone: ${obj.phone}</p>
    <p>Website: <a href=${obj.website_url}>${obj.website_url}</a></p>
    <p>Location: "${obj.latitude}" Latitude, "${obj.longitude}" Longitude</p>
    </div>`;
};

// Search functionality by name and State.
async function search() {
    try {
        maincontainer.innerHTML = "";
        let searchTerm = document.querySelector("input").value.toLowerCase();
        console.log(searchTerm);
        const data = await fetch(`${url}`);
        const brewery = await data.json();

        for (obj of brewery) {
            let name = obj.name;
            name = name.toLowerCase();
            let stateName = obj.state;
            stateName = stateName.toLowerCase();
            if (name.includes(searchTerm) || stateName.includes(searchTerm)) {
                displayData(obj);
            }
        }
    } catch (error) {
        console.error(error);
    }
}
