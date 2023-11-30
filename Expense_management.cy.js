describe('template spec', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })

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

    //Check the redirect url is ok
    it("should redirect to login page!",()=>
    {
        cy.url().should('eq', 'https://expense.aamarpay.dev/');
    });
    //test case for account panel
    it("Side bar functionality",()=>
    {
        cy.get('.bar-icon').click();
        cy.get('.bar-icon').click();
        cy.get(".sidebar-inner.slimscroll").should('be.visible',{force:true});
    })

    //test case for account functionality
    it('account panel all functionality ',()=>
    {
        cy.contains('Account').click();
        cy.contains('Account types').click();
        cy.url().should('eq','https://expense.aamarpay.dev/account/accounttype/');
        cy.get('.btn.btn-primary').scrollIntoView().click({force:true});

        cy.url().should('eq','https://expense.aamarpay.dev/account/accounttype/add/');
        cy.get('.form-control').type("Demo Account type",{delay:100});
        cy.contains('Save').click();
        cy.url().should('eq','https://expense.aamarpay.dev/account/accounttype/');
        //check that save data is visible or not
        cy.get('table')
            .contains('td','Demo Account type')
            .should('exist');
        
        

        //Can i add same data in account types
        cy.get('.btn.btn-primary').scrollIntoView().click({force:true});
        cy.get('.form-control').type("Demo Account type",{delay:100});
        cy.contains('Save').click();
        cy.get('.errorlist').should('be.visible',{force:true});
        cy.visit('https://expense.aamarpay.dev/account/accounttype/');

        //delete the data

        deleteData("Demo Account type");

        //clear the field and add new value for "save and add another" button functionality
        cy.contains("Add more").click({force:true});
        cy.get('.form-control').type("Demo Account type v2",{delay:100});
        cy.contains('Save and add another').click();
        cy.url().should('eq','https://expense.aamarpay.dev/account/accounttype/add/');
        cy.visit("https://expense.aamarpay.dev/account/accounttype/")

        //delete the data for "save and add another"     
        deleteData("Demo Account type v2");

        //clear the field and add new value for using "save and continue editing" button functionality
        cy.get(".btn.btn-primary").scrollIntoView().click({force:true});
        cy.get('.form-control').type("Demo Account type v3",{delay:100});
        cy.contains('Save and continue editing').click();
        cy.get('.historylink').should('be.visible');
        cy.visit("https://expense.aamarpay.dev/account/accounttype/")


        //clear the field and add new value for using "save and continue editing"
        deleteData("Demo Account type v3");
        cy.get('table')
        .contains('td',"unofficial")
        .parent('tr')
        .as('targetedRow')

            cy.get('@targetedRow')
            .find(".btn.btn-danger.btn-sm.rounded-0")
            .click({force:true});
        cy.wait(2000);
        cy.get(".btn.btn-outline-success").click({force:true});
        cy.url().should("eq","https://expense.aamarpay.dev/account/accounttype/");







        
    })

    //Test case for Accounts Functionality
    it.only("Check all accounts Functionality",()=>
    {

        cy.contains('Account').click();
        cy.contains('Accounts').click();
        cy.get('table').should('be.visible');
        //account data entry function
        const addAccount=(amount,name,account)=>
        {
        cy.contains('Add more').click({force:true});
        cy.get("[name='name']").type(name);
        cy.get('[name="account_no"]').type(account);
        cy.get('[name="routing_no"]').type("123");
        cy.get('[name="opening_balance"]').type(amount);
        cy.get("[name='account_type']").select('Savings');
        cy.get('.default.btn.btn-primary').click({force:true});


        }
        //add negative data assertion and check the test case
        addAccount("-2000","Test name","1232313123");
        cy.wait(1000);
        cy.get('.container-fluid.alert.alert-success').should('be.visible',{force:true});
        cy.contains('Account').click({force:true});
        deleteData("Test name")
        //add positive value and check the test case of opening account
        addAccount("3000","Test name v2","123124313");
        cy.wait(1000);
        cy.get('.container-fluid.alert.alert-success').should('be.visible',{force:true});
        
        //add account with a same name
        addAccount("4000","Test name v2","123124313");
        cy.get('.errorlist').should('exist');
        //delete the data that was made automatic
        cy.contains('Account').click({force:true});
        cy.contains('Accounts').click({force:true});
        deleteData("Test name v2")


        //GO back and check edit delete functionality
        cy.contains('Account').click({force:true});
        cy.contains("Accounts").click({force:true});
        //delete back button functionality
        cy.get("table")
        .find("tr:nth-child(1)")
        .find('td:last')
        .find('.btn.btn-danger.btn-sm.rounded-0')
        .click({force: true});
        cy.wait(1000);
        cy.get(".btn.btn-outline-success").click({force:true})
        cy.url().should("eq", "https://expense.aamarpay.dev/account/account/");


       


        




        
        







    })   
   
    
  });

  