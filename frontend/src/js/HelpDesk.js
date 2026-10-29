import TicketForm from './TicketForm';
import TicketView from './TicketView';

/** Основной класс приложения. */
export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    this.container.innerHTML = `
      <main class="helpdesk">
        <header class="helpdesk-header">
          <div>
            <p class="eyebrow">Сервис управления заявками</p>
            <h1>HelpDesk</h1>
          </div>
          <button class="button add-ticket" type="button">+ Добавить тикет</button>
        </header>
        <p class="app-error" role="alert" hidden></p>
        <div class="loader" role="status" hidden>
          <span class="spinner" aria-hidden="true"></span>
          Загрузка заявок...
        </div>
        <section class="ticket-list" aria-label="Список заявок"></section>
        <p class="empty-list" hidden>Заявок пока нет. Добавьте первую!</p>
      </main>
    `;

    this.listElement = this.container.querySelector('.ticket-list');
    this.loaderElement = this.container.querySelector('.loader');
    this.emptyElement = this.container.querySelector('.empty-list');
    this.errorElement = this.container.querySelector('.app-error');

    this.container.querySelector('.add-ticket').addEventListener('click', () => this.openCreateForm());
    this.listElement.addEventListener('click', (event) => this.onListClick(event));
    this.listElement.addEventListener('change', (event) => this.onStatusChange(event));

    this.loadTickets();
  }

  async loadTickets() {
    this.loaderElement.hidden = false;
    this.emptyElement.hidden = true;
    this.errorElement.hidden = true;

    try {
      const tickets = await this.ticketService.list();
      this.listElement.replaceChildren(...tickets.map((ticket) => TicketView.create(ticket)));
      this.emptyElement.hidden = tickets.length > 0;
    } catch (error) {
      this.showError(`Не удалось загрузить заявки. Проверьте, запущен ли сервер. ${error.message}`);
    } finally {
      this.loaderElement.hidden = true;
    }
  }

  openCreateForm() {
    TicketForm.open({
      title: 'Добавить тикет',
      submitText: 'Создать',
      onSubmit: async (data) => {
        await this.ticketService.create({ ...data, status: false });
        await this.loadTickets();
      },
    });
  }

  async openEditForm(ticketElement) {
    const { id } = ticketElement.dataset;

    try {
      const ticket = await this.ticketService.get(id);
      TicketForm.open({
        title: 'Редактировать тикет',
        name: ticket.name,
        description: ticket.description,
        onSubmit: async (data) => {
          await this.ticketService.update(id, { ...data, status: ticket.status });
          await this.loadTickets();
        },
      });
    } catch (error) {
      this.showError(error.message);
    }
  }

  openDeleteConfirmation(ticketElement) {
    const { id } = ticketElement.dataset;
    const name = ticketElement.querySelector('.ticket-name').textContent;

    TicketForm.confirmDelete(name, async () => {
      await this.ticketService.delete(id);
      await this.loadTickets();
    });
  }

  async toggleDescription(ticketElement) {
    const descriptionElement = ticketElement.querySelector('.ticket-description');

    if (!descriptionElement.hidden) {
      descriptionElement.hidden = true;
      return;
    }

    descriptionElement.hidden = false;

    if (descriptionElement.dataset.loaded === 'true') return;

    descriptionElement.textContent = 'Загрузка описания...';

    try {
      const ticket = await this.ticketService.get(ticketElement.dataset.id);
      descriptionElement.textContent = ticket.description || 'Подробное описание не заполнено.';
      descriptionElement.dataset.loaded = 'true';
    } catch (error) {
      descriptionElement.hidden = true;
      this.showError(error.message);
    }
  }

  async onListClick(event) {
    const ticketElement = event.target.closest('.ticket');
    if (!ticketElement) return;

    if (event.target.closest('.edit-ticket')) {
      await this.openEditForm(ticketElement);
    } else if (event.target.closest('.delete-ticket')) {
      this.openDeleteConfirmation(ticketElement);
    } else if (event.target.closest('.ticket-main')) {
      await this.toggleDescription(ticketElement);
    }
  }

  async onStatusChange(event) {
    if (!event.target.classList.contains('ticket-status')) return;

    const checkbox = event.target;
    const ticketElement = checkbox.closest('.ticket');
    const previousStatus = !checkbox.checked;
    checkbox.disabled = true;

    try {
      await this.ticketService.update(ticketElement.dataset.id, { status: checkbox.checked });
    } catch (error) {
      checkbox.checked = previousStatus;
      this.showError(error.message);
    } finally {
      checkbox.disabled = false;
    }
  }

  showError(message) {
    clearTimeout(this.errorTimeout);
    this.errorElement.textContent = message;
    this.errorElement.hidden = false;
    this.errorTimeout = setTimeout(() => {
      this.errorElement.hidden = true;
    }, 7000);
  }
}
