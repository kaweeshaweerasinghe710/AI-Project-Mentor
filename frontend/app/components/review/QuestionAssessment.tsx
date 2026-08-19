'use client';

import React, { useState } from 'react';
import { ReviewQuestion } from '../../types';
import AnswerSubmitForm from './AnswerSubmitForm';
import FeedbackPanel from './FeedbackPanel';
import ReviewActions from './ReviewActions';

interface QuestionAssessmentProps {
  question: ReviewQuestion;
  isReviewed: boolean;
  draft: string;
  showAnswer: boolean;
  onToggleReviewed: (e: React.MouseEvent) => void;
  onDraftChange: (value: string) => void;
  onToggleAnswer: () => void;
}

export default function QuestionAssessment({
  question,
  isReviewed,
  draft,
  showAnswer,
  onToggleReviewed,
  onDraftChange,
  onToggleAnswer,
}: QuestionAssessmentProps) {
  const [submitting, setSubmitting]   = useState(false);
  const [aiFeedback, setAiFeedback]   = useState<string | null>(null);
  const [feedbackErr, setFeedbackErr] = useState<string | null>(null);

  const handleSubmitAnswer = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!draft.trim() || draft.trim().length < 10) {
      setFeedbackErr('Please write a more detailed answer before submitting.');
      return;
    }

    setSubmitting(true);
    setAiFeedback(null);
    setFeedbackErr(null);

    try {
      const token = localStorage.getItem('user_token');
      const res   = await fetch('http://13.239.146.29.nip.io:5000/api/review/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          question:    question.question,
          modelAnswer: question.modelAnswer,
          userAnswer:  draft,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Evaluation failed');
      setAiFeedback(data.feedback);
    } catch (err: any) {
      setFeedbackErr(err.message || 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAiFeedback(null);
    setFeedbackErr(null);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="border-t border-border bg-surface/20 p-7 space-y-6 cursor-default"
    >
      <AnswerSubmitForm
        draft={draft}
        onDraftChange={onDraftChange}
        onSubmit={handleSubmitAnswer}
        submitting={submitting}
        feedbackErr={feedbackErr}
        hasSubmitted={!!aiFeedback}
        onRetry={handleRetry}
        disabled={!!aiFeedback}
      />

      {aiFeedback && <FeedbackPanel feedback={aiFeedback} />}

      <ReviewActions
        isReviewed={isReviewed}
        showAnswer={showAnswer}
        onToggleReviewed={onToggleReviewed}
        onToggleAnswer={onToggleAnswer}
      />
    </div>
  );
}
