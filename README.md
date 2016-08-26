# Beets

A multi-user drum machine for collaborative beat-making.

## Team Beets:

- Hien Dang
- Peter Doane
- Michael Park

## What's the name of your project?

Our project is called "Beets" after the vegetable, because it sounds like "beats."

## What problem does it solve?

Beets is a web-based drum machine that allows multiple users to edit a drum
pattern in real time. Beets also provides a platform for publishing drum patterns.

## Who has this problem?

The typical Beets user is interested in drum patterns and enjoys collaborating
with like-minded people, but is unable to meet potential collaborators in
person.

## How does your project solve this problem?

Beets allows users to log in from any web browser and listen to beats that other
users have created. Users can also enter one of several studios to create their
own beats. Other users may also enter the studio to collaborate with them. There
is a chat feature so that the users in a studio can communicate with each other.

## What web APIs did it use?

The drum samples played via the Web Audio API.

## What technologies did it use?

The Beets front end is built with React.js and Materialize.css.
The Beets back end is an Express.js server running on Node.js.
Socket.io enables real-time chat and drum pattern editing.

The server uses Knex.js to communicate with a PostgreSQL database. Ancillary
technologies include
- JSON Web Tokens for user authentication
- the Axios promise-based HTTP library
- bcrypt-as-promised, humps, etc.

## What was the most valuable piece of Customer feedback you received?

The sound labels on the side of the drums were confusing for many beginners to beet-making. We updated the drum machine with sound samples and tooltips to make it more user-friendly.

## What was the biggest technical challenge you had to overcome?

Our biggest challenge was lack of time. Another big issue was using React; our
two-week introduction to React gave us enough knowledge to implement basic
functionality, but adding more functionality exposed design problems caused
by inexperience with the React way of doing things.

We also ran into some git issues, and a team member's illness did not help either.

We tried using SVG files from Sketch to style our app, but abandoned it for time. Aesthetics took a backseat until later in the project, and it became a challenge to style the app with existing architecture already in place.

## What lessons did your team learn as a result of your collaboration?

Incorporating design earlier on in the project is important in laying out the code.

User testing was informative, although we didn't have time to incorporate users' suggestions.
