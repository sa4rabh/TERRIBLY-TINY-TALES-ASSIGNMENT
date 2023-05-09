import React, { useState } from 'react';
import Histogram from './Histogram';

const WordFrequencyAnalyzer = () => {
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
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const countWords = (text) => {
    // Split the text into an array of words
    const words = text.toLowerCase().split(/\W+/);

    // Count the occurrence of each word
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
    // Convert word count object to an array of [word, count] pairs
    const wordCountArray = Object.entries(wordCount);

    // Sort the array based on the count in descending order
    wordCountArray.sort((a, b) => b[1] - a[1]);

    return wordCountArray;
  };

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,';
    const csvData = histogramData.map(([word, count]) => `${word},${count}`).join('\n');
    const encodedURI = encodeURI(csvContent + csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encodedURI);
    link.setAttribute('download', 'histogram.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {histogramData.length > 0 && (
        <>
          <h2>Word Frequency Histogram</h2>
          <div className="histogram">
            <Histogram histogramData={histogramData} />
          </div>
          <button onClick={handleExport}>Export</button>
        </>
      )}

    </div>
  );
};

export default WordFrequencyAnalyzer;
