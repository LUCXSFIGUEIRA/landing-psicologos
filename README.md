# Landing page para psicólogos

Duas páginas modelo para apresentar a psicólogos: uma de psicóloga e uma de psicólogo. HTML, CSS e JavaScript puros, sem etapa de build.

## Páginas

| Página     | Arquivo                | No ar                                                        |
|------------|------------------------|--------------------------------------------------------------|
| Psicóloga  | `psicologa/index.html` | https://lucxsfigueira.github.io/landing-psicologos/psicologa/ |
| Psicólogo  | `psicologo/index.html` | https://lucxsfigueira.github.io/landing-psicologos/psicologo/ |

As duas compartilham `assets/` (CSS, JS e imagens). Nome, CRP, contatos e textos estão escritos direto em cada HTML. A cor de destaque vem do atributo `data-cor` na tag `<html>` (`salvia` ou `petroleo`).

Os botões "Agendar conversa" abrem o WhatsApp com uma mensagem pronta. O número está nos links `https://wa.me/...` de cada página.

## Como abrir localmente

O vídeo do YouTube só toca dentro da página quando ela é servida por um servidor. Aberta direto pelo arquivo (duplo clique), o YouTube recusa o player (erro 153); nesse caso o botão abre o vídeo no YouTube em outra aba. Na pasta do projeto:

```bash
python -m http.server 5173
# ou
npx serve .
```

Depois acesse `http://localhost:5173/psicologa/` ou `http://localhost:5173/psicologo/`.

## Publicação

O site é publicado pelo GitHub Pages a partir da branch `main`. Cada push atualiza as páginas em cerca de 1 minuto.

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
- Fotos: [Unsplash](https://unsplash.com) (licença Unsplash).
- Ícones: [Phosphor Icons](https://phosphoricons.com). Fonte: Plus Jakarta Sans (Google Fonts).
