 class Control{
    constructor(){
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;

        this.#addKeyboardListeners();
    }
    //Private method
    #addKeyboardListeners(){

        /* Keydown happens when the key is pressed down, 
        and auto repeats if the key is pressed down for long.
        */
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        }
        
        /* 
        Keyup happens when the key is released.
        */
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse= false;
                    break;
                
            }
            console.table(this);
        }
    }
}