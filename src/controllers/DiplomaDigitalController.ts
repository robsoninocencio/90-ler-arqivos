import { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";

import fs from "fs";

// import { Readable } from "stream";
// import readline from "readline";

// import { client } from "./database/client";

export default {
  async login(req: Request, res: Response) {
    try {
      let configLogin = {
        headers: {
          "Content-Type": "application/json",
          "Custom-Origin": "https://univille.abaris.com.br/",
          version: `${req.headers.version}`,
        },
      };
      // console.log(configLogin);
      const bodyLogin =
        '{"userName": "api.integra", "password": "@pi.1nt3gr@"}';
      const login = await axios.post(
        "https://workflow.abaris.com.br/api/v1/login",
        bodyLogin,
        configLogin
      );
      // console.log(login.data.rsaKey);
      // return res.json(login.data);

      let configFlow = {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${login.data.rsaKey}`,
          version: `${req.headers.version}`,
        },
      };
      // console.log(configFlow);
      const body = `{
        "idProcessVersion": 0,
        "processName": "Emissão de Diploma",
        "attributes": [
          {
            "id": 0,
            "name": "Nome",
            "value": "FRANCINE SCHROEDER"
          },
          {
            "id": 0,
            "name": "CPF",
            "value": "03030929981"
          },
          {
            "id": 0,
            "name": "Matricula",
            "value": "1004200055"
          },
          {
            "id": 0,
            "name": "Curso",
            "value": "42"
          },
          {
            "id": 0,
            "name": "Assinador 1",
            "value": "154694"
          },
          {
            "id": 0,
            "name": "Assinador 2",
            "value": "francine.schroeder@univille.br"
          },
          {
            "id": 0,
            "name": "Assinador 3",
            "value": "154694"
          },
          {
            "id": 0,
            "name": "Assinador 4",
            "value": "154694"
          },
          {
            "id": 0,
            "name": "Assinador 5",
            "value": "154694"
          },
          {
            "id": 0,
            "name": "Assinador 6",
            "value": "154694"
          },
          {
            "id": 0,
            "name": "Tipo de Documento Dados para Emissão",
            "value": "DADOS PARA EMISSÃO DE DIPLOMA"
          },
          {
            "id": 0,
            "name": "Tipo de Documento Diplomado",
            "value": "XML DO DIPLOMADO"
          },
          {
            "id": 0,
            "name": "Tipo de Documento Institucional",
            "value": "XML INSTITUCIONAL"
          },
          {
            "id": 0,
            "name": "Nome do Template",
            "value": "Representação Visual do Diploma"
          },
          {
            "id": 0,
            "name": "RA",
            "value": "1004200055"
          },
          {
            "id": 0,
            "name": "Assinador Diploma",
            "value": "154694"
          },
          {
            "id": 0,
            "name": "RetornoAssinaturaDadosDiplomaPJ",
            "value": "154694"
          },
          {
            "id": 0,
            "name": "RetornoAssinaturaDocumentacaoAcademicaRegistro",
            "value": "154694"
          }
        ]
      }`;
      const flow = await axios.post(
        "https://workflow.abaris.com.br/api/v1/flows",
        body,
        configFlow
      );
      // console.log(flow.data);
      // return res.json(flow.data);

      let configAttach = {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          "x-api-key": `${login.data.rsaKey}`,
          version: `${req.headers.version}`,
        },
      };
      console.log(configAttach);

      // let jsonData = JSON.stringify(req.body, null, 2);
      let jsonData = `
{"Id":"1004200055","DadosDiploma":{"Diplomado":{"ID":"1004200055","Nome":"FRANCINE SCHROEDER","Sexo":"F","Nacionalidade":"Brasileira","Naturalidade":{"CodigoMunicipio":"0009102","NomeMunicipio":"JOINVILLE","UF":"SC"},"CPF":"03030929981","RG":{"Numero":"2R3923303","UF":"SC"},"DataNascimento":"1981-05-03"},"DataConclusao":"2005-04-01","DadosCurso":{"NomeCurso":"CIÊNCIAS ECONÔMICAS","CodigoCursoEMEC":"3800","NomeHabilitacao":".","Modalidade":"Presencial","TituloConferido":{"Titulo":"Bacharela"},"GrauConferido":"Bacharelado","EnderecoCurso":{"Logradouro":"10, Paulo Malschitzki","Complemento":"FALTANDO ***** ","Bairro":"Zona Industrial Norte","CodigoMunicipio":"0009102","NomeMunicipio":"Joinville","UF":"SC","CEP":"89219710"},"Autorizacao":{"Tipo":"ATA","Numero":"1","Data":"2002-01-01","veiculoPublicacao":"FALTANDO ***** ","dataPublicacao":"2002-01-01","secaoPublicacao":"1","paginaPublicacao":"1"},"Reconhecimento":{"Tipo":"RESOLUÇÃO","Numero":"5","Data":"2021-05-05","veiculoPublicacao":"FALTANDO ***** ","dataPublicacao":"2021-05-05","secaoPublicacao":"5","paginaPublicacao":"5"},"renovacaoReconhecimento":{"Tipo":"","Numero":"","Data":"","veiculoPublicacao":"FALTANDO ***** ","dataPublicacao":"","paginaPublicacao":"FALTANDO ***** "}},"IesEmissora":{"Nome":"UNIVERSIDADE DA REGIÃO DE JOINVILLE","CodigoMEC":"081","CNPJ":"84714682000194","Endereco":{"Logradouro":"Paulo Malschitzki","Numero":"10","Bairro":"Zona Industrial Norte","CodigoMunicipio":"0009102","NomeMunicipio":"Joinville","UF":"SC","CEP":"89219710"},"Credenciamento":{"Tipo":"1","Numero":"129","Data":"2020-06-09","dataPublicacao":"2020-07-08","secaoPublicacao":"1","paginaPublicacao":"1"},"Recredenciamento":{"Tipo":"1","Numero":"129","Data":"2020-06-09","dataPublicacao":"2020-07-08","secaoPublicacao":"1","paginaPublicacao":"24"},"Mantenedora":{"RazaoSocial":"Fundação Educacional da Região de Joinville - FURJ","CNPJ":"84714682000194","Endereco":{"Logradouro":"Paulo Malschitzki","Numero":"10","Bairro":"Zona Industrial Norte","CodigoMunicipio":"0009102","NomeMunicipio":"Joinville","UF":"SC","CEP":"89219710"}}}},"DadosRegistro":{"IesRegistradora":{"Nome":"UNIVERSIDADE DA REGIÃO DE JOINVILLE","CodigoMEC":"081","CNPJ":"84714682000194","Endereco":{"Logradouro":"Paulo Malschitzki","Numero":"10","Bairro":"FALTANDO ***** ","CodigoMunicipio":"0009102","NomeMunicipio":"Joinville","UF":"SC","CEP":"89219710"},"Credenciamento":{"Tipo":"1","Numero":"129","Data":"2020-06-09","DataPublicacao":"2020-07-08","SecaoPublicacao":"1","PaginaPublicacao":"24"},"Recredenciamento":{"Tipo":"1","Numero":"129","Data":"2020-06-09","DataPublicacao":"2020-07-08","SecaoPublicacao":"1","PaginaPublicacao":"24"},"Mantenedora":{"RazaoSocial":"Fundação Educacional da Região de Joinville - FURJ","CNPJ":"84714682000194","Endereco":{"Logradouro":"Paulo Malschitzki","Numero":"10","Bairro":"Zona Industrial Norte","CodigoMunicipio":"0009102","NomeMunicipio":"Joinville","UF":"SC","CEP":"89219710"}}},"LivroRegistro":{"LivroRegistro":"524\/2005","NumeroFolhaDoDiploma":"2001\/1","NumeroSequenciaDoDiploma":" ","ProcessoDoDiploma":"123456","DataColacaoGrau":"2005-04-01","DataExpedicaoDiploma":"2005-05-09","DataRegistroDiploma":"2005-05-09","ResponsavelRegistro":{"Nome":"Chirlene Ramos Quandt","CPF":"00387117962","IDouNumeroMatricula":"150034"}}},"DadosPrivadosDiplomado":{"CargaHorariaCurso":0.0000,"HistoricoEscolar":{"DataEmissaoHistorico":"2005-05-09","SituacaoAluno":"Aprovado","ENADE":{"Situacao":"FALTANDO ***** "},"CargaHorariaCursoIntegralizada":"FALTANDO ***** ","MatrizCurricular":[{"Disciplina":"PENSAMENTO ECONÔMICO CONTEMPORÂNEO","Periodo":3,"Nota":8.82,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"GELTA MADALENA JONCK PEDROSO","Titulacao":"DOUTORADO"}]}},{"Disciplina":"ECONOMIA BRASILEIRA","Periodo":4,"Nota":8.25,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"EZEQUIEL SEBASTIAO CYPRIANO DA LUZ","Titulacao":"MESTRADO"}]}},{"Disciplina":"CIÊNCIA POLÍTICA","Periodo":2,"Nota":8.50,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"JOSE CARLOS ELOY MARTINS","Titulacao":"MESTRADO"}]}},{"Disciplina":"ELABORAÇÃO E ANÁLISE DE PROJETOS","Periodo":4,"Nota":9.50,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"AIRTON NAGEL ZANGHELINI","Titulacao":"MESTRADO"}]}},{"Disciplina":"MONOGRAFIA","Periodo":4,"Nota":9.70,"CargaHoraria":134,"Docentes":{"Docente":[{"Nome":"JAIDETTE FARIAS KLUG","Titulacao":"DOUTORADO"},{"Nome":"FABIOLA POSSAMAI","Titulacao":"DOUTORADO"}]}},{"Disciplina":"CONTABILIDADE E ANÁLISE DE BALANÇOS","Periodo":2,"Nota":8.20,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"EDSON JOSE BORGES","Titulacao":"GRADUADO"}]}},{"Disciplina":"ECONOMIA DO SETOR PÚBLICO","Periodo":4,"Nota":8.25,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"LUCIANO MORAES COELHO","Titulacao":"MESTRADO"}]}},{"Disciplina":"HISTÓRIA ECONÔMICA GERAL","Periodo":1,"Nota":8.10,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"GELTA MADALENA JONCK PEDROSO","Titulacao":"DOUTORADO"}]}},{"Disciplina":"INTRODUÇÃO ÀS CIÊNCIAS SOCIAIS","Periodo":1,"Nota":8.60,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"ELEIDE ABRIL GORDON FINDLAY","Titulacao":"MESTRADO"}]}},{"Disciplina":"ESTATÍSTICA ECONÔMICA E INTRODUÇÃO À ECONOMETRIA","Periodo":2,"Nota":8.00,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"VOLNEI AVILSON SOETHE","Titulacao":"DOUTORADO"}]}},{"Disciplina":"ECONOMIA DA TECNOLOGIA DA INFORMAÇÃO","Periodo":4,"Nota":8.75,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"CELSO RICARDO SALAZAR VALENTIM","Titulacao":"DOUTORADO"},{"Nome":"MARCIO ROBERTO SCHUNEMANN","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"INTRODUÇÃO À ECONOMIA","Periodo":1,"Nota":8.70,"CargaHoraria":128,"Docentes":{"Docente":[{"Nome":"JANI FLORIANO","Titulacao":"DOUTORADO"}]}},{"Disciplina":"MATEMÁTICA","Periodo":2,"Nota":9.10,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"EVANDRO BITTENCOURT","Titulacao":"DOUTORADO"},{"Nome":"FERNANDO LUIZ ANDRADE BAHIENSE","Titulacao":"DOUTORADO"},{"Nome":"MARIA APARECIDA PACHECO","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"ECONOMIA DA TECNOLOGIA DA INFORMAÇÃO","Periodo":4,"Nota":8.75,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"CELSO RICARDO SALAZAR VALENTIM","Titulacao":"DOUTORADO"},{"Nome":"MARCIO ROBERTO SCHUNEMANN","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"PLANEJAMENTO DE NEGÓCIOS","Periodo":4,"Nota":9.50,"CargaHoraria":128,"Docentes":{"Docente":[{"Nome":"ADILSON GOMES DE OLIVEIRA","Titulacao":"MESTRADO"}]}},{"Disciplina":"TEORIA MICROECONÔMICA","Periodo":2,"Nota":7.70,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"ACHILES JULIO SCHUNEMANN","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"ANÁLISE CONJUNTURAL PARA EMPREENDEDORES","Periodo":3,"Nota":9.05,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"MARCIO ROGERIO DE OLIVEIRA","Titulacao":"MESTRADO"}]}},{"Disciplina":"ECONOMIA INDUSTRIAL","Periodo":4,"Nota":7.87,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"ALCIDES ALVES MACHADO NETO","Titulacao":"MESTRADO"}]}},{"Disciplina":"ESTATÍSTICA","Periodo":1,"Nota":9.70,"CargaHoraria":128,"Docentes":{"Docente":[{"Nome":"VOLNEI AVILSON SOETHE","Titulacao":"DOUTORADO"}]}},{"Disciplina":"CONTABILIDADE SOCIAL","Periodo":1,"Nota":8.50,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"ADEMIR JOSE DEMETRIO","Titulacao":"MESTRADO"},{"Nome":"ALCIDES ALVES MACHADO NETO","Titulacao":"MESTRADO"}]}},{"Disciplina":"ECONOMIA INTERNACIONAL","Periodo":3,"Nota":8.50,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"KUNIBERTO SACHT","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"MATEMÁTICA","Periodo":1,"Nota":8.60,"CargaHoraria":128,"Docentes":{"Docente":[{"Nome":"EVANDRO BITTENCOURT","Titulacao":"DOUTORADO"},{"Nome":"FERNANDO LUIZ ANDRADE BAHIENSE","Titulacao":"DOUTORADO"},{"Nome":"MARIA APARECIDA PACHECO","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"ECONOMIA MUNDIAL","Periodo":4,"Nota":8.62,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"EZEQUIEL SEBASTIAO CYPRIANO DA LUZ","Titulacao":"MESTRADO"}]}},{"Disciplina":"INSTITUIÇÕES DE DIREITO","Periodo":3,"Nota":9.12,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"JORGE LUIZ CHAVES","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"DESENVOLVIMENTO SÓCIO-ECONÔMICO","Periodo":4,"Nota":8.62,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"VALDESIO BENEVENUTTI","Titulacao":"MESTRADO"}]}},{"Disciplina":"TEORIA MACROECONÔMICA","Periodo":2,"Nota":8.30,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"JANI FLORIANO","Titulacao":"DOUTORADO"}]}},{"Disciplina":"CUSTOS","Periodo":2,"Nota":9.20,"CargaHoraria":128,"Docentes":{"Docente":[{"Nome":"EZEQUIEL SEBASTIAO CYPRIANO DA LUZ","Titulacao":"MESTRADO"}]}},{"Disciplina":"FORMAÇÃO ECONÔMICA DO BRASIL","Periodo":2,"Nota":9.20,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"ENEIDA RAQUEL DE S THIAGO","Titulacao":"MESTRADO"}]}},{"Disciplina":"METODOLOGIA DA PESQUISA","Periodo":1,"Nota":8.90,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"TATIANA COMIOTTO MENESTRINA","Titulacao":"DOUTORADO"}]}},{"Disciplina":"CONTABILIDADE SOCIAL","Periodo":1,"Nota":8.50,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"ADEMIR JOSE DEMETRIO","Titulacao":"MESTRADO"},{"Nome":"ALCIDES ALVES MACHADO NETO","Titulacao":"MESTRADO"}]}},{"Disciplina":"CONSULTORIA ECONÔMICA","Periodo":4,"Nota":8.45,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"SANDRA REGINA MIERS","Titulacao":"GRADUADO"}]}},{"Disciplina":"MICROECONOMIA PARA EMPREENDEDORES","Periodo":3,"Nota":8.62,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"JANI FLORIANO","Titulacao":"DOUTORADO"}]}},{"Disciplina":"MATEMÁTICA","Periodo":2,"Nota":9.10,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"EVANDRO BITTENCOURT","Titulacao":"DOUTORADO"},{"Nome":"FERNANDO LUIZ ANDRADE BAHIENSE","Titulacao":"DOUTORADO"},{"Nome":"MARIA APARECIDA PACHECO","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"MONOGRAFIA","Periodo":3,"Nota":10.00,"CargaHoraria":134,"Docentes":{"Docente":[{"Nome":"JAIDETTE FARIAS KLUG","Titulacao":"DOUTORADO"},{"Nome":"FABIOLA POSSAMAI","Titulacao":"DOUTORADO"}]}},{"Disciplina":"ECONOMIA MONETÁRIA","Periodo":3,"Nota":8.50,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"JULIAN BERNARDO TOBAR TOLEDO","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"ANÁLISE ECONÔMICA DE EMPRESAS","Periodo":3,"Nota":9.87,"CargaHoraria":128,"Docentes":{"Docente":[{"Nome":"JOSE CARLOS RODRIGUES","Titulacao":"ESPECIALIZAÇÃO"}]}},{"Disciplina":"HISTÓRIA DO PENSAMENTO ECONÔMICO","Periodo":2,"Nota":8.30,"CargaHoraria":64,"Docentes":{"Docente":[{"Nome":"GELTA MADALENA JONCK PEDROSO","Titulacao":"DOUTORADO"}]}}]},"IngressoCurso":{"Data":"2001-01-01","FormaAcesso":"VESTIBULAR","DataConclusao":"2005-04-01"}},"TermoResponsabilidade":{"Nome":"Chirlene Ramos Quandt","CPF":"00387117962","Cargo":"Responsável pelo SERD\/UNIVILLE"}}
      `;

      // console.log(jsonData);

      const filePath = __dirname + "/jsonFile.json";

      fs.writeFileSync(filePath, jsonData);
      // fs.writeFileSync(filePath, "");
      // fs.writeFile(filePath, jsonData, function (err) {
      //   if (err) {
      //     console.log("Erro na criação do arquivo");
      //     console.error(err);
      //   }
      //   console.log("Arquivo Criado");
      // });

      const file = fs.readFileSync(filePath, { encoding: "utf8" });
      // fs.readFile(filePath, async (err, file) => {
      // if (err) {
      //   console.log("Erro na leitura do arquivo");
      //   console.error(err);
      // }

      // console.log("file");
      // console.log(file);

      const formData = new FormData();
      formData.append("FileName", filePath);
      formData.append("NameDocType", "DADOS PARA EMISSÃO DE DIPLOMA");
      formData.append("idFlow", flow.data);
      formData.append(
        "jsonIndex",
        JSON.stringify({
          NOME: "FRANCINE SCHROEDER",
          CPF: "03030929981",
          RA: "1004200055",
          NOMECURSO: "CIÊNCIAS ECONÔMICAS",
        })
      );
      formData.append("Format", "1");

      formData.append("File", file, {
        filepath: filePath,
        contentType: "text/plain",
      });

      // console.log("formData");
      // console.log(formData);

      // console.log("configAttach");
      // console.log(configAttach);

      const attach = await axios.post(
        "https://workflow.abaris.com.br/api/v1/attached-documents/attach-new",
        formData,
        configAttach
      );
      console.log("attach.data");
      console.log(attach.data);
      return attach.data;

      // });
    } catch (error) {
      console.error("Houve um erro:");
      console.error(error);
    }
  },

  async attachNew(req: Request, res: Response) {
    // console.log(JSON.stringify(req.body, null, 2));
    let jsonData = JSON.stringify(req.body, null, 2);
    // console.log(jsonData);
    fs.writeFileSync("jsonFile.json", jsonData);

    // try {
    //   let config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "x-api-key": `'${req.headers.xapikey}'`,
    //       version: `'${req.headers.version}'`,
    //     },
    //   };
    //   console.log(config);
    //   // const body = '{"userName": "api.integra", "password": "@pi.1nt3gr@"}';
    //   // const { data } = await axios.post(
    //   //   "https://workflow.abaris.com.br/api/v1/login",
    //   //   body,
    //   //   config
    //   // );
    //   // //   return res.json("ok");
    //   // return res.json(data);
    // } catch (error) {
    //   console.error(error);
    // }
    // console.log(req);
    // console.log(req.file?.buffer.toString("utf-8"));
    // const { file } = req;
    // const { buffer }: any = file;

    // const readableFile = new Readable();
    // readableFile.push(buffer);
    // readableFile.push(null);

    // const productsLine = readline.createInterface({
    //   input: readableFile,
    // });

    // const products: Product[] = [];

    // for await (let line of productsLine) {
    //   // console.log(line);
    //   const productLineSplit = line.split(",");

    //   // console.log(productLineSplit[0]);

    //   products.push({
    //     code_bar: productLineSplit[0],
    //     description: productLineSplit[1],
    //     price: Number(productLineSplit[2]),
    //     quantity: Number(productLineSplit[3]),
    //   });
    // }

    // for await (let { code_bar, description, price, quantity } of products) {
    //   await client.products.create({
    //     data: {
    //       code_bar,
    //       description,
    //       price,
    //       quantity,
    //     },
    //   });
    // }

    // return res.json(products);
    return res.json("ok");
  },
};

// Modelo 2
// axios.defaults.headers.post['header1'] = 'value' // for POST requests
// axios.defaults.headers.common['header1'] = 'value' // for all requests
// axios.defaults.headers.post['Custom-Origin'] = 'https://univille.abaris.com.br/'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['version'] = req.headers.version

// try {
//     const body = '{"userName": "api.integra", "password": "@pi.1nt3gr@"}'
//     const { data } = await axios.post('https://workflow.abaris.com.br/api/v1/login', body);
//     return res.json(data)
// } catch (error) {
//     console.error(error);
// }
