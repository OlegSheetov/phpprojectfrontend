import Fetch from './fetch.js'

export default function PutNewPourtion(todoOnSet){ 
        Fetch(
            "GET",
            undefined, 
            todoOnSet()
        )
    }
