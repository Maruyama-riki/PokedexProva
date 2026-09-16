document.addEventListener('DOMContentLoaded', () => {

    let pokeButton = document.getElementById("poke-button");
    let pokeInput = document.getElementById("pokemon");

    async function buscarPokemon() {
        try {
            let pokeInputText = pokeInput.value.trim().toLowerCase();

            if (!pokeInputText) {
                return alert("Campo de nome/id vazio!");
            }

            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInputText}`);
            if (!response.ok) {
                throw new Error("Pokémon não encontrado!");
            }
            let data = await response.json();

            
            document.getElementById("poke-img").src = data.sprites.other["showdown"].front_default || data.sprites.front_default || "";
            document.getElementById("poke-img1").src = data.sprites.other["showdown"].back_default || data.sprites.back_default || "";
            document.getElementById("poke-img2").src = data.sprites.other["showdown"].front_shiny || data.sprites.front_shiny || "";
            document.getElementById("poke-img3").src = data.sprites.other["showdown"].back_shiny || data.sprites.back_shiny || "";

            document.getElementById("poke-nome").textContent = data.name.toUpperCase();
            document.getElementById("poke-id").textContent = data.id;
            document.getElementById("poke-tipos").textContent = data.types.map(t => t.type.name).join(", ");
            document.getElementById("poke-altura").textContent = (data.height / 10) + " m";
            document.getElementById("poke-peso").textContent = (data.weight / 10) + " kg";
            document.getElementById("poke-games").textContent = data.game_indices.length + " jogos";
            document.getElementById("poke-ability").textContent = data.abilities.map(t => t.ability.name).join(", ");

            
            let fraquezasSet = new Set();
            let resistenciasSet = new Set();
            let imunidadesSet = new Set();

            for (let typeObj of data.types) {
                let typeResponse = await fetch(typeObj.type.url);
                let typeData = await typeResponse.json();

                typeData.damage_relations.double_damage_from.forEach(t => fraquezasSet.add(t.name));
                typeData.damage_relations.half_damage_from.forEach(t => resistenciasSet.add(t.name));
                typeData.damage_relations.no_damage_from.forEach(t => imunidadesSet.add(t.name));
            }

            document.getElementById("tipo-fraquezas").textContent = Array.from(fraquezasSet).join(", ") || "Nenhuma";
            document.getElementById("tipo-resistencias").textContent = Array.from(resistenciasSet).join(", ") || "Nenhuma";
            document.getElementById("tipo-imunidades").textContent = Array.from(imunidadesSet).join(", ") || "Nenhuma";

        } catch (error) {
            alert("Erro ao buscar Pokémon: " + error.message);
            console.error("Erro: ", error);
        }
    }

    pokeButton.addEventListener("click", buscarPokemon);
    pokeInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") buscarPokemon();
    });

});