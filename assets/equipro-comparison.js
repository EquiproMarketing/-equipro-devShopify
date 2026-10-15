(() => {
  const selectProduct = (slots, index, id, allowed) => {
    if (index < 0 || index > 2 || (id && (!allowed.includes(id) || slots.some((value, i) => i !== index && value === id)))) return slots;
    return Array.from({ length: 3 }, (_, i) => i === index ? id : slots[i] || '');
  };
  const visibleRows = (keys, items, differences) => keys.filter(key => {
    const values = items.map(item => item.specs[key]);
    if (!values.some(value => value != null && value !== '')) return false;
    return !differences || items.length < 2 || values.some(value => value == null) || new Set(values).size > 1;
  });
  if (typeof module !== 'undefined') module.exports = { selectProduct, visibleRows };
  if (typeof window === 'undefined' || customElements.get('equipro-comparison')) return;
  const element = (tag, text, attributes = {}) => {
    const node = document.createElement(tag);
    if (text != null) node.textContent = text;
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };
  customElements.define('equipro-comparison', class extends HTMLElement {
    connectedCallback() {
      if (this.ready) return;
      this.ready = true;
      this.labels = JSON.parse(this.querySelector('[data-labels]').textContent);
      this.products = JSON.parse(this.querySelector('[data-products]').textContent);
      this.dialog = this.querySelector('dialog');
      this.opener = this.querySelector('[data-open]');
      this.opener.addEventListener('click', () => this.open());
      this.querySelector('[data-close]').addEventListener('click', () => this.dialog.close());
      this.dialog.addEventListener('click', event => { if (event.target === this.dialog) { const rect = this.dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) this.dialog.close(); } });
      this.dialog.addEventListener('keydown', event => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(this.dialog.querySelectorAll('button:not(:disabled), select:not(:disabled), input:not(:disabled), a[href], [tabindex="0"]')).filter(node => node.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
      this.dialog.addEventListener('close', () => { document.documentElement.style.overflow = this.oldOverflow; this.opener.focus(); });
      this.querySelector('[data-differences]').addEventListener('change', () => this.render());
    }
    async open() {
      if (this.dialog.open) return;
      this.oldOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      this.dialog.showModal();
      try {
        if (!this.data) {
          const response = await fetch(this.dataset.source);
          if (!response.ok) throw new Error('Comparison data unavailable');
          this.data = await response.json();
        }
        this.products = this.products.filter(p => this.data.products[p.id]?.family === this.dataset.family);
        this.allowed = this.products.map(p => p.id);
        this.slots = [this.allowed.includes(this.dataset.current) ? this.dataset.current : '', '', ''];
        this.querySelector('[data-differences]').checked = false;
        this.buildSelectors();
        this.render();
      } catch {
        this.querySelector('[data-status]').textContent = this.labels.load_error;
      }
    }
    buildSelectors() {
      const area = this.querySelector('.ec-selectors');
      area.replaceChildren();
      this.selects = [];
      this.removeButtons = [];
      for (let index = 0; index < 3; index++) {
        const group = element('div', null, { class: 'ec-slot' });
        const id = `ec-${this.dataset.current}-${index}`;
        const label = element('label', `${this.labels.slot} ${index + 1}`, { for: id });
        const select = element('select', null, { id });
        select.append(element('option', this.labels.empty, { value: '' }));
        this.products.forEach(p => select.append(element('option', p.title, { value: p.id })));
        select.addEventListener('change', () => { this.slots = selectProduct(this.slots, index, select.value, this.allowed); this.render(); });
        const remove = element('button', this.labels.remove, { type: 'button', 'aria-label': `${this.labels.remove} ${this.labels.slot.toLowerCase()} ${index + 1}` });
        remove.addEventListener('click', () => { this.slots = selectProduct(this.slots, index, '', this.allowed); this.render(); select.focus(); });
        group.append(label, select, remove); area.append(group);
        this.selects.push(select); this.removeButtons.push(remove);
      }
    }
    render() {
      if (!this.slots) return;
      this.selects.forEach((select, i) => {
        select.value = this.slots[i];
        Array.from(select.options).forEach(option => { option.disabled = !!option.value && this.slots.some((id, j) => j !== i && id === option.value); });
        this.removeButtons[i].disabled = !this.slots[i];
      });
      const selected = this.slots.filter(Boolean).map(id => ({ ...this.products.find(p => p.id === id), ...this.data.products[id] }));
      this.querySelector('[data-status]').textContent = `${selected.length} / 3 ${this.labels.count}`;
      const area = this.querySelector('.ec-scroll'); area.replaceChildren();
      if (!selected.length) { area.append(element('p', this.labels.empty_state)); return; }
      const table = element('table');
      const caption = element('caption', this.labels.specifications, { class: 'ec-visually-hidden' });
      const head = element('thead'); const top = element('tr');
      top.append(element('th', this.labels.specifications, { scope: 'col' }));
      selected.forEach(p => {
        const cell = element('th', null, { scope: 'col' });
        if (p.image) cell.append(element('img', null, { src: p.image, alt: p.title, width: '160', height: '130', loading: 'lazy' }));
        cell.append(element('span', `${this.labels.model} ${p.model}`, { class: 'ec-model' }), element('h3', p.title), element('a', this.labels.page, { href: p.url }));
        top.append(cell);
      });
      head.append(top); table.append(caption, head);
      let count = 0;
      for (const [group, keys] of this.data.schemas[this.dataset.family]) {
        const rows = visibleRows(keys, selected, this.querySelector('[data-differences]').checked);
        if (!rows.length) continue;
        const body = element('tbody'); const groupRow = element('tr', null, { class: 'ec-group' });
        groupRow.append(element('th', this.labels.groups[group], { scope: 'rowgroup', colspan: String(selected.length + 1) })); body.append(groupRow);
        rows.forEach(key => {
          const row = element('tr'); row.append(element('th', this.labels.labels[key], { scope: 'row' }));
          selected.forEach(p => row.append(element('td', p.specs[key] === 'not_applicable' ? this.labels.na : p.specs[key] ?? this.labels.unknown)));
          body.append(row); count++;
        });
        table.append(body);
      }
      area.append(table);
      if (!count) area.append(element('p', this.labels.same));
    }
  });
})();
