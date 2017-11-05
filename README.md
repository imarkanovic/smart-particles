# Smart Particles
An implementation of machine learning with genetic algorithm using Javascript

<a href="https://imgflip.com/gif/1yut6l"><img src="https://i.imgflip.com/1yut6l.gif" title="made at imgflip.com"/></a>

## Description

Smart Particles is an implementation of machine learning with genetic algorithm written in Javascript, using the p5js framework.  
The objective is for particles to learn how to reach their target by using genetic algo methods such as crossover and DNA mutation.

**Due to p5js usage of WebGL, it is recommended to run this in Chrome** 
**Firefox has known performance issues, especially when running large amount of particles**

## Usage 
You can choose the number of particles, along with their age.  
DNA mutation chance is best to be left between 0.7% and 1.5%. The maximum is 10%, however, it is not recommended to set it that high as you wont get effective learning. 

You can create **obstacles** by drawing rectangles on the screen (I originally made it that you can draw free form objects, but ran into issues when you would draw it too fast, as it would actually leave unnoticeable places where particles could go through).

You can move the **target** 

## Hint
Learning takes time, be patient


