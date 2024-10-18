const zeni = ['tamara', 'snezana']

// if (
//     Array.isArray(zeni) &&
//     zeni.length >1 &&
//     zeni.every((item) => (typeof (item === 'string'))) &&
//     zeni.includes('Tamara'.toLowerCase())&&
//     zeni.at(1).length > 6 &&
//     zeni.at(0).length !== zeni.at(1).length &&
//     zeni.every(item => item.length > 5) &&
//     zeni.every(item => item === item.toLowerCase())&&
//     zeni.entries()

// ){

// }

const listObjext = [
    {'name': 'nikola','lastName': 'dolovski'},
    {'name': 'pavle', 'lastName': 'adamovski'},
    {'name': 'tamara','lastName': 'gagacevska'},
]

const newItem = [...listObjext, {'name':'zorica', 'lastName': 'trpkovska'}]
.map((item)=> item.name.at(0).toUpperCase() + item.name.slice(1) )

console.log(newItem)


 