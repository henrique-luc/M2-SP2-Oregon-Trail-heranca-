class Traveler {
    constructor(name){
        this._name      = name;
        this._food      = 1;
        this._isHealthy = true;
    }

    get name(){
        return this._name
    }

    set name(novoNome){
        if(typeof novoNome === 'string'){
            this._name = novoNome
        }
    }

    hunt(){
        
        this._food += 2;

    }

    eat(){

        if(this._food > 0){
            this._food -= 1;
        } 
        if(this._food === 0)
            this._isHealthy = false;
        }

}

class Wagon {
    constructor(capacity) {
        this._capacity = capacity;
        this._passengers = [];
    }

    get capacity(){
        return this._capacity;
    }

    set capacity(novaCapacidade){
        if(typeof novaCapacidade === 'number'){
            this._capacity = novaCapacidade
        }
    }

    getAvailableSeatCount(){
       return this._capacity - this._passengers.length
        
    }

    join(traveler){
        if(this.getAvailableSeatCount() > 0){
            this._passengers.push(traveler)
        }
    }

    shouldQuarantine(){
        let resultado = false
        for(let i = 0; i < this._passengers.length; i++){
            if(this._passengers[i]._isHealthy === false){
                resultado = true
            } else {
                resultado = false
            }
        } 
        return resultado
    }

    totalFood(){
        let soma = 0
        for(let i = 0; i < this._passengers.length; i++){
            soma += this._passengers[i]._food
        }
        return soma
    }

}

class Hunter extends Traveler {
    constructor(name){
        super(name);
        this._food = 2;
        this._isHealthy = true;
    }
    hunt(){
        
        this._food += 5;
    }

    eat(){

        if(this._food > 1){
            this._food -= 2;
        }
        if(this._food === 1){
            this._food -= 1;
            this._isHealthy = false;
        }
        if(this._food === 0){
            this._isHealthy = false;
        }
    }

    giveFood(traveler,numOfFoodUnits){
        if(this._food > numOfFoodUnits){
            traveler._food += numOfFoodUnits
            this._food -= numOfFoodUnits
        }
    }
}

class Doctor extends Traveler {
    constructor(name){
        super(name);
        this._food = 1;
        this._isHealthy = true;
    }

    heal(traveler){
        traveler._isHealthy = true
    }
}

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter); 

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);