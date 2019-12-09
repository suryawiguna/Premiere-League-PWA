let base_url = "https://api.football-data.org/v2/";
base_url = base_url.replace(/^http:\/\//i, 'https://');
var token = "f6c4d852cf934e0db7cede29428239a9";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function makeCard(data) {
    var standingHTML = "";
    data.standings[0].table.forEach(function(table) {
        standingHTML += `
        <div class="col s12 m8 l6">
            <div class="card">
                <div class="row">
                    <div class="col s4">
                        <div class="card-image">
                            <img src="${table.team.crestUrl}" style="height:100px; width: auto;margin: 25px"/>
                        </div>
                    </div>
                    <div class="col s8">
                        <div class="card-content">
                            <span class="card-title truncate">${table.position}. ${table.team.name}</span>
                            <p>Points : ${table.points}</p><br>
                            <a class="btn pink" href="./team.html?id=${table.team.id}">Detail</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById("teams").innerHTML = standingHTML;
}

function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          makeCard(data);
        });
      }
    });
  }

    fetch(base_url + "competitions/2021/standings", {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Auth-Token': token
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      makeCard(data);
    })
    .catch(error);
}

function makeTeamCard(data) {
    var teamHtml = `
        <div class="card">
            <div class="row">
                <div class="col s4">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.crestUrl}" style="height: 200px; width: auto; margin: 10px" />
                    </div>
                </div>
                <div class="col s8">
                    <div class="card-content">
                    <h4 style="margin-top: 0;">${data.name}</h4>
                    <h5>${data.shortName}</h5><br>
                    <span>Venue : ${data.venue}</span><br>
                    <span>Address : ${data.address}</span><br>
                    <span>Phone : ${data.phone}</span><br>
                    <span>Website : ${data.website}</span><br>                    
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("body-content").innerHTML = teamHtml;

}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            makeTeamCard(data);
            resolve(data);

          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Auth-Token': token
        }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        makeTeamCard(data);
        resolve(data);

      });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);

    var teamsHTML = "";
    teams.forEach(function(team) {
      teamsHTML += `
                <div class="col s12">
                    <div class="card">
                        <div class="row">
                            <div class="col s4">
                                <div class="card-image">
                                    <img src="${team.crestUrl}" width="150px"/>
                                </div>
                            </div>
                            <div class="col s8">
                                <div class="card-content">
                                    <span class="card-title truncate">${team.name}</span>
                                    <span class="card-title truncate">${team.shortName}</span>
                                    <a class="btn pink" href="./team.html?id=${team.id}&saved=true">Detail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    });

    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
    return new Promise(function(resolve, reject) {

        var urlParams = new URLSearchParams(window.location.search);
        var idParam = parseInt(urlParams.get("id"));
        
        getById(idParam).then(function(team) {
            teamHTML = '';
            var teamHTML = `
                    <div class="card">
                        <div class="row">
                            <div class="col s4">
                                <div class="card-image waves-effect waves-block waves-light">
                                <img src="${team.crestUrl}" />
                                </div>
                            </div>
                            <div class="col s8">
                                <div class="card-content">
                                <h4>${team.name}</h4>
                                <h5>${team.shortName}</h5><br>
                                <span>Venue : ${team.venue}</span><br>
                                <span>Address : ${team.address}</span><br>
                                <span>Phone : ${team.phone}</span><br>
                                <span>Website : ${team.website}</span><br>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(team);

        });
    });
}
