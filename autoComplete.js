export function autoComplete() {
    let cityInput = document.querySelector(".city-input"); // Récupération de l'élément du champ de saisie de la ville
    let divAutoComplete = document.querySelector(".autoComplete"); // Récupération de l'élément du conteneur d'auto-complétion
  
    if (cityInput.value == "") {
      return;
    }
  
    let options = {
      method: "GET",
      headers: { "x-api-key": "dZebv8oCkEJiKBv/58sczA==tit0p3TngKS5YIpU" }, // En-tête de la requête avec la clé d'API
    };
    let url = `https://api.api-ninjas.com/v1/city?limit=10&name=${cityInput.value}`; // URL de l'API pour récupérer les suggestions de villes
  
    fetch(url, options)
      .then((res) => res.json()) // Conversion de la réponse en JSON
      .then((data) => {
        const suggestions = document.createElement("select"); // Création d'un élément <select> pour les suggestions
        suggestions.setAttribute("id", "select"); // Attribution de l'identifiant "select" à l'élément
  
        data.forEach((element) => {
          let suggestion = document.createElement("option"); // Création d'un élément <option> pour chaque suggestion
          suggestion.textContent = `${element.name}, ${element.country}`; // Texte de la suggestion au format "ville, pays"
          suggestion.addEventListener("click", function () {
            cityInput.value = `${element.name}`; // Remplissage du champ de saisie avec la suggestion sélectionnée
          });
          suggestions.appendChild(suggestion); // Ajout de l'élément <option> à l'élément <select>
        });
  
        divAutoComplete.innerHTML = ""; // Effacement du contenu précédent du conteneur d'auto-complétion
        divAutoComplete.appendChild(suggestions); // Ajout de l'élément <select> au conteneur
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }
  