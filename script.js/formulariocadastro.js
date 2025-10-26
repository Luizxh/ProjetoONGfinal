document.addEventListener('DOMContentLoaded', () => {
  const campos = {
    nome: {
      value: document.getElementById('nomecad'),
      validar: valor => valor.value.trim().length < 3,
      mensagem: "Nome deve ter pelo menos 3 caracteres!"
    },
    cpf: {
      value: document.getElementById('cpfcad'),
      validar: valor => valor.value.trim() === "" || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor.value),
      mensagem: "Por favor, digite um CPF válido. 000.000.000-00"
    },
    email: {
      value: document.getElementById('emailcad'),
      validar: valor => valor.value.trim() === "" || !valor.value.includes('@'),
      mensagem: "Digite um email válido!"
    },
    telefone: {
      value: document.getElementById('telefonecad'),
      validar: valor => valor.value.trim() === "" || valor.value.replace(/\D/g, '').length !== 11,
      mensagem: "Digite um número válido"
    },
    endereco: {
      value: document.getElementById('enderecocad'),
      validar: valor => valor.value.trim().length < 7,
      mensagem: "É necessário informar o endereço!"
    },
    cep: {
      value: document.getElementById('cepcad'),
      validar: valor => valor.value.trim() === "" || !/^\d{5}-\d{3}$/.test(valor.value),
      mensagem: "É necessário informar o CEP! Formato: 00000-000"
    },
    cidade: {
      value: document.getElementById('cidadecad'),
      validar: valor => valor.value.trim().length < 4,
      mensagem: "Informe o nome da sua cidade"
    },
    estado: {
      value: document.getElementById('estadocad'),
      validar: valor => valor.value.trim().length < 2,
      mensagem: "Informe seu estado!"
    }
  }

  const form = document.getElementById('form-cadastro');
  const mensagemError = document.getElementById('mensagem');
  const container = document.getElementById('container');

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // evita recarregar a página
      const dadosformcad = {
        nome: document.getElementById('nomecad').value,
        cpf: document.getElementById('cpfcad').value,
        email: document.getElementById('emailcad').value,
        telefone: document.getElementById('telefonecad').value,
        endereco: document.getElementById('enderecocad').value,
        cidade: document.getElementById('cidadecad').value,
        estado: document.getElementById('estadocad').value,
      }
      // validação
      for (let i in campos) {
        const campo = campos[i];

        if (!campo.value) {
          console.error(`Erro crítico: elemento ${i} não encontrado no HTML`);
          mensagemError.innerHTML = "Erro interno! Contate o administrador.";
          mensagemError.style.color = "red";
          return;
        }

        if (campo.validar(campo.value)) {
          mensagemError.innerHTML = campo.mensagem;
          mensagemError.style.color = "red";
          campo.value.focus();
          return;
        }
      }
      localStorage.setItem('DadosCadastro', JSON.stringify(dadosformcad));
      console.log(`dados salvos com sucesso!! ${dadosformcad}`)

      emailjs.init({
        publicKey: "pFy1a_NAJS1ApryAR"
      });

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;

      const dados = {
        name: nome,
        email: email,
        subject: "Confirmação de Cadastro 🐾",
        mensagem: `Olá ${nome}, você nos enviou um pedido de para ser voluntário! 💖 
                    Muito obrigado, em breve entraremos em contato com você! 🐶🐾
    
                        Com carinho,
                        Equipe Patinhas Felizes 🧡`
      };

      console.log("📨 Dados enviados:", dados);
      const serviceId = "service_n998xdj";
      const templateID = "template_yrtut6c";
      console.log(dados);
      
      emailjs.send(serviceId, templateID, dados)
        .then(() => {
          console.log("Email enviado com sucesso!");
        })
        .catch((error) => {
          console.log("Erro ao enviar: " + error.text);
        });





      container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <h2 style="color: green;">Formulário enviado com sucesso!</h2>
          <p>Obrigado por se cadastrar. Você agora faz parte da nossa comunidade!</p>
           <button id="voltar" style="padding: 10px 20px; margin-top: 1rem; border-radius: 20px; background-color: #fff3d4;" border:0;>Voltar ao formulário</button>
        </div>
      `;

      // botão de voltar ao formulário
      document.getElementById('voltar').addEventListener('click', () => {
        container.innerHTML = '';
        form.reset();
      });

    });
  }
});
