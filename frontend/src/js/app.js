import HelpDesk from './HelpDesk';
import TicketService from './TicketService';
import API_URL from './config';

const root = document.getElementById('root');

const ticketService = new TicketService(API_URL);
const app = new HelpDesk(root, ticketService);

app.init();
