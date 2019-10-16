## Best Clash Royale Players: A Global Look

### Background and Overview

  Clash Royale is a popular mobile game made by Supercell. As one of the top
  games from the Google Play Store, it is enjoyed by many and is even played
  competitively, featuring global rankings and pro tournaments. Due to its 
  competitive nature, data featuring statistics of gameplay is important to 
  many players. Best Clash Royale Players features the best players around the world along with their main game statistics.

### Functionality and MVP Features
  Users will be able to:
  * View the locations of the top ranked players
  * Toggle between win rates of various modes of competitive play
  * See each player's trophy progression in a graph

### Data & APIs

  Data is available from the Clash Royale API.

### Wireframe

  This visualization consists of a single screen containing a spinning globe (a), interactive pie charts (c), and a line graph (d).
  ![Clash Royale wireframe](assets/wireframe.png)

  The globe allows the user to visualize the locations of the top ranked players. The list depicted by (b) will show the list of the top ranked players. The user will be able to toggle the location off of the globe by checking the users off and on. The interactive pie charts will show the win rates of each player for different game modes when clicked and the line graph will show the player's trophy progression.

### Architecture and Technologies
  Best Clash Royale Players is built with: 
  * D3.js for interactive visualization
  * Javascript to retrieve data
  * Webpack to bundle and serve up various scripts

### Implementation Timeline

  Day 1: 
  * Set up project's webpack
  * Figure out how to retrieve information from Clash Royale API
  * Go through tutorials for D3
  
  Day 2:
  * Set up the spinning globe feature using D3
  * Retrieve data from Clash Royale API to mark locations on globe

  Day 3: 
  * Set up pie charts for win rates for various game modes
  * Set up toggle feature or some other UI so switch between graphs
  * Set up line graph to show trophy progression for each player

  Day 4:
  * Clean up features and make page visually appealing

