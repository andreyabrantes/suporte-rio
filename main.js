/* =========================================================
   Suporte Informática — main.js
   Menu mobile, header dinâmico, scroll suave,
   link ativo, reveal on scroll, back-to-top e validação do form.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Configuração ---------- */
  // A chave do Web3Forms (https://web3forms.com) NÃO fica neste arquivo.
  // Ela é carregada de config.js (que está no .gitignore) via window.APP_CONFIG.
  // Em produção, o config.js precisa ser enviado junto com os demais arquivos.
  const APP_CONFIG = window.APP_CONFIG || {};
  const WEB3FORMS_KEY = APP_CONFIG.web3formsKey || "";
  const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  /* ---------- Helpers ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 1. Header dinâmico (scroll) ---------- */
  const header = $("#header");
  const toTop  = $("#toTop");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle("is-scrolled", y > 12);
    if (toTop)  toTop.classList.toggle("is-visible", y > 500);

    updateActiveLink();
  }

  /* ---------- 2. Menu mobile ---------- */
  const nav       = $("#nav");
  const navToggle = $("#navToggle");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }

  function toggleNav() {
    if (!nav || !navToggle) return;
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }

  // Fecha o menu ao clicar em um link
  $$(".nav__link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (!nav || !navToggle) return;
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(e.target) || navToggle.contains(e.target)) return;
    closeNav();
  });

  // Fecha o menu com a tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  // Reseta o menu ao voltar para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeNav();
  });

  /* ---------- 3. Scroll suave para âncoras ---------- */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
      });

      // Atualiza a URL sem "pular"
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  /* ---------- 4. Link ativo conforme a seção visível ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__link");

  function updateActiveLink() {
    if (!sections.length || !navLinks.length) return;

    const offset = (header ? header.offsetHeight : 0) + 40;
    const pos = (window.scrollY || window.pageYOffset) + offset;

    let currentId = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= pos) currentId = section.id;
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("is-active", isActive);
    });
  }

  /* ---------- 5. Reveal on scroll ---------- */
  const revealEls = $$(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 6. Back to top ---------- */
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 7. Validação do formulário ---------- */
  const form = $("#contactForm");
  const successMsg = $("#formSuccess");
  const errorMsg = $("#formError");

  const validators = {
    name(value) {
      if (!value.trim()) return "Informe o seu nome.";
      if (value.trim().length < 3) return "O nome deve ter ao menos 3 caracteres.";
      return "";
    },
    email(value) {
      if (!value.trim()) return "Informe o seu e-mail.";
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!re.test(value.trim())) return "Informe um e-mail válido.";
      return "";
    },
    phone(value) {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "Informe o seu telefone com DDD.";
      if (digits.length < 11) return "Informe o DDD + 9 dígitos (ex.: 21 97737-7664).";
      if (digits.length > 11) return "O telefone deve ter DDD + 9 dígitos.";
      if (digits[2] !== "9") return "O número deve começar com 9 após o DDD.";
      return "";
    },
    subject(value) {
      if (!value.trim()) return "Informe o assunto.";
      return "";
    },
    message(value) {
      if (!value.trim()) return "Escreva a sua mensagem.";
      if (value.trim().length < 10) return "A mensagem deve ter ao menos 10 caracteres.";
      return "";
    },
  };

  function setFieldError(field, message) {
    const wrapper = field.closest(".field");
    const errorEl = wrapper ? $(".field__error", wrapper) : null;

    if (wrapper) wrapper.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }

  function validateField(field) {
    const validator = validators[field.name];
    if (!validator) return true;

    const message = validator(field.value);
    setFieldError(field, message);
    return !message;
  }

  if (form) {
    const fields = $$("input, textarea", form).filter((f) => validators[f.name]);

    // Máscara do telefone: (DD) 9XXXX-XXXX
    const phoneField = $("#phone", form);
    if (phoneField) {
      phoneField.addEventListener("input", () => {
        let d = phoneField.value.replace(/\D/g, "").slice(0, 11);
        let out = "";
        if (d.length > 0) out = "(" + d.slice(0, 2);
        if (d.length >= 3) out += ") " + d.slice(2, 7);
        if (d.length >= 8) out += "-" + d.slice(7, 11);
        phoneField.value = out;
      });
    }

    // Validação em tempo real após o primeiro erro
    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        const wrapper = field.closest(".field");
        if (wrapper && wrapper.classList.contains("has-error")) validateField(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      let firstInvalid = null;

      fields.forEach((field) => {
        const ok = validateField(field);
        if (!ok && !firstInvalid) firstInvalid = field;
        isValid = isValid && ok;
      });

      if (!isValid) {
        if (successMsg) successMsg.hidden = true;
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Verifica se a chave do Web3Forms foi carregada (config.js)
      if (!WEB3FORMS_KEY) {
        if (errorMsg) {
          errorMsg.textContent =
            "Formulário temporariamente indisponível. Fale conosco pelo WhatsApp (21) 97737-7664.";
          errorMsg.hidden = false;
        }
        console.error(
          "[Formulário] Chave do Web3Forms ausente. Verifique se config.js foi carregado antes de main.js."
        );
        return;
      }

      // Envio via Web3Forms (sem backend)
      const submitBtn = $('button[type="submit"]', form);
      const originalBtnText = submitBtn ? submitBtn.textContent : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }
      if (successMsg) successMsg.hidden = true;
      if (errorMsg) errorMsg.hidden = true;

      const data = {
        name: ($("#name", form) || {}).value || "",
        email: ($("#email", form) || {}).value || "",
        phone: ($("#phone", form) || {}).value || "",
        subject: ($("#subject", form) || {}).value || "",
        message: ($("#message", form) || {}).value || "",
      };

      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `Solicitação de orçamento — ${data.subject.trim()}`,
        from_name: "Site Suporte Informática",
        name: data.name.trim(),
        email: data.email.trim(),
        telefone: data.phone.trim(),
        assunto: data.subject.trim(),
        message: data.message.trim(),
        botcheck: false,
      };

      fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          let result = null;
          try {
            result = await response.json();
          } catch (_) {
            result = null;
          }
          if (!response.ok || !result || !result.success) {
            const reason =
              (result && (result.message || result.error)) ||
              `HTTP ${response.status} ${response.statusText}`;
            throw new Error(reason);
          }
          return result;
        })
        .then(() => {
          form.reset();
          fields.forEach((field) => setFieldError(field, ""));
          if (successMsg) {
            successMsg.hidden = false;
            successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .catch((err) => {
          // Log detalhado para diagnóstico no console do navegador
          console.error("[Formulário] Falha no envio:", err && err.message ? err.message : err);
          if (errorMsg) {
            errorMsg.hidden = false;
            errorMsg.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText || "Enviar solicitação";
          }
        });
    });
  }

  /* ---------- 8. Ano dinâmico no rodapé (se existir) ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 9. Init ---------- */
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onScroll);
  onScroll();
})();
