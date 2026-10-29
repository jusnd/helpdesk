/** Модальные окна создания, редактирования и удаления заявки. */
export default class TicketForm {
  static open({ title, name = '', description = '', submitText = 'Сохранить', onSubmit }) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal-close" type="button" aria-label="Закрыть">×</button>
        <h2 id="modal-title"></h2>
        <form class="ticket-form">
          <label>
            Краткое описание
            <input name="name" type="text" maxlength="200" required autofocus>
          </label>
          <label>
            Подробное описание
            <textarea name="description" rows="5"></textarea>
          </label>
          <p class="form-error" role="alert" hidden></p>
          <div class="modal-actions">
            <button class="button button-secondary cancel-modal" type="button">Отмена</button>
            <button class="button submit-form" type="submit"></button>
          </div>
        </form>
      </section>
    `;

    const form = overlay.querySelector('.ticket-form');
    const errorElement = overlay.querySelector('.form-error');
    const submitButton = overlay.querySelector('.submit-form');
    overlay.querySelector('h2').textContent = title;
    overlay.querySelector('[name="name"]').value = name;
    overlay.querySelector('[name="description"]').value = description;
    submitButton.textContent = submitText;

    let onKeyDown;
    const close = () => {
      overlay.remove();
      document.removeEventListener('keydown', onKeyDown);
    };

    onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };

    overlay.querySelector('.modal-close').addEventListener('click', close);
    overlay.querySelector('.cancel-modal').addEventListener('click', close);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close();
    });
    document.addEventListener('keydown', onKeyDown);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      errorElement.hidden = true;
      submitButton.disabled = true;
      submitButton.textContent = 'Сохранение...';

      try {
        await onSubmit({
          name: form.elements.name.value.trim(),
          description: form.elements.description.value.trim(),
        });
        close();
      } catch (error) {
        errorElement.textContent = error.message;
        errorElement.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = submitText;
      }
    });

    document.body.append(overlay);
    overlay.querySelector('[name="name"]').focus();
  }

  static confirmDelete(ticketName, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <section class="modal modal-small" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title">Удалить заявку?</h2>
        <p class="delete-text"></p>
        <p class="form-error" role="alert" hidden></p>
        <div class="modal-actions">
          <button class="button button-secondary cancel-modal" type="button">Отмена</button>
          <button class="button button-danger confirm-delete" type="button">Удалить</button>
        </div>
      </section>
    `;

    overlay.querySelector(
      '.delete-text',
    ).textContent = `Заявка «${ticketName}» будет удалена без возможности восстановления.`;
    const errorElement = overlay.querySelector('.form-error');
    const confirmButton = overlay.querySelector('.confirm-delete');
    const close = () => overlay.remove();

    overlay.querySelector('.cancel-modal').addEventListener('click', close);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close();
    });

    confirmButton.addEventListener('click', async () => {
      confirmButton.disabled = true;
      confirmButton.textContent = 'Удаление...';
      errorElement.hidden = true;

      try {
        await onConfirm();
        close();
      } catch (error) {
        errorElement.textContent = error.message;
        errorElement.hidden = false;
        confirmButton.disabled = false;
        confirmButton.textContent = 'Удалить';
      }
    });

    document.body.append(overlay);
    confirmButton.focus();
  }
}
