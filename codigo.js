/**
 * SISTEMA DE CONTROLE CAD/CAM - SERVIDOR
 * Tecnologia: Google Apps Script / Google Sheets API
 */

// ID da Planilha Centralizadora de Dados
const SS_ID = "10cJdZ1t6l3xSk_1nAr-k8mzrDBfCMjKQmBcJvLDCE3M"; 

/**
 * Abre a planilha ativa utilizando o ID configurado
 * @return {SpreadsheetApp.Spreadsheet}
 */
function obterPlanilha() {
  return SpreadsheetApp.openById(SS_ID);
}

/**
 * Renderiza a interface web principal do sistema
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('src/ControleCAD') // Ajustado para a árvore local (no Apps Script use apenas 'ControleCAD')
    .evaluate()
    .setTitle('Controle Cad/Cam')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Dashboard: Soma a coluna G (índice 6) da aba "ATUAL"
 * @return {Number} Total de unidades produzidas
 */
function getResumoDashboard() {
  try {
    const ss = obterPlanilha();
    const aba = ss.getSheetByName("ATUAL");
    if (!aba) return 0;
    
    const dados = aba.getDataRange().getValues();
    if (dados.length < 2) return 0;

    return dados.slice(1).reduce((acc, linha) => {
      const valor = parseFloat(linha[6]); // Coluna G
      return (!isNaN(valor)) ? acc + valor : acc;
    }, 0);
  } catch (e) { 
    console.error("Erro no Dashboard: " + e.message);
    return 0; 
  }
}

/**
 * Busca Global: Pesquisa por um termo em todas as abas da planilha
 * @param {String} nome Termo ou nome a ser pesquisado
 * @return {Array[]} Matriz com as linhas correspondentes encontradas
 */
function buscarPacienteGlobal(nome) {
  let todosResultados = [];
  try {
    const ss = obterPlanilha();
    const abas = ss.getSheets();
    
    if (!nome) return [];
    const termo = nome.toString().toLowerCase().trim();

    abas.forEach(aba => {
      const dados = aba.getDataRange().getDisplayValues(); 
      if (dados.length < 1) return;

      for (var i = 1; i < dados.length; i++) {
        var linhaTexto = dados[i].join(" ").toLowerCase();
        if (linhaTexto.indexOf(termo) !== -1) {
          todosResultados.push(dados[i]);
        }
      }
    });

    console.log("Busca concluída. Total encontrado: " + todosResultados.length);
    return todosResultados;
  } catch (e) {
    console.error("Erro na busca: " + e.message);
    return [];
  }
}

/**
 * Relatório: Retorna dados estruturados estritamente da aba "ATUAL"
 * @return {Array<Object>} Lista de objetos contendo dados do procedimento
 */
function getDadosParaRelatorio() {
  try {
    const ss = obterPlanilha();
    const aba = ss.getSheetByName("ATUAL"); // Padronizado para caixa alta
    if (!aba) return [];

    const dados = aba.getDataRange().getValues();
    if (dados.length < 2) return [];

    return dados.slice(1)
      .filter(l => l[0] && l[0].toString().trim() !== "")
      .map(l => ({
        paciente: l[0],
        material: l[1],
        data: l[3],     // Coluna D na gravação (Índice 3)
        unidades: l[6]  // Coluna G na gravação (Índice 6)
      }));
  } catch (e) {
    console.error("Erro no Relatório: " + e.message);
    return [];
  }
}

/**
 * Salva um novo registro de procedimento odontológico na aba "ATUAL"
 * @param {Object} obj Dados coletados do formulário HTML
 * @return {Boolean|String} True se salvo com sucesso ou mensagem de erro
 */
function salvarNovoProcedimento(obj) {
  try {
    const ss = obterPlanilha();
    const aba = ss.getSheetByName("ATUAL"); // Padronizado para caixa alta
    if (!aba) return "Erro: Aba ATUAL não encontrada";

    // Cria a estrutura exata mapeada para colunas de A até I
    const novaLinha = [
      obj.paciente,   // Coluna A
      obj.material,   // Coluna B
      obj.qtd,        // Coluna C
      obj.data,       // Coluna D
      obj.cadista,    // Coluna E
      obj.doutor,     // Coluna F
      obj.unid,       // Coluna G
      obj.dente,      // Coluna H
      obj.cor         // Coluna I
    ];

    aba.appendRow(novaLinha);
    return true;
  } catch (e) {
    return "Erro ao salvar: " + e.message;
  }
}
