module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested"),
    require("autoprefixer"),
  ],
});
