/* ==========================================================================
   StockPro — Lógica da aplicação
   Armazenamento: localStorage (protótipo, sem back-end)
   ========================================================================== */
(() => {
    'use strict';

    /* ------------------------------------------------------------------ *
     * 1. Constantes e utilitários
     * ------------------------------------------------------------------ */
    const STORAGE_KEY = 'stockpro:dados:v1';
    const SESSION_KEY = 'stockpro:sessao:v1';

    // Credenciais de demonstração. Em produção, a autenticação deve ser feita no servidor.
    const USUARIO_DEMO = {
        email: 'admin@stockpro.com',
        senha: '123456',
        nome: 'Administrador',
        cargo: 'Administrador'
    };

    const PAGINAS = {
        dashboard: 'Dashboard',
        produtos: 'Produtos',
        estoque: 'Estoque',
        movimentacoes: 'Movimentações',
        fornecedores: 'Fornecedores',
        relatorios: 'Relatórios',
        configuracoes: 'Configurações'
    };

    const ICONES = {
        check: '<path d="M20 6L9 17l-5-5"/>',
        dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
        box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3.3 7.5L12 12.5l8.7-5"/><path d="M12 22V12.5"/>',
        layers: '<path d="M12 2l10 5-10 5L2 7l10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
        repeat: '<path d="M17 3l4 4-4 4"/><path d="M3 11V9a2 2 0 0 1 2-2h16"/><path d="M7 21l-4-4 4-4"/><path d="M21 13v2a2 2 0 0 1-2 2H3"/>',
        truck: '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
        chart: '<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>',
        sliders: '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>',
        logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
        menu: '<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
        search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>',
        plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
        edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
        trash: '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
        eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
        eyeOff: '<path d="M17.9 17.9A10.1 10.1 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.1-5.9"/><path d="M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2"/><path d="M1 1l22 22"/>',
        dollar: '<path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
        alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
        arrowDown: '<circle cx="12" cy="12" r="10"/><path d="M8 12l4 4 4-4"/><path d="M12 8v8"/>',
        arrowUp: '<circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4"/><path d="M12 16V8"/>',
        file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
        camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
        image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
        checkCircle: '<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4L12 14l-3-3"/>',
        info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
    };

    const $ = (id) => document.getElementById(id);
    const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));

    const icone = (nome) =>
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONES[nome] || ''}</svg>`;

    function hidratarIcones(raiz = document) {
        $$('[data-icon]', raiz).forEach((el) => { el.innerHTML = icone(el.dataset.icon); });
    }

    // Escapa texto antes de inserir em innerHTML (evita XSS)
    const escapar = (valor) =>
        String(valor ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const normalizar = (texto) =>
        String(texto ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    const formatarMoeda = (valor) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(valor) || 0);

    const formatarNumero = (valor) => new Intl.NumberFormat('pt-BR').format(Number(valor) || 0);

    const formatarDataHora = (iso) => {
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return '—';
        return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const gerarId = () =>
        (window.crypto && typeof crypto.randomUUID === 'function')
            ? crypto.randomUUID()
            : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

    const soDigitos = (v) => String(v ?? '').replace(/\D/g, '');

    function mascaraCNPJ(valor) {
        return soDigitos(valor).slice(0, 14)
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }

    function mascaraTelefone(valor) {
        const d = soDigitos(valor).slice(0, 11);
        if (d.length > 10) return d.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        if (d.length > 6) return d.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        if (d.length > 2) return d.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        if (d.length > 0) return `(${d}`;
        return '';
    }

    function aplicarMascara(input, fn) {
        input.addEventListener('input', () => { input.value = fn(input.value); });
    }

    /* ------------------------------------------------------------------ *
     * 2. Estado e persistência
     * ------------------------------------------------------------------ */
    const configPadrao = () => ({
        empresaNome: '',
        empresaCNPJ: '',
        empresaTelefone: '',
        empresaEmail: '',
        empresaEndereco: '',
        alertaEstoque: true
    });

    const estadoVazio = () => ({
        versao: 1,
        semeado: true,
        produtos: [],
        fornecedores: [],
        movimentacoes: [],
        config: configPadrao()
    });

    function dataRelativa(diasAtras, hora = 10) {
        const d = new Date();
        d.setDate(d.getDate() - diasAtras);
        d.setHours(hora, 0, 0, 0);
        return d.toISOString();
    }

    // Dados de exemplo exibidos apenas na primeira abertura
    function criarDadosDemo() {
        const estado = estadoVazio();
        const f1 = { id: gerarId(), empresa: 'TechDistribuidora Ltda', cnpj: '12.345.678/0001-90', telefone: '(81) 3333-4455', email: 'vendas@techdistribuidora.com.br', responsavel: 'Mariana Costa', observacao: 'Prazo de entrega: 3 dias úteis.' };
        const f2 = { id: gerarId(), empresa: 'Papelaria Central S.A.', cnpj: '98.765.432/0001-10', telefone: '(81) 99876-5432', email: 'comercial@papelariacentral.com.br', responsavel: 'Roberto Lima', observacao: 'Desconto de 5% em compras acima de R$ 2.000.' };
        estado.fornecedores.push(f1, f2);

        const itens = [
            { nome: 'Notebook Dell Inspiron 15', sku: 'NT001', categoria: 'Informática', estoque: 12, minimo: 5, custo: 3200, fornecedorId: f1.id, saida: 3 },
            { nome: 'Mouse sem fio MS210', sku: 'MS210', categoria: 'Informática', estoque: 3, minimo: 10, custo: 45.9, fornecedorId: f1.id, saida: 17 },
            { nome: 'Teclado mecânico TC330', sku: 'TC330', categoria: 'Informática', estoque: 0, minimo: 5, custo: 189, fornecedorId: f1.id, saida: 8 },
            { nome: 'Resma de papel A4 500 folhas', sku: 'PP500', categoria: 'Papelaria', estoque: 80, minimo: 20, custo: 24.5, fornecedorId: f2.id, saida: 20 },
            { nome: 'Caneta esferográfica azul (cx 50)', sku: 'PP120', categoria: 'Papelaria', estoque: 150, minimo: 50, custo: 1.2, fornecedorId: f2.id, saida: 50 },
            { nome: 'Cadeira ergonômica MB900', sku: 'MB900', categoria: 'Mobiliário', estoque: 7, minimo: 3, custo: 890, fornecedorId: '', saida: 2 }
        ];

        itens.forEach((it, i) => {
            const produto = {
                id: gerarId(), nome: it.nome, sku: it.sku, categoria: it.categoria,
                estoque: it.estoque, minimo: it.minimo, custo: it.custo,
                fornecedorId: it.fornecedorId, foto: '', criadoEm: dataRelativa(20 - i)
            };
            estado.produtos.push(produto);

            const inicial = it.estoque + it.saida;
            estado.movimentacoes.push({
                id: gerarId(), data: dataRelativa(18 - i, 9), tipo: 'entrada', produtoId: produto.id,
                produtoNome: produto.nome, produtoSku: produto.sku, quantidade: inicial,
                saldoAnterior: 0, saldo: inicial, motivo: 'Compra', observacao: 'Estoque inicial', usuario: USUARIO_DEMO.nome
            });
            estado.movimentacoes.push({
                id: gerarId(), data: dataRelativa(6 - Math.min(i, 5), 15), tipo: 'saida', produtoId: produto.id,
                produtoNome: produto.nome, produtoSku: produto.sku, quantidade: it.saida,
                saldoAnterior: inicial, saldo: it.estoque, motivo: 'Venda', observacao: '', usuario: USUARIO_DEMO.nome
            });
        });

        return estado;
    }

    function carregarEstado() {
        try {
            const bruto = localStorage.getItem(STORAGE_KEY);
            if (!bruto) return criarDadosDemo();
            const dados = JSON.parse(bruto);
            const base = estadoVazio();
            return {
                ...base,
                ...dados,
                produtos: Array.isArray(dados.produtos) ? dados.produtos : [],
                fornecedores: Array.isArray(dados.fornecedores) ? dados.fornecedores : [],
                movimentacoes: Array.isArray(dados.movimentacoes) ? dados.movimentacoes : [],
                config: { ...configPadrao(), ...(dados.config || {}) }
            };
        } catch (erro) {
            console.error('Falha ao ler dados salvos:', erro);
            return estadoVazio();
        }
    }

    let estado = carregarEstado();
    let sessao = null;

    function salvarEstado() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
            return true;
        } catch (erro) {
            console.error('Falha ao salvar:', erro);
            toast('Não foi possível salvar os dados. O armazenamento do navegador pode estar cheio.', 'erro');
            return false;
        }
    }

    /* ------------------------------------------------------------------ *
     * 3. Regras de negócio
     * ------------------------------------------------------------------ */
    const produtoPorId = (id) => estado.produtos.find((p) => p.id === id);
    const fornecedorPorId = (id) => estado.fornecedores.find((f) => f.id === id);

    function statusDe(produto) {
        if (produto.estoque <= 0) return 'sem';
        if (produto.estoque <= produto.minimo) return 'baixo';
        return 'normal';
    }

    const ROTULO_STATUS = { normal: 'Normal', baixo: 'Estoque baixo', sem: 'Sem estoque' };
    const ROTULO_TIPO = { entrada: 'Entrada', saida: 'Saída', ajuste: 'Ajuste' };

    const abaixoDoMinimo = (p) => p.estoque <= p.minimo;

    function totais() {
        const unidades = estado.produtos.reduce((s, p) => s + p.estoque, 0);
        const valor = estado.produtos.reduce((s, p) => s + p.estoque * p.custo, 0);
        const criticos = estado.produtos.filter(abaixoDoMinimo).length;
        const contagem = (tipo) => estado.movimentacoes.filter((m) => m.tipo === tipo).length;
        return {
            produtos: estado.produtos.length,
            unidades, valor, criticos,
            entradas: contagem('entrada'),
            saidas: contagem('saida'),
            ajustes: contagem('ajuste'),
            movimentacoes: estado.movimentacoes.length
        };
    }

    function registrarMovimentacao({ produto, tipo, quantidade, saldoAnterior, saldo, motivo, observacao }) {
        estado.movimentacoes.push({
            id: gerarId(),
            data: new Date().toISOString(),
            tipo,
            produtoId: produto.id,
            produtoNome: produto.nome,
            produtoSku: produto.sku,
            quantidade,
            saldoAnterior,
            saldo,
            motivo: motivo || '',
            observacao: observacao || '',
            usuario: sessao ? sessao.nome : '—'
        });
    }

    /* ------------------------------------------------------------------ *
     * 4. Feedback: toasts e confirmação
     * ------------------------------------------------------------------ */
    const ICONE_TOAST = { sucesso: 'checkCircle', erro: 'alert', aviso: 'alert', info: 'info' };

    function toast(mensagem, tipo = 'sucesso') {
        const el = document.createElement('div');
        el.className = `toast toast-${tipo}`;
        el.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
        el.innerHTML = `<span class="toast-icone">${icone(ICONE_TOAST[tipo] || 'info')}</span><span class="toast-texto"></span>`;
        el.querySelector('.toast-texto').textContent = mensagem;
        $('toastContainer').appendChild(el);
        requestAnimationFrame(() => el.classList.add('visivel'));
        setTimeout(() => {
            el.classList.remove('visivel');
            setTimeout(() => el.remove(), 300);
        }, 4000);
    }

    let resolverConfirmacao = null;

    function confirmar({ titulo, texto, botao = 'Confirmar' }) {
        return new Promise((resolve) => {
            $('confirmarTitulo').textContent = titulo;
            $('confirmarTexto').textContent = texto;
            $('btnConfirmarOk').textContent = botao;
            resolverConfirmacao = resolve;
            abrirModal('modalConfirmar');
        });
    }

    /* ------------------------------------------------------------------ *
     * 5. Modais (abrir, fechar, foco)
     * ------------------------------------------------------------------ */
    const focoAnterior = {};

    function abrirModal(id) {
        const modal = $(id);
        focoAnterior[id] = document.activeElement;
        modal.classList.add('aberto');
        document.body.classList.add('modal-aberto');
        setTimeout(() => {
            const alvo = modal.querySelector('input:not([type="hidden"]):not([type="file"]), select, textarea') || modal.querySelector('button');
            if (alvo) alvo.focus();
        }, 30);
    }

    function fecharModal(id) {
        const modal = $(id);
        if (!modal || !modal.classList.contains('aberto')) return;
        modal.classList.remove('aberto');
        if (!document.querySelector('.modal.aberto')) document.body.classList.remove('modal-aberto');
        if (id === 'modalConfirmar' && resolverConfirmacao) {
            const resolver = resolverConfirmacao;
            resolverConfirmacao = null;
            resolver(false);
        }
        const anterior = focoAnterior[id];
        if (anterior && typeof anterior.focus === 'function') anterior.focus();
    }

    function modalAbertoTopo() {
        const abertos = $$('.modal.aberto');
        return abertos.length ? abertos[abertos.length - 1] : null;
    }

    /* ------------------------------------------------------------------ *
     * 6. Autenticação
     * ------------------------------------------------------------------ */
    function lerSessao() {
        try {
            const bruto = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
            return bruto ? JSON.parse(bruto) : null;
        } catch {
            return null;
        }
    }

    function mostrarMensagemLogin(texto, tipo = 'erro') {
        const el = $('mensagemLogin');
        el.textContent = texto;
        el.className = `mensagem-login ${tipo}`;
    }

    function entrarNoSistema(dadosSessao) {
        sessao = dadosSessao;
        $('telaLogin').classList.add('oculto');
        $('sistemaPrincipal').classList.add('ativo');
        $('nomeUsuario').textContent = sessao.nome;
        $('cargoUsuario').textContent = sessao.cargo;
        $('avatarUsuario').textContent = sessao.nome.charAt(0).toUpperCase();
        $('configUsuario').textContent = sessao.nome;
        irParaPagina('dashboard');
        renderTudo();
    }

    function sairDoSistema() {
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY);
        sessao = null;
        $('sistemaPrincipal').classList.remove('ativo');
        $('telaLogin').classList.remove('oculto');
        $('formLogin').reset();
        mostrarMensagemLogin('');
        fecharSidebar();
        document.title = 'StockPro - Gestão de Estoque';
        $('loginEmail').focus();
    }

    function tratarLogin(evento) {
        evento.preventDefault();
        const email = $('loginEmail').value.trim().toLowerCase();
        const senha = $('loginSenha').value;

        if (!email || !senha) {
            mostrarMensagemLogin('Informe e-mail e senha para continuar.');
            return;
        }
        if (email !== USUARIO_DEMO.email || senha !== USUARIO_DEMO.senha) {
            mostrarMensagemLogin('E-mail ou senha incorretos.');
            $('loginSenha').select();
            return;
        }

        const dadosSessao = { email: USUARIO_DEMO.email, nome: USUARIO_DEMO.nome, cargo: USUARIO_DEMO.cargo };
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY);
        const destino = $('lembrarLogin').checked ? localStorage : sessionStorage;
        destino.setItem(SESSION_KEY, JSON.stringify(dadosSessao));

        mostrarMensagemLogin('');
        entrarNoSistema(dadosSessao);
    }

    function alternarSenha() {
        const campo = $('loginSenha');
        const mostrar = campo.type === 'password';
        campo.type = mostrar ? 'text' : 'password';
        const botao = $('btnMostrarSenha');
        botao.innerHTML = icone(mostrar ? 'eyeOff' : 'eye');
        botao.setAttribute('aria-pressed', String(mostrar));
        botao.setAttribute('aria-label', mostrar ? 'Ocultar senha' : 'Mostrar senha');
    }

    /* ------------------------------------------------------------------ *
     * 7. Navegação
     * ------------------------------------------------------------------ */
    function irParaPagina(pagina) {
        if (!PAGINAS[pagina]) return;
        $$('.pagina').forEach((el) => el.classList.toggle('ativa', el.id === `pagina-${pagina}`));
        $$('.menu-item').forEach((el) => {
            const ativo = el.dataset.pagina === pagina;
            el.classList.toggle('ativo', ativo);
            if (ativo) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
        });
        document.title = `${PAGINAS[pagina]} • StockPro`;
        fecharSidebar();
        window.scrollTo({ top: 0 });
        renderTudo();
    }

    function abrirSidebar() {
        $('sidebar').classList.add('aberta');
        $('sidebarOverlay').classList.add('visivel');
    }

    function fecharSidebar() {
        $('sidebar').classList.remove('aberta');
        $('sidebarOverlay').classList.remove('visivel');
    }

    /* ------------------------------------------------------------------ *
     * 8. Renderização
     * ------------------------------------------------------------------ */
    function celulaFoto(produto) {
        if (produto.foto && String(produto.foto).startsWith('data:image/')) {
            return `<img class="thumb" src="${escapar(produto.foto)}" alt="Foto de ${escapar(produto.nome)}" loading="lazy">`;
        }
        return `<span class="thumb thumb-vazio" aria-hidden="true">${escapar((produto.nome || '?').charAt(0).toUpperCase())}</span>`;
    }

    const badgeStatus = (produto) => {
        const s = statusDe(produto);
        return `<span class="badge badge-${s}">${ROTULO_STATUS[s]}</span>`;
    };

    function alternarVazio(elementoMensagem, temDados, textoVazio) {
        elementoMensagem.hidden = temDados;
        if (!temDados && textoVazio) elementoMensagem.textContent = textoVazio;
    }

    function renderDashboard() {
        const t = totais();
        $('totalProdutos').textContent = formatarNumero(t.produtos);
        $('valorEstoque').textContent = formatarMoeda(t.valor);
        $('estoqueBaixo').textContent = formatarNumero(t.criticos);
        $('totalMovimentacoes').textContent = formatarNumero(t.movimentacoes);

        const recentes = [...estado.produtos]
            .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
            .slice(0, 5);

        $('tabelaProdutosDashboard').innerHTML = recentes.map((p) => `
            <tr>
                <td>${celulaFoto(p)}</td>
                <td><div class="produto-cell"><strong>${escapar(p.nome)}</strong></div></td>
                <td><span class="sku">${escapar(p.sku)}</span></td>
                <td>${escapar(p.categoria)}</td>
                <td class="num">${formatarNumero(p.estoque)}</td>
                <td class="num">${formatarMoeda(p.custo)}</td>
                <td>${badgeStatus(p)}</td>
            </tr>`).join('');
        alternarVazio($('mensagemProdutosDashboard'), recentes.length > 0, 'Nenhum produto cadastrado.');
    }

    function atualizarFiltroCategorias() {
        const select = $('filtroCategoria');
        const atual = select.value;
        const categorias = [...new Set(estado.produtos.map((p) => p.categoria).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, 'pt-BR'));
        select.innerHTML = '<option value="">Todas as categorias</option>' +
            categorias.map((c) => `<option value="${escapar(c)}">${escapar(c)}</option>`).join('');
        select.value = categorias.includes(atual) ? atual : '';

        $('listaCategorias').innerHTML = categorias.map((c) => `<option value="${escapar(c)}"></option>`).join('');
    }

    function renderProdutos() {
        atualizarFiltroCategorias();

        const busca = normalizar($('buscaProduto').value);
        const categoria = $('filtroCategoria').value;
        const status = $('filtroStatus').value;

        const lista = estado.produtos
            .filter((p) => {
                if (categoria && p.categoria !== categoria) return false;
                if (status && statusDe(p) !== status) return false;
                if (!busca) return true;
                return normalizar(`${p.nome} ${p.sku} ${p.categoria}`).includes(busca);
            })
            .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

        $('tabelaProdutos').innerHTML = lista.map((p) => {
            const fornecedor = fornecedorPorId(p.fornecedorId);
            return `
            <tr>
                <td>${celulaFoto(p)}</td>
                <td><div class="produto-cell"><strong>${escapar(p.nome)}</strong></div></td>
                <td><span class="sku">${escapar(p.sku)}</span></td>
                <td>${escapar(p.categoria)}</td>
                <td>${fornecedor ? escapar(fornecedor.empresa) : '<span class="texto-suave">—</span>'}</td>
                <td class="num">${formatarNumero(p.estoque)}</td>
                <td class="num">${formatarMoeda(p.custo)}</td>
                <td>${badgeStatus(p)}</td>
                <td class="acoes-col">
                    <div class="tabela-acoes">
                        <button type="button" class="btn-icone" data-acao="editar-produto" data-id="${escapar(p.id)}" title="Editar" aria-label="Editar ${escapar(p.nome)}">${icone('edit')}</button>
                        <button type="button" class="btn-icone perigo" data-acao="excluir-produto" data-id="${escapar(p.id)}" title="Excluir" aria-label="Excluir ${escapar(p.nome)}">${icone('trash')}</button>
                    </div>
                </td>
            </tr>`;
        }).join('');

        const filtrando = Boolean(busca || categoria || status);
        alternarVazio(
            $('mensagemProdutos'),
            lista.length > 0,
            filtrando ? 'Nenhum produto encontrado para os filtros aplicados.' : 'Nenhum produto cadastrado.'
        );
    }

    function renderEstoque() {
        const t = totais();
        $('totalUnidades').textContent = formatarNumero(t.unidades);
        $('custoTotalEstoque').textContent = formatarMoeda(t.valor);
        $('itensCriticos').textContent = formatarNumero(t.criticos);

        // Painel de alerta
        const painel = $('painelAlertaEstoque');
        const criticos = estado.produtos.filter(abaixoDoMinimo);
        if (!estado.produtos.length) {
            painel.className = 'estoque-alerta alerta-neutro';
            painel.innerHTML = `${icone('info')}<div><strong>Sem produtos cadastrados</strong>Cadastre produtos para acompanhar os níveis de estoque.</div>`;
        } else if (!estado.config.alertaEstoque) {
            painel.className = 'estoque-alerta alerta-neutro';
            painel.innerHTML = `${icone('info')}<div><strong>Alertas desativados</strong>Ative os alertas em Configurações para destacar produtos abaixo do mínimo.</div>`;
        } else if (criticos.length) {
            const nomes = criticos.slice(0, 3).map((p) => escapar(p.nome)).join(', ');
            const extra = criticos.length > 3 ? ` e mais ${criticos.length - 3}` : '';
            painel.className = 'estoque-alerta alerta-aviso';
            painel.innerHTML = `${icone('alert')}<div><strong>${criticos.length} ${criticos.length === 1 ? 'produto precisa' : 'produtos precisam'} de reposição</strong>${nomes}${extra}.</div>`;
        } else {
            painel.className = 'estoque-alerta alerta-ok';
            painel.innerHTML = `${icone('checkCircle')}<div><strong>Estoque saudável</strong>Todos os produtos estão acima do nível mínimo.</div>`;
        }

        // Tabela (críticos primeiro)
        const ordem = { sem: 0, baixo: 1, normal: 2 };
        const lista = [...estado.produtos].sort((a, b) =>
            ordem[statusDe(a)] - ordem[statusDe(b)] || a.nome.localeCompare(b.nome, 'pt-BR'));

        $('tabelaEstoque').innerHTML = lista.map((p) => {
            const status = statusDe(p);
            const referencia = Math.max(p.minimo * 2, 1);
            const pct = Math.max(0, Math.min(100, Math.round((p.estoque / referencia) * 100)));
            const classeBarra = status === 'normal' ? '' : status;
            return `
            <tr>
                <td><div class="produto-cell"><strong>${escapar(p.nome)}</strong></div></td>
                <td><span class="sku">${escapar(p.sku)}</span></td>
                <td class="num">${formatarNumero(p.estoque)}</td>
                <td class="num">${formatarNumero(p.minimo)}</td>
                <td>
                    <div class="barra-disp" title="${ROTULO_STATUS[status]}">
                        <div class="barra-trilho"><div class="barra-preenchida ${classeBarra}" style="width:${pct}%"></div></div>
                        <span class="barra-pct">${pct}%</span>
                    </div>
                </td>
                <td class="acoes-col"><button type="button" class="btn-mini" data-acao="movimentar" data-id="${escapar(p.id)}">${icone('repeat')} Movimentar</button></td>
            </tr>`;
        }).join('');
        alternarVazio($('mensagemEstoque'), lista.length > 0, 'Nenhum produto cadastrado.');
    }

    function renderMovimentacoes() {
        const t = totais();
        $('resumoEntradas').textContent = formatarNumero(t.entradas);
        $('resumoSaidas').textContent = formatarNumero(t.saidas);
        $('resumoAjustes').textContent = formatarNumero(t.ajustes);

        const busca = normalizar($('buscaMovimentacao').value);
        const tipo = $('filtroMovimentacao').value;

        const lista = [...estado.movimentacoes]
            .filter((m) => {
                if (tipo !== 'todos' && m.tipo !== tipo) return false;
                if (!busca) return true;
                return normalizar(`${m.produtoNome} ${m.produtoSku} ${m.motivo} ${m.usuario} ${m.observacao}`).includes(busca);
            })
            .sort((a, b) => new Date(b.data) - new Date(a.data));

        $('tabelaMovimentacoes').innerHTML = lista.map((m) => {
            let quantidade;
            if (m.tipo === 'entrada') quantidade = `<span class="qtd-positiva">+${formatarNumero(m.quantidade)}</span>`;
            else if (m.tipo === 'saida') quantidade = `<span class="qtd-negativa">−${formatarNumero(m.quantidade)}</span>`;
            else quantidade = m.quantidade >= 0
                ? `<span class="qtd-positiva">+${formatarNumero(m.quantidade)}</span>`
                : `<span class="qtd-negativa">−${formatarNumero(Math.abs(m.quantidade))}</span>`;

            return `
            <tr>
                <td>${escapar(formatarDataHora(m.data))}</td>
                <td><span class="badge badge-${escapar(m.tipo)}">${escapar(ROTULO_TIPO[m.tipo] || m.tipo)}</span></td>
                <td><div class="produto-cell"><strong>${escapar(m.produtoNome)}</strong><small>${escapar(m.produtoSku || '')}</small></div></td>
                <td class="num">${quantidade}</td>
                <td class="num">${formatarNumero(m.saldoAnterior)} → <strong>${formatarNumero(m.saldo)}</strong></td>
                <td><div class="produto-cell"><span>${escapar(m.motivo || '—')}</span>${m.observacao ? `<small>${escapar(m.observacao)}</small>` : ''}</div></td>
                <td>${escapar(m.usuario)}</td>
            </tr>`;
        }).join('');

        const filtrando = Boolean(busca || tipo !== 'todos');
        alternarVazio(
            $('mensagemMovimentacoes'),
            lista.length > 0,
            filtrando ? 'Nenhuma movimentação encontrada para os filtros aplicados.' : 'Nenhuma movimentação registrada.'
        );
    }

    function renderFornecedores() {
        const busca = normalizar($('buscaFornecedor').value);
        const lista = estado.fornecedores
            .filter((f) => !busca || normalizar(`${f.empresa} ${f.cnpj} ${f.email} ${f.responsavel}`).includes(busca))
            .sort((a, b) => a.empresa.localeCompare(b.empresa, 'pt-BR'));

        if (!lista.length) {
            $('listaFornecedores').innerHTML = `<div class="vazio-box">${busca ? 'Nenhum fornecedor encontrado para a busca.' : 'Nenhum fornecedor cadastrado. Clique em “Novo fornecedor” para começar.'}</div>`;
            return;
        }

        $('listaFornecedores').innerHTML = lista.map((f) => {
            const qtd = estado.produtos.filter((p) => p.fornecedorId === f.id).length;
            const linha = (rotulo, valor) => valor ? `<div><dt>${rotulo}</dt><dd>${escapar(valor)}</dd></div>` : '';
            return `
            <article class="fornecedor-card">
                <div class="fornecedor-topo">
                    <div class="fornecedor-avatar" aria-hidden="true">${escapar(f.empresa.charAt(0).toUpperCase())}</div>
                    <div class="fornecedor-titulo">
                        <h3>${escapar(f.empresa)}</h3>
                        <small>${f.cnpj ? escapar(f.cnpj) : 'CNPJ não informado'}</small>
                    </div>
                </div>
                <dl class="fornecedor-dados" style="margin:0">
                    ${linha('Responsável', f.responsavel)}
                    ${linha('Telefone', f.telefone)}
                    ${linha('E-mail', f.email)}
                </dl>
                ${f.observacao ? `<div class="fornecedor-obs">${escapar(f.observacao)}</div>` : ''}
                <div class="fornecedor-rodape">
                    <span class="badge badge-ajuste">${qtd} ${qtd === 1 ? 'produto' : 'produtos'}</span>
                    <div class="tabela-acoes">
                        <button type="button" class="btn-icone" data-acao="editar-fornecedor" data-id="${escapar(f.id)}" title="Editar" aria-label="Editar ${escapar(f.empresa)}">${icone('edit')}</button>
                        <button type="button" class="btn-icone perigo" data-acao="excluir-fornecedor" data-id="${escapar(f.id)}" title="Excluir" aria-label="Excluir ${escapar(f.empresa)}">${icone('trash')}</button>
                    </div>
                </div>
            </article>`;
        }).join('');
    }

    function renderRelatorios() {
        const t = totais();
        $('relatorioProdutos').textContent = formatarNumero(t.produtos);
        $('relatorioUnidades').textContent = formatarNumero(t.unidades);
        $('relatorioValor').textContent = formatarMoeda(t.valor);
        $('relatorioBaixo').textContent = formatarNumero(t.criticos);
        $('relatorioEntradas').textContent = formatarNumero(t.entradas);
        $('relatorioSaidas').textContent = formatarNumero(t.saidas);
        $('relatorioAjustes').textContent = formatarNumero(t.ajustes);
        $('relatorioTotalMov').textContent = formatarNumero(t.movimentacoes);
    }

    function renderConfiguracoes() {
        const c = estado.config;
        $('empresaNome').value = c.empresaNome;
        $('empresaCNPJ').value = c.empresaCNPJ;
        $('empresaTelefone').value = c.empresaTelefone;
        $('empresaEmail').value = c.empresaEmail;
        $('empresaEndereco').value = c.empresaEndereco;
        $('alertaEstoque').checked = Boolean(c.alertaEstoque);
    }

    function atualizarMarca() {
        $('nomeEmpresaSidebar').textContent = estado.config.empresaNome || 'Gestão de estoque';
    }

    function renderTudo() {
        if (!sessao) return;
        atualizarMarca();
        renderDashboard();
        renderProdutos();
        renderEstoque();
        renderMovimentacoes();
        renderFornecedores();
        renderRelatorios();
    }

    /* ------------------------------------------------------------------ *
     * 9. Produtos
     * ------------------------------------------------------------------ */
    let fotoAtual = '';

    function atualizarPreviewFoto() {
        const preview = $('previewFoto');
        if (fotoAtual) {
            preview.innerHTML = `<img src="${escapar(fotoAtual)}" alt="Pré-visualização da foto">`;
        } else {
            preview.innerHTML = icone('image');
        }
        $('btnRemoverFoto').hidden = !fotoAtual;
    }

    function preencherSelectFornecedores(selecionado = '') {
        const select = $('produtoFornecedor');
        const fornecedores = [...estado.fornecedores].sort((a, b) => a.empresa.localeCompare(b.empresa, 'pt-BR'));
        select.innerHTML = '<option value="">Nenhum fornecedor</option>' +
            fornecedores.map((f) => `<option value="${escapar(f.id)}">${escapar(f.empresa)}</option>`).join('');
        select.value = fornecedores.some((f) => f.id === selecionado) ? selecionado : '';
    }

    function abrirModalProduto(id = '') {
        const produto = id ? produtoPorId(id) : null;
        $('formProduto').reset();
        $('produtoId').value = produto ? produto.id : '';
        $('tituloModalProduto').textContent = produto ? 'Editar produto' : 'Novo produto';
        $('btnSalvarProduto').textContent = produto ? 'Salvar alterações' : 'Cadastrar produto';
        preencherSelectFornecedores(produto ? produto.fornecedorId : '');
        atualizarFiltroCategorias();

        if (produto) {
            $('produtoNome').value = produto.nome;
            $('produtoSKU').value = produto.sku;
            $('produtoCategoria').value = produto.categoria;
            $('produtoEstoque').value = produto.estoque;
            $('produtoMinimo').value = produto.minimo;
            $('produtoPreco').value = produto.custo;
        }
        fotoAtual = produto ? (produto.foto || '') : '';
        atualizarPreviewFoto();
        abrirModal('modalProduto');
    }

    function processarImagem(arquivo) {
        return new Promise((resolve, reject) => {
            if (!arquivo || !arquivo.type.startsWith('image/')) {
                reject(new Error('Selecione um arquivo de imagem válido.'));
                return;
            }
            if (arquivo.size > 10 * 1024 * 1024) {
                reject(new Error('A imagem é muito grande (máximo de 10 MB).'));
                return;
            }
            const leitor = new FileReader();
            leitor.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
            leitor.onload = () => {
                const img = new Image();
                img.onerror = () => reject(new Error('Não foi possível processar a imagem.'));
                img.onload = () => {
                    const MAX = 480;
                    const escala = Math.min(1, MAX / Math.max(img.width, img.height));
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.max(1, Math.round(img.width * escala));
                    canvas.height = Math.max(1, Math.round(img.height * escala));
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.78));
                };
                img.src = leitor.result;
            };
            leitor.readAsDataURL(arquivo);
        });
    }

    async function tratarArquivoFoto(evento) {
        const input = evento.target;
        const arquivo = input.files && input.files[0];
        if (!arquivo) return;
        try {
            fotoAtual = await processarImagem(arquivo);
            atualizarPreviewFoto();
        } catch (erro) {
            toast(erro.message, 'erro');
        } finally {
            input.value = '';
        }
    }

    function validarInteiro(valor, { min = 0 } = {}) {
        const n = Number(valor);
        return Number.isInteger(n) && n >= min ? n : null;
    }

    function tratarSalvarProduto(evento) {
        evento.preventDefault();

        const id = $('produtoId').value;
        const nome = $('produtoNome').value.trim();
        const sku = $('produtoSKU').value.trim().toUpperCase();
        const categoria = $('produtoCategoria').value.trim();
        const estoque = validarInteiro($('produtoEstoque').value);
        const minimo = validarInteiro($('produtoMinimo').value);
        const custo = Number($('produtoPreco').value);
        const fornecedorId = $('produtoFornecedor').value;

        if (!nome || !sku || !categoria) { toast('Preencha nome, SKU e categoria.', 'erro'); return; }
        if (estoque === null) { toast('O estoque atual deve ser um número inteiro maior ou igual a zero.', 'erro'); $('produtoEstoque').focus(); return; }
        if (minimo === null) { toast('O estoque mínimo deve ser um número inteiro maior ou igual a zero.', 'erro'); $('produtoMinimo').focus(); return; }
        if (!Number.isFinite(custo) || custo < 0) { toast('Informe um custo unitário válido.', 'erro'); $('produtoPreco').focus(); return; }

        const duplicado = estado.produtos.some((p) => p.id !== id && normalizar(p.sku) === normalizar(sku));
        if (duplicado) { toast(`Já existe um produto com o SKU ${sku}.`, 'erro'); $('produtoSKU').focus(); return; }

        const custoArredondado = Math.round(custo * 100) / 100;

        if (id) {
            const produto = produtoPorId(id);
            if (!produto) { toast('Produto não encontrado.', 'erro'); fecharModal('modalProduto'); return; }
            const saldoAnterior = produto.estoque;
            Object.assign(produto, { nome, sku, categoria, minimo, custo: custoArredondado, fornecedorId, foto: fotoAtual, estoque });
            if (estoque !== saldoAnterior) {
                registrarMovimentacao({
                    produto, tipo: 'ajuste', quantidade: estoque - saldoAnterior,
                    saldoAnterior, saldo: estoque, motivo: 'Correção de estoque', observacao: 'Alteração feita na edição do produto'
                });
            }
            if (!salvarEstado()) return;
            toast('Produto atualizado com sucesso.');
        } else {
            const produto = {
                id: gerarId(), nome, sku, categoria, estoque, minimo,
                custo: custoArredondado, fornecedorId, foto: fotoAtual, criadoEm: new Date().toISOString()
            };
            estado.produtos.push(produto);
            if (estoque > 0) {
                registrarMovimentacao({
                    produto, tipo: 'entrada', quantidade: estoque,
                    saldoAnterior: 0, saldo: estoque, motivo: 'Outro', observacao: 'Estoque inicial'
                });
            }
            if (!salvarEstado()) return;
            toast('Produto cadastrado com sucesso.');
        }

        fecharModal('modalProduto');
        renderTudo();
    }

    async function excluirProduto(id) {
        const produto = produtoPorId(id);
        if (!produto) return;
        const ok = await confirmar({
            titulo: 'Excluir produto?',
            texto: `“${produto.nome}” será removido. O histórico de movimentações será mantido.`,
            botao: 'Excluir'
        });
        if (!ok) return;
        estado.produtos = estado.produtos.filter((p) => p.id !== id);
        if (salvarEstado()) toast('Produto excluído.');
        renderTudo();
    }

    /* ------------------------------------------------------------------ *
     * 10. Movimentações
     * ------------------------------------------------------------------ */
    function abrirModalMovimentacao({ produtoId = '', tipo = 'entrada' } = {}) {
        if (!estado.produtos.length) {
            toast('Cadastre um produto antes de registrar movimentações.', 'aviso');
            return;
        }
        $('formMovimentacao').reset();
        const select = $('movProduto');
        const lista = [...estado.produtos].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
        select.innerHTML = '<option value="">Selecione o produto</option>' +
            lista.map((p) => `<option value="${escapar(p.id)}">${escapar(p.nome)} (${escapar(p.sku)}) — ${formatarNumero(p.estoque)} un.</option>`).join('');
        select.value = produtoId;
        $('movTipo').value = tipo;
        ajustarCamposMovimentacao();
        abrirModal('modalMovimentacao');
    }

    function ajustarCamposMovimentacao() {
        const tipo = $('movTipo').value;
        const campo = $('movQuantidade');
        if (tipo === 'ajuste') {
            $('labelMovQuantidade').textContent = 'Novo saldo em estoque';
            campo.min = '0';
            campo.placeholder = 'Quantidade contada';
        } else {
            $('labelMovQuantidade').textContent = 'Quantidade';
            campo.min = '1';
            campo.placeholder = '';
        }
        atualizarPreviewMovimentacao();
    }

    function calcularMovimentacao() {
        const produto = produtoPorId($('movProduto').value);
        const tipo = $('movTipo').value;
        const bruto = $('movQuantidade').value;
        const quantidade = bruto === '' ? null : Number(bruto);
        if (!produto) return { produto: null };

        const resultado = { produto, tipo, quantidade, novoSaldo: null, erro: '' };
        if (quantidade === null) return resultado;

        if (!Number.isInteger(quantidade) || quantidade < (tipo === 'ajuste' ? 0 : 1)) {
            resultado.erro = tipo === 'ajuste' ? 'Informe um saldo inteiro maior ou igual a zero.' : 'Informe uma quantidade inteira maior que zero.';
            return resultado;
        }
        if (tipo === 'entrada') resultado.novoSaldo = produto.estoque + quantidade;
        if (tipo === 'saida') {
            if (quantidade > produto.estoque) resultado.erro = `Saldo insuficiente: há apenas ${formatarNumero(produto.estoque)} un. em estoque.`;
            else resultado.novoSaldo = produto.estoque - quantidade;
        }
        if (tipo === 'ajuste') {
            if (quantidade === produto.estoque) resultado.erro = 'O novo saldo é igual ao saldo atual.';
            else resultado.novoSaldo = quantidade;
        }
        return resultado;
    }

    function atualizarPreviewMovimentacao() {
        const el = $('movPreview');
        const r = calcularMovimentacao();
        el.className = 'mov-preview';

        if (!r.produto) { el.textContent = 'Selecione um produto para visualizar o saldo.'; return; }
        if (r.erro) { el.classList.add('erro'); el.textContent = r.erro; return; }
        if (r.novoSaldo === null) {
            el.innerHTML = `Saldo atual: <strong>${formatarNumero(r.produto.estoque)}</strong> un.`;
            return;
        }
        el.classList.add('ok');
        el.innerHTML = `Saldo atual <strong>${formatarNumero(r.produto.estoque)}</strong> → novo saldo <strong>${formatarNumero(r.novoSaldo)}</strong> un.`;
    }

    function tratarSalvarMovimentacao(evento) {
        evento.preventDefault();
        const r = calcularMovimentacao();
        const motivo = $('movMotivo').value;
        const observacao = $('movObservacao').value.trim();

        if (!r.produto) { toast('Selecione um produto.', 'erro'); return; }
        if (r.erro) { toast(r.erro, 'erro'); $('movQuantidade').focus(); return; }
        if (r.novoSaldo === null) { toast('Informe a quantidade.', 'erro'); $('movQuantidade').focus(); return; }
        if (!motivo) { toast('Selecione o motivo da movimentação.', 'erro'); $('movMotivo').focus(); return; }

        const saldoAnterior = r.produto.estoque;
        const quantidade = r.tipo === 'ajuste' ? r.novoSaldo - saldoAnterior : r.quantidade;

        r.produto.estoque = r.novoSaldo;
        registrarMovimentacao({ produto: r.produto, tipo: r.tipo, quantidade, saldoAnterior, saldo: r.novoSaldo, motivo, observacao });

        if (!salvarEstado()) return;
        fecharModal('modalMovimentacao');
        renderTudo();
        toast(`${ROTULO_TIPO[r.tipo]} registrada. Novo saldo: ${formatarNumero(r.novoSaldo)} un.`);
        if (estado.config.alertaEstoque && abaixoDoMinimo(r.produto)) {
            toast(`Atenção: “${r.produto.nome}” está no nível mínimo ou abaixo.`, 'aviso');
        }
    }

    /* ------------------------------------------------------------------ *
     * 11. Fornecedores
     * ------------------------------------------------------------------ */
    function abrirModalFornecedor(id = '') {
        const f = id ? fornecedorPorId(id) : null;
        $('formFornecedor').reset();
        $('fornecedorId').value = f ? f.id : '';
        $('tituloModalFornecedor').textContent = f ? 'Editar fornecedor' : 'Novo fornecedor';
        $('btnSalvarFornecedor').textContent = f ? 'Salvar alterações' : 'Cadastrar fornecedor';
        if (f) {
            $('fornecedorEmpresa').value = f.empresa;
            $('fornecedorCNPJ').value = f.cnpj || '';
            $('fornecedorTelefone').value = f.telefone || '';
            $('fornecedorEmail').value = f.email || '';
            $('fornecedorResponsavel').value = f.responsavel || '';
            $('fornecedorObservacao').value = f.observacao || '';
        }
        abrirModal('modalFornecedor');
    }

    function tratarSalvarFornecedor(evento) {
        evento.preventDefault();
        const id = $('fornecedorId').value;
        const dados = {
            empresa: $('fornecedorEmpresa').value.trim(),
            cnpj: $('fornecedorCNPJ').value.trim(),
            telefone: $('fornecedorTelefone').value.trim(),
            email: $('fornecedorEmail').value.trim(),
            responsavel: $('fornecedorResponsavel').value.trim(),
            observacao: $('fornecedorObservacao').value.trim()
        };

        if (!dados.empresa) { toast('Informe o nome da empresa.', 'erro'); $('fornecedorEmpresa').focus(); return; }
        if (dados.cnpj && soDigitos(dados.cnpj).length !== 14) { toast('O CNPJ deve ter 14 dígitos.', 'erro'); $('fornecedorCNPJ').focus(); return; }
        const digTel = soDigitos(dados.telefone).length;
        if (dados.telefone && digTel !== 10 && digTel !== 11) { toast('Informe um telefone válido com DDD.', 'erro'); $('fornecedorTelefone').focus(); return; }

        if (id) {
            const f = fornecedorPorId(id);
            if (!f) { toast('Fornecedor não encontrado.', 'erro'); fecharModal('modalFornecedor'); return; }
            Object.assign(f, dados);
            toast('Fornecedor atualizado com sucesso.');
        } else {
            estado.fornecedores.push({ id: gerarId(), ...dados });
            toast('Fornecedor cadastrado com sucesso.');
        }

        if (!salvarEstado()) return;
        fecharModal('modalFornecedor');
        renderTudo();
    }

    async function excluirFornecedor(id) {
        const f = fornecedorPorId(id);
        if (!f) return;
        const vinculados = estado.produtos.filter((p) => p.fornecedorId === id).length;
        const ok = await confirmar({
            titulo: 'Excluir fornecedor?',
            texto: vinculados
                ? `“${f.empresa}” será removido e ${vinculados} ${vinculados === 1 ? 'produto ficará' : 'produtos ficarão'} sem fornecedor.`
                : `“${f.empresa}” será removido permanentemente.`,
            botao: 'Excluir'
        });
        if (!ok) return;
        estado.fornecedores = estado.fornecedores.filter((x) => x.id !== id);
        estado.produtos.forEach((p) => { if (p.fornecedorId === id) p.fornecedorId = ''; });
        if (salvarEstado()) toast('Fornecedor excluído.');
        renderTudo();
    }

    /* ------------------------------------------------------------------ *
     * 12. Configurações e exportação
     * ------------------------------------------------------------------ */
    function tratarSalvarConfiguracoes(evento) {
        evento.preventDefault();
        const cnpj = $('empresaCNPJ').value.trim();
        const telefone = $('empresaTelefone').value.trim();
        const digTel = soDigitos(telefone).length;

        if (cnpj && soDigitos(cnpj).length !== 14) { toast('O CNPJ deve ter 14 dígitos.', 'erro'); $('empresaCNPJ').focus(); return; }
        if (telefone && digTel !== 10 && digTel !== 11) { toast('Informe um telefone válido com DDD.', 'erro'); $('empresaTelefone').focus(); return; }

        estado.config = {
            empresaNome: $('empresaNome').value.trim(),
            empresaCNPJ: cnpj,
            empresaTelefone: telefone,
            empresaEmail: $('empresaEmail').value.trim(),
            empresaEndereco: $('empresaEndereco').value.trim(),
            alertaEstoque: $('alertaEstoque').checked
        };
        if (!salvarEstado()) return;
        renderTudo();
        toast('Configurações salvas.');
    }

    async function limparTodosOsDados() {
        const ok = await confirmar({
            titulo: 'Apagar todos os dados?',
            texto: 'Produtos, fornecedores, movimentações e configurações serão removidos deste navegador. Esta ação não pode ser desfeita.',
            botao: 'Apagar tudo'
        });
        if (!ok) return;
        estado = estadoVazio();
        if (salvarEstado()) {
            renderConfiguracoes();
            renderTudo();
            toast('Todos os dados foram apagados.', 'info');
        }
    }

    function baixarArquivo(conteudo, nome, tipo) {
        const blob = new Blob([conteudo], { type: tipo });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nome;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    const dataArquivo = () => new Date().toISOString().slice(0, 10);

    function exportarJson() {
        const pacote = { aplicacao: 'StockPro', exportadoEm: new Date().toISOString(), ...estado };
        baixarArquivo(JSON.stringify(pacote, null, 2), `stockpro-backup-${dataArquivo()}.json`, 'application/json');
        toast('Backup JSON gerado.');
    }

    function celulaCsv(valor) {
        let texto = String(valor ?? '');
        // Evita injeção de fórmulas quando aberto no Excel
        if (/^[=+\-@\t\r]/.test(texto)) texto = `'${texto}`;
        return `"${texto.replace(/"/g, '""')}"`;
    }

    function exportarCsv() {
        if (!estado.produtos.length) { toast('Não há produtos para exportar.', 'aviso'); return; }
        const decimal = (n) => Number(n).toFixed(2).replace('.', ',');
        const cabecalho = ['Produto', 'SKU', 'Categoria', 'Fornecedor', 'Estoque', 'Mínimo', 'Custo unitário (R$)', 'Valor em estoque (R$)', 'Status'];
        const linhas = estado.produtos.map((p) => {
            const f = fornecedorPorId(p.fornecedorId);
            return [p.nome, p.sku, p.categoria, f ? f.empresa : '', p.estoque, p.minimo, decimal(p.custo), decimal(p.estoque * p.custo), ROTULO_STATUS[statusDe(p)]];
        });
        const csv = [cabecalho, ...linhas].map((l) => l.map(celulaCsv).join(';')).join('\r\n');
        baixarArquivo('\uFEFF' + csv, `stockpro-estoque-${dataArquivo()}.csv`, 'text/csv;charset=utf-8');
        toast('Planilha CSV gerada.');
    }

    /* ------------------------------------------------------------------ *
     * 13. Eventos
     * ------------------------------------------------------------------ */
    function vincularEventos() {
        // Login
        $('formLogin').addEventListener('submit', tratarLogin);
        $('btnMostrarSenha').addEventListener('click', alternarSenha);
        $('btnEsqueciSenha').addEventListener('click', () =>
            mostrarMensagemLogin('Para redefinir sua senha, contate o administrador do sistema.', 'sucesso'));
        $('btnLogout').addEventListener('click', sairDoSistema);

        // Sidebar
        $('btnMenu').addEventListener('click', abrirSidebar);
        $('sidebarOverlay').addEventListener('click', fecharSidebar);

        // Delegação de cliques globais
        document.addEventListener('click', (evento) => {
            const alvo = evento.target;
            if (!(alvo instanceof Element)) return;

            const menu = alvo.closest('[data-pagina]');
            if (menu) { irParaPagina(menu.dataset.pagina); return; }

            const ir = alvo.closest('[data-ir]');
            if (ir) { irParaPagina(ir.dataset.ir); return; }

            const fechar = alvo.closest('[data-fechar-modal]');
            if (fechar) { fecharModal(fechar.dataset.fecharModal); return; }

            if (alvo.classList.contains('modal') && alvo.classList.contains('aberto')) {
                fecharModal(alvo.id);
                return;
            }

            const acao = alvo.closest('[data-acao]');
            if (!acao) return;
            const id = acao.dataset.id;
            switch (acao.dataset.acao) {
                case 'editar-produto': abrirModalProduto(id); break;
                case 'excluir-produto': excluirProduto(id); break;
                case 'movimentar': abrirModalMovimentacao({ produtoId: id }); break;
                case 'editar-fornecedor': abrirModalFornecedor(id); break;
                case 'excluir-fornecedor': excluirFornecedor(id); break;
                default: break;
            }
        });

        // Botões de ação
        ['btnNovoProdutoDashboard', 'btnNovoProdutoPagina', 'btnCadastrarProduto']
            .forEach((id) => $(id).addEventListener('click', () => abrirModalProduto()));
        ['btnNovaMovimentacao', 'btnNovaMovimentacaoEstoque']
            .forEach((id) => $(id).addEventListener('click', () => abrirModalMovimentacao()));
        $('btnEntradaEstoque').addEventListener('click', () => abrirModalMovimentacao({ tipo: 'entrada' }));
        $('btnSaidaEstoque').addEventListener('click', () => abrirModalMovimentacao({ tipo: 'saida' }));
        $('btnGerarRelatorio').addEventListener('click', () => irParaPagina('relatorios'));
        $('btnNovoFornecedor').addEventListener('click', () => abrirModalFornecedor());

        // Formulários
        $('formProduto').addEventListener('submit', tratarSalvarProduto);
        $('formMovimentacao').addEventListener('submit', tratarSalvarMovimentacao);
        $('formFornecedor').addEventListener('submit', tratarSalvarFornecedor);
        $('formConfiguracoes').addEventListener('submit', tratarSalvarConfiguracoes);

        // Foto do produto
        $('produtoFotoArquivo').addEventListener('change', tratarArquivoFoto);
        $('produtoFotoCamera').addEventListener('change', tratarArquivoFoto);
        $('btnRemoverFoto').addEventListener('click', () => { fotoAtual = ''; atualizarPreviewFoto(); });

        // Movimentação: preview em tempo real
        $('movProduto').addEventListener('change', atualizarPreviewMovimentacao);
        $('movTipo').addEventListener('change', ajustarCamposMovimentacao);
        $('movQuantidade').addEventListener('input', atualizarPreviewMovimentacao);

        // Filtros e buscas
        $('buscaProduto').addEventListener('input', renderProdutos);
        $('filtroCategoria').addEventListener('change', renderProdutos);
        $('filtroStatus').addEventListener('change', renderProdutos);
        $('buscaMovimentacao').addEventListener('input', renderMovimentacoes);
        $('filtroMovimentacao').addEventListener('change', renderMovimentacoes);
        $('buscaFornecedor').addEventListener('input', renderFornecedores);

        // Máscaras
        aplicarMascara($('empresaCNPJ'), mascaraCNPJ);
        aplicarMascara($('fornecedorCNPJ'), mascaraCNPJ);
        aplicarMascara($('empresaTelefone'), mascaraTelefone);
        aplicarMascara($('fornecedorTelefone'), mascaraTelefone);

        // Relatórios e sistema
        $('btnExportarDados').addEventListener('click', exportarCsv);
        $('btnExportarJson').addEventListener('click', exportarJson);
        $('btnLimparDados').addEventListener('click', limparTodosOsDados);

        // Confirmação
        $('btnConfirmarOk').addEventListener('click', () => {
            const resolver = resolverConfirmacao;
            resolverConfirmacao = null;
            fecharModal('modalConfirmar');
            if (resolver) resolver(true);
        });

        // Teclado: Esc fecha o modal do topo; Tab fica preso dentro dele
        document.addEventListener('keydown', (evento) => {
            const modal = modalAbertoTopo();
            if (evento.key === 'Escape') {
                if (modal) fecharModal(modal.id);
                else fecharSidebar();
                return;
            }
            if (evento.key === 'Tab' && modal) {
                const focaveis = $$('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]):not([type="file"]), select:not([disabled]), textarea:not([disabled])', modal)
                    .filter((el) => el.offsetParent !== null);
                if (!focaveis.length) return;
                const primeiro = focaveis[0];
                const ultimo = focaveis[focaveis.length - 1];
                if (evento.shiftKey && document.activeElement === primeiro) { evento.preventDefault(); ultimo.focus(); }
                else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primeiro.focus(); }
            }
        });

        // Sincroniza abas abertas do mesmo navegador
        window.addEventListener('storage', (evento) => {
            if (evento.key === STORAGE_KEY) {
                estado = carregarEstado();
                renderConfiguracoes();
                renderTudo();
            }
            if (evento.key === SESSION_KEY && !evento.newValue && !sessionStorage.getItem(SESSION_KEY) && sessao) {
                sairDoSistema();
            }
        });
    }

    /* ------------------------------------------------------------------ *
     * 14. Inicialização
     * ------------------------------------------------------------------ */
    function iniciar() {
        hidratarIcones();
        $('btnMostrarSenha').innerHTML = icone('eye');
        $('btnLogout').innerHTML = icone('logout');
        $('btnMenu').innerHTML = icone('menu');
        vincularEventos();
        atualizarPreviewFoto();
        renderConfiguracoes();

        // Grava os dados de exemplo na primeira execução
        if (!localStorage.getItem(STORAGE_KEY)) salvarEstado();

        const sessaoSalva = lerSessao();
        if (sessaoSalva && sessaoSalva.nome) entrarNoSistema(sessaoSalva);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();
})();
