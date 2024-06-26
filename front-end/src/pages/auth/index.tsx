import axios from 'axios';
import React from 'react';
import { successSwal } from '../../components/swal/sucessSwal';
import { errorSwal } from '../../components/swal/errorSwal';
import './styles.css';

export default function Auth() {
  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.text.value;
    const password = form.password.value;

    try {
      const response = await axios.post('http://localhost:5000/users/userlogin', { userUser: email, userPassword: password });
      localStorage.setItem('token', response.data.success.token);
      successSwal('Usuário logado com sucesso');
      setTimeout(() => {
        window.location.href = '/private';
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Erro na resposta da API:', error.response.data);
          errorSwal(error.response.data.error);
        }
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  const handleSubmitCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const cpf = form.cpf.value;
    const email = form.email.value;
    const telefone = form.telefone.value;
    const usuario = form.usuario.value;
    const nome = form.nome.value;
    const password = form.password.value;
    const password2 = form.password2.value;

    if (password !== password2) {
      alert('As senhas não conferem');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/userCreate', {
        userCpf: cpf,
        userEmail: email,
        userPhone: telefone,
        userUser: usuario,
        userName: nome,
        userPassword: password,
        userPasswordVerify: password2,
      });
      localStorage.setItem('token', response.data.success.token);
      successSwal('Usuário criado com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Erro na resposta da API:', error.response.data);
          errorSwal(error.response.data.error);
        } 
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  const ChangeHidden = (event: React.MouseEvent<HTMLParagraphElement>) => {
    const login = document.querySelector('.Login');
    const cadastro = document.querySelector('.Cadastro');
    if (login?.classList.contains('hidden')) {
      login?.classList.remove('hidden');
      cadastro?.classList.add('hidden');
    } else {
      login?.classList.add('hidden');
      cadastro?.classList.remove('hidden');
    }
  }

  return (
    <main>
      <section className='formAuth Login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmitLogin}>
          <label htmlFor='email'>Email</label>
          <input type='text' id='text' name='text' required />
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' required />
          <button type='submit'>Login</button>
        </form>
        <p onClick={ChangeHidden} className='loginHidden'>Não tem uma conta? clique aqui!</p>
      </section>
      <section className='formAuth Cadastro hidden'>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmitCadastro}>
          <label htmlFor='cpf'>CPF:</label>
          <input type='text' id='cpf' name='cpf' required />
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' required />
          <label htmlFor='usuario'>Usuario</label>
          <input type='text' id='usuario' name='usuario' required />
          <label htmlFor='telefone'>Telefone</label>
          <input type='tel' id='telefone' name='telefone' required />
          <label htmlFor='nome'>Nome</label>
          <input type='text' id='nome' name='nome' required />
          <label htmlFor='password'>Senha</label>
          <input type='password' id='password' name='password' required />
          <label htmlFor='password2'>Confirmação de senha</label>
          <input type='password' id='password2' name='password2' required />
          <button type='submit'>Cadastrar</button>
        </form>
        <p onClick={ChangeHidden} className='cadastroHidden'>Já tem uma conta? clique aqui!</p>
      </section>
    </main>
  );
}
