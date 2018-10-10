const inquirer = require('inquirer');
const ContactController = require("./ContactController");

 module.exports = class MenuController {
   constructor(){
     this.mainMenuQuestions = [
      {
       type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "Log current date and time",
          "Exit"
        ]
      }
    ];
    this.book = new ContactController();
   }

   main(){
     console.log(`Welcome to AddressBloc!`);
     inquirer.prompt(this.mainMenuQuestions).then((response) => {
       switch(response.mainMenuChoice){
         case "Add new contact":
           this.addContact();
           break;
         case "Log current date and time":
           this.getDate();
           break;
         case "Exit":
           this.exit();
         default:
           console.log("Invalid input");
           this.main();
       }
     })
     .catch((err) => {
       console.log(err);
     });
   }

   clear(){
     console.log("\x1Bc");
   }

   addContact(){
     this.clear();
     inquirer.prompt(this.book.addContactQuestions).then((answers) => {
      this.book.addContact(answers.name, answers.phone).then((contact) => {
        console.log("Contact added successfully!");
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
      });
     });
   }

   getDate(){
     var dt = new Date();
     var date = dt.toDateString();
     var time = dt.toLocaleTimeString();
     console.log(`Date: ${date} Time: ${time}`);
     this.main();
   }

   exit(){
     console.log("Thanks for using AddressBloc!");
     process.exit();//how to exit in Node.js. We are calling the global process object's exit method.
   }

   getContactCount(){
     return this.contacts.length;
   }
 }
