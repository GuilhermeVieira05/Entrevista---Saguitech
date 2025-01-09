import valueFormatter from "./valueFormatter.js";
import taxCalculation from "./taxCalculation.js";

const valueInput = document.getElementById('saleValue')
valueInput.addEventListener('input', (e) =>{
    valueFormatter(e.target)
})

const notaFiscalBtn = document.getElementById('notaFiscalBtn')
notaFiscalBtn.addEventListener('click', gerarNotaFiscal)

function gerarNotaFiscal(){
    const valuePoint = valueInput.value.replace(',', '.')
    const valueNumeric = parseFloat(valuePoint.split("R$")[1])
    if (isNaN(valueNumeric)) {
      alert("Insira um valor válido para a venda.");
      return;
    }

    let totalImpostos = Object.values(getTaxes(valueNumeric)).reduce((acc, act) => acc + act, 0)

    const valorLiquido = valueNumeric - totalImpostos

    const resultadoDiv = document.getElementById("resultado");
    const notaFiscalDiv = document.getElementById("nota-fiscal");
  
    const {itens, irpf, pis, cofins, inss, issqn} = getInputValues() 

    notaFiscalDiv.innerHTML = `
      <p><strong>Valor da Venda:</strong> R$ ${valueNumeric.toFixed(2).replace(".", ",")}</p>
      <p><strong>Itens Vendidos:</strong></p>
      <ul>
        ${itens.split(',').map(item => `<li>${item.trim()}</li>`).join('')}
      </ul>
      <p><strong>IRPF:</strong> R$ ${taxCalculation(valueNumeric, irpf).toFixed(2).replace(".", ",")}</p>
      <p><strong>PIS:</strong> R$ ${taxCalculation(valueNumeric, pis).toFixed(2).replace(".", ",")}</p>
      <p><strong>COFINS:</strong> R$ ${taxCalculation(valueNumeric, cofins).toFixed(2).replace(".", ",")}</p>
      <p><strong>INSS:</strong> R$ ${taxCalculation(valueNumeric, inss).toFixed(2).replace(".", ",")}</p>
      <p><strong>ISSQN:</strong> R$ ${taxCalculation(valueNumeric, issqn).toFixed(2).replace(".", ",")}</p>
      <p><strong>Total de Impostos:</strong> R$ ${totalImpostos.toFixed(2).replace(".", ",")}</p>
      <p><strong>Valor Líquido:</strong> R$ ${valorLiquido.toFixed(2).replace(".", ",")}</p>
    `;
  
    resultadoDiv.style.display = "block";


}

function getTaxes(saleValue){
    const {irpf, pis, cofins, inss, issqn} = getInputValues()
    return{
        valorIRPF: taxCalculation(saleValue, irpf),
        valorPIS: taxCalculation(saleValue, pis),
        valorCOFINS: taxCalculation(saleValue, cofins),
        valorINSS: taxCalculation(saleValue, inss),
        valorISSQN: taxCalculation(saleValue, issqn)
    }
}

function getInputValues(){
    const itens = document.getElementById("saleItens").value;
    const irpf = parseFloat(document.getElementById("irpf").value);
    	const pis = parseFloat(document.getElementById("pis").value);
    const cofins = parseFloat(document.getElementById("cofins").value);
    const inss = parseFloat(document.getElementById("inss").value);
    const issqn = parseFloat(document.getElementById("issqn").value);

    return{
        itens,
        irpf,
        pis,
        cofins,
        inss,
        issqn
    }

}

const taxesInputs = document.querySelectorAll('.tax').forEach((input) =>{
    input.addEventListener('input', (e)=>{
        if(e.target.value > 100){
            e.target.value = 100
        }
        if(e.target.value < 0){
            e.target.value = 0
        }
    })
})