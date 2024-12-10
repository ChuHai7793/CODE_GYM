
function Human(){

}

function Apple(){

    this.weight = 10;

    this.decrease = function(){
        this.weight-=1;
    };
    this.isEmpty = function(){
        return this.weight <= 0;
    };
    this.getWeight = function(){
        return this.weight;
    };
}

function Human(name,gender,weight){
    this.name = name;
    this.gender= gender;
    this.weight = weight;

    this.isMale = function(){
        return gender === 'male';
    };

    this.setGender = function(bool){
        if (bool=== 1){
            this.gender = 'male';
        }else{
            this.gender = 'female';
        }
    };

    this.checkApple = function(Apple){};

    this.eat = function(Apple){


        while(!Apple.isMale()){
            this.weight +=1;
            Apple.decrease();
        }

    };

    this.say = function(str){
        console.log(str);
    };

    this.getName = function(){
        return this.name;
    };

    this.getWeight = function(){
        return this.weight;
    };

    this.setWeight = function(weight){
        this.weight = weight;
    };
}