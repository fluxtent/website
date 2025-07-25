export const moduleContent: Record<number, any[]> = {
  1: [
    {
      id: '1.1',
      title: 'Print Statements',
      type: 'theory',
      content: `# What is print?
The \`System.out.print\` and \`System.out.println\` commands allow you to output text to the console.

## println vs print
- \`println\` prints and moves to the next line
- \`print\` keeps printing on the same line

\`\`\`java
System.out.println("Hello");
System.out.println("World!");
\`\`\`

Outputs:
\`\`\`
Hello
World!
\`\`\`
      `
    },
    {
      id: '1.2',
      type: 'theory',
      title: 'println vs print',
      content: `# println vs print

The difference between \`print\` and \`println\` is how they handle line breaks:

\`\`\`java
System.out.print("Hello ");
System.out.print("World!");
\`\`\`

Output:
\`\`\`
Hello World!
\`\`\`

While:

\`\`\`java
System.out.println("Hello");
System.out.println("World!");
\`\`\`

Output:
\`\`\`
Hello
World!
\`\`\`
      `
    },
    {
      id: '1.3',
      type: 'theory',
      title: 'Escape Characters',
      content: `# Escape Characters

Escape characters let you print special characters like quotes, tabs, and newlines.

\`\`\`java
System.out.println("This is line 1\nThis is line 2");
System.out.println("Tabbed\tText");
System.out.println("She said, \"Hello!\"");
\`\`\`

Output:
\`\`\`
This is line 1
This is line 2
Tabbed	Text
She said, "Hello!"
\`\`\`
      `
    },
    {
      id: '1.4',
      type: 'practice',
      title: 'Practice – Your Name & Age',
      content: `Print your name and age on separate lines using two println statements.`,
      exercise: {
        description: "Print your name and age on separate lines.",
        starterCode: `// Your code here\n`,
        expectedOutput: "My name is Alex.\nI am 16.",
        testCases: ["My name is Alex.", "I am 16."],
      }
    },
    {
      id: '1.5',
      type: 'practice',
      title: 'Practice – Quotes and Text',
      content: `Print the exact sentence: He said, \"Java is cool!\"`,
      exercise: {
        description: "Print this exactly: He said, \"Java is cool!\"",
        starterCode: `// Your code here\n`,
        expectedOutput: `He said, "Java is cool!"`,
        testCases: ["He said, \"Java is cool!\""],
      }
    }
  ],

  2: [
    // Add Module 2 lessons here
  ]
};