const ContactController = require("../controllers/ContactController");
const sequelize = require("../db/models/index").sequelize;

describe("ContactController",()=>{

  //We need new ContactController instance for every test
  beforeEach((done) => {
     this.book = new ContactController();

     //Before each test, we need to clear the test entries created
     sequelize.sync({force: true}).then((res) => {
       //This is an async operation, we need to call done to indicate that the test is completed
       done();
     })
     .catch((err) => {
       done();
     });
  });

  it("should be defined",()=>{
    expect(ContactController).toBeDefined();
  });

  describe("#addContact()", () => {

    it("should add a single contact into the book", (done) => {
      this.book.addContact("Alice", "001-101-1010","abcbloc@gmail.com")
      .then((contact) => {

      expect(contact.name).toBe("Alice");
      expect(contact.phone).toBe("001-101-1010");
      expect(contact.email).toBe("abcbloc@gmail.com");
      done();
      })
      .catch((err) => {
        done();
      });
    });
  });
});
