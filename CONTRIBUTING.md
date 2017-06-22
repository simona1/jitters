
- Will individuals work on their own forks? (recommended)
Yes

- Will there be a development branch cut off of master off of which feature branches will be cut, or, will feature branches simply be cut off of master?
We will have a development and a master branch;
We will keep master as the latest working version
Will cut off branches off of development to work on individually

- What are the guidelines for making a PR? Here's a recommended flow:
  We will use the recommended workflow with dev branch
When you are ready to submit a PR, do an interactive rebase on your branch to clean up your commit history as needed
Checkout master (or dev depending on your team's workflow) and pull down from upstream to make sure your local master (or dev) has the latest work
Checkout your feature branch again and rebase it onto the now-up-to-date master (or dev)
Push your feature branch up to origin
Submit a PR from origin's feature branch into upstream's master (or dev)

- Will all team members have the right to merge PRs?
Members can merge PRs to dev, one team member will merge PRs to master; will gather together as a team to do it and will do it on a single computer.

- What kinds of communications are required to indicate a PR is ready, or has been merged?
Verbal and slack 
Get together at the end of the day for more details

- Will there be a review process prior to accepting PRs?
Tests passing (minimum)

- What are the requirements for writing and passing tests in order for a PR to be accepted?
----------------------to be specified later

- If working off of a dev branch, what is the plan for merging it into master?
End of the day as a group if in working condition

- How should the repo's issues be utilized specifically
Anything that needs to be done - create an issue and assign to team member
