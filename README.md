# Landing page para psicólogos

Página modelo para apresentar a psicólogos. Ela pode ser personalizada pelo próprio link, para que cada cliente veja o próprio nome, CRP, foto e cor na página.

HTML, CSS e JavaScript puros, sem etapa de build.

## Como abrir

O vídeo do YouTube precisa que a página seja servida por um servidor (aberta direto pelo arquivo, o player pode recusar a reprodução). Na pasta do projeto:

```bash
python -m http.server 5173
# ou
npx serve .
```

Depois acesse `http://localhost:5173`.

Para publicar, basta enviar a pasta inteira para qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, Hostinger etc.).

## Personalizar pelo link

Todos os parâmetros são opcionais. O que não for informado usa o padrão definido em `assets/js/main.js` (objeto `PADRAO`).

| Parâmetro   | Exemplo                                  |
|-------------|------------------------------------------|
| `nome`      | `Ana Paula Souza`                        |
| `titulo`    | `Psicóloga` ou `Psicólogo` (ajusta "clínica/clínico") |
| `crp`       | `CRP 06/123456`                          |
| `abordagem` | `Psicanálise`                            |
| `local`     | `Savassi, Belo Horizonte - MG`           |
| `whatsapp`  | `5531988887777` (com DDI e DDD)          |
| `instagram` | `anapaula.psi`                           |
| `email`     | `contato@anapaula.com.br`                |
| `foto`      | endereço de uma imagem (ex.: foto de perfil) |
| `cor`       | `salvia`, `petroleo`, `terracota`, `ameixa`, `grafite` |

Exemplo:

```
https://seusite.com/?nome=Ana%20Paula%20Souza&crp=CRP%2006/123456&whatsapp=5531988887777&cor=terracota
```

## Painel de demonstração

Adicione `?demo=1` ao endereço para abrir um painel de edição no canto da tela. As mudanças aparecem na hora. O botão **Copiar link** gera o link personalizado, sem o painel, pronto para enviar ao cliente.

## Ética profissional (CFP)

O conteúdo foi escrito para respeitar as regras de publicidade do Código de Ética Profissional do Psicólogo:

- nome completo e número do CRP aparecem no topo, no hero e no rodapé;
- não há preço usado como propaganda ("valores informados no primeiro contato");
- não há promessa de resultado;
- não há depoimentos de pacientes;
- o rodapé orienta sobre o CVV (188) em situação de crise.

Ao adaptar o texto para um cliente, mantenha esses pontos.

## Créditos

- Vídeo: *Na travessia do vazio*, animação de Gabriel Peixe ([YouTube](https://www.youtube.com/watch?v=ufQ3LJzSdsc)), incorporado pelo player oficial.
- Fotos: [Unsplash](https://unsplash.com) (licença Unsplash). Para um cliente real, substitua `assets/img/psicologa.webp` pela foto profissional dele.
- Ícones: [Phosphor Icons](https://phosphoricons.com). Fonte: Plus Jakarta Sans (Google Fonts).
