const res = require("express/lib/response");

const p1 = {
    nome: "Mario",
    velocidade: 4,
    manobra: 3,
    poder: 3,
    pontos: 0,
};

const p2 = {
    nome: "Donkey Kong",
    velocidade: 2,
    manobra: 2,
    poder: 5,
    pontos: 0,
};

async function rollDice(){
   return Math.floor(Math.random() * 6) + 1; 
}

async function getRandomBloc() {
    let random = Math.random()
    let result 
    
    switch(true){
        case random < 0.33:
          result = "Reta"
          break;
        case random < 0.66:
          result = "Curva"
          break;        
        default:
          result = "Confronto"          
    }
 return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(char1, char2) {
    for(let round = 1; round <= 5; round++ ){
        console.log(`🏁 Rodada ${round}`);
        //sortear Rodada
        let block = await getRandomBloc()
        console.log(`Rodada: ${block}`)
        //rolar dados
        let diceResult1 = await rollDice() 
        let diceResult2 = await rollDice()  
        //teste habilidade
        let testSkill1 = 0
        let testSkill2 = 0
        
        if(block === "Reta"){
            testSkill1 = diceResult1 + char1.velocidade
            testSkill2 = diceResult2 + char2.velocidade
            await logRollResult(char1.nome, "Velocidade", diceResult1, char1.velocidade)
            await logRollResult(char2.nome, "Velocidade", diceResult2, char2.velocidade)
        }
        if(block === "Curva"){
            testSkill1 = diceResult1 + char1.manobra
            testSkill2 = diceResult2 + char2.manobra
            await logRollResult(char1.nome, "Manobra", diceResult1, char1.manobra)
            await logRollResult(char2.nome, "Manobra", diceResult2, char2.manobra)
        }
        if(block === "Confronto"){
            let powerResult1 = diceResult1 + char1.poder
            let powerResult2 = diceResult2 + char2.poder
            console.log(`${char1.nome} confrontou ${char2.nome}!💥`)
            await logRollResult(char1.nome, "Poder", diceResult1, char1.poder)
            await logRollResult(char2.nome, "Poder", diceResult2, char2.poder)

            if (powerResult1 > powerResult2 && char2.pontos > 0){
                console.log(`${char1.nome} venceu o confronto! ${char2.nome} perdeu 1 ponto.`)
                char2.pontos--
            }
            if (powerResult2 > powerResult1 && char1.pontos > 0){
                console.log(`${char2.nome} venceu o confronto! ${char1.nome} perdeu 1 ponto.`)
                char1.pontos--
            }                        
            console.log(powerResult1 === powerResult2 ? "Empate no confronto." : "")   
           
        }
        //verifica vencedor
        if(testSkill1 > testSkill2){
            console.log(`${char1.nome} marco um ponto!`)
            char1.pontos++
        }else if(testSkill2 > testSkill1){
            console.log(`${char2.nome} marco um ponto!`)
            char1.pontos++
        }else if(testSkill1 = testSkill2){
            console.log("Empate ninguem marcou pontos.")
        }

        console.log("-------------------------------------")
    }   
        
}
async function declareWinner(char1, char2) {
    console.log("Resultado Final:")
    console.log(`${char1.nome}: ${char1.pontos} pontos(s) `)
    console.log(`${char2.nome}: ${char2.pontos} pontos(s) `)

    if(char1.pontos > char2.pontos){
        console.log(`\n${char1.nome} venceu a corrida !`)
    }else if(char2.pontos > char1.pontos){
        console.log(`\n${char2.nome} venceu a corrida !`)
    }else{
        console.log("A corrida empatou!")
    }
    
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${p1.nome} e ${p2.nome} começando...\n`);
    await playRaceEngine(p1, p2);
    await declareWinner(p1, p2);
})();
