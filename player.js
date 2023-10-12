import { Running, Sitting, Jumping, Falling, Rolling, Hit } from "./playerStates.js";
import{CollisionAnimation} from "./collisionAnimation.js";
export class Player{
    constructor(game){
        this.game = game;
        this.width = 111;
        this.height = 136;
        this.x =0;
        this.y = this.game.height-this.height;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById("player");
        this.speed = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 9
        this.fps = 20;
        this.frameInterval = 100;
        this.frameTimer = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Hit(this.game)];
       
    }
    update(input, deltaTime){
        this.checkCollison();
        this.currentState.handleInput(input);
        this.x +=this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if(input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width)this.x = this.game.width - this.width;
        // Vertical movement
        //if(input.includes('ArrowUp') && this.onGround()) this.vy -= 20;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //sprite animation
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else{
            this.frameTimer += deltaTime;
        }
       
    }
    draw(context){
        //context.fillRect(this.x,this.y,this.width,this.height);
        if(this.game.debug) context.strokeRect(this.x,this.y, this.weight, this.height);
        context.drawImage(this.image,this.frameX * this.width,this.frameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollison(){
        this.game.enemies.forEach(enemy => {
            if( enemy.x < this.x + this.width && enemy.x + enemy.width>this.x && 
                enemy.y< this.y + this.height && enemy.y + enemy.height> this.y){

                    enemy.markedForDeletion = true;
                    this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width +0.5, enemy.y + enemy.height +0.5 ));
                    this.game.score++;
                    if(this.currentState===this.states[2]){
                        //score ++

                    }
                    else{
                        //score-- this.setstates(6,0), play collision animation

                    }

            }
            
        });
    }

}