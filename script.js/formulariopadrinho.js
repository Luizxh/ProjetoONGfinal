document.addEventListener('DOMContentLoaded', () => {

    const campos = {
        nome: {
            value: document.getElementById('nome'),
            validar: v => v.value.trim().length < 3,
            mensagem: "Seu nome deve ter no minimo 3 caracteres!"
        },
        cpf: {
            value: document.getElementById('cpf'),
            validar: v => v.value.trim() === "" || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v.value),
            mensagem: "Por favor, digite um CPF válido. 000.000.000-00"
        },
        email: {
            value: document.getElementById('email'),
            validar: v => v.value.trim() === "" || !v.value.includes('@'),
            mensagem: "Digite um E-mail válido!"
        },
        idade: {
            value: document.getElementById('idade'),
            validar: v => v.value < 18,
            mensagem: "Você deve ter 18 anos ou mais!!"
        },
        telefone: {
            value: document.getElementById('telefone'),
            validar: v => v.value.trim() === "" || v.value.replace(/\D/g, '').length !== 11,
            mensagem: "Digite um número válido!"
        }
    }
    
    const form = document.getElementById('formulario-projeto-padrinho');
    const container = document.getElementById('container2')
    const mensagemError = document.getElementById('mensagem2')
    
    if (form) {
        form.addEventListener('submit', (Event) => {
            Event.preventDefault();
            mensagemError.innerHTML = "";
            
            const dadosFormPadr = {
                nome: document.getElementById('nome').value,
                cpf: document.getElementById('cpf').value,
                email: document.getElementById('email').value,
                idade: document.getElementById('idade').value,
                telefone: document.getElementById('telefone').value
            };
            
            
            
            for (let i in campos) {
                const campo = campos[i];
                
                if (!campo.value) {
                    console.error(`Atenção elemento ${i} não foi encontrado no HTML`);
                    mensagemError.innerHTML = "Desculpe tive um problema interno, tente novamente mais tarde!";
                    mensagemError.style.color = "red";
                    return;
                }
                
                if (campo.validar(campo.value)) {
                    mensagemError.innerHTML = campo.mensagem
                    mensagemError.style.color = "red";
                    campo.value.focus();
                    return;
                }
            }
            localStorage.setItem('formPadrinho', JSON.stringify(dadosFormPadr));
            console.log(" Dados salvos localmente:", dadosFormPadr);

             emailjs.init({
                    publicKey: "pFy1a_NAJS1ApryAR"
                });
    
                const nome = document.getElementById('nome').value;
                const email = document.getElementById('email').value;
    
                const dados = {
                    name: nome,
                    email: email,
                    subject: "Confirmação de apadrinhamento 🐾",
                    mensagem: `Olá ${nome}, Você acaba de se tornar um(a) padrinho(a)! 💖 
                    Muito obrigado por apoiar nossa causa e ajudar os nossos peludinhos 🐶🐾
    
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
            <p>Obrigado por se tornar padrinho. Você agora faz parte da nossa comunidade!</p>
            <button id="voltar" style="padding: 10px 20px; margin-top: 1rem; border-radius: 20px; background-color: #fff3d4; border:0px;">Voltar ao formulário</button>
            </div>`

            
            const voltar = document.getElementById('voltar');
            voltar.addEventListener('click', () => {
                localStorage.removeItem('formPadrinho');
                container.innerHTML = ``;
                form.reset();
            })

        })
    }
})