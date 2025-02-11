<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

<p align="center">
  <a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Sobre o Projeto

Este projeto é uma aplicação para gerenciamento de consultas clínicas, utilizando tecnologias modernas para proporcionar uma experiência fluida e eficiente. O sistema é construído com:

- [Laravel](https://laravel.com) como framework backend
- [Inertia.js](https://inertiajs.com) para comunicação entre frontend e backend
- [React](https://reactjs.org) para a interface do usuário
- [ShadCN UI](https://ui.shadcn.com) para componentes estilizados e acessíveis

## Funcionalidades

- Agendamento de consultas
- Gestão de pacientes e médicos
- Histórico de atendimentos
- Integração com APIs externas
- Interface responsiva e moderna

## Instalação e Configuração

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:
- PHP (versão recomendada: 8.x)
- Composer
- Node.js e npm/yarn
- Banco de dados MySQL ou PostgreSQL

### Passos para rodar o projeto

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências do backend:
   ```sh
   composer install
   ```

3. Instale as dependências do frontend:
   ```sh
   npm install
   ```
   ou
   ```sh
   yarn install
   ```

4. Configure o arquivo `.env` com as credenciais do banco de dados e outras configurações.

5. Gere a chave da aplicação:
   ```sh
   php artisan key:generate
   ```

6. Execute as migrações e seeders:
   ```sh
   php artisan migrate --seed
   ```
   Esse comando gerará os seguintes dados:
   ```php
   $this->createRoles();
   $this->createTestUser();
   $this->createPatients();
   $this->createUsers();
   $this->createServices();
   $this->createAppointments();
   ```
   O usuário padrão gerado será:
   - **Login:** test@example.com
   - **Senha:** password

   Caso prefira, você também pode acessar a rota `/register` para criar a sua própria conta.

7. Inicie o servidor backend:
   ```sh
   php artisan serve
   ```

8. Inicie o frontend:
   ```sh
   npm run dev
   ```
   ou
   ```sh
   yarn dev
   ```

Agora a aplicação estará rodando em `http://localhost:8000`.

## Contribuição

Se deseja contribuir para o projeto, siga as diretrizes de contribuição disponíveis na [documentação oficial](https://laravel.com/docs/contributions).

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

