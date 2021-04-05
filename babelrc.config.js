module.exports = {
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
              esmodules: true,
            },
          },
        ],
      ],
    },
  },
}
