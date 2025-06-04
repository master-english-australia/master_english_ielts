export const readingTests = {
  '1': {
    title: 'Academic Speaking Test 1',
    type: 'Academic',
    timeLimit: 1800, // 30 minutes
    parts: [
      {
        id: 1,
        title: 'Part 1: Introduction and Interview',
        instructions: 'The examiner will ask you questions about yourself and familiar topics.',
        questions: [
          {
            id: 1,
            text: 'What is your name?',
            followUp: 'Can you tell me about your hometown?'
          },
          {
            id: 2,
            text: 'Do you work or are you a student?',
            followUp: 'What do you like most about your work/studies?'
          },
          {
            id: 3,
            text: 'What do you do in your free time?',
            followUp: 'How long have you been interested in this activity?'
          }
        ]
      },
      {
        id: 2,
        title: 'Part 2: Individual Long Turn',
        instructions: 'You will be given a topic to talk about for 1-2 minutes.',
        questions: [
          {
            id: 4,
            text: 'Describe a place you visited that impressed you.',
            followUp: 'You should say:\n- Where it was\n- When you went there\n- What you did there\n- Why it impressed you'
          },
          {
            id: 5,
            text: 'Describe a person who has influenced you.',
            followUp: 'You should say:\n- Who the person is\n- How you know them\n- What they have done\n- Why they influenced you'
          }
        ]
      },
      {
        id: 3,
        title: 'Part 3: Two-way Discussion',
        instructions: 'The examiner will ask you questions related to the topic in Part 2.',
        questions: [
          {
            id: 6,
            text: 'What are the advantages and disadvantages of tourism?',
            followUp: 'How has tourism changed in your country in recent years?'
          },
          {
            id: 7,
            text: 'How important is it to preserve historical buildings?',
            followUp: 'What can be done to protect historical sites?'
          }
        ]
      }
    ]
  }
}; 