# WINDOW — Your Second Monitor Reimagined

Turn your screen into a window to anywhere!

WINDOW is a website I made that uses AI to create realistic pictures of different places. Instead of having a boring wallpaper, you can make your screen look like a window showing mountains, forests, beaches, cities, and more.

You can choose the place, weather, time of day, and even what kind of window frame you want!

## Features

### AI-Generated Landscapes
WINDOW uses the OpenAI Image API to make realistic pictures based on what you choose.

### Scenery Selection
You can choose from five places:
- Forest
- Mountains
- Beach
- City
- Countryside

### Time of Day
You can choose morning, afternoon, evening, or night.

### Weather
You can choose sunny, rainy, snowy, cloudy, or thunderstorm weather.

### Window Frames
You can also choose what your window looks like!

There are four options:
- Frameless
- Wooden
- Modern
- Vintage

The frames are made using CSS, so you don't need to generate another picture just to change the frame.

## How It Works

1. Open WINDOW in your browser.
2. Choose where you want your window to look.
3. Pick the time of day and weather.
4. Choose your window frame.
5. Press **Open My Window**.
6. JavaScript sends your choices to the Flask backend.
7. Flask asks OpenAI to make a picture.
8. The picture gets saved on your computer.
9. WINDOW shows your new view!

You need internet and an OpenAI API key for the picture generation to work.

## Challenges and What I Learned

This project was harder than I thought it would be.

One of the biggest problems was getting JavaScript and Flask to work together. At first, the website couldn't connect to the server. I had to figure out what was wrong with localhost, HTTP requests, and Flask.

I also had problems with the OpenAI API. Sometimes the image wouldn't generate because of model errors. I had to check the Python terminal to find out what was wrong.

Another problem was making WINDOW work on different screen sizes. Sometimes there were scrollbars, and the picture didn't fit properly. I fixed this by using JavaScript to check the screen size and CSS to make the picture fit.

I also made different window frames using HTML, CSS, and JavaScript.

Some things I learned were:
- How to connect JavaScript with Python.
- How to send information using JSON.
- How to use Flask.
- How to work with an AI API.
- How to find and fix errors.
- How to save generated pictures.
- How to make websites fit different screens.
- How to use local storage.

## AI Usage Declaration

I only used ChatGPT as my AI assistant for this project.

I used it to help plan the project, learn things I didn't understand, write some code, and fix problems. It also helped me with the API, making the website fit different screens, and writing this README.

I tested the code, changed things, and worked on fixing problems while making WINDOW.

WINDOW also uses the OpenAI Image API to generate pictures. That's part of the project, not another AI coding assistant.

## Project Status

**WINDOW V1 is finished!**

If this project gets reviewed and approved, I want to make V2!

In V2, I want to add more features, like letting people upload their own pictures, music, videos, and even 3D models.

I also want to add more customization options and make WINDOW even better.

This project took a lot of work, but I'm happy that I finally finished it!