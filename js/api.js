const BASE_URL = "https://readerapi.codepolitan.com/";

function getArtikel() {
  let options = {};
  fetch(BASE_URL + "articles", options)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
      } else {
        return Promise.resolve(response);
      }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.result.forEach(function (article) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.thumbnail}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.title}</span>
                  <p>${article.description}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(function (error) {
      console.log("Error : " + error);
    })
}
