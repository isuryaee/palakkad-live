'use client';

import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';

export function WeatherWidget() {
  const weather = {
    temperature: 28,
    description: 'Partly Cloudy',
    icon: 'cloud',
    humidity: 72,
    windSpeed: 12,
  };

  return (
    <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg p-4 font-sans shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold uppercase tracking-wider text-sm text-gray-900 dark:text-card-foreground">Palakkad Weather</h3>
        <span className="text-xs text-gray-500 dark:text-muted-foreground">Today</span>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="text-gray-600 dark:text-primary bg-gray-100 dark:bg-primary/10 p-3 rounded-full">
          {weather.icon === 'sun' ? (
            <Sun className="w-8 h-8" />
          ) : weather.icon === 'rain' ? (
            <CloudRain className="w-8 h-8" />
          ) : (
            <Cloud className="w-8 h-8" />
          )}
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900 dark:text-card-foreground">{weather.temperature}°C</div>
          <div className="text-sm font-medium capitalize text-gray-600 dark:text-card-foreground">{weather.description}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t border-gray-200 dark:border-border pt-3 mt-3">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-muted-foreground">
          <Droplets className="w-4 h-4 text-gray-500 dark:text-primary" />
          <span>Humidity: {weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-muted-foreground">
          <Wind className="w-4 h-4 text-gray-500 dark:text-primary" />
          <span>Wind: {weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}
