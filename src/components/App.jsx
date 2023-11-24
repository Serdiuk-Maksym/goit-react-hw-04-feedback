import React, { useState } from 'react';
import css from './App.module.css';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Message/Message';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = category => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [category]: prevFeedback[category] + 1,
    }));
  };

  const total = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const positivePercentage = () => {
    const { good } = feedback;
    const totalFeedback = total();
    return totalFeedback === 0 ? 0 : Math.round((good / totalFeedback) * 100);
  };

  const { good, neutral, bad } = feedback;
  const totalFeedback = total();
  const percentage = positivePercentage();
  const options = Object.keys(feedback);

  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      {totalFeedback !== 0 ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={percentage}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};
