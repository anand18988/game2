export class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = [];
        
        window.addEventListener('keydown',e=>{
        
         if((e.key ==='ArrowDown'||
             e.key === 'ArrowUp'||
             e.key === 'ArrowLeft'||
             e.key === 'ArrowRight'||
             e.key === 's'
             )&& this.keys.indexOf(e.key)===-1){
            this.keys.push(e.key);
         } else if (e.key ==='d') this.game.debug = !this.game.debug;
         console.log(e.key, this.keys);
        });
        window.addEventListener('keyup', e =>{
            if(e.key==='ArrowDown'|| 
               e.key ==='ArrowUp'||
               e.key === 'ArrowLeft'||
               e.key === 'ArrowRight'||
               e.key === 's'){

                this.keys.splice(e.key,1);
            }
           // console.log(e.key, this.keys);
        });
       /* window.addEventListener('touchstart', e =>{
            console.log('START',e);

        });
        window.addEventListener('touchmove', e =>{
            console.log('move');
        });
        window.addEventListener('touchend', e =>{
            console.log('END');
        });*/
    }
}