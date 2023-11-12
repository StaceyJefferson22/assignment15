const getAthletes = async() => {
    try{
        return(await fetch("api/athletes/")).json();
    }catch (error) {
        console.log(error);
    }
};

const showAthletes = async() => {
    let athletes = await getAthletes();
    let athletesDiv = document.getElementById("athlete-list");
    athletesDiv.innerHTML = "";
    athletes.forEach((athlete) => {
        const section = document.createElement("section");
        section.classList.add("athlete");
        athletesDiv.append(section);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);
        
        const h3 = document.createElement("h3");
        h3.innerHTML = athlete.name;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayDetails(athlete);
        };
    });
};

const displayDetails = (athlete) => {
    const athleteDetails = document.getElementById("athlete-details");
    athleteDetails.innerHTML ="";

    const h3 = document.createElement("h3");
    h3.innerHTML = athlete.name;
    athleteDetails.append(h3);

    const dLink = document.createElement("a");
    dLink.innerHTML = " &#x2715;";
    athleteDetails.append(dLink);
    dLink.id = "delete-link";

    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998";
    athleteDetails.append(eLink);
    eLink.id = "edit-link";

    const p = document.createElement("p");
    athleteDetails.append(p);
    p.innerHTML = athlete.description;

    const ul = document.createElement("ul");
    athleteDetails.append(ul);
    console.log(athlete.teams);
    athlete.teams.forEach((team) => {
        const li = document.createElement("li");
        ul.append(li);
        li.innerHTML = team;
    });

    eLink.onclick = (e) => {
        e.preventDefaults();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("add-edit-title").innerHTML = "Edit  Athlete";
    };

    dLink.onclick = (e) => {
        e.preventDefault();
    };

    populateEditForm(athlete);
} ;

const populateEditForm = (athlete) => {};

const addEditAthlete = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-edit-athlete-form");
    const formData = new FormData(form);
    let response;

    if(form_id.value == -1) {
        formData.delete("-id");
        formData.delete("img");
        formData.append("teams", getTeams());

        console.log(...formData);

        response = await fetch("/api/athletes", {
            method: "POST",
            body: formData
        });
    }

    if(response.status != 200){
        console.log("Error posting data");
    }

    response = await response.json();
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showAthletes();
};

const getTeams = () => {
    const inputs = document.querySelectorAll("#team-boxes input");
    let teams = [];

    inputs.forEach((input) =>{
        teams.push(input.value);
    });

    return teams;
}

const resetForm = () => {
    const form = document.getElementById("add-edit-athlete-form");
    form.reset();
    form._id = "-1";
    document.getElementById("team-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Add Athlete";
    resetForm();
}

const addTeam = (e) => {
    e.preventDefault();
    const section = document.getElementById("team-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

window.onload = () => {
    showAthletes();
    document.getElementsById("add-edit-athlete-form").onsubmit = addEditAthlete;
    document.getElementById("add-link").onclick = showHideAdd;

    document.querySelector(".close").onclick = () =>{
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-team").onclick = addTeam;
};
