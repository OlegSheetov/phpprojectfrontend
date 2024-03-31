    export default function ScrollHandler(event , todoat100){ 
                 let max = event.target.scrollTopMax, 
                     current = event.target.scrollTop,
                    percent = Math.ceil(current/(max/100))
        if(percent == 100){
            todoat100()
        }
    }
