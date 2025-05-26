import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@src': `${__dirname}/src`,
  '@services': `${__dirname}/services`,
  '@core': `${__dirname}/core`,
  '@routes': `${__dirname}/routes`,
  '@middlewares': `${__dirname}/middlewares`,
  '@assets': `${__dirname}/assets`,
});
