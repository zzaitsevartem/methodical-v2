import { useState, useEffect } from 'react';

interface TopicProgressData {
  testPassed: boolean;
  testAnswers: { [key: number]: string };
  lastUpdated: string;
}

export const useTopicProgress = (topicId: string) => {
  const [testPassed, setTestPassed] = useState<boolean>(false);
  const [testAnswers, setTestAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const cachedData = localStorage.getItem(`topic_${topicId}`);
    if (cachedData) {
      try {
        const parsedData: TopicProgressData = JSON.parse(cachedData);
        setTestPassed(parsedData.testPassed);
        setTestAnswers(parsedData.testAnswers || {});
      } catch (error) {
        console.error('Ошибка парсинга кэша:', error);
        localStorage.removeItem(`topic_${topicId}`);
      }
    }
  }, [topicId]);

  useEffect(() => {
    if (testPassed || Object.keys(testAnswers).length > 0) { 
      const saveData: TopicProgressData = {
        testPassed,
        testAnswers,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(`topic_${topicId}`, JSON.stringify(saveData));
    }
  }, [topicId, testPassed, testAnswers]); 

  const resetProgress = () => {
    setTestPassed(false);
    setTestAnswers({});
    localStorage.removeItem(`topic_${topicId}`);
  };

  return {
    testPassed,
    setTestPassed,
    testAnswers,
    setTestAnswers,
    resetProgress, 
  };
};