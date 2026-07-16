import { useEffect, useState } from 'react';

interface Weather {
  date: string;
  temperatureC: number;
  summary: string;
}

function App() {
  const [forecasts, setForecasts] = useState<Weather[]>([]);

  useEffect(() => {
    // Substitua pela porta correta do seu backend .NET (HTTP ou HTTPS)
    fetch('http://localhost:5245/weatherforecast')
      .then((response) => response.json())
      .then((data) => setForecasts(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Previsão do Tempo (Backend .NET)</h1>
      <ul>
        {forecasts.map((f, index) => (
          <li key={index}>
            <strong>{f.date}:</strong> {f.temperatureC}°C - {f.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;