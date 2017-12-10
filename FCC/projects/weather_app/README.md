## Project Goals

FCC Intermediate: Local Weather
Project Page

### Overview
You were hired by a brand new news company who wants to start with a simple check your local weather page. This page should be able to pull the user’s location from their browser and display the local weather for the day. The item should follow the following requirements.


### Minimums
Website should have a minimalistic yet professional feel:
X Title for the page
X Layout should be mobile friendly
X Location should be pulled automatically. Use the Project Page to see two ways to do this. Using C9 provides you with an HTTPS connection so you should be able to use HTML5 geolocation system.
The local weather for the day should be displayed:
X Weather should display the type of weather: sunny, rainy, cloudy etc
X Weather should display an icon or image depending on the type of weather - recommendation is to use FontAwesome but you can use whatever icon/image system you wish.
X Weather should display current temperature
X Current weather section should allow a click to change from Fahrenheit to Celsius. This could be a button or some other method.
X Weather must be pulled from an API. Recommended API is the Open Weather API however you are free to use any weather API you wish.

### Additional Challenges
Background/theme of site should change based on the weather to give an even easier quick glance of what the expected weather for the day will be. Tip: a source of license free images can be found on unsplash.com; however, you can use a different source if you have one.
Include a section with a brief summary of the weather expected for today. 

### Hacker Level Challenges
X Use an environment variable to store the API key.
X Include some additional data from the API you will need to research what data is available and how it can be of use to your site.



### Set up

To demo app, do the following (linux):

1. Export your api key as an env variable
```
export API_KEY="your api key"

```

2. Create a file called key.js, and put the API key value in there

```
echo "API_KEY='${API_KEY}';" > $(pwd)/script/key.js