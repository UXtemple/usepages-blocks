import babel from 'rollup-plugin-babel';

export default {
  dest: 'cjs.js',
  entry: 'index.js',
  format: 'cjs',
  moduleName: 'usepages-blocks',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      presets: ['es-uxtemple']
    })
  ]
};
