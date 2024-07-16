document.addEventListener("DOMContentLoaded", function () {
  const dados = [
    // 
    {
      descricao: "São Paulo (SP) and Recife (PE): Solidarity app launched, connecting 4,000 adolescents and young people from vulnerable areas to offer services, allowing them to generate income in a way that is appropriate to their age and training.",
      realizado: 12,
      cidade: "São Paulo",
      jovens: "450 youths"
    },
    {
      descricao: "Selo UNICEF: 1,200 young people mobilized through 60 civil society organizations, youth collectives, and community leaders in the 1,830 municipalities that joined the 1MiO within the UNICEF Seal initiative.",
      realizado: 100,
      jovens: "101.371 youths"
    },
    {
      descricao: "#AgendaCidadeUNICEF 08 urban centers: 16 community-based organizations and youth collectives in 8 cities, mobilizing young people aged 14-29 in vulnerable situations for professional training and access to income generation.",
      realizado: 100,
      jovens: "20 organizations"
    },
    {
      descricao: "National: 20,000 young people aged 16 to 29, in 10 urban communities, mobilized by the 'Periferia Viva' program, in partnership with the Ministry of Cities, to access decent work opportunities and local development.",
      realizado: 0,
      jovens: "In progress"
    },
    {
      descricao: "2,000 young people mobilized, with 120 directly participating in three innovation bootcamps focused on solutions for climate change and community development.",
      realizado: 0,
      jovens: "In progress",
      onhold: true
    },
    {
      descricao: "National and MG: 4,000 young people aged 14-17 from student unions and other initiatives created in school communities, engaged in activities for a positive transition from basic education to the world of work.",
      realizado: 100,
      jovens: "9780 youths"
    },
    {
      descricao: "Belém: 1.500 youth aged 14-29 mobilized to access decent work, job-specific skills, and income-generation opportunities through the 1MiO platform.",
      realizado: 52,
      jovens: "779 youths"
    },
    {
      descricao: "Municipalities from PICERN: 390 municipalities from PICERN participating in the UNICEF Seal and a neighborhood in Fortaleza participating in the AGU are implementing strategies to access decent work, job-specific skills and income generation opportunities.",
      realizado: 92,
      jovens: "356 municipalities"
    },
    {
      descricao: "Municipalities from PE, AL, PB: 487 municipalities from PE, AL, PB participating in the UNICEF Seal are implementing strategies to access decent work, job-specific skills and income generation opportunities.",
      realizado: 52,
      jovens: "254 municipalities"
    },
    {
      descricao: "Recife: 1.500 youth aged 14-29 mobilized to access decent work, job-specific skills, and income-generation opportunities through the 1MiO platform.",
      realizado: 34,
      jovens: "509 youths"
    },
    {
      descricao: "Recife: 150 aged 14-29 from the Ibura territory, accessing decent work, job-specific skills, and income-generation opportunities through a community event.",
      realizado: 0,
      jovens: "In progress"
    },
    {
      descricao: "Salvador: 1.000 youth aged 14-29 mobilized to access decent work, job-specific skills, and income-generation opportunities through the 1MiO platform.",
      realizado: 73,
      jovens: "728 youths"
    },
    {
      descricao: "Salvador: 80 youth 14-29 aged mobilized to co-create innovation solutions based on Human Centred-Design framework to develop community engagement and life projects.",
      realizado: 0,
      jovens: "In progress"
    },
    {
      descricao: "São Luís, Bequimão, Alcântara, Rosário, Tutóia and Santo Amaro do Maranhão: 200 young people mobilized accessing job opportunities, with a key exemplary intervention integrating income generation, civic engagement in advocacy for public policies, and competences for life, at community level with NUCAS.",
      realizado: 100,
      jovens: "2686 youths"
    },
    {
      descricao: "Rio de Janeiro: 1.000 youth aged 14-29 mobilized to access decent work, job-specific skills, and income-generation opportunities through the 1MiO platform.",
      realizado: 100,
      jovens: "1699 youths"
    },
    {
      descricao: "Rio de Janeiro: Young leaders mobilized and engaged to discuss access to opportunitites in the Y20 context.",
      realizado: 0,
      jovens: "On hold",
      onhold: true
    },
    {
      descricao: "São Paulo: 1.000 youth aged 14-29 mobilized to access decent work, job-specific skills, and income-generation opportunities through the 1MiO platform.",
      realizado: 100,
      jovens: "3048 youths"
    },
    {
      descricao: "Roraima: 100 migrants and refugees aged 14-29 mobilized to co-create innovation solutions based on Human Centred-Design framework to develop community engagement and life projects.",
      realizado: 0,
      jovens: "In progress",
      onhold: true
    },
  ];

  function calcularPorcentagem(realizado) {
    return Math.round(realizado);
  }

  const notOnHold = dados.filter(item => !item.onhold);

  const totalRealizado = notOnHold.reduce((sum, item) => sum + item.realizado, 0);
  const porcentagemTotal = Math.round(totalRealizado / notOnHold.length);

  const graficoGeralCanvas = document.getElementById('graficoGeral').getContext('2d');
  const graficoGeral = new Chart(graficoGeralCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Remaining', 'Completed'],
      datasets: [{
        data: [100 - porcentagemTotal, porcentagemTotal],
        backgroundColor: ['#ccc', '#02a402'],
        borderWidth: 1,
      }, ],
    },
    options: {
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            if (context.dataIndex === 1) {
              return value + '%';
            }
            return '';
          },
          color: '#ffffff',
          font: {
            weight: 'bold',
            size: 16,
          },
          anchor: 'center',
          align: 'center',
        },
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return (
              data.labels[tooltipItem.index] +
              ': ' +
              Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]) +
              '%'
            );
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });


  const containerGraficos = document.querySelector('#detalhes .container');
  const containerOnhold = document.querySelector('#onhold .container');

  dados.forEach(function (item) {
    const div = document.createElement('div');
    div.classList.add('grafico-item');

    const descricao = document.createElement('p');
    descricao.textContent = item.descricao;
    descricao.style.textAlign = 'center';
    descricao.style.marginBottom = '10px';
    descricao.style.fontSize = '12px';

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    div.appendChild(descricao);
    div.appendChild(canvas);

    if (item.onhold) {
      containerOnhold.appendChild(div);
    } else {
      containerGraficos.appendChild(div);
    }


    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Remaining', 'Completed'],
        datasets: [{
          data: [100 - calcularPorcentagem(item.realizado), calcularPorcentagem(item.realizado)],
          backgroundColor: ['#ccc', '#0794ff'],
          borderWidth: 1,
        }, ],
      },
      options: {
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              if (context.dataIndex === 1) {
                return value + '%';
              }
              return '';
            },
            color: '#ffffff',
            font: {
              weight: 'bold',
              size: 15,
            },
            anchor: 'center',
            align: 'center',
          },
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return (
                data.labels[tooltipItem.index] +
                ': ' +
                Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]) +
                '%'
              );
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    const jovensInfo = document.createElement('p');
    jovensInfo.textContent = item.jovens;
    jovensInfo.classList.add('jovens-info');
    div.appendChild(jovensInfo);

    // const cidadeinfo = document.createElement('p');
    // cidadeinfo.textContent = item.cidade;
    // cidadeinfo.classList.add('jovens-info');
    // div.appendChild(cidadeinfo); 
  });
});