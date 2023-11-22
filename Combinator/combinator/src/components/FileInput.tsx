import React from 'react'

const FileInput = () => {
  const [combinations, setCombinations] = React.useState<{ combination: string, usedWords: string[] }[]>([]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        const content = e.target.result
        const words = content.split('\n').map((word: string) => word.trim())

        const sixCharCombinations = generateCombinations(words, 6)

        setCombinations(sixCharCombinations)
      }

      reader.readAsText(file)
    }
  }

  const generateCombinations = (words: string[], targetLength: number) => {
    const result: { combination: string, usedWords: string[] }[] = []

    // helper function to generate combinations recursively
    const findCombinations = (currentCombination: string[], remainingWords: string[], word: string) => {
      // check target length and if it matched with the 6 letter word
      const usedWords : string[] = [...currentCombination]
      if (currentCombination.join('').length === targetLength && currentCombination.join('') === word) {
        result.push({
          combination: currentCombination.join(''),
          usedWords: usedWords
        })
      }

      for (let i = 0; i < remainingWords.length; i++) {
        // find next word
        const nextWord = remainingWords[i]
        // make a new combination
        const newCombination = [...currentCombination, nextWord]
        // Exclude the current word
        const newRemainingWords = remainingWords.slice(i + 1)
        // find combination
        findCombinations(newCombination, newRemainingWords, word)
      }
    }

    // create an array of all 6 digit words in the file
    const targetAmountDigitsWords: string[] = words.filter((word: string) => word.length === targetLength)

    // loop over each word
    targetAmountDigitsWords.forEach(word => {
      // break down each word in single digits
      const digitsInWord: string[] = word.split('')

      // filter the initial array of words from the file to find all items that could be used to combine to recreate the initial word
      const filteredArray = words.filter((item) => {
        // Check if all characters in the item are present in the inputArray
        return item.split('').every(char => digitsInWord.includes(char))
      })

      findCombinations([], filteredArray, word)
    })

    return result.filter((value, index, array) => array.indexOf(value) === index)
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".txt" />
      <div>
        <h4>All combinations:</h4>
        <ul>
          {combinations.map(({ combination, usedWords }, index) => (
            <li key={index}>
              {usedWords.join(' + ')} = <strong>{combination}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FileInput
