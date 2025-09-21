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


    These are useful when displaying information or guiding a user through input/output interactions.


    ### Example:
    \`\`\`java
    System.out.println("Hello");
    System.out.println("World!");
    \`\`\`


    **Output:**
    \`\`\`
    Hello
    World!
    \`\`\`
        `
      },
      {
        id: '1.1p',
        type: 'practice',
        title: 'Practice â€“ Hello Print',
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
        id: '1.2',
        type: 'theory',
        title: 'println vs print',
        content: `# println vs print


    The difference between \`print\` and \`println\` lies in line handling:


    ### Example:
    \`\`\`java
    System.out.print("Hello ");
    System.out.print("World!");
    \`\`\`
        
    **Output:**
    \`\`\`
    Hello World!
    \`\`\`


    Now try with println:
    \`\`\`java
    System.out.println("Hello");
    System.out.println("World!");
    \`\`\`


    **Output:**
    \`\`\`
    Hello
    World!
    \`\`\`
        `
      },
      {
        id: '1.2p',
        type: 'practice',
        title: 'Practice â€“ print vs println',
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
        id: '1.3',
        type: 'theory',
        title: 'Escape Characters',
        content: `# Escape Characters


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
    \`\`\`
        `
      },
      {
        id: '1.3p',
        type: 'practice',
        title: 'Practice â€“ Escape Characters',
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
        title: 'Practice â€“ Print Variables',
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
        }
      },
      {
        id: '1.5',
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
        title: 'Practice â€“ Greet User',
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
        title: 'Practice â€“ Fun Facts',
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
      // your code here
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
      // your code here
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
      // your code here
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
      // your code here
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
      // your code here
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
      // your code here
    }
    }`,
          expectedOutput: `Average: 90.67`,
          testCases: [`Average: 90.67`]
        }
      }
  ]
};
