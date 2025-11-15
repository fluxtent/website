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
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
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
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: `He said, "Java is cool!"`,
        testCases: ["He said, \"Java is cool!\""],
      }
    }
  ],

  2: [
       {
    id: '2.1',
    title: 'Variables and Data Types',
    type: 'theory',
    content: `# Variables and Data Types
    Variables store data in memory.


    ## Primitive types
    - \`int\`: whole numbers
    - \`double\`: decimal numbers
    - \`boolean\`: true/false values


    ## Reference type
    - \`String\`: text sequences


    ## Examples
    \`\`\`java
    int age = 15;
    double price = 19.99;
    boolean enrolled = true;
    String name = "Alice";
    \`\`\`


    Variables can be reassigned:
    \`\`\`java
    age = 16;
    \`\`\``
      },
      {
        id: '2.2',
        title: 'Practice â€“ Variables',
        type: 'practice',
        content: `Declare variables for a person's name and age, then print: Alice is 15 years old.`,
        exercise: {
          description: "Use String and int variables, then print exactly: Alice is 15 years old.",
          starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
          expectedOutput: `Alice is 15 years old.`,
          testCases: [`Alice is 15 years old.`]
        }
      },
      {
        id: '2.3',
        title: 'Operators and Expressions',
        type: 'theory',
        content: `# Operators and Expressions
    Arithmetic: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`


    Integer division discards decimals:
    \`\`\`java
    int a = 7 / 2;      // 3
    double b = 7 / 2.0; // 3.5
    int r = 7 % 2;      // 1
    \`\`\`


    The Math class provides useful methods:
    \`\`\`java
    System.out.println(Math.sqrt(16)); // 4.0
    System.out.println(Math.pow(2,3)); // 8.0
    \`\`\``
      },
      {
        id: '2.4',
        title: 'Practice â€“ Arithmetic',
        type: 'practice',
        content: `Compute total price given qty and unitPrice. Print exactly: Total: 37.5`,
        exercise: {
          description: "Set int qty = 3 and double unitPrice = 12.5, then print Total: 37.5",
          starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
          expectedOutput: `Total: 37.5`,
          testCases: [`Total: 37.5`]
        }
      },
      {
        id: '2.5',
        title: 'Strings and Methods',
        type: 'theory',
        content: `# Strings and Methods
    Strings are reference types. Use methods like:


    \`\`\`java
    String s = "Java";
    System.out.println(s.length());
    System.out.println(s.substring(1,3));
    System.out.println(s.equals("Java"));
    \`\`\`


    Use .equals() to compare strings, not ==.`
      },
      {
        id: '2.6',
        title: 'Practice â€“ Strings',
        type: 'practice',
        content: `Combine first and last name with a space. Print exactly: Full name: Ada Lovelace`,
        exercise: {
          description: "Create String first = \"Ada\" and last = \"Lovelace\" then print Full name: Ada Lovelace",
          starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
          expectedOutput: `Full name: Ada Lovelace`,
          testCases: [`Full name: Ada Lovelace`]
        }
      },
      {
        id: '2.7',
        title: 'User Input with Scanner',
        type: 'theory',
        content: `# Scanner for Input
    \`\`\`java
    import java.util.Scanner;
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    String word = sc.next();
    \`\`\`


    When mixing nextInt() and nextLine(), be careful of newline issues.`
      },
      {
        id: '2.8',
        title: 'Practice â€“ Scanner Simulation',
        type: 'practice',
        content: `Hardcode two integers a=20 and b=22, then print: Sum: 42`,
        exercise: {
          description: "Print Sum: 42 using int a=20 and int b=22",
          starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
          expectedOutput: `Sum: 42`,
          testCases: [`Sum: 42`]
        }
      },
      {
        id: '2.9',
        title: 'Casting and Precision',
        type: 'theory',
        content: `# Casting and Precision
    - Widening: int to double happens automatically
    - Narrowing: double to int requires a cast


    \`\`\`java
    double x = 7 / 2;
    double y = 7 / 2.0;
    int z = (int) 3.99;
    \`\`\``
      },
      {
        id: '2.10',
        title: 'Practice â€“ Temperature Conversion',
        type: 'practice',
        content: `Convert Celsius to Fahrenheit using F = C * 9/5 + 32. For C=25, print: F: 77.0`,
        exercise: {
          description: "Set double c=25, compute F, print exactly F: 77.0",
          starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
          expectedOutput: `F: 77.0`,
          testCases: [`F: 77.0`]
        }
      },
      {
        id: '2.11',
        title: 'Mini Assignment â€“ Grade Calculator',
        type: 'practice',
        content: `Write a program with three scores: 90, 87, 95. Print the average with two decimals: Average: 90.67`,
        exercise: {
          description: "Compute average of s1=90, s2=87, s3=95, print exactly: Average: 90.67",
          starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
          expectedOutput: `Average: 90.67`,
          testCases: [`Average: 90.67`]
        }
      }
  ]
};
