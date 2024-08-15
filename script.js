btnAdicionar = document.querySelector('#adicionar')
btnLimpar = document.querySelector('#limpar')
listaAlunos = document.querySelector('#listaAlunos')
mensagemErro = document.querySelector('#mensagemErro')

let alunos = []

btnLimpar.addEventListener('click', (e) => {
    e.preventDefault()
    limparDados()
})

btnAdicionar.addEventListener('click', (e) =>{
    e.preventDefault()
    adicionarAluno()
})

function adicionarAluno(){
    let nome = prompt('Adicione o nome e sobrenome do aluno ->')
    let id = prompt('Adicione o ID do aluno [99999] ->')
    let nota1 = Number(prompt('Adicione a nota do primeiro trimestre do aluno ->'))
    let nota2 = Number(prompt('Adicione a nota do segundo trimestre do aluno ->'))
    let nota3 = Number(prompt('Adicione a nota do terceiro trimestre do aluno ->'))

    let situacao;
    const regexID = /^\d{5}$/
    const media = (nota1+nota2+nota3)/3
    if(media >=6){
        situacao = 'Aprovado'
    }else{
        situacao = 'Reprovado'
    }

    if(regexID.test(id)){
        alert('ID VÁLIDO')
    }else{
        throw Error('ID INVÁLIDO')
        mensagemErro.textContent = "ID INVÁLIDO"
    }

    const novoAluno = {
        nome : nome,
        ID: id,
        media: media,
        situacao: situacao
    };

    alunos.push(novoAluno)
    localStorage.setItem(`ALUNOS${alunos.length - 1}`, JSON.stringify(novoAluno))
    adicionarElementos()
}

function adicionarElementos() {
    listaAlunos.innerHTML = "";

    alunos = [];
    for (let i = 0; i < localStorage.length; i++) {
        let chave = localStorage.key(i);
        if (chave.startsWith('ALUNOS')) {
            let alunoJSON = localStorage.getItem(chave);
            let alunoObj = JSON.parse(alunoJSON);
            alunos.push(alunoObj);

            const novoAluno = document.createElement('li');
            novoAluno.innerHTML = `
                <h1>Nome: ${alunoObj.nome}</h1>
                <p>ID: ${alunoObj.ID}</p>
                <p>Média: ${alunoObj.media}</p>
                <p>Situação: ${alunoObj.situacao}</p>
                <button onclick="editarAluno(${i})">Editar</button>
                <button onclick="apagarAluno(${i})">Apagar</button>
            `;
            listaAlunos.appendChild(novoAluno);
        }
    }
}

function limparDados(){
    listaAlunos.innerHTML = ''
    localStorage.clear()
}

function editarAluno(index) {
    let alunoJSON = localStorage.getItem(`ALUNOS${index}`);
    if (!alunoJSON) {
        alert('Aluno Não Encontrado');
        return;
    }

    let alunoObj = JSON.parse(alunoJSON);
    let novoNome = prompt('Digite abaixo o Nome do aluno para ser atualizado ->', alunoObj.nome);
    if (novoNome) {
        alunoObj.nome = novoNome;
        localStorage.setItem(`ALUNOS${index}`, JSON.stringify(alunoObj));

        
        const alunoElement = document.querySelectorAll('#listaAlunos li')[index];
        if (alunoElement) {
            alunoElement.querySelector('h1').textContent = `Nome: ${novoNome}`;
        }
    } else {
        alert('Nome do Aluno não foi alterado');
    }
}


function apagarAluno(index){
    alunos.splice(index,1)
    localStorage.removeItem(`ALUNOS${index}`)
    localStorage.clear()

    alunos.forEach((aluno, index) => {
        localStorage.setItem(`ALUNOS${index}`, JSON.stringify(aluno));
    });

    adicionarElementos()
}