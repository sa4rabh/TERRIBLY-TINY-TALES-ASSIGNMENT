import React, { useState } from 'react';
import Histogram from './Histogram';

const App = () => {
  const [histogramData, setHistogramData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const text = await response.text();
      const wordCount = countWords(text);
      const sortedWordCount = sortWordCount(wordCount);
      const topWords = sortedWordCount.slice(0, 20);
      setHistogramData(topWords);
    } catch (error) {
      console.error('Error in fetching data from the link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const countWords = (text) => {
    // Spliting the text into an array of words
    const words = text.toLowerCase().split(/\W+/);

    // Counting the occurrence of each word  
    const wordCount = {};
    for (let word of words) {
      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    }

    return wordCount;
  };

  const sortWordCount = (wordCount) => {
    // Converting the word count object to an array of [word, count] pairs
    const wordCountArray = Object.entries(wordCount);

    // Sorting the array based on the count in descending order(in order to get max frequency)
    wordCountArray.sort((a, b) => b[1] - a[1]);

    return wordCountArray;
  };

  const handleExport = () => {
    const csvSet = 'data:text/csv;charset=utf-8,';
    const csvInput = histogramData.map(([word, count]) => `${word},${count}`).join('\n');
    const encodedUrl = encodeURI(csvSet + csvInput);
    const linkCreate = document.createElement('a');
    linkCreate.setAttribute('href', encodedUrl);
    linkCreate.setAttribute('download', 'histogram.csv');
    document.body.appendChild(linkCreate);
    linkCreate.click();
    document.body.removeChild(linkCreate);
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {histogramData.length > 0 && (
        <>
          <h2>Word Frequency Counter Histogram</h2>
          <div>
            <Histogram histogramData={histogramData} />
          </div>
          <button onClick={handleExport}>Export</button>
        </>
      )}

    </div>
  );
};

export default App;
