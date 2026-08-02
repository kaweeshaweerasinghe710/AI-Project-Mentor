import { useState, useEffect, useCallback } from 'react';
import { LearningStep, Badge } from '../../types';

export function useLearningPath() {
  const [steps, setSteps] = useState<LearningStep[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [newBadgeToast, setNewBadgeToast] = useState<{ badge: Badge; visible: boolean } | null>(null);

  const fetchLearningPath = useCallback(async () => {
    try {
      const token = localStorage.getItem('user_token');
      const res = await fetch('http://localhost:5000/api/learning', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setSteps(data.steps || []);
      setBadges(data.badges || []);
    } catch (err) {
      console.error('Failed to load learning path:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLearningPath();
  }, [fetchLearningPath]);

  const handleComplete = async (stepId: string) => {
    setCompletingId(stepId);
    try {
      const token = localStorage.getItem('user_token');
      const res = await fetch(`http://localhost:5000/api/learning/step/${stepId}/complete`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to complete step');
      const data = await res.json();
      setSteps(prev => prev.map(s => (s.id === stepId ? { ...s, isCompleted: true } : s)));
      if (data.newBadges?.length > 0) {
        setBadges(prev => [...prev, ...data.newBadges]);
        setNewBadgeToast({ badge: data.newBadges[0], visible: true });
        setTimeout(() => setNewBadgeToast(null), 4000);
      }
    } catch (err) {
      console.error('Failed to complete step:', err);
    } finally {
      setCompletingId(null);
    }
  };

  const doneCount = steps.filter(s => s.isCompleted).length;
  const progress = steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;
  const selected = selectedIdx !== null ? steps[selectedIdx] : null;

  return {
    steps,
    loading,
    completingId,
    selectedIdx,
    setSelectedIdx,
    newBadgeToast,
    doneCount,
    progress,
    handleComplete,
    selected
  };
}
