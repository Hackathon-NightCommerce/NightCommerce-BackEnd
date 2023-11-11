# Projeto WebCustons

Este projeto segue um conjunto de padrões e convenções para tornar o desenvolvimento mais eficiente e o código mais legível. Aqui estão algumas das principais práticas que seguimos:

## Rodar Projeto

## - `npm`: para utilizar .


## Convenções de Commits

Utilizamos o padrão "Conventional Commits". Quando você faz um commit, por favor, siga os seguintes padrões:

- `feat:`: Utilize quando adicionar um novo recurso ao seu código.
- `fix:`: Utilize quando corrigir um bug.
- `build:`: Utilize ao fazer alterações que afetam o sistema de construção ou dependências externas.
- `chore:`: Utilize para alterações que não modificam o código de produção ou de teste.
- `ci:`: Utilize quando fazer alterações aos arquivos de configuração de CI.
- `docs:`: Utilize ao adicionar ou alterar a documentação.
- `style:`: Utilize quando fazer alterações que não afetam o significado do código (espaço em branco, formatação, ponto e vírgula perdidos, etc.).
- `refactor:`: Utilize ao refatorar o código que não corrige um bug nem adiciona um recurso.
- `perf:`: Utilize quando melhorar o desempenho.
- `test:`: Utilize ao adicionar testes ausentes ou corrigir testes existentes.

## Gerenciador de Pacotes

O gerenciador de pacotes que usamos é o NPM. Por favor, assegure-se de tê-lo instalado e atualizado em seu ambiente de desenvolvimento.

## Nomeação de Branches

Seguimos a seguinte convenção para nomear nossas branches:

- `feature/`: Para novos recursos.
- `bugfix/`: Para correções de bugs.
- `hotfix/`: Para correções críticas que precisam ser implantadas rapidamente.
- `test/`: Para branches relacionadas a testes.

## Exportações

Para exportações, seguimos o padrão de exportar em variáveis. Por exemplo:

```javascript
export const constName = ...
```
## Padronização de Nomes

Para os nomes dos arquivos, usamos camelCase seguido pelo tipo do arquivo. Por exemplo:

```text
exampleArquivo.middlewares.ts
```
Para as pastas, todas devem estar em letras minúsculas.

Este README fornece uma visão geral dos principais padrões de codificação que seguimos. Por favor, consulte a documentação de cada tópico para obter detalhes mais específicos.

Isso deve ajudar a manter a consistência no projeto.


