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

<<<<<<< HEAD
=======
These are useful when displaying information or guiding a user through input/output interactions.

### Example:
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
\`\`\`java
System.out.println("Hello");
System.out.println("World!");
\`\`\`

<<<<<<< HEAD
Outputs:
=======
**Output:**
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
\`\`\`
Hello
World!
\`\`\`
      `
    },
    {
<<<<<<< HEAD
=======
      id: '1.1p',
      type: 'practice',
      title: 'Practice – Hello Print',
      content: `Use two println statements to print "Hello" and "World!" on separate lines.`,
      exercise: {
        description: "Use println to output Hello and World!",
        starterCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello");
    System.out.println("World!");
  }
}`,
        expectedOutput: "Hello\nWorld!",
        testCases: ["Hello", "World!"]
      }
    },
    {
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
      id: '1.2',
      type: 'theory',
      title: 'println vs print',
      content: `# println vs print

<<<<<<< HEAD
The difference between \`print\` and \`println\` is how they handle line breaks:

=======
The difference between \`print\` and \`println\` lies in line handling:

### Example:
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
\`\`\`java
System.out.print("Hello ");
System.out.print("World!");
\`\`\`

<<<<<<< HEAD
Output:
=======
**Output:**
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
\`\`\`
Hello World!
\`\`\`

<<<<<<< HEAD
While:

=======
Now try with println:
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
\`\`\`java
System.out.println("Hello");
System.out.println("World!");
\`\`\`

<<<<<<< HEAD
Output:
=======
**Output:**
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
\`\`\`
Hello
World!
\`\`\`
      `
    },
    {
<<<<<<< HEAD
=======
      id: '1.2p',
      type: 'practice',
      title: 'Practice – print vs println',
      content: `Use print and println to output lines differently and observe formatting.`,
      exercise: {
        description: "Use one print and one println to show line continuation and break.",
        starterCode: `public class Main {
  public static void main(String[] args) {
    System.out.print("One line ");
    System.out.println("Next line");
  }
}`,
        expectedOutput: "One line Next line",
        testCases: ["One line Next line"]
      }
    },
    {
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
      id: '1.3',
      type: 'theory',
      title: 'Escape Characters',
      content: `# Escape Characters

<<<<<<< HEAD
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
=======
Escape characters allow you to insert special formatting:
- \`\n\` = newline
- \`\t\` = tab
- \`\\\` = backslash
- \`\"\` = double quote

### Example:
\`\`\`java
System.out.println("Line1\nLine2");
System.out.println("Tabbed\tText");
System.out.println("She said, \"Hi!\"");
\`\`\`

**Output:**
\`\`\`
Line1
Line2
Tabbed\tText
She said, "Hi!"
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
\`\`\`
      `
    },
    {
<<<<<<< HEAD
      id: '1.4',
      type: 'practice',
      title: 'Practice – Your Name & Age',
      content: `Print your name and age on separate lines using two println statements.`,
      exercise: {
        description: "Print your name and age on separate lines.",
        starterCode: `// Your code here\n`,
        expectedOutput: "My name is Alex.\nI am 16.",
        testCases: ["My name is Alex.", "I am 16."],
=======
      id: '1.3p',
      type: 'practice',
      title: 'Practice – Escape Characters',
      content: `Use \n and \" in a sentence.`,
      exercise: {
        description: "Print a sentence that uses newlines and quotes.",
        starterCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("She said, \"Java is cool!\"\nLet's code!");
  }
}`,
        expectedOutput: "She said, \"Java is cool!\"\nLet's code!",
        testCases: ["She said, \"Java is cool!\"", "Let's code!"]
      }
    },
    {
      id: '1.4',
      type: 'theory',
      title: 'Printing Variables',
      content: `# Printing Variables

You can store values in variables and print them out:

\`\`\`java
String name = "Sam";
int age = 14;
System.out.println(name);
System.out.println(age);
\`\`\`

**Output:**
\`\`\`
Sam
14
\`\`\`
      `
    },
    {
      id: '1.4p',
      type: 'practice',
      title: 'Practice – Print Variables',
      content: `Declare and print variables for your favorite food and number.`,
      exercise: {
        description: "Print a string and number stored in variables.",
        starterCode: `public class Main {
  public static void main(String[] args) {
    String food = "Pizza";
    int number = 7;
    System.out.println(food);
    System.out.println(number);
  }
}`,
        expectedOutput: "Pizza\n7",
        testCases: ["Pizza", "7"]
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
      }
    },
    {
      id: '1.5',
<<<<<<< HEAD
      type: 'practice',
      title: 'Practice – Quotes and Text',
      content: `Print the exact sentence: He said, \"Java is cool!\"`,
      exercise: {
        description: "Print this exactly: He said, \"Java is cool!\"",
        starterCode: `// Your code here\n`,
        expectedOutput: `He said, "Java is cool!"`,
        testCases: ["He said, \"Java is cool!\""],
=======
      type: 'theory',
      title: 'Combining Text and Variables',
      content: `# Combining Text and Variables

You can combine variables and strings using the \`+\` operator:

\`\`\`java
String name = "Jamie";
System.out.println("Hello, " + name);
\`\`\`

**Output:**
\`\`\`
Hello, Jamie
\`\`\`
      `
    },
    {
      id: '1.5p',
      type: 'practice',
      title: 'Practice – Greet User',
      content: `Store a name in a variable and use it to greet the user.`,
      exercise: {
        description: "Create a variable and include it in a greeting.",
        starterCode: `public class Main {
  public static void main(String[] args) {
    String name = "Jamie";
    System.out.println("Hello, " + name);
  }
}`,
        expectedOutput: "Hello, Jamie",
        testCases: ["Hello, Jamie"]
      }
    },
    {
      id: '1.6',
      type: 'practice',
      title: 'Practice – Fun Facts',
      content: `Print three fun facts about yourself using three separate print statements.`,
      exercise: {
        description: "Print 3 sentences about yourself.",
        starterCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("I play the guitar.");
    System.out.println("I love pizza.");
    System.out.println("I can juggle.");
  }
}`,
        expectedOutput: "I play the guitar.\nI love pizza.\nI can juggle.",
        testCases: ["I play the guitar.", "I love pizza.", "I can juggle."]
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
      }
    }
  ],

  2: [
    // Add Module 2 lessons here
  ]
<<<<<<< HEAD
};
=======
};
>>>>>>> 2f7389d (Added more subunits.Need to change practice.)
