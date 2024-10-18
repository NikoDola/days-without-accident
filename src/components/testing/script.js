
const reversing = 'nikola'

function reverseString(string) {
    const reversed = string.split('').reverse().join('')
    console.log(reversed)
}

reverseString(reversing)