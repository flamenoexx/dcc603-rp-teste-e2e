describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca todas as tarefas como concluídas com o toggle-all', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
        .type('Estudar Cypress{enter}')
        .type('Finalizar projeto de ES{enter}')
        .type('Enviar relatório{enter}');

    cy.get('[data-cy=toggle-all]')
        .click();

    cy.get('[data-cy=todos-list] > li')
        .each((item) => {
          cy.wrap(item).should('have.class', 'completed');
        });
  });

  it('Edita o texto de uma tarefa já criada', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
        .type('Texto antigo{enter}');

    cy.get('[data-cy=todos-list] li')
        .first()
        .find('label')
        .dblclick();

    cy.get('[data-cy=todos-list] li')
        .first()
        .find('.edit')
        .clear()
        .type('Texto atualizado{enter}');

    cy.get('[data-cy=todos-list] li')
        .first()
        .should('contain.text', 'Texto atualizado');
  });

  it('Limpa somente as tarefas que estão concluídas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
        .type('Tarefa completa 1{enter}')
        .type('Tarefa ativa{enter}')
        .type('Tarefa completa 2{enter}');

    cy.get('[data-cy=todos-list] li')
        .first()
        .find('[data-cy=toggle-todo-checkbox]')
        .click();

    cy.get('[data-cy=todos-list] li')
        .last()
        .find('[data-cy=toggle-todo-checkbox]')
        .click();

    cy.get('.clear-completed')
        .click();

    cy.get('[data-cy=todos-list] li')
        .should('have.length', 1)
        .and('contain.text', 'Tarefa ativa');
  });

});