import Ticket from './Ticket';

/** Создаёт HTML-элемент одной заявки. */
export default class TicketView {
  static formatDate(timestamp) {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  }

  static create(ticketData) {
    const ticket = new Ticket(ticketData);
    const element = document.createElement('article');
    element.className = 'ticket';
    element.dataset.id = ticket.id;

    const status = document.createElement('input');
    status.className = 'ticket-status';
    status.type = 'checkbox';
    status.checked = ticket.status;
    status.title = ticket.status ? 'Отметить как невыполненную' : 'Отметить как выполненную';
    status.setAttribute('aria-label', 'Статус заявки');

    const main = document.createElement('button');
    main.className = 'ticket-main';
    main.type = 'button';
    main.title = 'Показать или скрыть подробное описание';

    const name = document.createElement('span');
    name.className = 'ticket-name';
    name.textContent = ticket.name;

    const date = document.createElement('time');
    date.className = 'ticket-date';
    date.textContent = TicketView.formatDate(ticket.created);

    main.append(name, date);

    const actions = document.createElement('div');
    actions.className = 'ticket-actions';

    const editButton = document.createElement('button');
    editButton.className = 'icon-button edit-ticket';
    editButton.type = 'button';
    editButton.textContent = '✎';
    editButton.title = 'Редактировать заявку';
    editButton.setAttribute('aria-label', 'Редактировать заявку');

    const deleteButton = document.createElement('button');
    deleteButton.className = 'icon-button delete-ticket';
    deleteButton.type = 'button';
    deleteButton.textContent = '×';
    deleteButton.title = 'Удалить заявку';
    deleteButton.setAttribute('aria-label', 'Удалить заявку');

    actions.append(editButton, deleteButton);

    const description = document.createElement('div');
    description.className = 'ticket-description';
    description.hidden = true;

    element.append(status, main, actions, description);
    return element;
  }
}
