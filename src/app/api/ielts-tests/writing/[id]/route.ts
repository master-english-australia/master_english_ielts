import { NextResponse } from 'next/server';

const writingTests = {
  'academic-task-1-chart': {
    id: 'academic-task-1-chart',
    title: 'Academic Writing Task 1 - Chart Description',
    type: 'Academic',
    question: 'The chart below shows the number of international students enrolled in a university in the UK between 2010 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    description: 'Describe the information shown in the graph below.'
  },
  'general-task-1-letter': {
    id: 'general-task-1-letter',
    title: 'General Training Writing Task 1 - Letter',
    type: 'General Training',
    question: 'You recently went on a holiday and stayed with a friend. Write a letter to your friend. In your letter:\n\n- Thank them for letting you stay\n- Describe what you enjoyed most about the holiday\n- Suggest a time when you can meet again',
    description: 'Write a letter to your friend about your recent holiday.'
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const testId = params.id;
  const test = writingTests[testId as keyof typeof writingTests];

  if (!test) {
    return NextResponse.json(
      { error: 'Test not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(test);
} 