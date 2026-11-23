# Rastreio Claro

codigo certo: DE123456789BR

Protótipo acadêmico de rastreamento, em português do Brasil, feito com React e Vite. As consultas usam somente dados locais fictícios: não há integração com os Correios, coleta de dados pessoais ou envio de informações pela rede.

## Executar

Requer Node.js 22.12 ou superior.

```sh
npm ci
npm run dev
```

Abra o endereço local mostrado pelo Vite. Para gerar a versão de demonstração:

```sh
npm run build
```

O `vite-plugin-singlefile` incorpora os recursos no `dist/index.html`. Depois do build, esse arquivo pode ser aberto diretamente no navegador sem internet. Para conferir o artefato localmente também é possível executar `npm run preview`.

## Dados simulados

- Número do pedido: `58231`
- Código de rastreamento: `DE123456789BR`
- Resultado: **Saiu para entrega**, em Embu das Artes, SP, às 09h10 de 23 de novembro de 2026.

### Cópia da confirmação fictícia para participantes

Entregue esta mensagem separadamente à pessoa participante, em papel ou como texto. Não indique o botão “Usar código de demonstração” durante a tarefa de localizar o rastreio.

> **Assunto:** Seu pedido foi enviado  
> **Loja:** Papelaria Horizonte  
> **Produto:** Caderno universitário  
> **Número do pedido:** 58231  
> **Transportadora:** Correios  
> **Código de rastreamento:** DE123456789BR

O número do pedido e o código de rastreamento são identificadores diferentes. O protótipo reconhece o número de pedido de exemplo para explicar como localizar os detalhes de envio na loja; ele não consulta encomendas por número do pedido. A validação de duas letras, nove números e duas letras serve apenas aos códigos fictícios desta demonstração e não é apresentada como regra de todas as transportadoras.

## Decisões de IHC

| Mudança | Justificativa de IHC |
|---|---|
| Instrução para colar o código recebido da loja ou do remetente e ajuda para encontrá-lo no site/app da loja, e-mail ou mensagem. | Atende quem ainda não recebeu a caixa. As opções e os nomes de áreas/mensagens apoiam **reconhecimento em vez de memorização**; a etiqueta permanece como caminho opcional. |
| Número do pedido e código de rastreamento apresentados separadamente nos dados de demonstração, com explicação específica quando o número do pedido é informado. | Explicita a diferença entre identificadores e ajuda a pessoa a se recuperar sem sugerir uma busca que o protótipo não oferece. |
| Mensagens específicas para campo vazio, número do pedido, formato inválido e código ausente; o texto digitado é mantido, o foco retorna ao campo e a mensagem é associada por `aria-describedby`. | Dá orientação para **recuperação de erros**, reduzindo a necessidade de lembrar o que foi digitado e indicando a próxima ação. |
| Resultado logo após o formulário, com status, código consultado, local, horário e histórico do evento mais recente para o mais antigo. | Torna o estado do sistema visível; a atualização pode ser percebida sem depender apenas de cor, e uma mensagem curta é anunciada com `role="status"`. |
| Consulta por teclado, ajuda nativa expansível (`details`/`summary`), foco visível e layout fluido. | Preserva controles familiares, oferece acesso por teclado e adapta a tarefa a telas estreitas, inclusive a partir de 320 px. |
| Dados locais fixos e versão de arquivo único. | Permite uma demonstração repetível e offline, sem solicitar ou transmitir informações pessoais. |

## Verificações manuais do protótipo

Use estes casos para validar os estados antes de uma apresentação:

1. Consultar `DE123456789BR` e confirmar **Saiu para entrega**, código, local/horário e histórico.
2. Consultar `de 123-456-789 br` e confirmar que espaços, hífens e minúsculas são normalizados.
3. Informar `58231` e conferir a orientação para abrir os detalhes do envio na loja.
4. Enviar um código com um dígito a menos, observar a mensagem e o valor preservado, corrigir e consultar com sucesso.
5. Consultar um código de formato válido diferente do código simulado e conferir a mensagem de código ausente.
6. Completar o fluxo por teclado; expandir/recolher a ajuda com teclado; testar a largura de 320 px sem rolagem horizontal.
7. Após uma consulta bem-sucedida, editar o campo e verificar que o resultado anterior desaparece; usar “Consultar outro código” e conferir limpeza e foco.
8. Após `npm run build`, abrir `dist/index.html` diretamente, desconectar a rede e repetir uma consulta.

## Teste moderado com duas pessoas de fora do grupo

Convide duas pessoas que não participaram do projeto. Antes de começar, explique que se trata de um protótipo fictício, peça autorização para registrar observações e não anote dados pessoais. Não dê dicas durante a tarefa; se a pessoa pedir ajuda, registre isso como ajuda recebida.

**Tarefa 1:** Entregue a confirmação fictícia acima e diga: “Você ainda não recebeu a caixa, mas tem esta mensagem de envio. Descubra se a entrega já saiu.” Não aponte nem mencione o botão “Usar código de demonstração”; observe como a pessoa identifica e transfere o código da mensagem.

**Tarefa 2:** “Você informou o número do pedido por engano. Descubra qual informação o formulário precisa e tente novamente.” Para reproduzir o engano, peça que informe `58231`; não antecipe a mensagem de erro nem a ação de ajuda.

Registre os resultados separadamente. Deixe em branco até a sessão acontecer; não preencha com suposições.

| Participante | Tarefa | Conclusão sem ajuda? | Tempo | Primeiro local onde procurou o código | Tentativas | Dificuldades observadas ou relatadas | O que entendeu do status |
|---|---|---|---|---|---|---|---|
| P1 | 1 | | | | | | |
| P1 | 2 | | | | | | |
| P2 | 1 | | | | | | |
| P2 | 2 | | | | | | |

### Mudança baseada na observação e reteste

- **Observação concreta (participante/tarefa):**
- **Mudança realizada e justificativa:**
- **Resultado do reteste da mesma tarefa:**
- **Evidência antes/depois (se houver):**

Não há resultados de participantes registrados neste README. Preencha esta seção somente após conduzir as sessões e o reteste.
