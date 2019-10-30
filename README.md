## Best Clash Royale Players: Data Visualization

### Background and Overview

  Clash Royale is a popular mobile game made by Supercell. As one of the top
  games from the Google Play Store, it is enjoyed by many and is even played
  competitively: featuring global rankings and pro tournaments. Due to its 
  competitive nature, statistics of gameplay is important to many players. 
  Best Clash Royale Players features the best players around the world along 
  with some of their game stats.

### Functionality and MVP Features
  Users will be able to:
  * View the locations of the top ranked players
  * Toggle between different sets of data
  * See each player's best trophy record.

### Data & APIs

  Data is available from the Clash Royale API.

### Wireframe

  This visualization consists of a single screen containing a spinning globe (a) and interactive pie charts (b).
  ![Clash Royale wireframe](assets/wireframe.png)

  The globe allows the user to visualize the locations of the top ranked players. The pie charts can be toggled to see the different stats of each player. The text (c) under each pie chart will display the actual number data from the pie chart along with the player's best trophy score. The text on the far right (d) lists more detailed instructions to help the user navigate through the page.

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

  Day 4:
  * Clean up features and make page visually appealing

