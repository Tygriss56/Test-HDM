To implement these features, I first reviewed the existing code. I decided to create a handleCreate method that allows creating a task through a prompt where the user can enter the task name. I encountered an issue where, after entering the name, no new task was being created. To debug this, I used console.log statements and found that the issue was with the request not being sent correctly.

For modifying a task, I decided that the user should simply click on the task's text, edit it, and change the name to modify the task. This approach simplifies the task editing process and makes the interaction more intuitive.

For deleting a task, I simply linked the delete button to the corresponding functionality in the code, ensuring that it triggers the request to remove the task when clicked.