const apiKey = "http://www.omdbapi.com/?i=tt3896198&apikey=d14e4995";

const searchBtn = document.getElementById("search-btn");
const movieSearch = document.getElementById("movie-search");
const movieDetails = document.getElementById("movie-details");
let forBlur = document.querySelector(".forBlur");

movieSearch.addEventListener("focus", function () {
  movieSearch.classList.add("blueshadow");
  document.querySelector(".cross").style.display = "block";
});

document.querySelector(".cross").addEventListener("click", function () {
  movieSearch.value = "";
});

searchBtn.addEventListener("click", function () {
  movieSearch.classList.remove("blueshadow");
  document.querySelector(".cross").style.display = "none";
});

searchBtn.addEventListener("click", async () => {
  const movieName = movieSearch.value;
  const data = await fetch(
    `http://www.omdbapi.com/?s=${movieName}&apikey=d14e4995`
  );
  const result = await data.json();
  let arrFilm = result.Search;
  arrFilm.forEach((element) => {
    let title = element.Title;
    let type = element.Type;
    let year = element.Year;
    let poster = element.Poster;
    let imdbid = element.imdbID;
    const movieHtml = `
    <div class="modal">
    <img src="${poster}" class="img">
    <h2 class="titleH2">${title}</h2>
    <p class="typeP">${type}</p>
      <p class="yearp">${year}</p>
      <button class="details-btn" data-id="${imdbid}">More Details</button>
  </div>
  `;
    movieDetails.innerHTML = "";
    setTimeout(() => {
      movieDetails.innerHTML += movieHtml;
    }, 1);
  });

  setTimeout(() => {
    const detailsBtn = document.querySelectorAll(".details-btn");
    console.log(detailsBtn);
    detailsBtn.forEach((element) => {
      console.log(element);

      element.addEventListener("click", async () => {
        const imdbID = element.getAttribute("data-id");
        console.log(imdbID);
        const detailsData = await fetch(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=d14e4995`
        );
        const detailsResult = await detailsData.json();
        console.log("DETAILS", detailsResult);
        let ratings = detailsResult.Ratings;
        console.log(ratings);

        setTimeout(() => {
          if (ratings.length > 0) {
            const ratingElement = document.createElement("p");
            ratingElement.classList.add("ratin");
            ratingElement.textContent = `${ratings[0].Source} ${ratings[0].Value}`;
            document.querySelector(".rating").append(ratingElement);
          } else {
            const ratingElement = document.createElement("p");
            ratingElement.classList.add("ratin");
            ratingElement.textContent = "";
            document.querySelector(".rating").append(ratingElement);
          }
          if (ratings.length > 1) {
            const ratingElements = document.createElement("p");
            ratingElements.classList.add("ratin");
            ratingElements.textContent = `${ratings[1].Source} ${ratings[1].Value}`;

            document.querySelector(".rating").append(ratingElements);
          } else {
            const ratingElements = document.createElement("p");
            ratingElements.classList.add("ratin");
            ratingElements.textContent = "";
            document.querySelector(".rating").append(ratingElements);
          }
          if (ratings.length > 2) {
            const ratingElementss = document.createElement("p");
            ratingElementss.classList.add("ratin");
            ratingElementss.textContent = `${ratings[2].Source} ${ratings[2].Value}`;
            document.querySelector(".rating").append(ratingElementss);
          } else {
            const ratingElementss = document.createElement("p");
            ratingElementss.classList.add("ratin");
            ratingElementss.textContent = "";
            document.querySelector(".rating").append(ratingElementss);
          }
        }, 6);

        let window = `
      <div class="blur">
    <div class="modalWindow">
        <div class="bord">
            <div class="image"><img class="styleImage" src="${detailsResult.Poster}" alt="img"></div>
            <div class="info">
                <h2 class="title">${detailsResult.Title}</h2>
                <p class="Rated-Year-Genre">${detailsResult.Rated} ${detailsResult.Year} ${detailsResult.Genre}</p>
                <p class="plot">${detailsResult.Plot}</p>
                <h5 class="writer">Written by:<span class="spanWriter">${detailsResult.Writer}</span></h5>
                <h5 class="directed">Directed by:<span class="spanWriter">${detailsResult.Director}</span></h5>
                <h5 class="staring">Starring:<span class="spanWriter">${detailsResult.Actors}</span></h5>
                <h5 class="boxOfice">BoxOffice:<span class="spanWriter">${detailsResult.BoxOffice}</span></h5>
                <h5 class="awards">Awards:<span class="spanWriter">${detailsResult.Awards}</span></h5>
                <div class="rating">
                    <h5 class="ratings">Ratings:</h5>
                </div>
            </div>
        </div>
    </div>
</div>
       `;

        forBlur.innerHTML = "";
        setTimeout(() => {
          forBlur.innerHTML += window;
        }, 5);

        setTimeout(() => {
          document
            .querySelector(".blur")
            .addEventListener("click", function () {
              document.querySelector(".blur").style.display = "none";
            });
        }, 7);
      });
    });
  }, 3);
});
