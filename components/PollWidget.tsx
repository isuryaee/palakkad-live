'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function PollWidget() {
  const [selected, setSelected] = useState<string>('');
  const [hasVoted, setHasVoted] = useState(false);

  const poll = {
    question: 'What is the most pressing issue in Palakkad?',
    options: [
      { id: 1, text: 'Infrastructure', percentage: 35, votes: 105 },
      { id: 2, text: 'Education', percentage: 28, votes: 84 },
      { id: 3, text: 'Healthcare', percentage: 22, votes: 66 },
      { id: 4, text: 'Environment', percentage: 15, votes: 45 },
    ],
    totalVotes: 300,
  };

  const handleVote = () => {
    if (!selected) return;
    setHasVoted(true);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-sm font-sans">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <h3 className="font-bold uppercase tracking-wider text-sm text-accent">Poll of the Day</h3>
      </div>

      <p className="font-serif font-bold text-lg mb-4 leading-snug">{poll.question}</p>

      {hasVoted ? (
        <div className="space-y-3">
          {poll.options.map((option) => (
            <div key={option.id} className="relative">
              <div className="flex justify-between text-sm mb-1 z-10 relative">
                <span className="font-medium">{option.text}</span>
                <span className="font-bold">{option.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Total votes: {poll.totalVotes}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {poll.options.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-3 border border-border p-3 rounded cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <input
                type="radio"
                name="poll"
                value={option.id.toString()}
                checked={selected === option.id.toString()}
                onChange={(e) => setSelected(e.target.value)}
                className="w-4 h-4 accent-primary"
              />
              <span className="flex-1 font-medium">{option.text}</span>
            </label>
          ))}
          <Button
            className="w-full font-bold uppercase tracking-wide text-xs"
            onClick={handleVote}
            disabled={!selected}
          >
            Submit Vote
          </Button>
        </div>
      )}
    </div>
  );
}
