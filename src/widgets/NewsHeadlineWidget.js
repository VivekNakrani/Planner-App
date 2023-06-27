import React, { useEffect, useState } from 'react';

export default function MyCustomWidget() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const url = `https://bing-news-search1.p.rapidapi.com/news?textFormat=Raw&safeSearch=Off&count=5&offset=${currentPage * 5}`;
    const options = {
      method: 'GET',
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '4b08121398mshe879d15550cef79p16602fjsn1386e8186329',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setNews(result.value);
      setNews(result.value.slice(0, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Latest News Headlines</h2>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}
