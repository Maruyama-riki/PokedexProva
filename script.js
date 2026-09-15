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

            let response = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${pokeInputText}`);
            let data = await response.json();

            let pokeImage = document.getElementById("poke-img");
            pokeImage.src = data.sprites.other["showdown"].front_default;

            let pokeImage1 = document.getElementById("poke-img1");
            pokeImage1.src = data.sprites.other["showdown"].back_default;


            let pokeImage2 = document.getElementById("poke-img2");
            pokeImage2.src = data.sprites.other["showdown"].front_shiny;

            let pokeImage3 = document.getElementById("poke-img3");
            pokeImage3.src = data.sprites.other["showdown"].back_shiny;

            


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

    

});