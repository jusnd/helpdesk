import createRequest from './api/createRequest';

/** Класс для связи с сервером HelpDesk. */
export default class TicketService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  list() {
    return createRequest({
      url: `${this.baseUrl}/?method=allTickets`,
    });
  }

  get(id) {
    return createRequest({
      url: `${this.baseUrl}/?method=ticketById&id=${encodeURIComponent(id)}`,
    });
  }

  create(data) {
    return createRequest({
      url: `${this.baseUrl}/?method=createTicket`,
      method: 'POST',
      data,
    });
  }

  update(id, data) {
    return createRequest({
      url: `${this.baseUrl}/?method=updateById&id=${encodeURIComponent(id)}`,
      method: 'POST',
      data,
    });
  }

  delete(id) {
    return createRequest({
      url: `${this.baseUrl}/?method=deleteById&id=${encodeURIComponent(id)}`,
    });
  }
}
