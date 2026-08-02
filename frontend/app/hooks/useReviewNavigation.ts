import { useState } from 'react';
import { ReviewQuestion } from '../types';

export function useReviewNavigation(questions: ReviewQuestion[]) {
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [direction, setDirection]         = useState<'forward' | 'backward'>('forward');
  const [animKey, setAnimKey]             = useState(0);
  const [reviewedIds, setReviewedIds]     = useState<string[]>([]);
  const [userDrafts, setUserDrafts]       = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers]     = useState<Record<string, boolean>>({});

  const goTo = (newIndex: number, dir: 'forward' | 'backward') => {
    setDirection(dir);
    setAnimKey(k => k + 1);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) goTo(currentIndex + 1, 'forward');
  };

  const handlePrev = () => {
    if (currentIndex > 0) goTo(currentIndex - 1, 'backward');
  };

  const handleResetProgress = () => {
    setReviewedIds([]);
    setUserDrafts({});
    setShowAnswers({});
    setCurrentIndex(0);
    setDirection('forward');
    setAnimKey(k => k + 1);
  };

  const handleToggleReviewed = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const alreadyReviewed = reviewedIds.includes(id);
    setReviewedIds(prev =>
      alreadyReviewed ? prev.filter(i => i !== id) : [...prev, id]
    );
    // Auto-advance to next question when marking as reviewed
    if (!alreadyReviewed && currentIndex < questions.length - 1) {
      setTimeout(() => goTo(currentIndex + 1, 'forward'), 300);
    }
  };

  const handleDraftChange = (id: string, value: string) => {
    setUserDrafts(prev => ({ ...prev, [id]: value }));
  };

  const handleToggleAnswer = (id: string) => {
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCount    = questions.length;
  const reviewedCount = reviewedIds.length;
  const progressPercent = totalCount > 0 ? Math.round((reviewedCount / totalCount) * 100) : 0;

  return {
    currentIndex,
    direction,
    animKey,
    reviewedIds,
    userDrafts,
    showAnswers,
    totalCount,
    reviewedCount,
    progressPercent,
    goTo,
    handleNext,
    handlePrev,
    handleResetProgress,
    handleToggleReviewed,
    handleDraftChange,
    handleToggleAnswer
  };
}
