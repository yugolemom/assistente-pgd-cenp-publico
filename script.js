(() => {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("#primary-nav");

  if (menuButton && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        navigation.classList.add("is-open");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Fechar menu");
      }
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const copyButton = document.querySelector("[data-copy-target]");
  const copyStatus = document.querySelector("#copy-status");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const target = document.querySelector(copyButton.getAttribute("data-copy-target"));
      if (!target) return;

      const text = target.innerText.trim();
      let copied = false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          copied = true;
        } else {
          const temporary = document.createElement("textarea");
          temporary.value = text;
          temporary.setAttribute("readonly", "");
          temporary.style.position = "fixed";
          temporary.style.opacity = "0";
          document.body.appendChild(temporary);
          temporary.select();
          copied = document.execCommand("copy");
          temporary.remove();
        }
      } catch (error) {
        copied = false;
      }

      if (copyStatus) {
        copyStatus.textContent = copied
          ? "Mensagem copiada. Agora é só colar na conversa do assistente."
          : "Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.";
      }
    });
  }
})();