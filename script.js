document.addEventListener('DOMContentLoaded', () => {

    let pokeButton = document.getElementById("poke-button");
    let buscaButton = document.getElementById("busca-button");

    //API Pokemon:
    pokeButton.addEventListener("click", async () => {
        try {
            let pokeInputText = document.getElementById("pokemon").value;

            if (!pokeInputText)
                return alert("Campo de nome/id vazio!");

            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInputText}`);
            let data = await response.json();

            let pokeImage = document.getElementById("poke-img");
            pokeImage.src = data.sprites.other["showdown"].front_default;

            let pokeImage2 = document.getElementById("poke-img2");
            pokeImage2.src = data.sprites.other["showdown"].front_shiny;

            


            document.getElementById("poke-nome").textContent = data.name;
            document.getElementById("poke-id").textContent = data.id;
            document.getElementById("poke-tipos").textContent = data.types.map(t => t.type.name).join(", ");
            document.getElementById("poke-altura").textContent = (data.height / 10) + " m";
            document.getElementById("poke-peso").textContent = (data.weight / 10) + " kg";
            document.getElementById("poke-games").textContent = data.game_indices.length + " jogos";
            document.getElementById("poke-ability").textContent = data.abilities.map(t => t.ability.name).join(", ");
        } catch (error) {
            console.log("Erro: " + error);
        }
    });

    //API Studio Ghibli:
    buscaButton.addEventListener("click", async () => {
        try {
            let filmeInputText = document.getElementById("filme").value;

            if (!filmeInputText)
                return alert("Campo de busca vazio!");

            let response = await fetch("https://ghibliapi.vercel.app/films");
            let data = await response.json();

            let filmeEncontrado = data.find(filme =>
                filme.title.toLowerCase().includes(filmeInputText.toLowerCase())
            );

            if (!filmeEncontrado) {
                return alert("Filme não encontrado!");
            }

            document.getElementById("filme-img").src = filmeEncontrado.image;
            document.getElementById("filme-titulo").textContent = filmeEncontrado.title;
            document.getElementById("filme-diretor").textContent = filmeEncontrado.director;
            document.getElementById("filme-ano").textContent = filmeEncontrado.release_date;
            document.getElementById("filme-duracao").textContent = filmeEncontrado.running_time + " min";
            document.getElementById("filme-nota").textContent = filmeEncontrado.rt_score;
            document.getElementById("filme-descricao").textContent = filmeEncontrado.description;
        } catch (error) {
            console.log("Erro: " + error);
        }
    });

});