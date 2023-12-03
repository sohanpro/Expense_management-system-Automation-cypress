require('cypress-xpath');



describe('template spec', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      });
      //add function
      const addValue=(name,description)=>
        {
        cy.contains('Add more').click({force:true});
        cy.get("[name='name']").type(name);
        cy.get("[name='description']").eq(1).type(description,{force:true})
        cy.get('.default.btn.btn-primary').click({force:true});
            

        }

        //delete the data function
      const deleteData =(data)=>
      {
          cy.get('table')
      .contains('td',data)
      .parent('tr')
      .as('targetedRow')

          cy.get('@targetedRow')
          .find(".btn.btn-danger.btn-sm.rounded-0")
          .click({force:true});
      cy.wait(2000);
      cy.get('.btn.btn-outline-danger').click();
      }
      const editAccountData = (data,balance)=>
      {
        cy.visit("https://expense.aamarpay.dev/account/account/")
        cy.get('table')
      .contains('td',data)
      .parent('tr')
      .as('targetedRow')

          cy.get('@targetedRow')
          .find(".btn.btn-success.btn-sm.rounded-0")
          .click({force:true});
      cy.wait(2000);
      cy.get("[name='opening_balance']").clear();
      cy.get("[name='opening_balance']").type(balance);
      cy.get('.default.btn.btn-primary').click();
      }

      //add expense function
      const addExpense =(type,user,cost)=>
      {
        cy.contains('Add more').click({force:true});
        cy.get("[name='category']").select(type,{force:true});
        cy.get("[name='account']").select(user,{force:true});
        cy.get("[name='title']").type("make a saving to HR",{force:true});
        cy.get("[name='description']").eq(1).type("test description",{force:true});
        cy.get("[name='cost']").type(cost,{force:true})

      }

      beforeEach(() => {
        //test case for wrong and right credential
        cy.visit('https://expense.aamarpay.dev/login/',{force:true});
        cy.get('#id_username').type("falseinput@aamrapay.com") ;
        cy.get('#id_password').type("123456789");  
        cy.get('.btn.btn-primary').click({force:true});
        cy.get('.errornote').should('be.visible',{force:true});
        cy.get('#id_username').type("admin@aamarpay.com") ;
        cy.get('#id_password').type("aamarpay@2020");  
        cy.get('.btn.btn-primary').click({force:true});
        });
        it("Check category functionality",()=>
        {
            //Check the categorys functionality 
            cy.xpath("//span[normalize-space()='Expense']").click();
            cy.contains("Categorys").click();
            cy.url().should("eq","https://expense.aamarpay.dev/expense/category/");
            cy.get("table").should("exist");
            //Check the add functionality 
            addValue("demo Catagory","THis is demo category")
            //delete the data that automation created 
            deleteData("demo Catagory");
            //test case for duplicate categorys creation
            addValue("duplicate","duplicate category");
            addValue("duplicate","duplicate category");
            cy.get(".errorlist").should("be.visible");
            deleteData("duplicate");
            
        })

        it.only("check expenses functionality",()=>
    {
       const new_balance = "10000";
        editAccountData("Md Shawkat Hossain Sohan",new_balance);
        cy.xpath("//span[normalize-space()='Expense']").click();
        cy.contains("Expenses").click();
        cy.url().should("eq","https://expense.aamarpay.dev/expense/expense/");
        cy.get("table").should('exist');
        //add expenses
        addExpense("Meal","Md Shawkat Hossain Sohan","5000");
        
        cy.get('.default.btn.btn-primary').click({force:true});
        cy.visit("https://expense.aamarpay.dev/account/account/")
        cy.contains('table tr', 'Md Shawkat Hossain Sohan') // Find the row containing the specified text
  .find('td:nth-child(6)') // Find the fifth td element within that row
  .should('contain', '5000'); // Assert that the content of the fifth td is '5000'

      
        
      





    })

    


        });
