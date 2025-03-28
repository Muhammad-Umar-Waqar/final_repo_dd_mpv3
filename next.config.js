// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['next-auth'],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
    // domains: [
    //   {
    //     domain: 'dediabetes.com',
    //     defaultLocale: 'en',
    //   },
    //   {
    //     domain: 'dediabetes.com',
    //     defaultLocale: 'es',
    //   },
    // ],
  },
  images: {
    domains: ['images.prismic.io', 'dediabetes.cdn.prismic.io'],
  },
  webpack: (config, { dev, isServer }) => {
    // Add SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Optimize Fast Refresh
    if (dev && !isServer) {
      config.optimization.moduleIds = 'named';
      config.optimization.chunkIds = 'named';
    }

    // Handle Node.js modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
        'fs/promises': false,
        fs: false,
        'timers/promises': false,
        child_process: false,
        'util/types': false,
        util: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/preview',
        destination: '/api/preview',
        permanent: false,
      },
      {
        source: '/research/:uid',
        destination: '/:uid',
        permanent: true,
      },
      {
        source: '/es/research/:uid',
        destination: '/es/:uid',
        permanent: true,
      },
      {
        source: '/recetas/:uid',
        destination: '/',
        permanent: true,
      },
      {
        source: '/consejos/:uid',
        destination: '/',
        permanent: true,
      },
      // New Spanish blog redirects
      {
        source: '/acido-linoleico-conjugado',
        destination: '/es/blog/acido-linoleico-conjugado',
        permanent: true,
      },
      {
        source: '/acido-lipoico-diabetes',
        destination: '/es/blog/acido-lipoico-diabetes',
        permanent: true,
      },
      {
        source: '/a-cual-especialista-debes-acudir-cuando-tienes-diabetes',
        destination: '/es/blog/a-cual-especialista-debes-acudir-cuando-tienes-diabetes',
        permanent: true,
      },
      {
        source: '/alivio-para-el-dolor-de-cabeza-diabetes',
        destination: '/es/blog/alivio-para-el-dolor-de-cabeza-diabetes',
        permanent: true,
      },
      {
        source: '/alucinaciones',
        destination: '/es/blog/alucinaciones',
        permanent: true,
      },
      {
        source: '/antiacidos-coadyuvante-diabetes',
        destination: '/es/blog/antiacidos-coadyuvante-diabetes',
        permanent: true,
      },
      {
        source: '/arizona-descubrimiento-tratamiento',
        destination: '/es/blog/arizona-descubrimiento-tratamiento',
        permanent: true,
      },
      {
        source: '/bebidas-alcoholicas-sin-azucar',
        destination: '/es/blog/bebidas-alcoholicas-sin-azucar',
        permanent: true,
      },
      {
        source: '/beneficios-controlar-la-tension-arterial',
        destination: '/es/blog/beneficios-controlar-la-tension-arterial',
        permanent: true,
      },
      {
        source: '/berberina-para-que-sirve',
        destination: '/es/blog/berberina-para-que-sirve',
        permanent: true,
      },
      {
        source: '/biohackers-precio-insulina',
        destination: '/es/blog/biohackers-precio-insulina',
        permanent: true,
      },
      {
        source: '/canela-glucosa-alta',
        destination: '/es/blog/canela-glucosa-alta',
        permanent: true,
      },
      {
        source: '/causas-de-ardor-en-las-orejas',
        destination: '/es/blog/causas-de-ardor-en-las-orejas',
        permanent: true,
      },
      {
        source: '/celebridades-con-diabetes-tipo-1',
        destination: '/es/blog/celebridades-con-diabetes-tipo-1',
        permanent: true,
      },
      {
        source: '/cirugia-del-corazon-diabeticos',
        destination: '/es/blog/cirugia-del-corazon-diabeticos',
        permanent: true,
      },
      {
        source: '/cirugia-metabolica',
        destination: '/es/blog/cirugia-metabolica',
        permanent: true,
      },
      {
        source: '/comidas-para-diabeticos',
        destination: '/es/blog/comidas-para-diabeticos',
        permanent: true,
      },
      {
        source: '/como-controlar-la-diabetes',
        destination: '/es/blog/como-controlar-la-diabetes',
        permanent: true,
      },
      {
        source: '/como-deshacerse-del-mal-aliento-provocado-por-la-diabetes',
        destination: '/es/blog/como-deshacerse-del-mal-aliento-provocado-por-la-diabetes',
        permanent: true,
      },
      {
        source: '/como-evitar-depresion-diabetes',
        destination: '/es/blog/como-evitar-depresion-diabetes',
        permanent: true,
      },
      {
        source: '/como-la-deshidratacion-afecta-los-niveles-de-la-glucosa-en-la-sangre',
        destination: '/es/blog/como-la-deshidratacion-afecta-los-niveles-de-la-glucosa-en-la-sangre',
        permanent: true,
      },
      {
        source: '/como-lidiar-con-el-letargo-diabetico-ultima-parte',
        destination: '/es/blog/como-lidiar-con-el-letargo-diabetico-ultima-parte',
        permanent: true,
      },
      {
        source: '/como-manejar-mal-humor',
        destination: '/es/blog/como-manejar-mal-humor',
        permanent: true,
      },
      {
        source: '/como-se-puede-tatuar-un-diabetico',
        destination: '/es/blog/como-se-puede-tatuar-un-diabetico',
        permanent: true,
      },
      {
        source: '/controlar-hipertension-diabetes',
        destination: '/es/blog/controlar-hipertension-diabetes',
        permanent: true,
      },
      {
        source: '/cremas-cuidado-piel-diabetes',
        destination: '/es/blog/cremas-cuidado-piel-diabetes',
        permanent: true,
      },
      {
        source: '/cuales-son-los-carbohidratos-buenos-para-los-diabeticos',
        destination: '/es/blog/cuales-son-los-carbohidratos-buenos-para-los-diabeticos',
        permanent: true,
      },
      {
        source: '/cuando-tomar-aspirina-para-el-corazon',
        destination: '/es/blog/cuando-tomar-aspirina-para-el-corazon',
        permanent: true,
      },
      {
        source: '/cuanto-es-el-nivel-normal-de-glucosa',
        destination: '/es/blog/cuanto-es-el-nivel-normal-de-glucosa',
        permanent: true,
      },
      {
        source: '/desayunar-diabetes-tipo-1-niveles-glucemia',
        destination: '/es/blog/desayunar-diabetes-tipo-1-niveles-glucemia',
        permanent: true,
      },
      {
        source: '/desayunos-para-diabeticos',
        destination: '/es/blog/desayunos-para-diabeticos',
        permanent: true,
      },
      {
        source: '/diabetes-alimentacion-hoy',
        destination: '/es/blog/diabetes-alimentacion-hoy',
        permanent: true,
      },
      {
        source: '/diabetes-ansiedad',
        destination: '/es/blog/diabetes-ansiedad',
        permanent: true,
      },
      {
        source: '/diabetes-no-comer-huevos',
        destination: '/es/blog/diabetes-no-comer-huevos',
        permanent: true,
      },
      {
        source: '/diabetes-puedo-comer-pasta',
        destination: '/es/blog/diabetes-puedo-comer-pasta',
        permanent: true,
      },
      {
        source: '/diabetes-tipo-1-diagnosticado',
        destination: '/es/blog/diabetes-tipo-1-diagnosticado',
        permanent: true,
      },
      {
        source: '/diabetes-tipo-1-embarazo-como-debes-cuidarte',
        destination: '/es/blog/diabetes-tipo-1-embarazo-como-debes-cuidarte',
        permanent: true,
      },
      {
        source: '/diabetes-tipo-2',
        destination: '/es/blog/diabetes-tipo-2',
        permanent: true,
      },
      {
        source: '/diabetes-y-los-problemas-coronarios',
        destination: '/es/blog/diabetes-y-los-problemas-coronarios',
        permanent: true,
      },
      {
        source: '/diabetes-y-magnesio',
        destination: '/es/blog/diabetes-y-magnesio',
        permanent: true,
      },
      {
        source: '/diabetico-cambiar-dieta-vegetariana',
        destination: '/es/blog/diabetico-cambiar-dieta-vegetariana',
        permanent: true,
      },
      {
        source: '/diabulimia-trastorno-alimentario',
        destination: '/es/blog/diabulimia-trastorno-alimentario',
        permanent: true,
      },
      {
        source: '/dibetes-hipertension-relacionadas',
        destination: '/es/blog/dibetes-hipertension-relacionadas',
        permanent: true,
      },
      {
        source: '/dieta-blanda-para-los-diabeticos',
        destination: '/es/blog/dieta-blanda-para-los-diabeticos',
        permanent: true,
      },
      {
        source: '/dieta-de-la-india-para-la-diabetes-tipo-2',
        destination: '/es/blog/dieta-de-la-india-para-la-diabetes-tipo-2',
        permanent: true,
      },
      {
        source: '/dolor-estomacal-en-losas-diabeticosas',
        destination: '/es/blog/dolor-estomacal-en-losas-diabeticosas',
        permanent: true,
      },
      {
        source: '/efectos-consumo-maiz-diabetes',
        destination: '/es/blog/efectos-consumo-maiz-diabetes',
        permanent: true,
      },
      {
        source: '/efectos-secundarios-insulina',
        destination: '/es/blog/efectos-secundarios-insulina',
        permanent: true,
      },
      {
        source: '/elegir-los-zapatos-para-un-diabetico',
        destination: '/es/blog/elegir-los-zapatos-para-un-diabetico',
        permanent: true,
      },
      {
        source: '/factores-de-riesgo-de-la-diabetes',
        destination: '/es/blog/factores-de-riesgo-de-la-diabetes',
        permanent: true,
      },
      {
        source: '/fibra-cafe-carnes-rojas',
        destination: '/es/blog/fibra-cafe-carnes-rojas',
        permanent: true,
      },
      {
        source: '/flora-intestinal-diabetes',
        destination: '/es/blog/flora-intestinal-diabetes',
        permanent: true,
      },
      {
        source: '/frutas-buenas-para-la-diabetes',
        destination: '/es/blog/frutas-buenas-para-la-diabetes',
        permanent: true,
      },
      {
        source: '/frutas-malas-para-la-diabetes',
        destination: '/es/blog/frutas-malas-para-la-diabetes',
        permanent: true,
      },
      {
        source: '/genetica-de-la-diabetes-es-la-diabetes-hereditaria',
        destination: '/es/blog/genetica-de-la-diabetes-es-la-diabetes-hereditaria',
        permanent: true,
      },
      {
        source: '/granos-con-bajo-indice-glicemico',
        destination: '/es/blog/granos-con-bajo-indice-glicemico',
        permanent: true,
      },
      {
        source: '/importancia-de-controlar-los-niveles-de-la-glucosa',
        destination: '/es/blog/importancia-de-controlar-los-niveles-de-la-glucosa',
        permanent: true,
      },
      {
        source: '/indice-insulinico-y-el-indice-glucemico',
        destination: '/es/blog/indice-insulinico-y-el-indice-glucemico',
        permanent: true,
      },
      {
        source: '/inteligencia-artificial-corazon-diabetes',
        destination: '/es/blog/inteligencia-artificial-corazon-diabetes',
        permanent: true,
      },
      {
        source: '/intolerancia-a-la-glucosa',
        destination: '/es/blog/intolerancia-a-la-glucosa',
        permanent: true,
      },
      {
        source: '/jugo-de-melon-amargo-para-la-diabetes',
        destination: '/es/blog/jugo-de-melon-amargo-para-la-diabetes',
        permanent: true,
      },
      {
        source: '/la-alergia-a-la-insulina',
        destination: '/es/blog/la-alergia-a-la-insulina',
        permanent: true,
      },
      {
        source: '/la-curcuma-podria-ayudar-la-lucha-la-diabetes',
        destination: '/es/blog/la-curcuma-podria-ayudar-la-lucha-la-diabetes',
        permanent: true,
      },
      {
        source: '/la-gratitud-diabetes',
        destination: '/es/blog/la-gratitud-diabetes',
        permanent: true,
      },
      {
        source: '/la-hipoglucemia-nivel-bajo-de-azucar-en-sangre',
        destination: '/es/blog/la-hipoglucemia-nivel-bajo-de-azucar-en-sangre',
        permanent: true,
      },
      {
        source: '/las-5-cosas-que-hay-que-saber-sobre-la-prediabetes',
        destination: '/es/blog/las-5-cosas-que-hay-que-saber-sobre-la-prediabetes',
        permanent: true,
      },
      {
        source: '/las-bebidas-gaseosas-lada-diabetes-tipo-2',
        destination: '/es/blog/las-bebidas-gaseosas-lada-diabetes-tipo-2',
        permanent: true,
      },
      {
        source: '/listado-de-alimentos-con-bajo-indice-glucemico',
        destination: '/es/blog/listado-de-alimentos-con-bajo-indice-glucemico',
        permanent: true,
      },
      {
        source: '/los-5-mejores-ejercicios-para-personas-con-diabetes',
        destination: '/es/blog/los-5-mejores-ejercicios-para-personas-con-diabetes',
        permanent: true,
      },
      {
        source: '/mejores-sustitutos-comidas-diabetes',
        destination: '/es/blog/mejores-sustitutos-comidas-diabetes',
        permanent: true,
      },
      {
        source: '/meriendas-para-diabeticos-controlar-diabetes',
        destination: '/es/blog/meriendas-para-diabeticos-controlar-diabetes',
        permanent: true,
      },
      {
        source: '/mezclando-alcohol-y-diabetes',
        destination: '/es/blog/mezclando-alcohol-y-diabetes',
        permanent: true,
      },
      {
        source: '/moringa-hipoglucemia',
        destination: '/es/blog/moringa-hipoglucemia',
        permanent: true,
      },
      {
        source: '/neuropatia-diabetica',
        destination: '/es/blog/neuropatia-diabetica',
        permanent: true,
      },
      {
        source: '/neuropatia-diabetica-y-sueno',
        destination: '/es/blog/neuropatia-diabetica-y-sueno',
        permanent: true,
      },
      {
        source: '/novo-nordisk-dice-la-terapia-celulas-madre-podria-la-cura-la-diabetes-tipo-1',
        destination: '/es/blog/novo-nordisk-dice-la-terapia-celulas-madre-podria-la-cura-la-diabetes-tipo-1',
        permanent: true,
      },
      {
        source: '/nuevo-farmaco-diabetes-tipo-1',
        destination: '/es/blog/nuevo-farmaco-diabetes-tipo-1',
        permanent: true,
      },
      {
        source: '/nutraceuticos-diabetes-mejores',
        destination: '/es/blog/nutraceuticos-diabetes-mejores',
        permanent: true,
      },
      {
        source: '/pandemia-diabetes-ninos',
        destination: '/es/blog/pandemia-diabetes-ninos',
        permanent: true,
      },
      {
        source: '/pastillas-para-la-diabetes',
        destination: '/es/blog/pastillas-para-la-diabetes',
        permanent: true,
      },
      {
        source: '/pie-diabetico',
        destination: '/es/blog/pie-diabetico',
        permanent: true,
      },
      {
        source: '/poderosos-beneficios-de-la-curcuma',
        destination: '/es/blog/poderosos-beneficios-de-la-curcuma',
        permanent: true,
      },
      {
        source: '/prometedores-resultados-vista',
        destination: '/es/blog/prometedores-resultados-vista',
        permanent: true,
      },
      {
        source: '/prueba-de-diabetes-para-perros',
        destination: '/es/blog/prueba-de-diabetes-para-perros',
        permanent: true,
      },
      {
        source: '/pueden-los-diabeticos-comer-arroz',
        destination: '/es/blog/pueden-los-diabeticos-comer-arroz',
        permanent: true,
      },
      {
        source: '/punado-cacahuates-almendras',
        destination: '/es/blog/punado-cacahuates-almendras',
        permanent: true,
      },
      {
        source: '/que-es-el-test-o-sullivan-y-el-ttog',
        destination: '/es/blog/que-es-el-test-o-sullivan-y-el-ttog',
        permanent: true,
      },
      {
        source: '/que-es-la-insulina-cuantos-tipos-existen',
        destination: '/es/blog/que-es-la-insulina-cuantos-tipos-existen',
        permanent: true,
      },
      {
        source: '/que-es-sirve-fenogreco',
        destination: '/es/blog/que-es-sirve-fenogreco',
        permanent: true,
      },
      {
        source: '/que-se-usaba-como-insulina-humana',
        destination: '/es/blog/que-se-usaba-como-insulina-humana',
        permanent: true,
      },
      {
        source: '/que-son-carbohidratos',
        destination: '/es/blog/que-son-carbohidratos',
        permanent: true,
      },
      {
        source: '/reduce-riesgo-cintura',
        destination: '/es/blog/reduce-riesgo-cintura',
        permanent: true,
      },
      {
        source: '/remedios-caseros-para-bajar-el-azucar',
        destination: '/es/blog/remedios-caseros-para-bajar-el-azucar',
        permanent: true,
      },
      {
        source: '/resistencia-la-insulina-y-diabetes-es-lo-mismo',
        destination: '/es/blog/resistencia-la-insulina-y-diabetes-es-lo-mismo',
        permanent: true,
      },
      {
        source: '/signos-de-un-coma-diabetico',
        destination: '/es/blog/signos-de-un-coma-diabetico',
        permanent: true,
      },
      {
        source: '/sobredosis-de-azucar-signos-y-sintomas',
        destination: '/es/blog/sobredosis-de-azucar-signos-y-sintomas',
        permanent: true,
      },
      {
        source: '/suplementos-naturales-mejores',
        destination: '/es/blog/suplementos-naturales-mejores',
        permanent: true,
      },
      {
        source: '/suplementos-para-neuropatia-diabetica-mejores',
        destination: '/es/blog/suplementos-para-neuropatia-diabetica-mejores',
        permanent: true,
      },
      {
        source: '/tabletas-de-glucosa-diabetes',
        destination: '/es/blog/tabletas-de-glucosa-diabetes',
        permanent: true,
      },
      {
        source: '/todo-sobre-conteo-de-carbohidratos',
        destination: '/es/blog/todo-sobre-conteo-de-carbohidratos',
        permanent: true,
      },
      {
        source: '/tortas-para-diabeticos',
        destination: '/es/blog/tortas-para-diabeticos',
        permanent: true,
      },
      {
        source: '/tratamiento-insulina-semanal',
        destination: '/es/blog/tratamiento-insulina-semanal',
        permanent: true,
      },
      {
        source: '/una-rutina-de-entrenamientos-con-pesas-contra-la-diabetes',
        destination: '/es/blog/una-rutina-de-entrenamientos-con-pesas-contra-la-diabetes',
        permanent: true,
      },
      {
        source: '/un-nuevo-truco-para-reducir-el-azucar-en-la-sangre',
        destination: '/es/blog/un-nuevo-truco-para-reducir-el-azucar-en-la-sangre',
        permanent: true,
      },
      {
        source: '/vencer-el-dolor-con-la-terapia-craneosacral',
        destination: '/es/blog/vencer-el-dolor-con-la-terapia-craneosacral',
        permanent: true,
      },
      {
        source: '/ventajas-de-comer-leguminosas',
        destination: '/es/blog/ventajas-de-comer-leguminosas',
        permanent: true,
      },
      {
        source: '/yoga-contra-la-diabetes',
        destination: '/es/blog/yoga-contra-la-diabetes',
        permanent: true,
      },
      {
        source: '/yogur-griego-en-la-dieta-diabetica',
        destination: '/es/blog/yogur-griego-en-la-dieta-diabetica',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/preview',
        destination: '/api/prismic/preview',
      },
      {
        source: '/api/exit-preview',
        destination: '/api/prismic/exit-preview',
      },
    ];
  },
};

export default nextConfig;