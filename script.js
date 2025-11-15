// Função de adicionar ao carrinho (salvando no localStorage)
document.addEventListener("click", e => {
  if (e.target.classList.contains("add-carrinho")) {
    const nome = e.target.dataset.nome;
    const preco = parseFloat(e.target.dataset.preco);
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({ nome, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nome} adicionado ao carrinho!`);
  }
});

// Página de carrinho
if (document.getElementById("lista-carrinho")) {
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");
  const limparBtn = document.getElementById("limpar");
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  function atualizarCarrinho() {
    lista.innerHTML = carrinho.map((item, i) =>
      `<li>${item.nome} - R$ ${item.preco.toFixed(2)} 
       <button onclick="remover(${i})">❌</button></li>`
    ).join("");
    const total = carrinho.reduce((s, i) => s + i.preco, 0);
    totalSpan.textContent = total.toFixed(2);
  }

  window.remover = i => {
    carrinho.splice(i, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
  }

  limparBtn.onclick = () => {
    localStorage.removeItem("carrinho");
    carrinho = [];
    atualizarCarrinho();
  }

  atualizarCarrinho();
}
