(() => {
  function initialize() {
    document.querySelectorAll('[data-find-your-setup]').forEach(section => {
      if (section.dataset.setupReady) return;
      const tabs = [...section.querySelectorAll('[role="tab"]')];
      const panels = [...section.querySelectorAll('[role="tabpanel"]')];
      const wrapper = section.querySelector('.spa-pack-pill-wrapper');
      const activate = (tab, focus = false) => {
        tabs.forEach(item => {
          const active = item === tab;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-selected', String(active));
          item.tabIndex = active ? 0 : -1;
        });
        panels.forEach(panel => {
          const active = panel.id === tab.getAttribute('aria-controls');
          panel.hidden = !active;
          panel.classList.toggle('is-active', active);
        });
        if (focus) tab.focus({ preventScroll: true });
        if (wrapper.scrollWidth > wrapper.clientWidth) {
          const bounds = wrapper.getBoundingClientRect(), rect = tab.getBoundingClientRect();
          const delta = rect.left < bounds.left + 4 ? rect.left - bounds.left - 4 : rect.right > bounds.right - 4 ? rect.right - bounds.right + 4 : 0;
          if (delta) wrapper.scrollTo({ left: wrapper.scrollLeft + delta, behavior: 'instant' });
        }
      };
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activate(tab));
        tab.addEventListener('focus', () => activate(tab));
        tab.addEventListener('keydown', event => {
          const rtl = getComputedStyle(section).direction === 'rtl';
          let target;
          if (event.key === 'ArrowRight') target = (index + (rtl ? -1 : 1) + tabs.length) % tabs.length;
          if (event.key === 'ArrowLeft') target = (index + (rtl ? 1 : -1) + tabs.length) % tabs.length;
          if (event.key === 'Home') target = 0;
          if (event.key === 'End') target = tabs.length - 1;
          if (target === undefined) return;
          event.preventDefault();
          activate(tabs[target], true);
        });
      });
      section.querySelector('[data-setup-skip]').addEventListener('click', () => {
        activate(section.querySelector('[data-setup-all]'));
        section.querySelector('.find-your-setup__destination').focus({ preventScroll: true });
      });
      section.dataset.setupReady = 'true';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
  document.addEventListener('shopify:section:load', initialize);
})();
