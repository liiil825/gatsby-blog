---
title: O(kn) === O(n)?
date: "2021-01-18T11:10:32.169Z"
description: In the time complexity, why the previous coefficients can be discarded is the first strange place that algorithm beginners will face, and I have only recently had a new experience
---

Learning algorithm is inseparable from algorithm time complexity analysis. But I dare say that less than half of the people really want to understand this question. But when you understand the problem, you will have a new understanding of what kind of code you should write.

### Big O complexity notation

Big O time complexity notation. It represents the changing trend of code execution time with the growth of data scale, so it is also called asymptotic time complexity, or time complexity for short. The key lies in the changing trend of growth, which represents the growth of growth.

### O(kn) === O(n)

Why can we simplify the previous coefficients. Simply put, the trend of growth is similar to seeking derivation. The derivative of the constant is 0. This statement is a bit abstract. Give an intuitive example:

1. If the coefficient k is equal to 1000, when the amount of data is also equal to n is 1000. At this time, k:n = 1:1, at this time O(kn) === 2 * O(n)
2. When the amount of data grows to 10,000. At this time, k:n = 1:10, at this time O(kn) === 1.1 * O(n)
3. When the amount of data grows to 1,000,000. At this time, k:n = 1:1000, at this time O(kn) === 1.001 * O(n)
4. Observation shows that no matter how big the coefficient is, it is a constant. Perhaps it has a great influence at the beginning, but it will not change. That is to say, it has no effect on the trend of growth, and n is a number that may increase to infinite. So O(kn) === O(n)

### Algorithm time complexity is not equal to algorithm execution speed

Big O time complexity does not actually indicate the actual execution time of the code. From the perspective of execution time, O(kn) is definitely slower than O(n), but why is algorithm complexity analysis describing the trend of growth?

1. There is no way to accurately indicate the specific execution time of a piece of code. Because the execution time of each line of code is not the same.
2. In most cases, there is no need for a method that can express execution efficiency.

After writing algorithmic questions on leetcode, you will find that the same code is submitted several times and the execution time is also greatly changed. Then your piece of code is obviously better than the other end, and there is no guarantee that your execution time will be less. So when the time complexity of the algorithm cannot be improved, it is enough, there is no need to insist on re-optimizing O(kn) to O(n)

Analyze the specific situation. Of course, when writing algorithmic questions, you don’t need to write O(kn) if you can write O(n), but in specific development, you should pay more attention to the readable code than O(n).