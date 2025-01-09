export default function valueFormatter(input){
    let valor = input.value

    valor = valor.replace(/\D/g, "")

    valor = (valor / 100).toFixed(2)

    input.value = "R$ " + valor.replace(".", ",")
}