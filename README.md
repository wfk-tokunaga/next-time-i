# Next Time I
A user friendly application that allows users to list activities and then add reminders (notes) for the next time they partake in that activity. 
The Next Time I app lets users see other user's activities and notes, and even follow others to more easily see thier profile.

## User Story 

As a USER interested in learning more from previous mistakes, 
I WANT  to have an easy way to take notes and organize reminders for the next time I partake in an activity,
SO THAT I can repeat that activity and not repeat my mistake.

GIVEN a homepage with an input form,
When I type an activity into the input and click the submit button, 
the activity is then ADDED to the homepage and my personal profile. I am also presented with the complete timeline of all activities other users have listed.
 
When I CLICK ON ANOTHER USER'S USERNAME, I am redirected to their profile, where I can see their activities and also follow them by CLICKING ON THE FOLLOW BUTTON.
When I follow them, their profile shows up on the homepage so I can more easily access their profile in the future.

## What We Did 
I built an application with a web responsive polished UI that allows users to list activites and notes for each activity, see the activity of other users, and follow other users.

## How We Did It 
Creating a back-end consisting of a MongoDB server, Mongoose. To authenticate users, I used JSON Web Tokens (JWTs) and the NodeJS jwt-decode module. 
Additionally, I used React, HTML, and CSS to create a mobile-first responsive front-end design. 

## Demo
** Below is a short demo of our application.

https://drive.google.com/file/d/1Nwdr9ZQlVR6NcphEoZtfdP0dWTma_UU-/view 

## Future Development
The Next Time I team has several plans for future development. The main one being able to create private activities and also clone the activities of other users.

## Here is a link to the live deployed site:
https://quiet-plains-95041.herokuapp.com/ 