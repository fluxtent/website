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
        },
      },
      {
      id: '2.12',
      title: 'Boolean Expressions',
      type: 'theory',
      content: `# Boolean Expressions

Boolean expressions evaluate to true or false. They use relational operators and logical operators to compare values and combine conditions.

## Relational operators
- \`==\`: equal to
- \`!=\`: not equal to
- \`<\`, \`>\`, \`<=\`, \`>=\`: comparisons

## Logical operators
- \`&&\`: logical AND (true if both operands are true)
- \`||\`: logical OR (true if at least one operand is true)
- \`!\`: logical NOT (inverts a boolean value)

### Example
\`\`\`java
int x = 5;
int y = 10;
boolean b1 = (x < y);       // true
boolean b2 = (x == y);      // false
boolean b3 = (x < y) && (y < 20); // true
boolean b4 = !(x > y);      // true
\`\`\`

Boolean expressions control the flow of programs when used in if statements and loops.
`,
    },
    {
      id: '2.13',
      title: 'If Statements',
      type: 'theory',
      content: `# If Statements

An \`if\` statement executes a block of code only when a boolean condition is true. The syntax uses the \`if\` keyword followed by a condition in parentheses and a block of statements in braces.

\`\`\`java
int age = 20;
if (age >= 18) {
  System.out.println("You can vote.");
}
\`\`\`

If statements allow your program to make decisions based on data. Without braces, only the next single statement is controlled by the \`if\`.
`,
    },
    {
      id: '2.14',
      title: 'Else and Else-if',
      type: 'theory',
      content: `# Else and Else-if

When you want to run one block of code when a condition is false, use \`else\`. To check multiple conditions in order, chain \`else if\` clauses. The first true condition executes, and the rest are skipped.

\`\`\`java
int temp = 72;
if (temp > 80) {
  System.out.println("Hot");
} else if (temp >= 60) {
  System.out.println("Mild");
} else {
  System.out.println("Cold");
}
\`\`\`

In this example, only one of the three messages will be printed based on the temperature.
`,
    },
    {
      id: '2.15',
      title: 'Practice – Compare Two Numbers',
      type: 'practice',
      content: `Set two integers a=8 and b=5. Use an if-else statement to print the larger number preceded by "Larger: ".`,
      exercise: {
        description:
          'Set int a=8 and int b=5; if a is greater than b, print Larger: a, else print Larger: b',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Larger: 8',
        testCases: ['Larger: 8'],
      },
    },
        {
      id: '2.16',
      title: 'Practice – Letter Grade',
      type: 'practice',
      content: `Given an integer score=73, use an if-else-if chain to print the letter grade using the following scale: 90 and above = A, 80–89 = B, 70–79 = C, 60–69 = D, else F. Print exactly: Grade: C`,
      exercise: {
        description: "Given int score=73; determine and print the letter grade using if/else-if statements; print Grade: C",
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: `Grade: C`,
        testCases: [`Grade: C`],
      },
    }
  ],

  3: [
    {
      id: '3.1',
      title: 'For Loops',
      type: 'theory',
      content: `# For Loops
For loops are used when you know how many times you want to repeat a block of code. A for loop has three parts: an initialization, a condition that is checked before each iteration, and an update statement.

Example:
\`\`\`java
for (int i = 0; i < 5; i++) {
  System.out.println(i);
}
\`\`\`
This loop prints the numbers 0 through 4. You can change the starting value, condition, or increment to control how many times it runs.
`,
    },
    {
      id: '3.2',
      title: 'While Loops',
      type: 'theory',
      content: `# While Loops
While loops are useful when you do not know in advance how many times the loop should run. A while loop continues executing as long as its condition remains true.

Example:
\`\`\`java
int count = 0;
while (count < 3) {
  System.out.println("Count is " + count);
  count++;
}
\`\`\`
This loop prints 0, 1, and 2 because the loop condition is checked before each iteration. Be sure to update variables inside the loop so that it eventually stops.
`,
    },
    {
      id: '3.3',
      title: 'Nested Loops',
      type: 'theory',
      content: `# Nested Loops
Nested loops are loops inside other loops. They let you repeat a process in two dimensions, such as printing a multiplication table or iterating over rows and columns.

Example:
\`\`\`java
for (int i = 1; i <= 3; i++) {
  for (int j = 1; j <= 3; j++) {
    System.out.print(i * j + " ");
  }
  System.out.println();
}
\`\`\`
This code uses an outer loop over \`i\` and an inner loop over \`j\`. The inner loop runs completely each time the outer loop runs once. The example prints a 3×3 multiplication table.
`,
    },
    {
      id: '3.4',
      title: 'Practice – Counting Loop',
      type: 'practice',
      content: `Use a for loop to print the numbers from 1 through 5. Each number should be on its own line.`,
      exercise: {
        description: 'Print the numbers 1 through 5 using a for loop.',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: '1\n2\n3\n4\n5',
        testCases: ['1', '2', '3', '4', '5'],
      },
    },
    {
      id: '3.5',
      title: 'Practice – Summation',
      type: 'practice',
      content: `Use a while loop to compute the sum of numbers 1 through 10 and print exactly: Sum: 55`,
      exercise: {
        description:
          'Compute the sum of the integers from 1 to 10 using a while loop and print: Sum: 55',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Sum: 55',
        testCases: ['Sum: 55'],
      },
    },
    {
      id: '3.6',
      title: 'Practice – Factorial',
      type: 'practice',
      content: `Calculate the factorial of 5 using a for loop and print: Factorial: 120`,
      exercise: {
        description:
          'Compute the factorial of 5 (1×2×3×4×5) using a loop and print exactly: Factorial: 120',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Factorial: 120',
        testCases: ['Factorial: 120'],
      },
    },
    {
      id: '3.7',
      title: 'Practice – Multiplication Table',
      type: 'practice',
      content: `Use nested loops to print the multiplication table for 1 through 3. Each row should be on its own line.`,
      exercise: {
        description:
          'Print a multiplication table for 1 through 3 using nested loops. The output should be exactly:\n1 2 3\n2 4 6\n3 6 9',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: '1 2 3\n2 4 6\n3 6 9',
        testCases: ['1 2 3', '2 4 6', '3 6 9'],
      },
    },
  ],

  4: [
    {
      id: '4.1',
      title: 'Defining Methods',
      type: 'theory',
      content: `# Defining Methods
Methods group related code into reusable blocks. Each method has a return type, a name, parentheses that may contain parameters, and a body enclosed in braces.

Example:
\`\`\`java
public static int add(int a, int b) {
  return a + b;
}
\`\`\`
This method returns the sum of two integers.
`,
    },
    {
      id: '4.2',
      title: 'Parameters and Return Values',
      type: 'theory',
      content: `# Parameters and Return Values
Parameters allow you to pass information into a method. The return type specifies what kind of value a method returns. Use the return keyword to send a value back to the caller.

\`\`\`java
public static double average(int x, int y) {
  return (x + y) / 2.0;
}
\`\`\`
In this example, x and y are parameters, and the method returns a double value.
`,
    },
    {
      id: '4.3',
      title: 'Void vs Value-Returning Methods',
      type: 'theory',
      content: `# Void vs Value-Returning Methods

Methods can either return a value or not. Methods with a return type like \`int\` or \`double\` send a value back to the caller using the \`return\` statement. Methods declared with the \`void\` return type do not return any value and simply execute a block of code.

\`\`\`java
public static void sayHello(String name) {
  System.out.println("Hello, " + name + "!");
}

// value-returning method
public static int square(int n) {
  return n * n;
}
\`\`\`

Call value-returning methods in expressions or store their results in variables; call void methods for their side effects.
`,
    },
    {
      id: '4.4',
      title: 'Practice – Greeting Method',
      type: 'practice',
      content: `Write a method greet that takes a String name and prints Hello, NAME!. In main, call greet("Ada").`,
      exercise: {
        description:
          'Define a method greet(String name) that prints Hello, NAME! exactly. In main, call greet("Ada") and produce Hello, Ada!',
        starterCode: `public class Main {
  // define your method here
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Hello, Ada!',
        testCases: ['Hello, Ada!'],
      },
    },
    {
      id: '4.5',
      title: 'Practice – Max Method',
      type: 'practice',
      content: `Write a method max that takes two integers and returns the larger one. In main, call max(8,3) and print: Max: 8`,
      exercise: {
        description:
          'Create a method max(int x, int y) that returns the larger value. In main, call max(8,3) and print Max: 8',
        starterCode: `public class Main {
  // define your method here
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Max: 8',
        testCases: ['Max: 8'],
      },
    },
  ],

  5: [
    {
      id: '5.1',
      title: 'Classes and Objects',
      type: 'theory',
      content: `# Classes and Objects
A class defines a blueprint for objects. It contains fields (attributes) and methods (behaviors). An object is an instance of a class. Use the \`new\` keyword to create objects.

\`\`\`java
String str = new String("Hello");
Random rand = new Random();
\`\`\`
This code creates two objects: a String and a Random number generator.
`,
    },
    {
      id: '5.2',
      title: 'Fields and Methods',
      type: 'theory',
      content: `# Fields and Methods

Fields (instance variables) store the state of an object. Methods define behaviors that operate on that state. Fields are usually declared as private to hide details and maintain control through methods.

Example:
\`\`\`java
public class Counter {
  private int count;        // field

  public void increment() { // method
    count++;
  }

  public int getCount() {   // accessor method
    return count;
  }
}
\`\`\`
`,
    },
    {
      id: '5.3',
      title: 'Access Modifiers & Encapsulation',
      type: 'theory',
      content: `# Access Modifiers & Encapsulation

Encapsulation hides an object's internal state and allows it to be changed only through methods. Use the \`private\` modifier for fields and the \`public\` modifier for methods that clients call. This protects invariants and prevents inconsistent states.

\`\`\`java
public class BankAccount {
  private double balance;

  public void deposit(double amount) {
    balance += amount;
  }

  public double getBalance() {
    return balance;
  }
}
\`\`\`

Other classes cannot directly access \`balance\`, ensuring controlled updates via methods.
`,
    },
    {
      id: '5.4',
      title: 'Constructors',
      type: 'theory',
      content: `# Constructors
Constructors initialize object fields. A constructor has the same name as the class and no return type. You can overload constructors to provide different ways to create objects.

\`\`\`java
public class Point {
  private int x, y;
  public Point(int xVal, int yVal) {
    x = xVal;
    y = yVal;
  }
}
\`\`\`
`,
    },
    {
      id: '5.5',
      title: 'Practice – Person Class',
      type: 'practice',
      content: `Define a Person class with a String name field and a constructor that sets the name. Add a greet() method that prints Hello, my name is NAME!. In main, create a Person named Ada and call greet().`,
      exercise: {
        description:
          "Create a Person class with a name field, constructor, and greet method. In main, create Person('Ada') and call greet() to print Hello, my name is Ada!",
        starterCode: `class Person {
  // Your code here
}
public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Hello, my name is Ada!',
        testCases: ['Hello, my name is Ada!'],
      },
    },
    {
      id: '5.6',
      title: 'Practice – Bank Account',
      type: 'practice',
      content: `Create a BankAccount class with a double balance field and a constructor that sets the initial balance. Add a deposit method that adds to the balance and a getBalance() method. In main, create an account with 100.0, deposit 50.0, and print: Balance: 150.0`,
      exercise: {
        description:
          'Define class BankAccount with balance, constructor, deposit(), and getBalance(). In main, call deposit and print updated balance.',
        starterCode: `class BankAccount {
  // Your code here
}
public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Balance: 150.0',
        testCases: ['Balance: 150.0'],
      },
    },
    {
      id: '5.7',
      title: 'Practice – Student Class',
      type: 'practice',
      content: `Define a Student class with fields name (String) and gpa (double). Add a method isHonorRoll() that returns true if gpa >= 3.5. In main, create a Student named Bob with gpa 3.8 and print: Honor roll: true`,
      exercise: {
        description:
          "Implement Student class with name and gpa, method isHonorRoll() returns boolean. In main, instantiate Student('Bob',3.8) and print Honor roll: true",
        starterCode: `class Student {
  // Your code here
}
public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Honor roll: true',
        testCases: ['Honor roll: true'],
      },
    },
  ],

  6: [
    {
      id: '6.1',
      title: 'Array Basics',
      type: 'theory',
      content: `# Arrays
Arrays store fixed-size sequences of elements of the same type. Use square brackets to declare and access elements. Indices start at 0.

\`\`\`java
int[] nums = new int[5];
nums[0] = 10;
System.out.println(nums[0]);
\`\`\`
`,
    },
    {
      id: '6.2',
      title: 'Traversing Arrays',
      type: 'theory',
      content: `# Traversing Arrays
Use for loops to iterate over all elements in an array. You can use index-based loops or enhanced for loops.

\`\`\`java
int[] arr = {1,2,3};
for (int i = 0; i < arr.length; i++) {
  System.out.println(arr[i]);
}
for (int num : arr) {
  System.out.println(num);
}
\`\`\`
`,
    },
    {
      id: '6.3',
      title: 'Practice – Sum of Array',
      type: 'practice',
      content: `Given an array {1,2,3,4,5}, compute the sum of its elements and print: Sum: 15`,
      exercise: {
        description:
          'Create an int[] arr = {1,2,3,4,5}; sum all elements and print Sum: 15',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Sum: 15',
        testCases: ['Sum: 15'],
      },
    },
    {
      id: '6.4',
      title: 'Practice – Find Max',
      type: 'practice',
      content: `Find the largest number in the array {3,1,4,2,5} and print: Max: 5`,
      exercise: {
        description:
          'Create an int[] arr = {3,1,4,2,5}; find the maximum value and print Max: 5',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Max: 5',
        testCases: ['Max: 5'],
      },
    },
    {
      id: '6.5',
      title: 'Array Initialization & Default Values',
      type: 'theory',
      content: `# Array Initialization & Default Values

When you create an array, each element is automatically initialized. Numeric arrays default to 0, boolean arrays to false, and object references to null. You can initialize an array at declaration or assign values later.

\`\`\`java
int[] nums = new int[3];     // {0, 0, 0}
boolean[] flags = new boolean[2]; // {false, false}
String[] words = new String[2];   // {null, null}

int[] primes = {2,3,5,7};   // initialize with values
\`\`\`
`,
    },
    {
      id: '6.6',
      title: 'Practice – Reverse Array',
      type: 'practice',
      content: `Given an array {1,2,3,4,5}, print its elements in reverse order: 5 4 3 2 1`,
      exercise: {
        description:
          'Create int[] arr = {1,2,3,4,5}; print the elements in reverse order with spaces',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: '5 4 3 2 1',
        testCases: ['5 4 3 2 1'],
      },
    },
    {
      id: '6.7',
      title: 'Practice – Count Occurrences',
      type: 'practice',
      content: `Given the array {1,2,2,3,2} and a target value 2, count how many times the target appears and print: Count: 3`,
      exercise: {
        description:
          'Create int[] arr = {1,2,2,3,2}; count occurrences of 2 and print Count: 3',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Count: 3',
        testCases: ['Count: 3'],
      },
    },
  ],

  7: [
    {
      id: '7.1',
      title: 'ArrayList Basics',
      type: 'theory',
      content: `# ArrayList
An ArrayList is a resizable array provided in the java.util package. Use methods like add(), remove(), and get() to manipulate elements. You must specify the type of elements with generics.

\`\`\`java
import java.util.ArrayList;
ArrayList<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
System.out.println(list.get(0)); // apple
\`\`\`
`,
    },
    {
      id: '7.2',
      title: 'Traversing ArrayLists',
      type: 'theory',
      content: `# Traversing ArrayLists
Use index-based loops or enhanced for loops to access every element in an ArrayList. The size() method returns the number of elements.

\`\`\`java
ArrayList<Integer> nums = new ArrayList<>();
nums.add(1);
nums.add(2);
for (int i = 0; i < nums.size(); i++) {
  System.out.println(nums.get(i));
}
for (int n : nums) {
  System.out.println(n);
}
\`\`\`
`,
    },
    {
      id: '7.3',
      title: 'Practice – Modify ArrayList',
      type: 'practice',
      content: `Create an ArrayList of Strings, add "apple" and "banana", then add "cherry". Remove "banana" and print the elements separated by spaces: apple cherry`,
      exercise: {
        description:
          'Use ArrayList<String> fruits = new ArrayList<>(); add "apple", "banana"; add "cherry"; remove "banana"; iterate and print apple and cherry separated by a space.',
        starterCode: `import java.util.ArrayList;
public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'apple cherry',
        testCases: ['apple cherry'],
      },
    },
    {
      id: '7.4',
      title: 'ArrayList vs Array',
      type: 'theory',
      content: `# ArrayList vs Array

Arrays have fixed length and can store primitive types or references. \`ArrayList\` is a resizable collection that stores only object references and provides convenient methods such as add(), remove(), size(), and contains().

Use arrays when the size is fixed and performance matters; use \`ArrayList\` when you need a dynamic list of objects.

Example:
\`\`\`java
int[] arr = new int[3];              // array of ints
ArrayList<String> list = new ArrayList<>(); // list of Strings
list.add("hi");
\`\`\`
`,
    },
    {
      id: '7.5',
      title: 'Practice – Sum of ArrayList',
      type: 'practice',
      content: `Create an ArrayList of integers with values 2, 4, and 6. Compute the sum of all elements and print: Sum: 12`,
      exercise: {
        description:
          'Use ArrayList<Integer> nums = new ArrayList<>(); add 2,4,6; sum the elements and print Sum: 12',
        starterCode: `import java.util.ArrayList;
public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Sum: 12',
        testCases: ['Sum: 12'],
      },
    },
  ],

  8: [
    {
      id: '8.1',
      title: '2D Arrays',
      type: 'theory',
      content: `# 2D Arrays
A 2D array is an array of arrays, useful for representing tables or grids. Access elements using two indices: row and column.

\`\`\`java
int[][] matrix = new int[2][3];
matrix[0][0] = 1;
System.out.println(matrix.length);    // number of rows
System.out.println(matrix[0].length); // number of columns in row 0
\`\`\`
`,
    },
    {
      id: '8.2',
      title: 'Traversing 2D Arrays',
      type: 'theory',
      content: `# Traversing 2D Arrays
Use nested loops to iterate over rows and columns of a 2D array.

\`\`\`java
int[][] arr = {{1,2},{3,4}};
for (int i = 0; i < arr.length; i++) {
  for (int j = 0; j < arr[i].length; j++) {
    System.out.println(arr[i][j]);
  }
}
\`\`\`
`,
    },
    {
      id: '8.3',
      title: 'Practice – Sum of 2D Array',
      type: 'practice',
      content: `Given a 2D array {{1,2},{3,4}}, compute the sum of all elements and print: Sum: 10`,
      exercise: {
        description:
          'Create int[][] arr = {{1,2},{3,4}}; sum all elements and print Sum: 10',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Sum: 10',
        testCases: ['Sum: 10'],
      },
    },
    {
      id: '8.4',
      title: 'Practice – Max in 2D Array',
      type: 'practice',
      content: `Given the 2D array {{5,1},{4,9}}, find the largest value and print: Max: 9`,
      exercise: {
        description:
          'Create int[][] arr = {{5,1},{4,9}}; determine the maximum element and print Max: 9',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Max: 9',
        testCases: ['Max: 9'],
      },
    },
  ],

  9: [
    {
      id: '9.1',
      title: 'Reading Text Files',
      type: 'theory',
      content: `# Reading Text Files
Use java.io.File and java.util.Scanner to read data from a text file. Methods such as nextInt(), nextLine(), and hasNext() are used to read different types of data.

You must handle FileNotFoundException when opening a file. Always close the Scanner when done.
`,
    },
    {
      id: '9.2',
      title: 'Processing Data Sets',
      type: 'theory',
      content: `# Processing Data Sets
After reading values from a file, store them in an array or ArrayList for processing. You can compute sums, averages, or other statistics.
`,
    },
    {
      id: '9.3',
      title: 'Practice – Average of Numbers',
      type: 'practice',
      content: `Simulate reading five numbers from a data set: 10, 20, 30, 40, 50. Compute the average and print: Average: 30.0`,
      exercise: {
        description:
          'Create an int[] nums = {10,20,30,40,50}; compute the average as a double and print Average: 30.0',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Average: 30.0',
        testCases: ['Average: 30.0'],
      },
    },
    {
      id: '9.4',
      title: 'Using File and Scanner',
      type: 'theory',
      content: `# Using File and Scanner

To read input from a file, create a \`File\` object that points to the file on disk and pass it to a \`Scanner\`. Use methods like \`hasNext()\`, \`next()\`, \`nextInt()\`, and \`nextDouble()\` to read tokens. Always handle exceptions with try/catch or declare \`throws\`.

\`\`\`java
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) throws FileNotFoundException {
    File file = new File("data.txt");
    Scanner sc = new Scanner(file);
    while (sc.hasNextInt()) {
      int num = sc.nextInt();
      System.out.println(num);
    }
    sc.close();
  }
}
\`\`\`

This program reads integers from a file until there are no more numbers.
`,
    },
    {
      id: '9.5',
      title: 'Practice – Max from Data Set',
      type: 'practice',
      content: `Simulate reading integers {3,8,2,9,5} from a data set (store them in an array). Find the largest value and print: Max: 9`,
      exercise: {
        description:
          'Create int[] data = {3,8,2,9,5}; determine the maximum value and print Max: 9',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Max: 9',
        testCases: ['Max: 9'],
      },
    },
  ],

  10: [
    {
      id: '10.1',
      title: 'Searching Algorithms',
      type: 'theory',
      content: `# Searching Algorithms
Linear search checks each element in a sequence until it finds a match. Binary search works on sorted arrays and repeatedly divides the search interval in half to find a target.
`,
    },
    {
      id: '10.2',
      title: 'Sorting Algorithms',
      type: 'theory',
      content: `# Sorting Algorithms
Common sorting algorithms include selection sort, insertion sort, and merge sort. Merge sort uses recursion to divide the array and then merge sorted halves.
`,
    },
    {
      id: '10.3',
      title: 'Practice – Linear Search',
      type: 'practice',
      content: `Search for the value 7 in the array {3,7,1,9}. If found, print: Found`,
      exercise: {
        description:
          'Create int[] arr = {3,7,1,9}; use a loop to search for 7. If found, print Found',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Found',
        testCases: ['Found'],
      },
    },
    {
      id: '10.4',
      title: 'Practice – Simple Sort',
      type: 'practice',
      content: `Sort the array {5,2,4,1,3} in ascending order using a simple algorithm (like selection sort) and print the sorted array: 1 2 3 4 5`,
      exercise: {
        description:
          'Create int[] arr = {5,2,4,1,3}; sort it in ascending order and print 1 2 3 4 5 with spaces',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: '1 2 3 4 5',
        testCases: ['1 2 3 4 5'],
      },
    },
    {
      id: '10.5',
      title: 'Binary Search',
      type: 'theory',
      content: `# Binary Search

Binary search efficiently finds a target value in a sorted array by repeatedly dividing the search interval in half. At each step compare the target to the middle element; if the target is less than the middle, search the left half, else search the right half. Repeat until found or interval is empty.

\`\`\`java
public static int binarySearch(int[] arr, int target) {
  int left = 0;
  int right = arr.length - 1;
  while (left <= right) {
    int mid = (left + right) / 2;
    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // not found
}
\`\`\`
`,
    },
    {
      id: '10.6',
      title: 'Practice – Binary Search',
      type: 'practice',
      content: `Implement binary search to find the index of 7 in the sorted array {1,3,5,7,9}. Print exactly: Index: 3`,
      exercise: {
        description:
          'Write a method binarySearch(int[] arr, int target) returning index; call it on {1,3,5,7,9} with target 7 and print Index: 3',
        starterCode: `public class Main {
  // define binarySearch method here
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Index: 3',
        testCases: ['Index: 3'],
      },
    },
    {
      id: '10.7',
      title: 'Practice – Selection Sort',
      type: 'practice',
      content: `Use selection sort to sort the array {9,4,6,2,8} in ascending order and print: 2 4 6 8 9`,
      exercise: {
        description:
          'Implement selection sort on int[] arr = {9,4,6,2,8}; print the sorted array 2 4 6 8 9',
        starterCode: `public class Main {
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: '2 4 6 8 9',
        testCases: ['2 4 6 8 9'],
      },
    },
  ],

  11: [
    {
      id: '11.1',
      title: 'Recursion Basics',
      type: 'theory',
      content: `# Recursion
Recursion occurs when a method calls itself. A recursive method must have a base case to stop the recursion and a recursive case to break the problem into smaller subproblems.
`,
    },
    {
      id: '11.2',
      title: 'Recursive Algorithms',
      type: 'theory',
      content: `# Recursive Algorithms
Common recursive algorithms include factorial, Fibonacci numbers, and divide-and-conquer sorting methods such as merge sort.
`,
    },
    {
      id: '11.3',
      title: 'Practice – Recursive Factorial',
      type: 'practice',
      content: `Write a recursive method that computes the factorial of 5 and print: Factorial: 120`,
      exercise: {
        description:
          'Implement a recursive method int fact(int n) that returns n factorial. Call fact(5) in main and print Factorial: 120',
        starterCode: `public class Main {
  // define your recursive method here
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Factorial: 120',
        testCases: ['Factorial: 120'],
      },
    },
    {
      id: '11.4',
      title: 'Practice – Recursive Sum',
      type: 'practice',
      content: `Compute the sum of numbers 1 through 5 using a recursive method and print: Sum: 15`,
      exercise: {
        description:
          'Implement a recursive method int sum(int n) that returns the sum of numbers 1 through n. Call sum(5) in main and print Sum: 15',
        starterCode: `public class Main {
  // define your recursive method here
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Sum: 15',
        testCases: ['Sum: 15'],
      },
    },
    {
      id: '11.5',
      title: 'Practice – Fibonacci Sequence',
      type: 'practice',
      content: `Implement a recursive method that returns the nth Fibonacci number (where F(0)=0 and F(1)=1). Call the method with n=5 and print: Fib: 5`,
      exercise: {
        description:
          'Write a method int fibonacci(int n) that returns the nth Fibonacci number using recursion. In main, call fibonacci(5) and print Fib: 5',
        starterCode: `public class Main {
  // define your recursive method here
  public static void main(String[] args) {
    // Your code here
  }
}`,
        expectedOutput: 'Fib: 5',
        testCases: ['Fib: 5'],
      }
    }
  ]
};