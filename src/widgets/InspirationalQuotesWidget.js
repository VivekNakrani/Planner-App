import React, { useEffect, useState } from 'react';

export default function InspirationalQuote() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  return (
    <div>
      <h3>Inspirational Quote</h3>
      {quotes.length > 0 && (
        <div>
          <p>{quotes[currentQuoteIndex].text}</p>
          <p>- {quotes[currentQuoteIndex].author || 'Unknown'}</p>
          <button onClick={handleNextQuote}>Next</button>
        </div>
      )}
    </div>
  );
}
