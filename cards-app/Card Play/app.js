const
    cards = require('deckofcards'),
    inquirer = require('inquirer')

 
const draw = (shuffle, n = 1) => {
    cards.deck(shuffle)
        .then(deck => cards.draw(deck.deck_id, n))
        .then(result => {
            console.log('-- CARDS --')
            result.cards.forEach(card => {
                console.log(`${card.value} of ${card.suit}`)

            })

            console.log('-- REMAING CARDS --')
            console.log(result.remaining)
        })
        .catch(err => console.log(err))
}




// HINT for #3 in Lab
let list= []

const discardPrompt = (result) => {
     result.cards.forEach(card => {
        list.push(`${card.value} of ${card.suit}`)

    })

    // console.log(result)
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'select cards to throw away',
        name: 'cards',
        choices: list,        // implement choices array - look at the inquirer documentation,
        validate: (answer) => {

            if(answer.length>4)

            return 'select upto 4 cards'

            else if (answer.length<1)

            return 'You didnt select any card'

            return true
        }  // implement

     }])
    .then(answer => {

        findAndRemove(result, answer)
            

    })
}


// HINT for #4 in Lab
const findAndRemove = (current, throwaway) => {
    let list = []

    current.cards.forEach(card => {
        list.push(`${card.value} of ${card.suit}`)

    })
   //  console.log(current)

 //   console.log(throwaway)


    for(let i = list.length; i >=0; i--)
    {
        if(throwaway.cards.includes(list[i]))
        {
                list.splice(i,1);
        }

    }
   //  console.log(list)
   print(current,  throwaway.cards.length, list);
   
 
}







// HINT for #6 in Lab
const print = (crr, n,list) => {
  //   cards.deck(shuffle)
  // console.log(list)
        cards.draw(crr.deck_id, n)
        .then(result => {
            //console.log(result)
            
            result.cards.forEach(card => {
                list.push(`${card.value} of ${card.suit}`)
                
            })
            console.log('-- CARDS --')
           // console.log(list)
            list.forEach(list => {
                console.log(list)
            })

           
            console.log('-- REMAING CARDS --')
            console.log(result.remaining)
        })
        .catch(err => console.log(err))
  

}



// let list =[]
    const play = (shuffle=true, n = 5) => {
        cards.deck(shuffle)
            .then(deck => cards.draw(deck.deck_id, n))
            .then(result => {
               // console.log('-- CARDS --')
              
                 //   console.log(`${card.value} of ${card.suit}`)
                  //  list.push(`${card.value} of ${card.suit}`)

                  discardPrompt(result);

                
               //  print(result.cards, result.remaining);
               //  discardPrompt(result);

    
             //   console.log('-- REMAING CARDS --')
               //  console.log(result.remaining)
            })
            .catch(err => console.log(err))
    }





module.exports = {
    draw, play
}
