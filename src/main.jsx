import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const sampleCode = 'DE123456789BR';
const sampleOrder = '58231';
const events = [
  { date: '23/11/2026 às 09h10', title: 'Saiu para entrega', location: 'Embu das Artes, SP' },
  { date: '23/11/2026 às 07h25', title: 'Chegou à unidade de distribuição', location: 'Embu das Artes, SP' },
  { date: '20/11/2026 às 15h42', title: 'Encomenda postada', location: 'São Paulo, SP' },
];

function App() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isOrderNumberError, setIsOrderNumberError] = useState(false);
  const [result, setResult] = useState(false);
  const input = useRef(null);
  const help = useRef(null);
  const helpHeading = useRef(null);

  function consult(event) {
    event.preventDefault();
    const normalized = code.toUpperCase().replace(/[\s-]/g, '');
    let message = '';

    if (!normalized) {
      message = 'Digite ou cole o código de rastreamento.';
    } else if (normalized === sampleOrder) {
      message = 'Você digitou o número do pedido. Procure o código de rastreamento nos detalhes do envio ou na mensagem da loja.';
      setIsOrderNumberError(true);
    } else if (/^[A-Z]{2}[0-9]{8}[A-Z]{2}$/.test(normalized)) {
      message = 'Esse código parece incompleto. Na demonstração, o formato esperado é 2 letras, 9 números e 2 letras.';
    } else if (!/^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(normalized)) {
      message = 'Confira se você copiou o código inteiro. Neste protótipo, ele tem 2 letras, 9 números e 2 letras.';
    } else if (normalized !== sampleCode) {
      message = 'Este código não está nos dados de demonstração. Confira o que digitou ou use o código de exemplo.';
    }

    setError(message);
    if (normalized !== sampleOrder) setIsOrderNumberError(false);
    setResult(!message);
    if (message) {
      input.current.focus();
    } else {
      setCode(normalized);
    }
  }

  function updateCode(value) {
    setCode(value);
    setError('');
    setIsOrderNumberError(false);
    setResult(false);
  }

  function openHelp() {
    help.current.open = true;
    helpHeading.current.focus();
  }

  function useDemoCode() {
    updateCode(sampleCode);
    input.current.focus();
  }

  function startAnotherQuery() {
    updateCode('');
    input.current.focus();
  }

  return (
    <>
      <header>
        <div className="shell top">
          <strong>Rastreio Claro</strong>
          <span>Protótipo acadêmico · Dados simulados</span>
        </div>
      </header>
      <main className="shell">
        <section className="intro" aria-labelledby="page-title">
          <h1 id="page-title">Rastreie sua encomenda</h1>
          <p>Consulte a atualização usando o código que a loja ou o remetente enviou.</p>
        </section>

        <section className="card query" aria-labelledby="query-title">
          <h2 id="query-title">Consultar encomenda</h2>
          <form onSubmit={consult} noValidate>
            <label htmlFor="code">Código de rastreamento</label>
            <p id="hint" className="hint">Cole o código que você recebeu da loja ou do remetente. Exemplo: AA123456789BR.</p>
            <input
              id="code"
              ref={input}
              type="text"
              name="code"
              value={code}
              placeholder="AA123456789BR"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'hint error' : 'hint'}
              onChange={event => updateCode(event.target.value)}
            />
            {error && (
              <div id="error" className="error">
                <p>{error}</p>
                {isOrderNumberError && (
                  <button className="help-action" type="button" onClick={openHelp}>
                    Veja onde encontrar o código
                  </button>
                )}
              </div>
            )}
            <button className="primary" type="submit">Consultar encomenda</button>
          </form>

          <div className="sr-only" role="status" aria-live="polite">
            {result ? 'Consulta concluída. Saiu para entrega.' : ''}
          </div>
          {result && (
            <section className="card result" aria-labelledby="result-title">
              <p className="status-label">Status da encomenda</p>
              <h2 id="result-title">Saiu para entrega</h2>
              <p className="result-code">Consulta simulada · Código consultado: <strong>{sampleCode}</strong></p>
              <p className="latest-update"><strong>Última atualização</strong><br />23/11/2026 às 09h10 · Embu das Artes, SP</p>
              <h3>Histórico da encomenda</h3>
              <ol>
                {events.map(item => (
                  <li key={item.title}>
                    <span className="event-date">{item.date}</span>
                    <strong>{item.title}</strong>
                    <span>{item.location}</span>
                  </li>
                ))}
              </ol>
              <button className="secondary another" type="button" onClick={startAnotherQuery}>
                Consultar outro código
              </button>
            </section>
          )}
        </section>

        <section className="help-section" aria-labelledby="help-title">
          <h2 id="help-title" className="section-title">Precisa de ajuda para encontrar o código?</h2>
          <details ref={help} className="card help">
            <summary>Onde encontro meu código?</summary>
            <div className="help-content">
              <h3 ref={helpHeading} tabIndex="-1">Pelo site ou app da loja</h3>
              <ol>
                <li>Abra a área “Meus pedidos” da loja.</li>
                <li>Abra a compra que quer acompanhar.</li>
                <li>Procure “Acompanhar entrega”, “Rastreamento” ou “Código de rastreio”.</li>
                <li>Se houver um código dos Correios, copie e cole no formulário. Se a loja mostrar apenas um link de acompanhamento, a pessoa pode usá-lo no canal da própria loja.</li>
              </ol>

              <h3>Pelo e-mail ou pela mensagem de envio</h3>
              <ol>
                <li>Procure uma mensagem da loja ou do remetente sobre o envio.</li>
                <li>Procure termos como “pedido enviado”, “rastreio” ou “código de rastreamento”.</li>
                <li>Copie o código e volte ao formulário.</li>
              </ol>

              <h3>Pela etiqueta, se você tiver acesso a ela</h3>
              <ol>
                <li>Procure o código perto do código de barras.</li>
                <li>Copie a sequência de letras e números.</li>
              </ol>

              <div className="help-note">
                <p><strong>Número do pedido e código de rastreamento são diferentes.</strong> Se você só tiver o número do pedido, abra a compra na loja e procure os detalhes do envio. Este protótipo não faz buscas pelo número do pedido.</p>
                <p>Se o código ainda não estiver disponível, confira a etapa do pedido e peça o código à loja ou ao remetente.</p>
              </div>

              <details className="label-details">
                <summary>Ver etiqueta fictícia para imprimir</summary>
                <div className="label">
                  <p>ETIQUETA DE TESTE</p>
                  <div className="bars" aria-hidden="true"></div>
                  <strong>{sampleCode}</strong>
                </div>
                <button className="secondary" type="button" onClick={() => window.print()}>Imprimir etiqueta</button>
              </details>
            </div>
          </details>
        </section>

        <section className="demo card" aria-labelledby="demo-title">
          <div>
            <p className="eyebrow">Exemplo fictício</p>
            <h2 id="demo-title">Dados de demonstração</h2>
            <p className="demo-intro">Mensagem de envio simulada para testar a consulta sem precisar de uma caixa.</p>
          </div>
          <article className="confirmation" aria-label="Mensagem fictícia de envio">
            <h3>Assunto: Seu pedido foi enviado</h3>
            <dl className="demo-data">
              <div><dt>Loja</dt><dd>Papelaria Horizonte</dd></div>
              <div><dt>Produto</dt><dd>Caderno universitário</dd></div>
              <div><dt>Número do pedido</dt><dd>{sampleOrder}</dd></div>
              <div><dt>Transportadora</dt><dd>Correios</dd></div>
              <div><dt>Código de rastreamento</dt><dd><code>{sampleCode}</code></dd></div>
            </dl>
          </article>
          <button className="secondary" type="button" onClick={useDemoCode}>Usar código de demonstração</button>
        </section>
      </main>
      <footer className="shell">Projeto acadêmico de Interação Humano-Computador · Consulta sem integração ou envio de dados.</footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
