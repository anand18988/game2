import { Dust, Fire, Splash } from "./particles.js";

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
}

class States {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends States{
    constructor(game){
        super('SITTING',game);
       
    }
    enter(){
        this.game.Player.frameY = 0;
    }
    handleInput(input){
      //  this.game.particles.unshift(new Fire(this.game, this.game.Player.x, this.game.Player.y));
        if(input.includes('ArrowLeft')||input.includes('ArrowRight')){
            this.game.Player.setState(states.RUNNING, 1);
        }
        if (input.includes('ArrowUp')){
            this.game.Player.setState(states.JUMPING,1);
        } else if (input.includes('s')){
            this.game.Player.setState(states.ROLLING,4);
        }

    }
}

export class Running extends States{
    constructor(game){
        super('RUNNING',game);
       
    }
    enter(){
        this.game.Player.frameY = 0;
    }
    handleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.Player.x, this.game.Player.y));
        if(input.includes('ArrowDown')){
            this.game.Player.setState(states.SITTING,0);
        }else if (input.includes('ArrowUp')){
            this.game.Player.setState(states.JUMPING,1);
        }else if (input.includes('a')){
            this.game.Player.setState(states.ROLLING,4);
        }

    }
}

export class Jumping extends States{
    constructor(game){
        super('JUMPING', game);
       
    }
    enter(){
        if (this.game.Player.onGround()) this.game.Player.vy -=20;
        this.game.Player.frameY = 0;

    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.Player.x, this.game.Player.y));
        if(this.game.Player.vy > this.game.Player.weight){
            this.game.Player.setState(states.FALLING,3);
        }else if (input.includes('Enter')){
            this.game.Player.setState(states.ROLLING,4);
        }

    }
}

export class Falling extends States{
    constructor(game){
        super('FALLING',game);
        
    }
    enter(){
        
        this.game.Player.frameY = 0;

    }
    handleInput(input){
        if(this.game.Player.onGround()){
            this.game.Player.setState(states.RUNNING,1);
            for(let i =0; i< 30; i++){
                this.game.particles.unshift(new Splash(this.game, this.game.Player.x, this.game.Player.y));
            }
        }

    }
}

export class Rolling extends States{
    constructor(game){
        super('ROLLING', game);
       
    }
    enter(){
        
        this.game.Player.frameY = 0;
        this.game.Player.maxFrame = 9;
        this.game.Player.frameX = 0;

    }
    handleInput(input){
        if(!input.includes('Enter') && this.game.Player.onGround()){
            this.game.Player.setState(states.RUNNING,1);
        }else if(!input.includes('Enter') && !this.game.Player.onGround()){
            this.game.Player.setState(states.FALLING,1);
        }

    }
}

export class Hit extends States{
    constructor(game){
        super('HIT', game);
       
    }
    enter(){
        
        this.game.Player.frameY = 0;
        this.game.Player.maxFrame = 9;
        this.game.Player.frameX = 0;

    }
    handleInput(input){
       if(this.game.Player.frameX >= 10 && this.game.Player.onGround()){
        this.game.Player.setState(states.RUNNING);
       }else if (this.game.Player.frameX >= 10 && !this.game.Player.onGround()){
        this.game.Player.setState(states.FALLING,2);
       }

    }
}