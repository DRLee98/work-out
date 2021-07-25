const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const MAIN_JS = path.resolve(__dirname, "assets", "js", "main.js");
const ADD_WORK_OUT_JS = path.resolve(
  __dirname,
  "assets",
  "js",
  "addWorkOut.js",
);
const CALENDAR_JS = path.resolve(__dirname, "assets", "js", "calendar.js");
const DAY_WORK_OUT_JS = path.resolve(
  __dirname,
  "assets",
  "js",
  "dayWorkOut.js",
);
const EDIT_WORK_OUT_JS = path.resolve(
  __dirname,
  "assets",
  "js",
  "editWorkOut.js",
);
const HOME_JS = path.resolve(__dirname, "assets", "js", "home.js");
const POST_DETAIL_JS = path.resolve(__dirname, "assets", "js", "postDetail.js");
const PREVIEW_JS = path.resolve(__dirname, "assets", "js", "preview.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: {
    main: MAIN_JS,
    addWorkOut: ADD_WORK_OUT_JS,
    calendar: CALENDAR_JS,
    dayWorkOut: DAY_WORK_OUT_JS,
    editWorkOut: EDIT_WORK_OUT_JS,
    home: HOME_JS,
    postDetail: POST_DETAIL_JS,
    preview: PREVIEW_JS,
  },
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    autoprefixer,
                    {
                      browsers: "cover 99.5%",
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};

module.exports = config;
