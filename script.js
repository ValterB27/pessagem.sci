document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    const mensagemErro = document.getElementById('mensagemErro');
    const tabelaEquipamentos = document.getElementById('tabelaEquipamentos');

    // Pesos originais para verificação
    const pesosOriginais = {
        'Equipamento1': [10, 12, 11, 13], // Pesos para Ampola 1, 2, 3 e 4
        'Equipamento2': [9, 10, 11, 12],
        'Equipamento3': [8, 9, 10, 11]
    };

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const equipamento = document.getElementById('equipamento').value;
            const numeroAmpola = document.getElementById('numeroAmpola').value;
            const pesoAmpola = parseFloat(document.getElementById('pesoAmpola').value);
            const nomeCadastro = document.getElementById('nomeCadastro').value.trim();
            const dataCadastro = document.getElementById('dataCadastro').value;
            
            if (!equipamento || !numeroAmpola || isNaN(pesoAmpola) || !nomeCadastro || !dataCadastro) {
                mensagemErro.textContent = 'Todos os campos são obrigatórios.';
                return;
            }
            
            const pesoOriginal = pesosOriginais[equipamento][numeroAmpola - 1];

            if (pesoAmpola < pesoOriginal - 8 || pesoAmpola > pesoOriginal + 14) {
                mensagemErro.textContent = 'O peso da ampola está fora dos limites permitidos. Verifique se a ampola deve ser trocada.';
                return;
            }
            
            const equipamentos = JSON.parse(localStorage.getItem('equipamentos') || '[]');
            equipamentos.push({
                equipamento,
                numeroAmpola,
                pesoAmpola,
                nomeCadastro,
                dataCadastro
            });
            
            localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
            
            mensagemErro.textContent = '';
            alert('Equipamento cadastrado com sucesso!');
            cadastroForm.reset();
        });
    }

    if (tabelaEquipamentos) {
        const equipamentos = JSON.parse(localStorage.getItem('equipamentos') || '[]');
        
        equipamentos.forEach(equipamento => {
            const row = tabelaEquipamentos.insertRow();
            row.insertCell().textContent = equipamento.equipamento;
            row.insertCell().textContent = equipamento.numeroAmpola;
            row.insertCell().textContent = equipamento.pesoAmpola;
            row.insertCell().textContent = equipamento.nomeCadastro;
            row.insertCell().textContent = equipamento.dataCadastro;
        });
    }
});