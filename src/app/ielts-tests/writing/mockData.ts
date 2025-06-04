export const writingTests = {
    id: 1,
    title: 'Academic Writing Test',
    type: 'Academic',
    timeLimit: 3600, // 1 hour
    part1: {
      promptTitle: 'The charts below show the percentage of water used for different purposes in six areas of the world.',
      promptContent: `
        <p>The charts below show the percentage of water used for different purposes in six areas of the world.</p>
        <p>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
      `,
      imageUrl: '/sample-chart.jpg',
      instructions: 'Write at least 150 words.',
      guidelines: [
        'Spend about 20 minutes on this task',
        'Describe the main trends and comparisons',
        'Do not give your opinion',
        'Use appropriate language for describing data'
      ]
    },
    part2: {
      promptTitle: 'Some people believe that unpaid community service should be a compulsory part of high school education.',
      promptContent: `
        <p>Some people believe that unpaid community service should be a compulsory part of high school education.</p>
        <p>To what extent do you agree or disagree with this statement?</p>
      `,
      instructions: 'Write at least 250 words.',
      guidelines: [
        'Spend about 40 minutes on this task',
        'Give reasons for your answer and include relevant examples from your own knowledge or experience',
        'Write a well-organized essay with an introduction, body paragraphs, and conclusion',
        'Use a range of vocabulary and grammatical structures'
      ]
    }
  }; 