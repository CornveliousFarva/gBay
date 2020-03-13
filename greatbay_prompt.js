const inquirer = require('inquirer');

function getAction() {
  return inquirer
    .prompt([
      {
        // Prompt for role
        type: 'checkbox',
        message: 'What would you like to bid on?',
        name: 'action',
        choices: ['items', 'tasks', 'jobs', 'projects']
      }
    ])
    .then(function(userChoice) {
      // console.log(userChoice);
      if (userChoice.action == 'items') {
        inquirer.prompt([
          {
            // Captures the Engineer name
            type: 'input',
            name: 'itemName',
            message: 'What item would you like to bid on?'
          }
        ]);
        // .then(function() {
        //   //   // console.log("engineerInfo", engineerInfo);
        //   //   const item = new Item(items.itemName);
        //   //   data.push(items);

        // });
      }
    });
}
// Prompt for team manager
getAction();
